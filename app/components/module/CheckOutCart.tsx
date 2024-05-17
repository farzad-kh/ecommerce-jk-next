"use client";
import {
  useCartStore,
  useCheckOut,
  useClientSecret,
  useDrawCart,
} from "@/app/store";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/util/PriceUsFormat";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CheckOutCart = () => {
  const router = useRouter();
  const totalPrice = useCartStore((state) => state.totalPrice);
  const cartStore = useCartStore((state) => state.cart);
  const paymentIntent = useCartStore((state) => state.paymentIntent);
  const isCloseHandler = useDrawCart((state) => state.isCloseHandler);
  const checkOutClick = useCheckOut((state) => state.checkOutClick);
  const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);
  const checkOutLoadHandler = useCheckOut((state) => state.checkOutLoadHandler);
  const setPaymentIntent = useCartStore((state) => state.setPaymentIntent);
  const setClientSecret = useClientSecret((state) => state.setClientSecret);
  const [textNotif, setTextNotif] = useState(false);
  const isLoading = useCartStore((state) => state.isLoading);

  const checkOutHandler = async () => {
    checkOutLoadHandler();
    setTimeout(() => setTextNotif(true), 1000);
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [...cartStore],
        payment_intent_id: paymentIntent,
        total_price: totalPrice,
      }),
    });

    if (res.status === 403) {
      router.push("/api/auth/signin");
      return;
    }
    const data = await res.json();

    setClientSecret(data?.paymentIntent?.client_secret);
    setPaymentIntent(data?.paymentIntent?.id);
    checkOutClick();
    if (data.error) {
      checkOutLoadHandler();
      toast(data.error, {
        style: {
          border: "2px solid #fff",
          color: "#fff",
          background: "#e46a6a",
          boxShadow: "0 0 20px #ddd",
        },
      });
      return;
    }

    router.push("/checkout");
    isCloseHandler();
    setTimeout(() => checkOutLoadHandler(), 2000);
    // false the load
  };
  const pathname = usePathname();
  const skeletonLoad = [0, 1, 2];
  return (
    <motion.div layout className="flex flex-col gap-y-1 pt-5   h-48 z-[99] ">
      {!isLoading ? (
        <>
          <div className="flex justify-between items-center text-sm">
            <p className="text-slate-600">Sub Total:</p>
            <h3 className="text-slate-700 font-semibold">
              {formatPrice(totalPrice)}
            </h3>
          </div>
          <div className="flex justify-between items-center text-sm">
            <p className="text-slate-600">Shiping:</p>
            <h3 className="text-slate-700 font-semibold">Free</h3>
          </div>
          <span className="my-1 h-[1px] bg-slate-700 w-full"></span>
          <div className="flex justify-between items-center text-[14.5px]">
            <p className="text-slate-600 font-semibold">Total price: </p>
            <h3 className="text-gradient font-semibold">
              {formatPrice(totalPrice)}
            </h3>
          </div>
          <Button
            disabled={pathname === "/checkout" || isCheckOutLoad || isLoading}
            onClick={checkOutHandler}
            size="md"
            className={`bg-gradient-to-tr mt-3 w-full from-green-500 to-blue-500 text-white shadow-lg  rounded font-semibold uppercase ${
              pathname === "/checkout" && "  !bg-slate-600"
            } ${isLoading && "opacity-70"}`}
          >
            {isCheckOutLoad ? (
              <div>
                {textNotif ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center self-center gap-x-2"
                  >
                    preparing your order
                    <div className="loader-dots"></div>
                  </motion.div>
                ) : (
                  <Spinner color="white" size="md" />
                )}
              </div>
            ) : pathname === "/checkout" ? (
              "complete your payment"
            ) : (
              " go to checkout"
            )}
          </Button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {skeletonLoad.map((item) => (
              <Skeleton key={item} className="w-full rounded">
                <div className="h-4 w-full rounded bg-default-200"></div>
              </Skeleton>
            ))}
          </div>
          <Button
            className="bg-gradient-to-tr mt-3 w-full from-green-500 to-blue-500 text-white shadow-lg  rounded font-semibold uppercase"
            isLoading
            size="md"
          >
            Loading
          </Button>
        </>
      )}
    </motion.div>
  );
};

export default CheckOutCart;

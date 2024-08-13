"use client";
import {
  useCartStore,
  useCheckOut,
  useClientSecret,
  useDrawCart,
} from "@/app/store";
import { usePathname } from "next/navigation";
import { formatPrice } from "@/util/PriceUsFormat";
import { Button, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SkeletonCheckOut from "./loading/SkeletonCheckOut ";
import SummaryItem from "./SummaryItem";
import useCheckoutHandler from "@/app/hooks/usecheckOutHandler";

const CheckOutCart = () => {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);
  const isLoading = useCartStore((state) => state.isLoading);

  const { checkOutHandler, textNotif } = useCheckoutHandler(); //custom Hook
  const pathname = usePathname();

  const checkoutSteps = () => {
    let text;
    if (pathname === "/checkout") text = "complete your payment";
    else text = "go to checkout";
    return text;
  };

  if (isLoading) return <SkeletonCheckOut />;
  return (
    <motion.div layout className="flex flex-col gap-y-1 pt-5   h-48 z-[99] ">
      <SummaryItem labal={"Sub Total"} value={formatPrice(totalPrice)} />
      <SummaryItem labal={"Shipping"} value={"Free"} />
      <span className="my-1 h-[1px] bg-slate-700 w-full"></span>
      <SummaryItem
        labal={"Total price"}
        value={formatPrice(totalPrice)}
        gradientColor={"text-gradient "}
      />

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
        ) : (
          checkoutSteps()
        )}
      </Button>
    </motion.div>
  );
};

export default CheckOutCart;

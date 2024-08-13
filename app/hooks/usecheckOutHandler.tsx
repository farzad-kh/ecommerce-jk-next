// hooks/useCheckoutHandler.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, useCheckOut, useClientSecret, useDrawCart } from "@/app/store";
import toast from "react-hot-toast";

const useCheckoutHandler = () => {

   
  const router = useRouter();
  const totalPrice = useCartStore((state) => state.totalPrice);
  const cartStore = useCartStore((state) => state.cart);
  const paymentIntent = useCartStore((state) => state.paymentIntent);
  const isCloseHandler = useDrawCart((state) => state.isCloseHandler);
  const checkOutClick = useCheckOut((state) => state.checkOutClick);

  const checkOutLoadHandler = useCheckOut((state) => state.checkOutLoadHandler);
  const setPaymentIntent = useCartStore((state) => state.setPaymentIntent);
  const setClientSecret = useClientSecret((state) => state.setClientSecret);
  const [textNotif, setTextNotif] = useState(false);

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

    setClientSecret(data?.paymentIntent?.client_secret);
    setPaymentIntent(data?.paymentIntent?.id);
    checkOutClick();
    router.push("/checkout");
    isCloseHandler();
    setTimeout(() => checkOutLoadHandler(), 2000);
  };

  return {
    checkOutHandler,
    textNotif,
  };
};

export default useCheckoutHandler;

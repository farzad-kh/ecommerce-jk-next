"use client";
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCartStore, useClientSecret } from "@/app/store";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import LoadingRow from "./loading/LoadingRow";
import { formatPrice } from "@/util/PriceUsFormat";
import SucceededPayment from "../template/SucceededPayment";
import { motion } from "framer-motion";
const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = useClientSecret((state) => state.clientSecret);

  const [message, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const paymentIntentStore = useCartStore((state) => state.paymentIntent);
  const cc = useCartStore((state) => state.resetCartStore);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message!);
      console.log(error);

      setIsLoading(false);
      return;
    }
    if (error === undefined || error?.payment_intent?.status === "succeeded") {
      const res = await fetch("/api/update-order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentStore,
          newStatus: "success",
        }),
      });
      const data = res.json();

      cc();

      setIsSuccess(true);
    }

    setIsLoading(false);
  };

  return !isSuccess ? (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      style={{ width: "100%" }}
      id="payment-form"
    >
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <button
        className="font-semibold bg-[#3b4f6c] rounded text-white w-full p-[10px] my-8 "
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading || stripe === null || elements === null ? (
            <LoadingRow />
          ) : (
            <>Pay {formatPrice(totalPrice)}</>
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div className="text-[#e32349]" id="payment-message">
          {message}
        </div>
      )}
    </motion.form>
  ) : (
    <SucceededPayment isSuccess={isSuccess} />
  );
};

export default CheckOutForm;

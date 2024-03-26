"use client";
import { useCartStore, useCheckOut, useClientSecret } from "@/app/store";
import { redirect } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../module/CheckOutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function CheckOutContainer() {
  
  const isCheckOut = useCheckOut((state) => state.isCheckOut);
 
  
  if (isCheckOut===false) return redirect("/");

  const clientSecret = useClientSecret((state) => state.clientSecret);


  const appearance = {
    theme: "flat" as any,
    variables: { colorPrimaryText: "#262626" },
  };
  const options = {
    clientSecret,
    appearance,
    layout: {
      type: "tabs",
    },
  };
 
  return (
    <div className="App flex justify-center items-center h-full">
      {clientSecret && (
        <div className="flex md:max-w-[588px] w-full justify-center items-center h-full p-4">
          <Elements options={options} stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </div>
      )}
      <div className="wave"></div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
 
import { useCartStore, useCheckOut, useDrawCart } from "@/app/store";
import { Button, Spinner } from "@nextui-org/react";
 
import toast from "react-hot-toast";

import { MdError } from "react-icons/md";
import { TfiRulerAlt } from "react-icons/tfi";
// import LoadingRow from "./loading/LoadingRow";
interface Props {
  id: string;
  name: string;
  image?: string | undefined;
  unit_amount?: number | null | undefined;
  quantity: number;
  size: string;
}
const AddToCartBtn = ({
  id,
  name,
  image,
  unit_amount,
  quantity,
  size,
}: Props) => {
  const addToProduct = useCartStore((state) => state.addToProduct);
  const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
  const [isLoading, setIsLoading] = useState(false);
  const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);
  const errorIsLogin = <MdError style={{ fill: "white", fontSize: "18px" }} />;
  const errorSize = <TfiRulerAlt style={{ fill: "white", fontSize: "18px" }} />;

  const addToCartHandler = () => {
    if (!size) {
      toast("Please choose a size. ", {
        style: {
          border: "2px solid #fff",
          color: "#fff",
          background: "#e46a6a",
          boxShadow: "0 0 20px #ddd",
        },
        icon: errorSize,
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      addToProduct({ id, name, image, unit_amount, quantity, size });
      isToggleHandler();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Button
      onClick={addToCartHandler}
      disabled={isLoading || isCheckOutLoad}
      size="md"
      className={` ${
        isCheckOutLoad && "!opacity-70"
      }  sm:w-[280px] w-full mr-2  bg-gradient-to-tr h-[44px] text-base  from-green-500 to-blue-500 text-white shadow-lg  rounded-sm font-semibold `}
    >
      {isLoading ? <Spinner color="white" size="md" /> : "Add to cart"}
    </Button>
  );
};

export default AddToCartBtn;

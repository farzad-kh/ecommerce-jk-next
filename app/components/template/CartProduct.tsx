import React, { useState } from "react";

import { CartItem, useCartStore, useCheckOut } from "@/app/store";
import { Image } from "@nextui-org/react";
import { formatPrice } from "@/util/PriceUsFormat";
import { motion } from "framer-motion";
 

import { usePathname } from "next/navigation";

 
import RemoveProduct from "../module/RemoveProduct";
import CalculatProductBtn from "../module/CalculatProductBtn";
const CartProduct = ({
  id,
  name,
  image,
  quantity,
  size,
  unit_amount,
}: CartItem) => {
  const addToProduct = useCartStore((state) => state.addToProduct);
  const isLoading = useCartStore((state) => state.isLoading);
  const cartStoreLoading = useCartStore((state) => state.cartStoreLoading);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const decreaseProduct = useCartStore((state) => state.decreaseProduct);
  const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);
  const [isRemoved, setIsremoved] = useState<boolean>(false);
  const pathname = usePathname();

  const decreaseHandler = () => {
    if (quantity > 1) {
      cartStoreLoading();
      setTimeout(() => {
        decreaseProduct({
          id,
          name,
          image,
          unit_amount,
          quantity,
          size,
        });
        cartStoreLoading();
      }, 1000);
    } else {
      setIsremoved(true);
    }
  };

  const addToCartHandler = () => {
    cartStoreLoading();
    setTimeout(() => {
      addToProduct({
        id,
        name,
        image,
        unit_amount,
        quantity,
        size,
      });
      cartStoreLoading();
    }, 1000);
  };

  const remove = () => {
    setIsremoved(false);
    cartStoreLoading();
    setTimeout(() => {
      removeProduct({
        id,
        name,
        image,
        unit_amount,
        quantity,
        size,
      });
      cartStoreLoading();
    }, 1000);
  };

  return (
    <motion.div
      layout
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="flex flex-col gap-3 mb-4 origin-bottom h-[90px] relative "
    >
      <div className="flex gap-3   h-[90px] text-sm text-xs-custom relative rounded overflow-hidden ">
        <div className="rounded overflow-hidden flex-shrink-0 ">
          <Image
            className="aspect-[10/13.6]"
            radius="none"
            width={66}
            height={66}
            alt="NextUI hero Image "
            src={image || ""}
          />
        </div>

        <div className="flex flex-col gap-[1px]">
          <h1 className=" font-semibold w-[300px] overflow-hidden text-ellipsis whitespace-nowrap mb-1">
            {name}
          </h1>

          <div className=" flex text-slate-600 gap-x-1">
            Quantity:
            <div className="flex gap-x-1">
              <p
                className={`text-slate-700 font-semibold ${
                  isLoading || isCheckOutLoad ? "opacity-70" : ""
                }`}
              >
                {quantity}
              </p>
              {pathname !== "/checkout" && (
                <CalculatProductBtn
                  isLoading={isLoading}
                  isCheckOutLoad={isCheckOutLoad}
                  decreaseHandler={decreaseHandler}
                  addToCartHandler={addToCartHandler}
                  isRemoved={isRemoved}
                  setIsremoved={setIsremoved}
                />
              )}
            </div>
          </div>
          <div className=" flex text-slate-600">
            Size:<span>&nbsp;</span>
            <p className="uppercase text-slate-700 font-semibold">{size}</p>
          </div>
          <div className="  text-slate-600 flex ">
            Price: <span>&nbsp;</span>
            <p className="text-slate-700 font-semibold  ">
              {unit_amount ? formatPrice(unit_amount) : ""}
            </p>
          </div>
        </div>
      </div>

      {isRemoved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`  
      
          absolute w-full scale-0 left-0 z-50  bg-[rgba(0,0,0,0.3)] backdrop-blur-[2px] overflow-hidden  rounded h-full origin-center `}
        >
          <RemoveProduct remove={remove} setIsremoved={setIsremoved} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CartProduct;

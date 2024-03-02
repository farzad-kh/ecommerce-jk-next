"use client";
import React, { useState, ChangeEvent } from "react";
import AddToCartBtn from "./AddToCartBtn";
import { Product } from "../template/ProductCardContainer";
 
import FavoriteBtn from "./FavoriteBtn";
import SizeGuide from "./SizeGuide";

interface Props {
  productSize?: {
    size?: string;
  };
  product: Product;
}

const SizeSelect = ({ productSize, product }: Props) => {
  const sizes = productSize?.size?.split("-");
  const [selectSize, setSelectSize] = useState<string>("");

  const selectHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectSize(value);
  };

  return (
    <>
      <div className="mt-4 text-slate-900 text-sm font-semibold">
        <p>Select size</p>
        <div className="radio-inputs justify-end my-3 flex col">
          {sizes?.map((item, i) => (
            <label key={i}>
              <input
                className="radio-input focus:outline-0"
                type="radio"
                value={item}
                name={item}
                checked={selectSize === item}
                onChange={selectHandler}
              />
              <span className="radio-tile">
                <span className="radio-label uppercase">{item}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex  gap-x-3 my-5">
        <AddToCartBtn
          id={product.id}
          name={product?.name}
          image={product.image}
          unit_amount={product.unit_amount}
          quantity={1}
          size={selectSize}
        />
  <FavoriteBtn productId={product.id} name={product?.name} image={product.image} unit_amount={product.unit_amount} productInfo/> 
  <SizeGuide/>
      </div>
    </>
  );
};

export default SizeSelect;

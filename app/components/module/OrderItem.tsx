import { CartItem } from "@/app/store";
import React from "react";
import { Image } from "@nextui-org/react";
import { formatPrice } from "@/util/PriceUsFormat";
interface Props {
  product: CartItem;
}
const OrderItem = ({ product }: Props) => {
  

  return (
    <div className=" rounded-sm w-[460px]  pt-3 flex-col text-sm ">
      <p className="mb-1 font-semibold text-slate-700"> {product.name}</p>
      <div className="flex gap-x-3 items-center">
        <Image alt={product.image} className="rounded" radius="none" width={50} height={50} src={product.image} />
        <p className="text-slate-600 font-semibold text-sm">{formatPrice(product?.unit_amount!)}</p>
        <p className="text-slate-700">Quantity:<span className="uppercase text-slate-600 font-semibold">{product.quantity}</span></p>
        <p className="text-slate-700">Size: <span className="uppercase text-slate-600 font-semibold">{product.size}</span></p>
      </div>
    </div>
  );
};

export default OrderItem;

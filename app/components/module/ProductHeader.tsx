import Link from "next/link";
import React from "react";

interface Props {
  productHref: string;
  productName: string;
}

const ProductHeader = ({ productHref, productName }: Props) => {
  return (
    <div className="max-sm:w-full w-auto md:-top-[1.75rem] sm:-top-5 -top-[40px]  max-sm:px-4 flex overflow-hidden   mt-7  max-sm:mb-[18px] absolute ">
      <div className="flex gap-2 max-md:ml-8 max-sm:ml-0 overflow-hidden   max-w-[1400px] max-sm:text-xs text-sm font-semibold text-slate-400   capitalize">
        <Link className="hover:text-slate-500" href={"/"}>
          Home
        </Link>
        /
        <Link className="hover:text-slate-500" href={"/" + productHref}>
          {productHref}
        </Link>
        /<h3 className="text-ellipsis-custom">{productName}</h3>
      </div>
    </div>
  );
};

export default ProductHeader;

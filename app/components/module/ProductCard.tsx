"use client";
import { formatPrice } from "@/util/PriceUsFormat";
import { Card } from "@nextui-org/react";
import Link from "next/link";
import { Product } from "../template/ProductCardContainer";
import CardImgHover from "./CardImgHover";
import FavoriteBtn from "./FavoriteBtn";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
 
interface Props {
  products: Product;
  favorite?: boolean;
}

const ProductCard = ({
  products: { id, name, unit_amount, image, metadata },
  favorite,
}: Props) => {
  const filterImage = metadata
    ? Object.values(metadata as { [key: string]: string }).filter((item) =>
        item?.includes("image")
      )
    : [];

    const pathname = usePathname();
 
    
  return (
    <motion.div
       layout={pathname==="/wishlist"}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card
        isFooterBlurred
        className="w-full max-w-[360px]  col-span-12 sm:col-span-5 aspect-[10.5/16] rounded-md "
      >
        <Link href={{ pathname: `/product/${id}`, query: { name } }}>
          {favorite ? (
            <CardImgHover images={image} favorite={favorite} />
          ) : (
            <CardImgHover images={filterImage} />
          )}
        </Link>

        <FavoriteBtn
          productId={id}
          name={name}
          image={image}
          unit_amount={unit_amount}
        />
      </Card>
      <div className=" mb-8 flex flex-col gap-y-1  h-16">
        <h3 className=" text-slate-700  text-sm text-slips-custom">{name}</h3>

        <div>
          <p className="text-slate-800 font-semibold  text-sm">
            {" "}
            {unit_amount ? formatPrice(unit_amount) : ""}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

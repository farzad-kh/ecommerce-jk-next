"use client"
import AnimatePresenceLayout from "../layout/AnimatePresenceLayout";
import MotionLayout from "../layout/MotionLayout";
import ProductCard from "../module/ProductCard";

export interface Product {
  id: string;
  name: string;
  unit_amount?: number | null;
  image?: string;
  currency?: string;
  metadata?: { color?: string; size?: string; composition?: string,category:string}|any;
  description?: string | null;
  features?: (string | null | any)[];
  category?:string
}
interface Props {
  productsData: Product[];
  favorite?: boolean;
}
 
const ProductCardContainer = ({ productsData, favorite }: Props) => {
 

  return (
    <div className="flex items-center justify-center">
      <MotionLayout>
        <div className="sm:gap-6  gap-4 grid w-full   grid-cols-3 grid-layout  xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 md:p-10 p-4 items-center">
          <AnimatePresenceLayout>
            {productsData.map((item) => (
              <ProductCard key={item.id} products={item} favorite={favorite} />
            ))}
          </AnimatePresenceLayout>
        </div>
      </MotionLayout>
    </div>
  );
};

export default ProductCardContainer;

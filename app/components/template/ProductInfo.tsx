import SliderContainer from "@/app/components/layout/SliderContainer";
import AccorDionItem from "@/app/components/module/AccorDionItem";
import { Product } from "@/app/components/template/ProductCardContainer";
import { formatPrice } from "@/util/PriceUsFormat";
import SizeSelect from "../module/SizeSelect";
import ProductPolisy from "../module/ProductPolisy";
import ProductHeader from "../module/ProductHeader";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  return (
    <div className="flex justify-center w-full mt-5 ">
      <div className="flex justify-between gap-y-10 relative  lg:p-10 md:p-7 sm:p-4 text-gray-700 md:flex-row flex-col max-w-[1400px]">
        <ProductHeader
          productHref={product?.category||""}
          productName={product.name}
        />
        <SliderContainer metadata={product?.metadata!} />
        <div className="md:flex-[0.54] flex-[0.2] flex flex-col sm:p-4 p-4">
          <h1 className="text-xl font-semibold ">{product?.name}</h1>
          <p className="mb-8 text-sm ">{product?.description}</p>
          <div className="mb-2 font-bold text-slate-800   text-[1.1rem]  ">
            {product?.unit_amount && formatPrice(product?.unit_amount)}
          </div>
          <p className="mb-2 text-sm  ">{product.metadata?.color}</p>

          <SizeSelect productSize={product.metadata} product={product} />

          <ProductPolisy />
          <AccorDionItem
            features={product?.features}
            metadata={product?.metadata}
          />
          {/* {more content here} */}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;

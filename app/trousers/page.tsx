import Stripe from "stripe";
import ProductCardContainer from "../components/template/ProductCardContainer";
import getProducts from "../hooks/DataList";
import Link from "next/link";
import { sort } from "fast-sort";
import SelectCat from "../components/module/SelectCat";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    category?: string | undefined;
  };
}
const page = async ({ searchParams }: Props) => {
  const productsData = await getProducts();
  const productMetadata = productsData.filter(
    (item) => item.metadata.category === "trousers"
  );
  // const filterCategory=productMetadata.filter(item=>item.category==="sweatshirt")
 

  const data = () => {
    const sortAcs = sort(
      productMetadata?.map((item) => item.unit_amount)
    ).asc();
    if (searchParams.category) {
      const filterType =
        productMetadata.filter((item) =>
          item.features.includes(`Product type : ${searchParams?.category}`)
        ) || [];
      return filterType;
    } else {
      return productMetadata;
    }
  };

if (data().length===0) notFound()
   
 

 

  return (
    <div>
      <ProductCardContainer productsData={data()} />
    </div>
  );
};

export default page;
export const metadata: Metadata = {
  title:'Trousers For Men | JACK & JONES',
  description:'High Quality Trousers'
}
 

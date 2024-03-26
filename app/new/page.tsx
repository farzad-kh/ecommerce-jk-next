import Stripe from "stripe";
import ProductCardContainer from "../components/template/ProductCardContainer";
import getProducts from "../hooks/DataList";
import Link from "next/link";
import { sort } from "fast-sort";
import SelectCat from "../components/module/SelectCat";
import { Metadata } from "next";

interface Props {
  searchParams: {
    sorting?: string | undefined;
  };
}
const page = async ({ searchParams }: Props) => {
  const productsData = await getProducts();

  // const filterCategory=productMetadata.filter(item=>item.category==="sweatshirt")

  const data = () => {
    if (searchParams.sorting) {
      const sortedDesc = sort(productsData).desc((p) => p.unit_amount);
      const sortedAsc = sort(productsData).asc((p) => p.unit_amount);

      return searchParams.sorting === "asc" ? sortedAsc : sortedDesc;
    } else {
      return productsData;
    }
  };
  const cat = [
    { id: 1, value: "", label: "Newest" },
    { id: 2, value: "asc", label: "Price low to high" },
    { id: 3, value: "desc", label: "Price high to low" },
  ];

  return (
    <div>
      <SelectCat selectCat={cat} pageUrl={"new"} sorting />
      <ProductCardContainer productsData={data()} />
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title:'New products | JACK & JONES',
  description:'High Quality Jeans'
}
 

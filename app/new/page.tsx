
import ProductCardContainer from "../components/template/ProductCardContainer";
import getProducts from "../hooks/DataList";

import { sort } from "fast-sort";

import { Metadata } from "next";

interface Props {
  searchParams: {
    sorting?: string | undefined;
  };
}
const page = async ({ searchParams }: Props) => {
  const productsData = await getProducts();

 

  const data = () => {
    if (searchParams.sorting) {
      const sortedDesc = sort(productsData).desc((p) => p.unit_amount);
      const sortedAsc = sort(productsData).asc((p) => p.unit_amount);

      return searchParams.sorting === "asc" ? sortedAsc : sortedDesc;
    } else {
      return productsData;
    }
  };


  return (
    <div>
      <ProductCardContainer productsData={data()} />
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "New products | JACK & JONES",
  description: "High Quality Jeans",
};

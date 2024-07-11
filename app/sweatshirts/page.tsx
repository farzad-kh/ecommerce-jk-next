
import ProductCardContainer from "../components/template/ProductCardContainer";
import getProducts from "../hooks/DataList";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    category?: string | undefined;
  };
}
const page = async ({ searchParams }: Props) => {
  const productsData = await getProducts();

const productMetadata=productsData.filter(item=>item.metadata.category==="sweatshirt")
 
  const data = () => {
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

      <ProductCardContainer productsData={data()}   />
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title:'Sweatshirts For Men | JACK & JONES',
  description:'High Quality Sweatshirt'
}
 


import ProductCardContainer from "../components/template/ProductCardContainer";
import getProducts from "../hooks/DataList";
import { Metadata } from "next";
interface Props {
  searchParams: {
    category?: string | undefined;
  };
}
const page = async ({ searchParams }: Props) => {
  const productsData = await getProducts();
  const productMetadata = productsData.filter(
    (item) => item.metadata.category === "jeans"
  );
  // const filterCategory=productMetadata.filter(item=>item.category==="sweatshirt")

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
  // if (data().length===0) notFound()
  return (
    <div>
      <ProductCardContainer productsData={data()} />
    </div>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Jeans For Men | JACK & JONES",
  description: "High Quality Jeans",
};

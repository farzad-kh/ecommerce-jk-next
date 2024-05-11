import ProductCardContainer from "../components/template/ProductCardContainer";
import getProducts from "../hooks/DataList";

import { sort } from "fast-sort";
import SelectCat from "../components/module/SelectCat";
import { redirect } from "next/navigation";

import SearchLoad from "../components/module/SearchLoad";

import NoResultSearch from "../components/layout/NoResultSearch";

interface Props {
  searchParams: {
    sorting?: string | undefined;
    q?: string | undefined;
  };
  search?: boolean;
}
const page = async ({ searchParams }: Props) => {
  const productsData = await getProducts();

  const data = () => {
    let filteredItems;

    if (searchParams.q) {
      filteredItems = productsData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchParams.q!.toLowerCase()) ||
          product.features.some((feature) =>
            feature
              ?.split(":")[1]
              ?.toLowerCase()
              .includes(searchParams.q!.toLowerCase())
          )
      );
      if (searchParams.sorting) {
        const sortedDesc = sort(filteredItems).desc((p) => p.unit_amount);
        const sortedAsc = sort(filteredItems).asc((p) => p.unit_amount);

        return (filteredItems =
          searchParams.sorting === "asc" ? sortedAsc : sortedDesc);
      }
      return filteredItems;
    } else {
      return redirect("/");
    }
  };
  const cat = [
    { id: 1, value: "", label: "Newest" },
    { id: 2, value: "asc", label: "Price low to high" },
    { id: 3, value: "desc", label: "Price high to low" },
  ];

  return (
    <>
      {data()?.length! > 0 ? (
        <SearchLoad>
          <SelectCat selectCat={cat} sorting search={searchParams.q} />

          <ProductCardContainer productsData={data()!} />
        </SearchLoad>
      ) : (
        <NoResultSearch searchResults={searchParams?.q} />
      )}
    </>
  );
};

export default page;

export async function generateMetadata({ searchParams }: Props) {
  return {
    title: `Searching for ${searchParams.q} | JACK & JONES`,
  };
}

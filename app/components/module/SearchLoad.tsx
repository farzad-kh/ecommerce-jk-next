"use client";
import Loading from "@/app/loading";
import { useSearchLoad } from "@/app/store";

import React from "react";
import WifiLoader from "./loading/WifiLoader";
interface Props {
  children: React.ReactNode;
}
const SearchLoad = ({ children }: Props) => {
  const isSearch = useSearchLoad((state) => state.isSearch);
  return <>{!isSearch ? <div>{children}</div> : <WifiLoader />}</>;
};

export default SearchLoad;

"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";
interface items {
  id?: number | undefined;
  value: string | undefined;
  label: string | undefined;
}
interface Props {
  selectCat: items[];
  pageUrl?: string;
  sorting?: boolean;
  search?: string;
}
const SelectCat = ({ selectCat, pageUrl, sorting, search }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const urlParams = new URLSearchParams(params);
  const category = urlParams.get("category");
  const sortingParams = urlParams.get("sorting");
  const a = urlParams.toString().split("=");

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value !== "") {
      if (sorting) {
        router.push(`/${pageUrl}?sorting=${value}`);
        if (search && sorting) {
          router.push(`/${pageUrl}?q=${search}&sorting=${value}`);
        }
      } else {
        router.push(`/${pageUrl}?category=${value}`);
      }
    } else if (value === "" && search) {
      router.push(`/${pageUrl}?q=${search}`);
    } else {
      router.push(`/${pageUrl}`);
    }
  };
  let defaultValueSearch = a.length < 3 ? "" : a[2];
 
 
  return (
    <div className="sm:mx-10 mx-4 mt-10">
      <motion.select
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        onChange={selectHandler}
      
        value={search ? defaultValueSearch : a[1]}
        className="max-w-xs select-t"
      >
        {selectCat.map((item) => (
          <motion.option key={item.value} value={item.value}>
            {item.label}
          </motion.option>
        ))}
      </motion.select>
    </div>
  );
};

export default SelectCat;

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CiSearch } from "react-icons/ci";
import { useSearchLoad } from "@/app/store";

interface Props {
  setActiveSearch: boolean | any;
  setIsMenuOpen?: boolean | any;
}

const SearchContainer = ({ setActiveSearch, setIsMenuOpen }: Props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const isSearchHandler = useSearchLoad((state) => state.isSearchHandler);
  const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission behavior
    handleSearch();
  };

  const handleSearchIconClick: React.MouseEventHandler<SVGElement> = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = () => {
    isSearchHandler();
    if (search) {
      router.push(`/search?q=${search}`);
      setSearch("");
      setActiveSearch(false);
      setTimeout(() => isSearchHandler(), 2500);
      if (setIsMenuOpen !== undefined) {
        setIsMenuOpen(false);
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current && setIsMenuOpen === undefined) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <motion.form
      exit={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
      className={` ${
        setIsMenuOpen !== undefined
          ? "relative w-full my-2"
          : "absolute -top-[9px] left-[-72px]"
      }  z-50 transition-width `}
      onSubmit={searchSubmit}
      id="sa"
      noValidate
    >
      <input
        ref={inputRef}
        className={` ${
          setIsMenuOpen !== undefined
            ? "w-full border-neutral-700 bg-[#f2f2f2]"
            : "backdrop-blur-sm  w-[186px] bg-[#e4e9eda2] border-neutral-400 "
        }  border-1 rounded-sm pl-2 pr-3 py-[6px] outline-none focus:outline-[#4971d7]  relative placeholder:text-sm placeholder:font-semibold placeholder:text-slate-500 `}
        onChange={(e) => setSearch(e.target.value.trim())}
        type="email"
        placeholder="Serach Products..."
        title="serach "
        autoComplete="off"
        value={search}
      />
      <CiSearch
        onClick={handleSearchIconClick}
        className="w-[26px] h-[26px] right-[6px] top-[6px] cursor-pointer absolute text-3xl text-slate-800"
      />
    </motion.form>
  );
};

export default SearchContainer;

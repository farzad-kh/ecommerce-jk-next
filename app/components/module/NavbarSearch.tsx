import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import SearchContainer from './SearchContainer';
interface Props{
    setActiveSearch :React.Dispatch<React.SetStateAction<boolean>>;
    activeSearch:boolean
}
const NavbarSearch = ({setActiveSearch,activeSearch}:Props) => {
let ref = useRef<HTMLDivElement>(null);

useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!ref.current || !ref.current.contains(e.target as Node)) {
        setActiveSearch(false);
      }
    };

    document.addEventListener("mousedown", handler);
  }, []);
    return (
        <div className="relative block max-md:hidden " ref={ref}>
            <div
              onClick={() => setActiveSearch(!activeSearch)}
              className="w-[26px] h-[26px] cursor-pointer"
            >
              <CiSearch className="w-[26px] h-[26px]   text-3xl" />
            </div>
            <AnimatePresence>
              {activeSearch && (
                <SearchContainer setActiveSearch={setActiveSearch} />
              )}
            </AnimatePresence>
          </div>
    );
};

export default NavbarSearch;
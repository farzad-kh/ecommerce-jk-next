import React from "react";
interface Props {
  searchResults?: string;
}
const NoResultSearch = ({ searchResults }: Props) => {
  return (
    <div className="w-full flex justify-center items-center h-[40vh]">
      <p className="sm:text-xl text-lg  font-semibold">
        We could not find anything for "{searchResults}"
      </p>
    </div>
  );
};

export default NoResultSearch;

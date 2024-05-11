 
import React from "react";
import SelectCat from "../components/module/SelectCat";
interface LayoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: LayoutProps) => {
  const cat = [
    { id: 1, value: "", label: "Newest" },
    { id: 2, value: "asc", label: "Price low to high" },
    { id: 3, value: "desc", label: "Price high to low" },
  ];
  return (
    <>
      <SelectCat selectCat={cat} sorting />
      {children}
    </>
  );
};

export default layout;

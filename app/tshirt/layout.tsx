import React from 'react';
import SelectCat from '../components/module/SelectCat';
export interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, value: "", label: "all" },
        { id: 2, value: "polo", label: "polo" },
        { id: 2, value: "t-shirt", label: "t-shirt" },
      ];
    return (
        <>
           <SelectCat selectCat={cat} pageUrl={"tshirt"} />
            {children}
        </>
    );
};

export default layout;
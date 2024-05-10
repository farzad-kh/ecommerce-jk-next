import React from 'react';
import SelectCat from '../components/module/SelectCat';
export interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, value: "", label: "all" },
        { id: 2, value: "sweatshirt", label: "sweatshirt" },
        { id: 3, value: "hoodie", label: "hoodie" },
      ];
    return (
        <>
       <SelectCat selectCat={cat}  />
            {children}
        </>
    );
};

export default layout;
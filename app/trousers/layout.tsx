import React from 'react';
import SelectCat from '../components/module/SelectCat';
export interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, value: "", label: "all" },
        { id: 2, value: "cargo trousers", label: "Cargo trousers" },
        { id: 2, value: "sweatpants", label: "Sweatpants" },
      ];
    return (
        <>
           <SelectCat selectCat={cat} pageUrl={"trousers"} />
            {children}
        </>
    );
};

export default layout;
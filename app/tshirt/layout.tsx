import React from 'react';
import SelectCat from '../components/module/SelectCat';
interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, value: "", label: "all" },
        { id: 2, value: "polo", label: "polo" },
        { id: 3, value: "t-shirt", label: "t-shirt" },
      ];
    return (
        <>
           <SelectCat selectCat={cat}   />
            {children}
        </>
    );
};

export default layout;
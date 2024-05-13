import React from 'react';
import SelectCat from '../components/module/SelectCat';
interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, label: "All" },
        { id: 2, value: "polo", label: "Polo" },
        { id: 3, value: "t-shirt", label: "T-shirt" },
      ];
    return (
        <>
           <SelectCat selectCat={cat}   />
            {children}
        </>
    );
};

export default layout;
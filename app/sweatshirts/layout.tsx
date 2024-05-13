import React from 'react';
import SelectCat from '../components/module/SelectCat';
interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1,  label: "All" },
        { id: 2, value: "sweatshirt", label: "Sweatshirt" },
        { id: 3, value: "hoodie", label: "Hoodie" },
      ];
    return (
        <>
       <SelectCat selectCat={cat}   />
            {children}
        </>
    );
};

export default layout;
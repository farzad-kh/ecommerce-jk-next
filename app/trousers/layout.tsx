import React from 'react';
import SelectCat from '../components/module/SelectCat';
 interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, label: "All" },
        { id: 2, value: "argo trousers", label: "Cargo trousers" },
        { id: 3, value: "sweatpants", label: "Sweatpants" },
      ];
    return (
        <>
           <SelectCat selectCat={cat}  />
            {children}
        </>
    );
};

export default layout;
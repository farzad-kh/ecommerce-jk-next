import React from 'react';
import SelectCat from '../components/module/SelectCat';
interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, label: "All" },
        { id: 2, value: "slim fit", label: "Slim fit" },
        { id: 3, value: "baggy", label: "Baggy" },
      ];
    
    return (
        <>
      <SelectCat selectCat={cat}    />
            {children}
        </>
    );
};

export default layout;
import React from 'react';
import SelectCat from '../components/module/SelectCat';
export interface LayoutProps  { 
    children: React.ReactNode
 }
 
const layout = ({children}:LayoutProps) => {
    const cat = [
        { id: 1, value: "", label: "all" },
        { id: 2, value: "slim fit", label: "slim fit" },
        { id: 2, value: "baggy", label: "baggy" },
      ];
    
    return (
        <>
      <SelectCat selectCat={cat} pageUrl={"jeans"}   />
            {children}
        </>
    );
};

export default layout;
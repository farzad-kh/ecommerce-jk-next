"use client";
import { usePathname } from "next/navigation";  
import WifiLoader from "./components/module/loading/WifiLoader"; 

const Loading = () => {
  const pathname = usePathname() 
  return (
    <>
  
      {pathname === "/search" ? (
        <WifiLoader />  
      ) : (
        <div className="flex w-full h-[75svh] items-center justify-center flex-col gap-2">
          <div className="loaderMain">
            <span>jack&jones...</span>
            <span>jack&jones...</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading; // Exporting the Loading component

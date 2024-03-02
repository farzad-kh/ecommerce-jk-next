import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { VscJersey } from "react-icons/vsc";
import { PiCoatHanger } from "react-icons/pi";
const ProductPolisy = () => {
  const productPolisy = [
    { id: 1, title: "Free shipping", icon: <TbTruckDelivery className="text-2xl text-[#497dd9] " /> },
    { id: 2, title: "100 day returns", icon: <IoReturnDownBackOutline  className="text-2xl text-[#497dd9]" /> },
    { id: 3, title: "Try before you buy", icon: <VscJersey  className="text-2xl text-[#497dd9]" /> },
    { id: 4, title: "New items every day", icon: <PiCoatHanger  className="text-2xl text-[#497dd9]" /> },
  ];

  return <div className="flex flex-col mt-3 mb-2 ">
    <div className="flex  justify-start flex-col gap-y-4">
        {productPolisy.map(item=>
            <div className="flex items-center justify-start  gap-x-3 " key={item.id}>
                {item.icon}
                <p className="text-sm text-slate-800 font-semibold">{item.title}</p>
            </div>
            )}
    </div>
  </div>;
};

export default ProductPolisy;

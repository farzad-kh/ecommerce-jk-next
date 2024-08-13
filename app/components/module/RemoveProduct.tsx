import { Button } from "@nextui-org/react";
import React, { Dispatch, SetStateAction } from "react";
interface Props {
  remove: () => void;
  setIsremoved: Dispatch<SetStateAction<boolean>>;
}
const RemoveProduct = ({ remove, setIsremoved }: Props) => {
   
    
  return (
    <div className="flex justify-center items-center gap-y-1  w-full self-center h-full flex-col">
      <p className="max-sm:text-base text-sm font-semibold text-white">
        Are you sure you want to remove this item?
      </p>
      <div className="flex gap-x-4">
        <Button
          size="sm"
          className="border-1 border-gray-300 rounded-sm h-[36px] font-semibold"
          radius="none"
          onClick={() => setIsremoved(false)}
        >
          NO
        </Button>
        <Button
          size="sm"
          className=" rounded-sm border-1 border-red-600 h-[36px] font-semibold"
          radius="none"
          color="danger"
          variant="solid"
          onClick={remove}
        >
          YES
        </Button>
      </div>
    </div>
  );
};

export default RemoveProduct;

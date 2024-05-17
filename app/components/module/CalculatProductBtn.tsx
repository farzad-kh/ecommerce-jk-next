import React, { SetStateAction ,Dispatch} from 'react';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
interface Props{
    isLoading:boolean
    isCheckOutLoad:boolean
    decreaseHandler:()=> void
    addToCartHandler:()=> void
    isRemoved:boolean
    setIsremoved: Dispatch<SetStateAction<boolean>>;
}
const CalculatProductBtn = ({isLoading,isCheckOutLoad,decreaseHandler,addToCartHandler,isRemoved,setIsremoved}:Props) => {
    return (
        <div
                  className={`
                  ${isLoading || isCheckOutLoad ? "opacity-50" : ""}
                    flex gap-x-1`}
                >
                  <button
                    disabled={isCheckOutLoad || isLoading}
                    onClick={decreaseHandler}
                  >
                    <AiFillMinusCircle className="text-base" />
                  </button>
                  <button
                    disabled={isCheckOutLoad || isLoading}
                    onClick={addToCartHandler}
                  >
                    <AiFillPlusCircle className="text-base" />
                  </button>

                  <button
                    disabled={isCheckOutLoad || isLoading}
                    className={`${
                      isRemoved ? "bg-white" : ""
                    } absolute sm:right-[50px] right-[25px] self-center`}
                    onClick={() => setIsremoved(true)}
                  >
                    <FaRegTrashAlt className="text-red-500" />
                  </button>
                </div>
    );
};

export default CalculatProductBtn;
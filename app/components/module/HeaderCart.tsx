import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import Cart from './Cart';
import { useCartStore, useDrawCart } from '@/app/store';

const HeaderCart = () => {
    const cartStore = useCartStore((state) => state.cart);
    const isOpen = useDrawCart((state) => state.isOpen);
    const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
    const totalQuantity = cartStore.reduce((acc, cur) => acc + cur.quantity, 0);
    return (
        <div className="mt-2">
        <button className="relative" onClick={isToggleHandler}>
          <AiOutlineShopping
            className={"w-[26px] h-7 z-10 text-slate-700 "}
          />

          {totalQuantity > 0 && (
            <div className="absolute bottom-[15px] left-[15px] w-[22px] h-[22px]   text-sm rounded-full   bg-gradient-to-tr from-green-500 to-blue-500 text-white ">
              <span className="mt-[1px]"> {totalQuantity}</span>
            </div>
          )}
        </button>
        <AnimatePresence>
          {isOpen && <Cart totalQuantity={totalQuantity} />}
        </AnimatePresence>
      </div>
    );
};

export default HeaderCart;
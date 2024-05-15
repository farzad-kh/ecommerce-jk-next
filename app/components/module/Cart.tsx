"use client";
import { AnimatePresence, domAnimation, LazyMotion, motion } from "framer-motion";
import { useCartStore, useDrawCart } from "@/app/store";
import { IoMdClose } from "react-icons/io";
import CartProduct from "../template/CartProduct";
import { useEffect } from "react";

import { FaBoxOpen } from "react-icons/fa";
import CheckOutCart from "./CheckOutCart";
interface Props {
  totalQuantity?: number | undefined;
}
const Cart = ({ totalQuantity }: Props) => {
  const drawer = {
    hidden: {
      x: "100%",

      transition: {
        duration: 0.35,
      },
    },

    show: {
      x: "0",

      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 50,
      },
    },
  };
  const cartStore = useCartStore((state) => state.cart);
  const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
  const isCloseHandler = useDrawCart((state) => state.isCloseHandler);
  const isOpen = useDrawCart((state) => state.isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    if (!isOpen) {
      setTimeout(() => {
        document.body.style.overflow = "unset";
        document.body.style.touchAction = "unset";
      }, 500);
    }
  }, [isOpen]);
  return (
    <>
      <LazyMotion features={domAnimation}>
        <motion.div
          exit={drawer.hidden}
          animate={isOpen ? drawer.show : drawer.hidden}
          initial={drawer.hidden}
          variants={drawer}
          className={`h-[100vh] overflow-hidden  fixed bg-slate-50  right-0 top-0 z-[90]   sm:w-[430px] w-full transition-width  max-sm:!duration-[0.45s]  `}
        >
          <motion.section
            layout
            className=" h-full overflow-clip  z-[80] block"
          >
            <div className="w-full flex justify-between pb-4 overflow-hidden sticky">
              <span
                className="hover:bg-[rgba(0,0,0,.1)] z-[99]  top-0 flex w-fit ml-[6px] mt-2  relative rounded-full  p-2 transition-all cursor-pointer"
                onClick={isToggleHandler}
              >
                <IoMdClose className="  text-xl  " />
              </span>
              {totalQuantity! > 0 ? (
                <div className="mb-5 fixed flex gap-x-1 mt-6 self-center w-full justify-center">
                  <p className="text-cyan-700">BASKET</p>[{totalQuantity} ITEMS]
                </div>
              ) : (
                ""
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              layout
              className="p-4 h-full overflow-y-auto overflow-x-hidden  pb-5    "
            >
              {cartStore.length > 0 ? (
                <div className="flex flex-col pb-5">
                  <div className="w-full sm:h-[67vh] h-[55vh] overflow-y-auto scroll-thin ">
                    <AnimatePresence>
                      {cartStore.map((product) => (
                        <CartProduct
                          key={product.id + product.size}
                          id={product.id}
                          name={product.name}
                          image={product.image}
                          quantity={product.quantity}
                          size={product.size}
                          unit_amount={product.unit_amount}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="h-[192px] min-h-[20vh] pb-6">
                    <CheckOutCart />
                  </div>
                </div>
              ) : (
                <div className="h-full items-center justify-center flex gap-y-4 flex-col">
                  <motion.div
                    initial={{ opacity: 1, rotate: -25, y: -20 }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.12 },
                    }}
                  >
                    <FaBoxOpen className="w-36 h-36 fill-slate-700" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.1 },
                    }}
                    className="text-2xl font-semibold uppercase "
                  >
                    Your basket is empty
                  </motion.p>
                </div>
              )}
            </motion.div>
          </motion.section>
        </motion.div>
        <motion.div
          onClick={isCloseHandler}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          initial={{ opacity: 0 }}
          className="fixed h-[100svh] overflow-y-hidden w-full  right-0 overflow-hidden left-0 top-0 bg-[rgba(0,0,0,.2)] backdrop-blur-[0.7px] z-40"
        ></motion.div>
      </LazyMotion>
    </>
  );
};

export default Cart;

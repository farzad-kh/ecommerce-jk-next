// "use client";
// import React, { useState } from "react";

// import { useCartStore, useCheckOut, useDrawCart } from "@/app/store";
// import { Button, Spinner } from "@nextui-org/react";

// import toast from "react-hot-toast";

// import { MdError } from "react-icons/md";
// import { TfiRulerAlt } from "react-icons/tfi";
// // import LoadingRow from "./loading/LoadingRow";
// interface Props {
//   id: string;
//   name: string;
//   image?: string | undefined;
//   unit_amount?: number | null | undefined;
//   quantity: number;
//   size: string;
// }
// const AddToCartBtn = ({
//   id,
//   name,
//   image,
//   unit_amount,
//   quantity,
//   size,
// }: Props) => {
//   const addToProduct = useCartStore((state) => state.addToProduct);
//   const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
//   const [isLoading, setIsLoading] = useState(false);
//   const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);
//   const errorIsLogin = <MdError style={{ fill: "white", fontSize: "18px" }} />;
//   const errorSize = <TfiRulerAlt style={{ fill: "white", fontSize: "18px" }} />;

//   const addToCartHandler = () => {
//     if (!size) {
//       toast("Please choose a size. ", {
//         style: {
//           border: "2px solid #fff",
//           color: "#fff",
//           background: "#e46a6a",
//           boxShadow: "0 0 20px #ddd",
//         },
//         icon: errorSize,
//       });
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       addToProduct({ id, name, image, unit_amount, quantity, size });
//       isToggleHandler();
//       setIsLoading(false);
//     }, 1000);
//   };

//   return (
//     <Button
//       onClick={addToCartHandler}
//       disabled={isLoading || isCheckOutLoad}
//       size="md"
//       className={` ${
//         isCheckOutLoad && "!opacity-70"
//       }  sm:w-[280px] w-full mr-2  bg-gradient-to-tr h-[44px] text-base  from-green-500 to-blue-500 text-white shadow-lg  rounded-sm font-semibold `}
//     >
//       {isLoading ? <Spinner color="white" size="md" /> : "Add to cart"}
//     </Button>
//   );
// };

// export default AddToCartBtn;

"use client";
import React, { useState } from "react";
import { useCartStore, useCheckOut, useDrawCart } from "@/app/store";
import { Button, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { TfiRulerAlt } from "react-icons/tfi";
import { AiOutlineShopping } from "react-icons/ai";
// import LoadingRow from "./loading/LoadingRow";
interface Props {
  id: string;
  name: string;
  image?: string | undefined;
  unit_amount?: number | null | undefined;
  quantity: number;
  size: string;
}
const AddToCartBtn = ({
  id,
  name,
  image,
  unit_amount,
  quantity,
  size,
}: Props) => {
  const addToProduct = useCartStore((state) => state.addToProduct);
  const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
  const [isLoading, setIsLoading] = useState(false);
  const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);

  const errorSize = <TfiRulerAlt style={{ fill: "white", fontSize: "18px" }} />;

  const addToCartHandler = () => {
    if (!size) {
      toast("Please choose a size. ", {
        style: {
          border: "2px solid #fff",
          color: "#fff",
          background: "#e46a6a",
          boxShadow: "0 0 20px #ddd",
        },
        icon: errorSize,
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      addToProduct({ id, name, image, unit_amount, quantity, size });
      isToggleHandler();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Button
      onClick={addToCartHandler}
      disabled={isLoading || isCheckOutLoad}
      size="md"
      className={` ${
        isCheckOutLoad && "!opacity-70"
      }  sm:w-[280px] z transition-all w-full mr-2 group  bg-gradient-to-tr h-[44px] text-base bg-slate-800 text-white shadow-lg overflow-visible  rounded-sm font-semibold relative add-btn`}
    >
      {isLoading ? (
        <Spinner color="white" size="md" />
      ) : (
        <div className="transition-all flex justify-center w-fit items-center text-center group pointer-events-none">
          <div className="relative -translate-y-8 group-hover:translate-y-0 transition-all group-hover:mr-[4px] mr-[-4px] ">
            <AiOutlineShopping className={`w-[26px]  h-7 z-10 text-white   `} />
          </div>
          <p className="mr-[18px] group-hover:mr-[4px] transition-all">
            {" "}
            Add to cart
          </p>
        </div>
      )}
    </Button>
  );
};

export default AddToCartBtn;

// "use client";
// import React, { useState } from "react";

// import { useCartStore, useCheckOut, useDrawCart } from "@/app/store";
// import { Button, Spinner } from "@nextui-org/react";

// import toast from "react-hot-toast";
// import { AnimatePresence, delay, motion } from "framer-motion";
// import { MdError } from "react-icons/md";
// import { TfiRulerAlt } from "react-icons/tfi";
// import { AiOutlineShopping } from "react-icons/ai";
// // import LoadingRow from "./loading/LoadingRow";
// interface Props {
//   id: string;
//   name: string;
//   image?: string | undefined;
//   unit_amount?: number | null | undefined;
//   quantity: number;
//   size: string;
// }
// const AddToCartBtn = ({
//   id,
//   name,
//   image,
//   unit_amount,
//   quantity,
//   size,
// }: Props) => {
//   const addToProduct = useCartStore((state) => state.addToProduct);
//   const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
//   const [isLoading, setIsLoading] = useState(false);
//   const isCheckOutLoad = useCheckOut((state) => state.isCheckOutLoad);
//   const errorIsLogin = <MdError style={{ fill: "white", fontSize: "18px" }} />;
//   const errorSize = <TfiRulerAlt style={{ fill: "white", fontSize: "18px" }} />;

//   const addToCartHandler = () => {
//     if (!size) {
//       toast("Please choose a size. ", {
//         style: {
//           border: "2px solid #fff",
//           color: "#fff",
//           background: "#e46a6a",
//           boxShadow: "0 0 20px #ddd",
//         },
//         icon: errorSize,
//       });
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       addToProduct({ id, name, image, unit_amount, quantity, size });
//       isToggleHandler();
//       setIsLoading(false);
//     }, 1000);
//   };

//   const imageHover = {
//     hidden: {
//       opacity: 0,
//       y: -40,
//       transition: {
//         duration: 0.3,
//       },
//     },

//     show: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//       },
//     },
//   };
//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     // <Button
//     //   onClick={addToCartHandler}
//     //   disabled={isLoading || isCheckOutLoad}
//     //   size="md"
//     //   className={` ${
//     //     isCheckOutLoad && "!opacity-70"
//     //   }  sm:w-[280px] w-full mr-2  bg-gradient-to-tr h-[44px] text-base  from-green-500 to-blue-500 text-white shadow-lg  rounded-sm font-semibold `}
//     // >
//     //   {isLoading ? <Spinner color="white" size="md" /> : "Add to cart"}
//     // </Button>
//     <Button
//       onMouseEnter={() => {
//         setIsHovered(true);
//       }}
//       onMouseLeave={() => setIsHovered(false)}
//       onClick={addToCartHandler}
//       disabled={isLoading || isCheckOutLoad}
//       size="md"
//       className={` ${
//         isCheckOutLoad && "!opacity-70"
//       }  sm:w-[280px]   w-full mr-2    bg-gradient-to-tr h-[44px] text-base bg-slate-800 text-white shadow-lg overflow-auto z-auto  rounded-sm font-semibold relative add-btn `}
//     >
//       <AnimatePresence>
//         {isHovered && (
//           <motion.div
//             variants={imageHover}
//             exit={imageHover.hidden}
//             initial={imageHover.hidden}
//             animate={isHovered ? imageHover.show : imageHover.hidden}
//           >
//             <AiOutlineShopping
//               className={` ${isHovered ?"w-[26px] relative ":"w-0"}  h-7 z-10 text-white     `}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//       {isLoading ? (
//         <Spinner color="white" size="md" />
//       ) : (
//         <div className=" transition-all ">Add to cart</div>
//       )}
//     </Button>
//   );
// };

// export default AddToCartBtn;

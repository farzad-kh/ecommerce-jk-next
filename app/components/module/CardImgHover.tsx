import React, { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
const CardImgHover = ({ images, favorite }: {} | any | string | boolean) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imgLoad, setImgLoad] = useState(false);
  const imageHover = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },

    show: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
 

  return (
    <>
      {favorite ? (
        <motion.div className="w-full h-full">
          <motion.img
            alt="Card example background"
            className={` first:only:  z-0 w-full h-full  object-cover img aspect-[10.5/16] obg-p absolute ${
              imgLoad ? "" : "bg-loader"
            }`}
            src={images}
          />
        </motion.div>
      ) : (
        <motion.div
          className="w-full h-full"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.img
                variants={imageHover}
                animate={isHovered ? imageHover.show : imageHover.hidden}
                initial={imageHover.hidden}
                exit={{ opacity: 0 }}
                alt="Card example background"
                className={` first:only:  z-0 w-full h-full  object-cover img aspect-[10.5/16] obg-p absolute ${
                  imgLoad ? "" : "bg-loader"
                }`}
                src={images[1]}
              />
            )}
          </AnimatePresence>
          <motion.img
            variants={imageHover}
            animate={isHovered ? imageHover.hidden : imageHover.show}
            initial={imageHover.hidden}
            exit={{ opacity: 0 }}
            alt="Card example background"
            className={`    z-0 w-full h-full   object-cover img aspect-[10.5/16] obg-p absolute ${
              imgLoad ? "" : "bg-loader"
            }`}
            src={images[0]}
          />
        </motion.div>
      )}
    </>
  );
};

export default CardImgHover;

// import React, { useState } from "react";
// import { Image } from "@nextui-org/react";
// import { AnimatePresence, motion } from "framer-motion";
// const CardImgHover = ({ images }: {} | any | string) => {
//   const [isHovered, setIsHovered] = useState<boolean>(false);

//   return (

//       <div className="transition-all hover-switch"

//       >
//         <img

//           alt="Card example background"
//           className="z-0 w-full h-full -translate-y-6 object-cover img aspect-[10.5/16] obg-p"
//           src={images[0]}
//         />
//         <img

//           alt="Card example background"
//           className="z-0 w-full h-full -translate-y-6 object-cover img aspect-[10.5/16] obg-p"
//           src={images[1]}
//         />
//       </div>

//   );
// };

// export default CardImgHover;

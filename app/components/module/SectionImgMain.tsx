"use client";
import React, { useRef, useState } from "react";
import LogoSw from "../../../public/jeans-us-dayz22-focus-row5-box2-en-us.jpg";
import LogoNw from "../../../public/outer-us-dayz22-focus-row5-box1-en-us.jpg";
import LogoSh from "../../../public/shirts-us-dayz22-focus-row6-box2-en-us.jpg";
import LogoPa from "../../../public/pants-us-dayz22-focus-row6-box1-en-us.jpg";
import { motion } from "framer-motion";
import { sideBanerMotion } from "@/util/PriceUsFormat";
import { useRouter } from "next/navigation";
import VideoPlayer from "./VideoPlayer";

const banerImg = [
  { id: 1, image: LogoSw.src, url: "/jeans" },
  { id: 2, image: LogoNw.src, url: "/sweatshirts" },
  { id: 3, image: LogoPa.src, url: "/trousers" },
  { id: 4, image: LogoSh.src, url: "/tshirt" },
];

const SectionImgMain = () => {
  const [a, setA] = useState(true);
  setTimeout(() => setA(false), 500);
  const route = useRouter();


  return (
    <div className={`${a ? "hidden" : "block"}`}>
 
<VideoPlayer/>
      <div className="grid sm:grid-cols-2 grid-cols-1 grid-rows-2 sm:gap-4 gap-2">
        {banerImg.map((item, i) => (
          <motion.div
            key={i}
            variants={sideBanerMotion(i)}
            initial={sideBanerMotion(i).hidden}
            whileInView={sideBanerMotion(i).show}
            viewport={{ once: true }}
            className="w-full h-full rounded overflow-hidden"
          >
            <motion.img
              onClick={() => route.push(item.url)}
              className="w-full h-full object-cover cursor-pointer transition-all hover:scale-[1.02] bg-loader  "
              src={item.image}
              alt={`Image ${item.id}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionImgMain;

"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
interface Props {
  images: string[];
  thumbsSwiper: any | null;
}
const SliderThumbs = ({ images, thumbsSwiper }: Props) => {

  return (
    <Swiper
      spaceBetween={2}
      navigation={true}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
      className="mySwiper2 w-full"
    >
      {images.map((img, i) => (
        <SwiperSlide className="" key={i}>
          <Zoom>
            <div className={`aspect-[7.5/10] bg-[#dfdfe2] `}>
              <img alt={img} src={img} />
            </div>
          </Zoom>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderThumbs;

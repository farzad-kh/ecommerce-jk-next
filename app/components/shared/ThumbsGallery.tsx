"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
interface Props {
  images: string[];
  setThumbsSwiper: any | null;
}
const ThumbsGallery = ({ setThumbsSwiper, images }: Props) => {
  // const img=images.map(i=> i.split("=webp&width=220&quality=80&key=21-0-3"))
  const imgFormat = images.map(
    (item) => item.split("=webp&width=1280&quality=90&key=25-0-3")[0]
  );
  const [imgLoader, setImgLoader] = useState(true);
  return (
    <div className="overflow-hidden block  hh">
      <Swiper
        onSwiper={setThumbsSwiper as any}
        direction="horizontal"
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        mousewheel={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper !pb-1"
        breakpoints={{
          1500: {
            slidesPerView: 5,
          },
          1300: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4,
          },
          767: {
            slidesPerView: 4,
          },

          680: {
            slidesPerView: 5,
          },
          500: {
            slidesPerView: 5,
          },

          350: {
            slidesPerView: 4,
          },
        }}
      >
        {imgFormat.map((img, i) => (
          <div key={i + 50} className="overflow-hidden  ">
            <SwiperSlide key={img}>
              <img
              alt={img}
                onLoad={() => setImgLoader(false)}
                className={`max-h-[150px] aspect-[10/13.3] w-full rounded-lg cursor-pointer text-transparent ${
                  imgLoader ? "bg-loader " : ""
                }`}
                src={`${img}=webp&width=220&quality=80&key=21-0-3`}
              />
            </SwiperSlide>
          </div>
        ))}
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ThumbsGallery;

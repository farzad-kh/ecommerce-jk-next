"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

 

// import required modules
import { Pagination } from 'swiper/modules';
import ProductCard from '../module/ProductCard';
import { Product } from '../template/ProductCardContainer';
 interface Props{
    productsData:Product[]
 }

const SliderBreakPoint = ({productsData}:Props) => {
    return (
        
            <>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          '@0.60': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >


         {productsData.map(item=>  
              <SwiperSlide>
                <ProductCard key={item.id} products={item} />
              </SwiperSlide>
            )}
      
           
      </Swiper>
    </>  
       
    );
};

export default SliderBreakPoint;
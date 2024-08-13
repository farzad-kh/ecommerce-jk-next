"use client";
import React, { useState } from "react";
import SliderThumbs from "../module/SliderThumbs";
import ThumbsGallery from "../shared/ThumbsGallery";

interface Props {
  metadata: {};
}

const SliderContainer = ({ metadata }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const filterImage = Object.values(
    metadata as { [key: string]: string }
  ).filter((item) => item?.includes("image"));

  return (
    <div className=" md:sticky  relative md:overflow-y-hidden overflow-auto md:top-[55px] top-[0]   md:flex-[0.45] flex-[0.8]  flex-wrap justify-center md:self-baseline self-center grid   gap-x-4  max-md:p-7 max-sm:p-4  gap-y-3   ">
      <div className=" rounded-md block overflow-hidden max-h-[700px] w-full">
        {metadata && (
          <SliderThumbs
            thumbsSwiper={thumbsSwiper}
            images={Object.values(filterImage)}
          />
        )}
      </div>
      <div className="block overflow-hidden mb-3 ">
        {metadata && (
          <ThumbsGallery
            setThumbsSwiper={setThumbsSwiper}
            images={Object.values(filterImage)}
          />
        )}
      </div>
    </div>
  );
};

export default SliderContainer;

// "use client"
// import React, { useState } from 'react';
// import SliderThumbs from '../module/SliderThumbs';
// import ThumbsGallery from '../shared/ThumbsGallery';

// const SliderContainer = ({product}:any) => {
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     return (
//         <div className="md:flex-[0.6] flex-[1]  flex-wrap justify-center md:self-baseline self-center grid transition-all    gap-x-4  ">
//        <div className='w-full md:flex block'>

//        </div>

//         <div className=" rounded-md block overflow-hidden max-h-[700px] xl:w-[600px] lg:w-[500px]    sm:w-[440px] max-sm:w-[360px]  flex gap-y-2">

//         {product.metadata &&
//           <ThumbsGallery setThumbsSwiper={setThumbsSwiper} images={Object.values(product.metadata)} />
//         }
//            {product.metadata && (
//             <SliderThumbs thumbsSwiper={thumbsSwiper} images={Object.values(product.metadata)} />
//           )}
//            <div className="block overflow-hidden mb-3 ">

//         </div>

//         </div>
//       </div>
//     );
// };

// export default SliderContainer;

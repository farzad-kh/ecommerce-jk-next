"use client";
import React, {useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import LikeIcon from "../shared/LikeIcon";

import { motion } from "framer-motion";
import { AiOutlineUser } from "react-icons/ai";
import DislikeFavoriteBtn from "./DislikeFavoriteBtn";
import fetchFavoritList from "@/app/hooks/FavoritList";
import {useQuery } from "@tanstack/react-query";
import useAddFavorite from "@/app/hooks/useAddFavorite";
export interface FavoriteProps {
  productId?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  unit_amount?: number | undefined | null;
  productInfo?: boolean;
}

export interface SessionUser {
  id?: string;
}

const FavoriteBtn = ({
  productId,
  name,
  image,
  unit_amount,
  productInfo,
}: FavoriteProps) => {
  // const { data: session } = useSession();
 
  const [isLoad, setIsLoad] = useState(false);

  let isLiked: FavoriteProps | undefined;
  const [optimisticLike, setOptimisticLike] = useState(false);
  // const icon = <AiOutlineUser style={{ fill: "white", fontSize: "18px" }} />;

  const { data, refetch } = useQuery<FavoriteProps[]>({
    queryKey: ["favoriteList"],
    queryFn: fetchFavoritList,
    staleTime: 60 * 60 * 1000,
    retry: 2,
  });

  const addFavoriteMutation = useAddFavorite({
    productId,
    name,
    image,
    unit_amount,
    setOptimisticLike,
  });

  // const favoriteHandler = async () => {
  //   if (!session) {
  //     toast("Please login to your account", {
  //       style: {
  //         border: "2px solid #fff",
  //         color: "#fff",
  //         background: "#e46a6a",
  //         boxShadow: "0 0 20px #ddd",
  //       },
  //       icon,
  //     });
  //     return;
  //   }
  //   setOptimisticLike(true);
  //   try {
  //     const res = await fetch("/api/favorite", {
  //       method: "POST",
  //       headers: { "Content-type": "application/json" },
  //       body: JSON.stringify({
  //         productId,
  //         name,
  //         image,
  //         unit_amount,
  //       }),
  //     });

  //     if (res.ok === false) {
  //       setOptimisticLike(false);
  //       return;
  //     }

  //     await refetch();
  //   } catch (error) {
  //     console.log(error);

  //     setOptimisticLike(false);
  //     setIsLoad(false);
  //   }
  // };

  // useEffect(() => {}, [data]);

  isLiked = data && data?.find((item) => item?.productId === productId);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={` ${
          productInfo &&
          "flex items-center self-center w-[44px] h-[44px] z-10 !relative hover:bg-[rgba(0,0,0,.1)]    border-1 border-black  rounded-sm "
        }`}
      >
        {isLiked || optimisticLike ? (
          <DislikeFavoriteBtn
            optimisticLike={optimisticLike}
            setOptimisticLike={setOptimisticLike}
            isLoad={isLoad}
            setIsLoad={setIsLoad}
            productId={productId}
            productInfo={productInfo}
            fetchData={refetch}
          />
        ) : (
          <button
            disabled={isLoad}
            className={` ${
              productInfo
                ? "w-[44px] h-[44px]"
                : "z-10 !relative top-[3px] right-[-3px] w-[40px] h-[45px]"
            }`}
            onClick={() => addFavoriteMutation.mutate()}
          >
            <LikeIcon productInfo={productInfo} />
          </button>
        )}
      </motion.div>
    </>
  );
};

export default FavoriteBtn;




// "use client";
// import React, { useCallback, useEffect, useState } from "react";

// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";
// import LikeIcon from "../shared/LikeIcon";

// import { motion } from "framer-motion";
// import { AiOutlineUser } from "react-icons/ai";
// import DislikeFavoriteBtn from "./DislikeFavoriteBtn";
// import fetchFavoritList from "@/app/hooks/FavoritList";
// interface Props {
//   productId?: string | undefined;
//   name?: string | undefined;
//   image?: string | undefined;
//   unit_amount?: number | undefined | null;
//   productInfo?: boolean;
// }

// export interface SessionUser {
//   id?: string;
// }

// const FavoriteBtn = ({
//   productId,
//   name,
//   image,
//   unit_amount,
//   productInfo,
// }: Props) => {
//   const { data: session } = useSession();

//   const [favoriteList, setFavoriteList] = useState<Props[]>([]);
//   const [isLoad, setIsLoad] = useState(true);

//   let isLiked: Props | undefined;
//   const [optimisticLike, setOptimisticLike] = useState(!!isLiked);
//   const icon = <AiOutlineUser style={{ fill: "white", fontSize: "18px" }} />;

//   const fetchData = async () => {
//     try {
//       setFavoriteList(await fetchFavoritList());
//       setIsLoad(false);
//     } catch (error) {
//       console.error("Error in fetchData:", error);
//     }
//   };

//   const favoriteHandler = async () => {
//     if (!session) {
//       toast("Please login to your account", {
//         style: {
//           border: "2px solid #fff",
//           color: "#fff",
//           background: "#e46a6a",
//           boxShadow: "0 0 20px #ddd",
//         },
//         icon,
//       });
//       return;
//     }
//     setOptimisticLike(true);
//     try {
//       const res = await fetch("/api/favorite", {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//           productId,
//           name,
//           image,
//           unit_amount,
//         }),
//       });

//       fetchData();
//     } catch (error) {
//       console.error("Error in favoriteHandler:", error);
//       setOptimisticLike(false);
//       setIsLoad(false);
//     }
//   };

//   useEffect(() => {
//     setTimeout(() => setIsLoad(false), 500);
//     if (session) {
//       fetchData();
//     } else {
//       setIsLoad(false);
//     }
//   }, []);

//   isLiked =
//     favoriteList && favoriteList?.find((item) => item?.productId === productId);

//   return (
//     <>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//         className={` ${
//           productInfo &&
//           "flex items-center self-center w-[44px] h-[44px] z-10 !relative hover:bg-[rgba(0,0,0,.1)]    border-1 border-black  rounded-sm "
//         }`}
//       >
//         {isLiked || optimisticLike ? (
//           <DislikeFavoriteBtn
//             optimisticLike={optimisticLike}
//             setOptimisticLike={setOptimisticLike}
//             isLoad={isLoad}
//             setIsLoad={setIsLoad}
//             productId={productId}
//             productInfo={productInfo}
//             fetchData={fetchData}
//           />
//         ) : (
//           <button
//             disabled={isLoad}
//             className={` ${
//               productInfo
//                 ? ":w-[44px] h-[44px]"
//                 : "z-10 !relative top-[3px] right-[-3px] w-[40px] h-[45px]"
//             }`}
//             onClick={favoriteHandler}
//           >
//             <LikeIcon productInfo={productInfo} />
//           </button>
//         )}
//       </motion.div>
//     </>
//   );
// };

// export default FavoriteBtn;

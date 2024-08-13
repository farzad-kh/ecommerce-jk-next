
"use client";
import React,{memo} from "react";
import LikeIcon from "../shared/LikeIcon";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import { SessionUser } from "./FavoriteBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  optimisticLike: boolean;
  setOptimisticLike: React.Dispatch<React.SetStateAction<boolean>>;
  isLoad: boolean;
  setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
  productId?: string;
  productInfo?: boolean;
  fetchData: () => void;
}
const DislikeFavoriteBtn = ({
  optimisticLike,
  setOptimisticLike,
  isLoad,
  setIsLoad,
  productId,
  productInfo,
  fetchData,
}: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const queryClient = useQueryClient();
  // const dislikeHandler = useMutation({
  //   mutationFn: async () => {
  //     const data = {
  //       userId: (session?.user as SessionUser)?.id ?? null,
  //       productId,
  //     };
  //     return await axios.delete("/api/favorite", { data });
  //   },
  //   onMutate: () => {
  //     setIsLoad(true);
  //     setOptimisticLike(false);
  //   },
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries refetch the data base on queryKey

  //     if (pathName === "/wishlist") router.refresh();
  //     queryClient.invalidateQueries({
  //       queryKey: ["favoriteList"],
  //     });
  //   },
  //   onError: () => {
  //      setOptimisticLike(true);
  //       setIsLoad(false);
  //     return;
  //   },
  // });


  const dislikeHandler = async () => {
    setTimeout(() => setOptimisticLike(false), 300);
    setIsLoad(true)
    try {
       const data = {
        userId: (session?.user as SessionUser)?.id ?? null,
        productId,
      };
      await axios.delete("/api/favorite", { data });
      // const res = await fetch("/api/favorite", {
      //   method: "DELETE",
      //   headers: { "Content-type": "application/json" },
      //   body: JSON.stringify({
      //     userId: (session?.user as SessionUser)?.id ?? null,
      //     productId,
      //   }),
      // });
      if (pathName === "/wishlist") router.refresh();
      await fetchData();
      setIsLoad(false)
    } catch (error) {
      console.error("Error in dislikeHandler:", error);
      setOptimisticLike(true);
      setIsLoad(false);
    }
  };

  return (
    <button
      disabled={isLoad}
      className={` ${
        productInfo
          ? "w-[44px] h-[44px]"
          : "z-10 !relative top-[3px] right-[-3px] w-[40px] h-[45px]"
      }`}
      onClick={dislikeHandler}
    >
      {isLoad ? (
        <div
          className={`${productInfo ? "loaderLike !ml-[10px]" : "loaderLike"} `}
        ></div>
      ) : (
        <LikeIcon like productInfo={productInfo} />
      )}
    </button>
  );
};

export default memo(DislikeFavoriteBtn)









// "use client";
// import React from "react";
// import LikeIcon from "../shared/LikeIcon";
// import { usePathname, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import toast from "react-hot-toast";

// import { SessionUser } from "./FavoriteBtn";
// interface Props {
//   optimisticLike:boolean
//   setOptimisticLike: React.Dispatch<React.SetStateAction<boolean>>;
//   isLoad: boolean;
//   setIsLoad: React.Dispatch<React.SetStateAction<boolean>>;
//   productId?: string;
//   productInfo?: boolean;
//   fetchData: () => void;
// }
// const DislikeFavoriteBtn = ({
//   optimisticLike,
//   setOptimisticLike,
//   isLoad,
//   setIsLoad,
//   productId,
//   productInfo,
//   fetchData,
// }: Props) => {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const pathName = usePathname();
//   const dislikeHandler = async () => {
//     setTimeout(()=>setOptimisticLike(false),300)
//     try {
//       setIsLoad(true);
//       const res = await fetch("/api/favorite", {
//         method: "DELETE",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//           userId: (session?.user as SessionUser)?.id ?? null,
//           productId,
//         }),
//       });

//       fetchData();

//       if (pathName === "/wishlist") router.refresh();
//     } catch (error) {
//       console.error("Error in dislikeHandler:", error);
//       setOptimisticLike(true)
//       setIsLoad(false);
//     }
//   };

//   return (
//     <button
//       disabled={isLoad}
//       className={` ${
//         productInfo
//           ? ":w-[44px] h-[44px]"
//           : "z-10 !relative top-[3px] right-[-3px] w-[40px] h-[45px]"
//       }`}
//       onClick={dislikeHandler}
//     >
//       {isLoad ? (
//         <div
//           className={`${productInfo ? "loaderLike !ml-[10px]" : "loaderLike"} `}
//         ></div>
//       ) : (
//         <LikeIcon like productInfo={productInfo} />
//       )}
//     </button>
//   );
// };

// export default DislikeFavoriteBtn;

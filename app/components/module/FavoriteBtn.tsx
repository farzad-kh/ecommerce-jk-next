"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import LikeIcon from "../shared/LikeIcon";

import { motion } from "framer-motion";
import { AiOutlineUser } from "react-icons/ai";
interface Props {
  productId?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  unit_amount?: number | undefined | null;
  productInfo?: boolean;
}

interface SessionUser {
  id?: string;
}

const FavoriteBtn = ({
  productId,
  name,
  image,
  unit_amount,
  productInfo,
}: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [favoriteList, setFavoriteList] = useState<Props[]>([]);
  const [isLoad, setIsLoad] = useState(true);

  const icon = <AiOutlineUser style={{ fill: "white", fontSize: "18px" }} />;

  const fetchData = async () => {
    try {
      const res = await fetch("/api/favorite", { cache: "force-cache" });
      const newData = await res.json();
      setFavoriteList(newData);

      if (res.status === 200) {
        setIsLoad(false);
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };

  const favoriteHandler = async () => {
    if (!session) {
      toast("Please login to your account", {
        style: {
          border: "2px solid #fff",
          color: "#fff",
          background: "#e46a6a",
          boxShadow: "0 0 20px #ddd",
        },
        icon,
      });
      return;
    }

    try {
      setIsLoad(true);
      const res = await fetch("/api/favorite", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          productId,
          name,
          image,
          unit_amount,
        }),
      });

      if (res.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error("Error in favoriteHandler:", error);

      setIsLoad(false);
    }
  };

  const dislikeHandler = async () => {
    try {
      setIsLoad(true);
      const res = await fetch("/api/favorite", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userId: (session?.user as SessionUser)?.id ?? null,
          productId,
        }),
      });

      if (res.status === 201) {
        fetchData();

        router.refresh();
      }
    } catch (error) {
      console.error("Error in dislikeHandler:", error);

      setIsLoad(false);
    }
  };

  useEffect(() => {
    setTimeout(() => setIsLoad(false), 500);
    if (session) {
      fetchData();
    } else {
      setIsLoad(false);
    }
  }, [session]);

  let isLiked: Props | undefined;

  isLiked =
    favoriteList && favoriteList?.find((item) => item?.productId === productId);

  return (
    <>
      {productInfo ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center self-center w-[44px] h-[44px] z-10 !relative hover:bg-[rgba(0,0,0,.1)]    border-1 border-black  rounded-sm "
        >
          {isLiked ? (
            <button
              disabled={isLoad}
              className="w-[44px] h-[44px]"
              onClick={dislikeHandler}
            >
              {isLoad ? (
                <div className="loaderLike !ml-[10px]"></div>
              ) : (
                <LikeIcon like productInfo />
              )}
            </button>
          ) : (
            <button
              disabled={isLoad}
              className=" w-[44px] h-[44px]  "
              onClick={favoriteHandler}
            >
              {isLoad ? (
                <div className="loaderLike !ml-[10px] "></div>
              ) : (
                <LikeIcon productInfo />
              )}
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isLiked ? (
            <button
              disabled={isLoad}
              className="z-10 !relative top-[3px] right-[-3px] w-[40px] h-[45px]"
              onClick={dislikeHandler}
            >
              {isLoad ? <div className="loaderLike"></div> : <LikeIcon like />}
            </button>
          ) : (
            <button
              disabled={isLoad}
              className="z-10 !relative top-[3px] right-[-3px] w-[40px] h-[45px]"
              onClick={favoriteHandler}
            >
              {isLoad ? <div className="loaderLike"></div> : <LikeIcon />}
            </button>
          )}
        </motion.div>
      )}
    </>
  );
};

export default FavoriteBtn;

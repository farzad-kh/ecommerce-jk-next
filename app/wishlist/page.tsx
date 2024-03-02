import React from "react";
import ProductCardContainer from "../components/template/ProductCardContainer";
import prisma from "../../prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const favoritePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin") 
  const favoriteList = await prisma.favorite.findMany({
    // orderBy: {
    //   createdDate: "desc",
    // },
    where: { userId: session?.user?.id },
  });

  const modifiedDataList = favoriteList.map((item) => ({
    ...item,
    id: item.productId,
  }));

  return (
    <>
      {!modifiedDataList.length ? (
        <div className="h-[30svh] w-full flex items-center justify-center  font-semibold uppercase flex-col gap-1">
          <p className="uppercase text-2xl  ">Your wishlist is empty</p>
          <p className="text-sm text-slate-700">
            There are no products added to favorites
          </p>
        </div>
      ) : (
        <div>
          <div className="my-8 w-full flex justify-center font-semibold items-center">
            <p className="uppercase text-2xl  ">your Wishlist</p>
          </div>
          <ProductCardContainer productsData={modifiedDataList} favorite />
        </div>
      )}
    </>
  );
};

export default favoritePage;

//   const res = await fetch("http://localhost:3000/api/favorite");
//   const newData: FavoriteItem[] = await res.json();
//   console.log(newData);

// const modifiedDataList =   favoriteList.map(item => ({ ...item, id: item.productId }));
//  console.log(modifiedDataList);

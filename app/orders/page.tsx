import React from "react";
import prisma from "../../prisma/client";
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import OrdersContainer from "../components/template/OrdersContainer";
import Link from "next/link";
import { Metadata } from "next";
 
const page = async () => {
  const session = await getServerSession(authOptions);
 if (!session) redirect("/api/auth/signin") 
  const updateUser = await prisma.order.findMany({
    where: {
      userId: session?.user?.id,
      status: "success",
    },
    orderBy: {
      createdDate: "desc",
    },
    include: {
      products: true,
    },
  });

  const product = updateUser?.map((item) => item);

  return (
    <>
      {!session ? (
        <div className="h-[50svh] w-full flex items-center justify-center text-xl font-semibold uppercase">
          <div>
            you must{" "}
            <Link className="text-sky-500" href={"api/auth/signin"}>
              login
            </Link>{" "}
            to see your orders
          </div>
        </div>
      ) : product.length === 0 ? (
        <div className="h-[30svh] w-full flex items-center justify-center text-2xl font-semibold uppercase">
          <p> You haven't placed any orders.</p>
        </div>
      ) : (
        <OrdersContainer orders={product!} />
      )}
    </>
  );
};

export default page;

export const metadata: Metadata = {
  title:'JACK & JONES Orders',
  description:'High Quality Jeans'
}
 

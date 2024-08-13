import CheckOutContainer from "../components/template/CheckOutContainer";
// import prisma from "../../prisma/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import React from "react";
 
const CheckOut = () => {
   
 
  // const userProducts = await prisma.user.findUnique({
  //   where: { id: session.user.id },
  //   include: {
  //     order: {
  //       include: {
  //         products: true,
  //       },
  //     },
  //   },
  // });

  return<CheckOutContainer />
};

export default CheckOut;

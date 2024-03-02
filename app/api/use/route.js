
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
 import prisma from "../../../prisma/client"
import { json } from "stream/consumers";
import { authOptions } from "../auth/[...nextauth]/route";






export async function POST(req,res) {
  const session = await getServerSession(authOptions)

try{
const body= await req.json()
const {email}=body
 
  await prisma.$connect();
 
  // if (session?.user?.email !== null && session?.user?.email !== undefined) {
  await prisma.user.findUnique({
      where: {
      email,
       },
   });
   return NextResponse.json(
    { message: "آگهی جدید اضافه شد" },
    { status: 201 }
  );
 


        
   
  
}catch(err){
  console.log(err);
}



}
       







// //     import { NextResponse } from "next/server";
// // import { getServerSession } from "next-auth";
// // import { PrismaClient } from "@prisma/client";

// // export async function POST(req) {
// //   try {
// //     // const session = await getServerSession(req);

// //     const prisma = new PrismaClient();
// //     await prisma.$connect();


// //       const user = await prisma.user.findUnique({
// //         where: {
// //           email: "aminjani75@gmail.com",
// //         },
// //       });

// //       if (user) {
// //         return NextResponse.json(
// //           { message: "آگهی جدید اضافه شد" },
// //           { status: 201 }
// //         );
// //       } else {
// //         return NextResponse.json(
// //           { message: "کاربر با ایمیل مشخص یافت نشد" },
// //           { status: 404 }
// //         );
// //       }
   
// //   } catch (error) {
// //     console.error("Error:", error);
// //     // خطای سرور
// //     return NextResponse.json(
// //       { message: "Internal Server Error" },
// //       { status: 500 }
// //     );
// //   }
// // }


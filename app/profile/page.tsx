import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");
 

  return (
    <div className="flex justify-center items-center h-[50vh] p-5 sm:text-xl text-base flex-col gap-y-1 font-semibold text ">
      <Image
        className="rounded-full"
        alt="profile"
        width={60}
        height={60}
        src={session.user?.image!}
      />
      <div className="flex gap-1 ">
        <p>welcome</p>
        <h4 className="">{session.user?.name}</h4>
      </div>
      <p className="text-slate-600 ">{session.user?.email}</p>
    </div>
  );
};

export default page;
export const metadata: Metadata= {
    title:'JACK & JONES Profile',
    description:'High Quality Jeans'
  }
   
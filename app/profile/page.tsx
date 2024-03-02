import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from 'next/navigation';
const page = async () => {

    const session = await getServerSession(authOptions);
    if (!session) redirect("/api/auth/signin") 
    return (
        <>
           {!session?
        <div>you must login</div>   :
        <div> profile</div>
        }
        </>
    );
};

export default page;
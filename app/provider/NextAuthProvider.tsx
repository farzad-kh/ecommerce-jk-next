"use client";
import React from 'react';
import { SessionProvider } from 'next-auth/react';  
interface Props{
    children:any;

}

const NextAuthProvider = ({children}:Props) => {

  return (
    <SessionProvider >
      {children}

    </SessionProvider>
  );
};

export default NextAuthProvider;
import { Spinner, NavbarItem } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import DropdownItemUser from "./DropdownItem";

const AuthStatus = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return <Spinner size="md" />;
  return (
    <>
      {status === "authenticated" ? (
        <NavbarItem className="w-[32px] ml-2  ">
          <DropdownItemUser profileUser={session!.user} />
        </NavbarItem>
      ) : (
        <NavbarItem>
          <div
            className="text-[26px] cursor-pointer"
            onClick={() => signIn("google")}
          >
            <AiOutlineUser />
          </div>
        </NavbarItem>
      )}
    </>
  );
};

export default AuthStatus;

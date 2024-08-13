"use client";
import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { PiShoppingBagOpen } from "react-icons/pi";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
interface Profile {
  email?: string | null | undefined;
  name?: string | null | undefined;
  image?: string | null | undefined;
}

interface Props {
  profileUser?: Profile | undefined;
}
interface DropdownItem {
  id: number;
  title: string;
  href?: string;
  email?: string;
  icon?:  React.ReactNode
}

const DropdownItemUser = ({ profileUser }: Props) => {
  const router = useRouter();
  const dropdownitems: DropdownItem[] = [
    { id: 1, title: profileUser?.name!, email: profileUser?.email! },
    { id: 2, title: "My Profile", href: "/profile",icon:<AiOutlineUser className="text-base" /> },
    { id: 3, title: "Wishlists", href: "/wishlist" ,icon:<IoIosHeartEmpty className="text-base" />},
    { id: 4, title: "Orders", href: "/orders",icon:<PiShoppingBagOpen className="text-base" /> },
    { id: 5, title: "Log Out", href: "",icon:<MdOutlineLogout className="text-base" /> },
  ];

  const dropDownLinkHandler = (item: DropdownItem) => {
    if (item.title === "Wishlists" || item.title === "Orders") {
      router.push(item.href!);
      router.refresh();
    } else if (item.href === "") {
      signOut({ redirect: true, callbackUrl: "/" });
    } else {
      router.push(item.href!);
    }
  };
  return (
    <div className="flex items-center">
      <Dropdown placement="bottom-end">
        <DropdownTrigger className="h-[32px]">
          <Avatar
            size="sm"
            isBordered
            alt="avatar"
            as="button"
            className="transition-transform w-9 h-9"
            src={profileUser?.image ? profileUser?.image : ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          {dropdownitems.map((item) => (
            <DropdownItem
              className={`text-left flex  ${
                item.email ? "h-14 gap-2 border-b  mb-2" : ""
              }`}
              as={"button"}
              startContent={item?.icon}
              isDisabled={item.id === 1}
              onClick={() => dropDownLinkHandler(item)}
              key={item.title!}
              color={item?.title === "Log Out" ? "danger" : "default"}
            >
              
              {item.title}

              {item.email! ? (
                <p className="font-semibold">{profileUser?.email}</p>
              ) : (
                ""
              )}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownItemUser;

{
  /* <DropdownItem   className="text-left" as={"button"} onClick={()=>router.push("/profile")} key="profile">
My Profile
</DropdownItem>


<DropdownItem className="text-left" as={"button"} onClick={()=>{router.push("/wishlist");router.refresh()}} key="wishlist">
Wishlist
</DropdownItem>
<DropdownItem className="text-left" as={"button"} onClick={()=>{router.push("/orders");router.refresh()}} key="orders">
Orders
</DropdownItem>

<DropdownItem as={"button"} className="text-left" onClick={()=>router.push("/api/auth/signout")}  key="logout" color="danger">
LogOut
</DropdownItem> */
}

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
  href?: string | null;
  email?: string | null;
}

const DropdownItemUser = ({ profileUser }: Props) => {
  const router = useRouter();
  const dropdownitems: DropdownItem[] = [
    { id: 1, title: profileUser?.name!, href: null, email: profileUser?.email },
    { id: 2, title: "My Profile", href: "/profile", email: null },
    { id: 3, title: "Wishlist", href: "/wishlist", email: null },
    { id: 4, title: "Orders", href: "/orders", email: null },
    { id: 5, title: "LogOut", href: "/api/auth/signout", email: null },
  ];

  const dropDownLinkHandler = (item: DropdownItem) => {
    if (item.title === "Wishlist" || item.title === "Orders") {
      router.push(item.href!);
      router.refresh();
    } else {
      router.push(item.href!);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
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
              className={`text-left ${
                item.email ? "h-14 gap-2 border-b  mb-2" : ""
              }`}
              as={"button"}
              isDisabled={item?.email! !== null}
              onClick={() => dropDownLinkHandler(item)}
              key={item.title!}
              color={item?.title === "LogOut" ? "danger" : "default"}
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

"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  NavbarMenuToggle,
} from "@nextui-org/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../../public/Jack-Jones.png";
import Image from "next/image";
import AuthStatus from "../module/AuthStatus";
import HeaderCart from "../module/HeaderCart";
import ResponsiveNav from "../module/ResponsiveNav";
import NavbarSearch from "../module/NavbarSearch";
const Header = () => {
  const pathname = usePathname();
  const navLinks: { id: number; href: string; title: string }[] = [
    { id: 1, href: "/sweatshirts", title: "Sweatshirts" },
    { id: 2, href: "/jeans", title: "Jeans" },
    { id: 3, href: "/tshirts", title: "T-shirts" },
    { id: 4, href: "/trousers", title: "Trousers" },
    { id: 5, href: "/new", title: "New" },
  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="#f3f4f5 mb-6"
      maxWidth="full"
    >
      <div className="flex items-center w-full max-w-[1920px] ">
        <NavbarBrand className="mr-5">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={!isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden h-[26px] px-2"
            />
            <Link href={"/"} className="font-bold text-inherit w-full ">
              <Image
                className="jack-logo"
                width={180}
                height={150}
                alt="jc"
                src={Logo}
              />
            </Link>
          </NavbarContent>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex gap-3 " justify="center">
          {navLinks.map((item) => (
            <NavbarItem key={item.id}>
              <Link
                className={` hover:text-blue-600 ${
                  pathname === item.href && "text-blue-600 font-semibold"
                }`}
                href={item.href}
              >
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent
          className={`gap-[0.7rem] transition-all  lg:ml-0 md:ml-10 ml-0 `}
          as="div"
          justify="end"
        >
          <NavbarSearch
            setActiveSearch={setActiveSearch}
            activeSearch={activeSearch}
          />

          <HeaderCart />
          <AuthStatus />
        </NavbarContent>

        <ResponsiveNav
          setActiveSearch={setActiveSearch}
          setIsMenuOpen={setIsMenuOpen}
          isMenuOpen={isMenuOpen}
          navLinks={navLinks}
        />
      </div>
    </Navbar>
  );
};

export default Header;

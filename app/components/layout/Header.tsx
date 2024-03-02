"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import DropdownItemUser from "../module/DropdownItem";
import Cart from "../module/Cart";
import { AiOutlineUser } from "react-icons/ai";
import { useCartStore, useDrawCart } from "@/app/store";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../../public/Jack-Jones.png";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import SearchContainer from "../module/SearchContainer";
const Header = () => {
  const { data: session, status } = useSession();
  const isToggleHandler = useDrawCart((state) => state.isToggleHandler);
  const isOpen = useDrawCart((state) => state.isOpen);
  const cartStore = useCartStore((state) => state.cart);

  const totalQuantity = cartStore.reduce((acc, cur) => acc + cur.quantity, 0);
  const pathname = usePathname();
  const navLinks = [
    { id: 1, href: "/sweatshirts", title: "Sweatshirts" },
    { id: 2, href: "/jeans", title: "Jeans" },
    { id: 3, href: "/tshirt", title: "T-shirts" },
    { id: 4, href: "/trousers", title: "Trousers" },
    { id: 5, href: "/newProducts", title: "New" },
  ];
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState(false);
  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!ref.current || !ref.current.contains(e.target as Node)) {
        setActiveSearch(false);
      }
    };

    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="#f3f4f5"
      maxWidth="full"
    >
      <NavbarBrand className="mr-5">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={!isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden h-[26px] px-2"
          />
          <Link href={"/"} className="font-bold text-inherit w-full ">
            {
              <Image
                className="jack-logo"
                width={180}
                height={150}
                alt="jc"
                src={Logo}
              />
            }
          </Link>
        </NavbarContent>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-3" justify="center">
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
      <NavbarContent className="gap-[0.7rem]" as="div" justify="end">
        <div className="relative block max-md:hidden " ref={ref}>
          <div
            onClick={() => setActiveSearch(!activeSearch)}
            className="w-[26px] h-[26px] cursor-pointer"
          >
            <CiSearch className="w-[26px] h-[26px]   text-3xl" />
          </div>
          <AnimatePresence>
            {activeSearch && (
              <SearchContainer setActiveSearch={setActiveSearch} />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-2">
          <button className="relative" onClick={isToggleHandler}>
            <AiOutlineShopping
              className={"w-[26px] h-7 z-10 text-slate-700 "}
            />

            <AnimatePresence>
              {totalQuantity ? (
                <motion.div
                  exit={{ scale: 0 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-[15px] left-[15px] w-[22px] h-[22px]   text-sm rounded-full   bg-gradient-to-tr from-green-500 to-blue-500 text-white "
                >
                  <span className="mt-[1px]"> {totalQuantity}</span>
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {isOpen && <Cart totalQuantity={totalQuantity} />}
          </AnimatePresence>
        </div>
        {(status as string) === "loading" ? (
          <Spinner size="md" />
        ) : (status as string) === "authenticated" ? (
          <NavbarItem className="w-9 ">
            <DropdownItemUser profileUser={session?.user} />
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
      </NavbarContent>

      <NavbarMenu>
        <SearchContainer setActiveSearch={setActiveSearch} setIsMenuOpen={setIsMenuOpen}  />

        {navLinks.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={` hover:text-blue-600 ${
                pathname === item.href && "text-blue-600 font-semibold"
              }`}
              href={item.href}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;

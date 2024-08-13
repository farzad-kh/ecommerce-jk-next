import { NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import SearchContainer from './SearchContainer';
import { usePathname } from 'next/navigation';

interface Props{
    setActiveSearch: (value: boolean) => void;
    setIsMenuOpen: (value: boolean) => void;
    isMenuOpen: boolean
    navLinks:{id: number; href: string; title: string}[]
}


const ResponsiveNav = ({setActiveSearch,setIsMenuOpen,isMenuOpen, navLinks}:Props) => {
    const pathname = usePathname();
    return (
        <NavbarMenu>
        <SearchContainer
          setActiveSearch={setActiveSearch}
          setIsMenuOpen={setIsMenuOpen}
        />

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
    );
};

export default ResponsiveNav;
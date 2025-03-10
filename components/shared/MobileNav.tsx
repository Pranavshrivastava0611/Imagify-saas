"use client"

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";

const MobileNav = () => {
    const pathname = usePathname()
  return (
    <header className="header">
      <Link href="/" className="flex gap-2 items-center md:py-2">
        <Image
          src="./assets/images/logo-text.svg"
          alt="logo"
          width={160}
          height={20}
        />
      </Link>
      <nav className="flex  gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/"/>
          <Sheet>
            <SheetTrigger><Image src="./assets/icons/menu.svg" alt="logo" width={32} height={32} className="cursor-pointer" /></SheetTrigger>
            <SheetContent className="sheet-content  sm:w-64" >
                <>
                <Link href="/"> 
                <Image src="./assets/images/logo-text.svg" alt="logo" height={23} width={152} />
                </Link>
                <ul className='header-nav_elements'>
            {navLinks.map((obj)=> {
                const isActive = obj.route === pathname
                return (
                    <li key={obj.route} className={`${isActive && 'text-purple-400'}`}>
                       <Link href={obj.route} className='sidebar-link cursor-pointer'>
                       <Image src={obj.icon} alt="logo" height={24} width={24} className={`${isActive && 'brightness-200 cursor-pointer'}`}/>
                            {obj.label}
                       </Link>
                    </li>
                )
            } )}
            </ul>
                </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
            <Button asChild className="bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;

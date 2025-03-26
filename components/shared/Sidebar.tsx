"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import Image from 'next/image'
import { fetchUserData } from './user'

function Sidebar() {

    const pathname = usePathname();

    useEffect(() => {
        async function loadData() {
          const userData = await fetchUserData();
          console.log(userData);
        }
        loadData();
      }, []);

  return (
    <aside className='sidebar'>
    <div className='flex size-full gap-4 flex-col'>
        <Link href="/" className="sidebar-logo">
        <Image src="./assets/images/logo-text.svg" alt="logo" width={160} height={20} />
        </Link>
        <nav className='sidebar-nav'>
    <SignedIn>
        <ul className='sidebar-nav_elements'>
            {navLinks.slice(0,6).map((obj)=> {
                const isActive = obj.route === pathname
                return (
                    <li key={obj.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                       <Link href={obj.route} className='sidebar-link'>
                       <Image src={obj.icon} alt="llogo" height={20} width={20} className={`${isActive && 'brightness-200'}`}/>
                            {obj.label}
                       </Link>
                    </li>
                )
            } )}
            </ul>
            <ul>
            {navLinks.slice(6).map((obj)=> {
                const isActive = obj.route === pathname
                return (
                    <li key={obj.route} className={`sidebar-nav_element group ${isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'}`}>
                       <Link href={obj.route} className='sidebar-link'>
                       <Image src={obj.icon} alt="llogo" height={20} width={20} className={`${isActive && 'brightness-200'}`}/>
                            {obj.label}
                       </Link>
                    </li>
                )
            } )}
            <UserButton afterSignOutUrl='/' showName/>
        </ul>
    </SignedIn>
    <SignedOut>
        <Button asChild className='bg-purple-gradient bg-cover '>
            <Link href="/sign-in">Login</Link>
        </Button>
    </SignedOut>
    </nav>
    </div>
    </aside>
  )
}

export default Sidebar

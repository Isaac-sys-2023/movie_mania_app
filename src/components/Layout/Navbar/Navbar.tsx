"use client";
import SearchBox from "@/components/SearchBox/SearchBox";
import ThemeToggleButton from "@/components/ThemeToggleButton/ThemeToggleButton";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const [currentPath, setCurrentPath] = useState<string>("");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(true);

    const handleLinkClick = (url: string) => {
        setCurrentPath(url);
        setDropdownOpen(false);
    };

    return (
        <>
            <div className="navbar bg-base-300 shadow-sm sm:hidden">
                <Link href={'/'} className="btn btn-ghost text-xl" onClick={() => handleLinkClick('/')}>MovieMania</Link>
            </div>
            <div className="navbar sticky top-0 glass md:px-10 z-20">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => {setDropdownOpen(!dropdownOpen); console.log("click");
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow ${dropdownOpen ? 'block' : 'hidden'}`}>
                            <li><Link href={'/'} className={`${currentPath == '/' ? "text-yellow-500" : ""} hover:text-yellow-500 text-sm`} onClick={() => handleLinkClick('/')}>Home</Link></li>
                            <li><Link href={'/movies'} className={`${currentPath == '/movies' ? "text-yellow-500" : ""} hover:text-yellow-500 text-sm`} onClick={() => handleLinkClick('/movies')}>Explore</Link></li>
                            <li><Link href={'/tv_shows'} className={`${currentPath == '/tv_shows' ? "text-yellow-500" : ""} hover:text-yellow-500 text-sm`} onClick={() => handleLinkClick('/tv_shows')}>Tv Shows</Link></li>
                            <li><ThemeToggleButton /></li>
                        </ul>
                    </div>
                    <Link href={'/'} className="lg:text-xl hidden sm:block font-bold" onClick={() => handleLinkClick('/')}>MovieMania</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="px-1 flex items-center lg:gap-4 gap-1">
                        <li><Link href={'/'} className={`${currentPath == '/' ? "text-yellow-500" : ""} hover:text-yellow-500 text-sm`} onClick={() => handleLinkClick('/')}>Home</Link></li>
                        <li><Link href={'/movies'} className={`${currentPath == '/movies' ? "text-yellow-500" : ""} hover:text-yellow-500 text-sm`} onClick={() => handleLinkClick('/movies')}>Explore</Link></li>
                        <li><Link href={'/tv_shows'} className={`${currentPath == '/tv_shows' ? "text-yellow-500" : ""} hover:text-yellow-500 text-sm`} onClick={() => handleLinkClick('/tv_shows')}>Tv Shows</Link></li>
                        <li><ThemeToggleButton /></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul className="px-1">
                        <li className="relative">
                            <SearchBox />
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar;
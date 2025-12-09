"use client";

import Image from "next/image";
import AnimatedNavLink from "./AnimatedNavLink";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 pt-8 pb-6">
      <div className="w-full max-w-8xl mx-8 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-8 py-6">
          {/* Left Navigation Links */}
          <div className="flex items-center gap-8">
            <AnimatedNavLink href="#" className="text-black text-gray-800 font-normal">
              Shop +
            </AnimatedNavLink>
            <AnimatedNavLink href="#" className="text-black text-gray-800 font-normal">
              Collections +
            </AnimatedNavLink>
            <AnimatedNavLink href="#" className="text-black text-gray-800 font-normal">
              About
            </AnimatedNavLink>
            <AnimatedNavLink href="#" className="text-black text-gray-800 font-normal">
              Blog
            </AnimatedNavLink>
            <AnimatedNavLink href="#" className="text-black text-gray-800 font-normal">
              Contact
            </AnimatedNavLink>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="flex items-center">
              <Image
                src="/images/kanva-logo.webp"
                alt="Kanva Logo"
                width={80}
                height={32}
                className="h-auto"
                priority
              />
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <Image
                src="/images/usa.svg"
                alt="Language"
                width={20}
                height={15}
                className="w-5 h-auto"
              />
            </button>

            {/* User Profile Icon */}
            <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>

            {/* Search Icon */}
            <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>

            {/* Heart Icon (Wishlist) */}
            <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>

            {/* Shopping Bag Icon */}
            <button className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.25 10.5V6a2.25 2.25 0 1 1 4.5 0v4.5m-4.5 0h9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

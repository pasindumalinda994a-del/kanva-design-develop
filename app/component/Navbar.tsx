"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import AnimatedNavLink from "./AnimatedNavLink";
import ShopDropdown from "./ShopDropdown";
import CollectionDropdown from "./CollectionDropdown";

export default function Navbar() {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] = useState(false);
  const [isShopClicked, setIsShopClicked] = useState(false);
  const [isCollectionsClicked, setIsCollectionsClicked] = useState(false);
  const shopLinkRef = useRef<HTMLDivElement>(null);
  const collectionsLinkRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const scrollTween = useRef<gsap.core.Tween | null>(null);
  const shopPlusRef = useRef<HTMLSpanElement>(null);
  const collectionsPlusRef = useRef<HTMLSpanElement>(null);

  // Shop hover handlers (only work when not clicked)
  const handleShopMouseEnter = () => {
    if (!isShopClicked) {
      setIsShopDropdownOpen(true);
    }
  };

  const handleShopMouseLeave = () => {
    if (!isShopClicked) {
      setIsShopDropdownOpen(false);
    }
  };

  const handleShopDropdownMouseEnter = () => {
    if (!isShopClicked) {
      setIsShopDropdownOpen(true);
    }
  };

  const handleShopDropdownMouseLeave = () => {
    if (!isShopClicked) {
      setIsShopDropdownOpen(false);
    }
  };

  // Shop click handler
  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isShopClicked) {
      setIsShopClicked(false);
      setIsShopDropdownOpen(false);
    } else {
      // Close collections if open
      setIsCollectionsClicked(false);
      setIsCollectionsDropdownOpen(false);
      // Open shop
      setIsShopClicked(true);
      setIsShopDropdownOpen(true);
    }
  };

  // Collections hover handlers (only work when not clicked)
  const handleCollectionsMouseEnter = () => {
    if (!isCollectionsClicked) {
      setIsCollectionsDropdownOpen(true);
    }
  };

  const handleCollectionsMouseLeave = () => {
    if (!isCollectionsClicked) {
      setIsCollectionsDropdownOpen(false);
    }
  };

  const handleCollectionsDropdownMouseEnter = () => {
    if (!isCollectionsClicked) {
      setIsCollectionsDropdownOpen(true);
    }
  };

  const handleCollectionsDropdownMouseLeave = () => {
    if (!isCollectionsClicked) {
      setIsCollectionsDropdownOpen(false);
    }
  };

  // Collections click handler
  const handleCollectionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCollectionsClicked) {
      setIsCollectionsClicked(false);
      setIsCollectionsDropdownOpen(false);
    } else {
      // Close shop if open
      setIsShopClicked(false);
      setIsShopDropdownOpen(false);
      // Open collections
      setIsCollectionsClicked(true);
      setIsCollectionsDropdownOpen(true);
    }
  };

  // Close dropdowns when clicking anywhere (backdrop)
  const handleBackdropClick = () => {
    setIsShopClicked(false);
    setIsShopDropdownOpen(false);
    setIsCollectionsClicked(false);
    setIsCollectionsDropdownOpen(false);
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";
      
      // Kill any existing animation
      if (scrollTween.current) {
        scrollTween.current.kill();
      }

      // If at the top of the page, always show navbar
      if (currentScrollY <= 0) {
        scrollTween.current = gsap.to(nav, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      } else if (scrollDirection === "down") {
        // Scroll down: hide navbar (move up and fade out)
        scrollTween.current = gsap.to(nav, {
          y: -200,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        // Scroll up: show navbar (return to position and fade in)
        scrollTween.current = gsap.to(nav, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
    };
  }, []);


  // Animate plus icons on click state
  useEffect(() => {
    const shopPlus = shopPlusRef.current;
    const collectionsPlus = collectionsPlusRef.current;

    if (!shopPlus || !collectionsPlus) return;

    let shopTween: gsap.core.Tween | null = null;
    let collectionsTween: gsap.core.Tween | null = null;

    // Animate shop plus based on click state
    shopTween = gsap.to(shopPlus, {
      rotation: isShopClicked ? 135 : 0,
      duration: 0.4,
      ease: "power2.out",
    });

    // Animate collections plus based on click state
    collectionsTween = gsap.to(collectionsPlus, {
      rotation: isCollectionsClicked ? 135 : 0,
      duration: 0.4,
      ease: "power2.out",
    });

    return () => {
      if (shopTween) shopTween.kill();
      if (collectionsTween) collectionsTween.kill();
    };
  }, [isShopClicked, isCollectionsClicked]);

  // Animate plus icons on hover (only when not clicked)
  useEffect(() => {
    const shopPlus = shopPlusRef.current;
    const collectionsPlus = collectionsPlusRef.current;
    const shopLinkContainer = shopLinkRef.current;
    const collectionsLinkContainer = collectionsLinkRef.current;

    if (!shopPlus || !collectionsPlus || !shopLinkContainer || !collectionsLinkContainer) return;

    let shopTween: gsap.core.Tween | null = null;
    let collectionsTween: gsap.core.Tween | null = null;

    const handleShopPlusMouseEnter = () => {
      if (isShopClicked) return; // Don't animate on hover if clicked
      if (shopTween) shopTween.kill();
      shopTween = gsap.to(shopPlus, {
        rotation: 135,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleShopPlusMouseLeave = () => {
      if (isShopClicked) return; // Don't animate on hover if clicked
      if (shopTween) shopTween.kill();
      shopTween = gsap.to(shopPlus, {
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleCollectionsPlusMouseEnter = () => {
      if (isCollectionsClicked) return; // Don't animate on hover if clicked
      if (collectionsTween) collectionsTween.kill();
      collectionsTween = gsap.to(collectionsPlus, {
        rotation: 135,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleCollectionsPlusMouseLeave = () => {
      if (isCollectionsClicked) return; // Don't animate on hover if clicked
      if (collectionsTween) collectionsTween.kill();
      collectionsTween = gsap.to(collectionsPlus, {
        rotation: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    shopLinkContainer.addEventListener("mouseenter", handleShopPlusMouseEnter);
    shopLinkContainer.addEventListener("mouseleave", handleShopPlusMouseLeave);
    collectionsLinkContainer.addEventListener("mouseenter", handleCollectionsPlusMouseEnter);
    collectionsLinkContainer.addEventListener("mouseleave", handleCollectionsPlusMouseLeave);

    return () => {
      shopLinkContainer.removeEventListener("mouseenter", handleShopPlusMouseEnter);
      shopLinkContainer.removeEventListener("mouseleave", handleShopPlusMouseLeave);
      collectionsLinkContainer.removeEventListener("mouseenter", handleCollectionsPlusMouseEnter);
      collectionsLinkContainer.removeEventListener("mouseleave", handleCollectionsPlusMouseLeave);
      if (shopTween) shopTween.kill();
      if (collectionsTween) collectionsTween.kill();
    };
  }, [isShopClicked, isCollectionsClicked]);

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 pt-8 pb-6">
        <div className="w-full max-w-8xl mx-8 bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between px-8 py-6">
            {/* Left Navigation Links */}
            <div className="flex items-center gap-8">
              <div
                ref={shopLinkRef}
                className="relative flex items-center gap-1"
              >
                <div
                  onMouseEnter={handleShopMouseEnter}
                  onMouseLeave={handleShopMouseLeave}
                  onClick={handleShopClick}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <AnimatedNavLink 
                    href="#" 
                    className="text-black text-gray-800 font-normal"
                    isActive={isShopClicked}
                  >
                    Shop
                  </AnimatedNavLink>
                  <span ref={shopPlusRef} className="inline-block text-black text-gray-800 font-normal text-lg">+</span>
                </div>
              </div>
              <div
                ref={collectionsLinkRef}
                className="relative flex items-center gap-1"
              >
                <div
                  onMouseEnter={handleCollectionsMouseEnter}
                  onMouseLeave={handleCollectionsMouseLeave}
                  onClick={handleCollectionsClick}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <AnimatedNavLink 
                    href="#" 
                    className="text-black text-gray-800 font-normal"
                    isActive={isCollectionsClicked}
                  >
                    Collections
                  </AnimatedNavLink>
                  <span ref={collectionsPlusRef} className="inline-block text-black text-gray-800 font-normal text-lg">+</span>
                </div>
              </div>
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
    <div 
      onMouseEnter={handleShopDropdownMouseEnter} 
      onMouseLeave={handleShopDropdownMouseLeave}
      style={{ pointerEvents: isShopDropdownOpen ? "auto" : "none" }}
    >
      <ShopDropdown 
        isOpen={isShopDropdownOpen} 
        onClose={handleBackdropClick} 
        shopLinkRef={shopLinkRef} 
      />
    </div>
    <div 
      onMouseEnter={handleCollectionsDropdownMouseEnter} 
      onMouseLeave={handleCollectionsDropdownMouseLeave}
      style={{ pointerEvents: isCollectionsDropdownOpen ? "auto" : "none" }}
    >
      <CollectionDropdown 
        isOpen={isCollectionsDropdownOpen} 
        onClose={handleBackdropClick} 
        collectionsLinkRef={collectionsLinkRef} 
      />
    </div>
    </>
  );
}

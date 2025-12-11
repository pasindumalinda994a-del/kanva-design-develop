"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ProductCard, { Product } from "./ProductCard";

interface ShopDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  shopLinkRef?: React.RefObject<HTMLDivElement | null>;
}

const products: Product[] = [
  {
    id: 1,
    name: "Glow Milk",
    price: "$10.00",
    discount: "57% OFF",
    image: "/images/products/glow-milk1.png",
    hoverImage: "/images/products/glow-milk2.jpg",
  },
  {
    id: 2,
    name: "Hydra Drops",
    price: "$11.00",
    discount: "54% OFF",
    image: "/images/products/hydra-drops1.png",
    hoverImage: "/images/products/hydra-drops2.jpg",
  },
];

const menuItems = [
  { label: "All Products", href: "#" },
  { label: "Cleansers", href: "#" },
  { label: "Lotions", href: "#" },
  { label: "Moisturizers", href: "#" },
];

interface AnimatedMenuItemProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

function AnimatedMenuItem({ href, children, onClick }: AnimatedMenuItemProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (!container || !topText || !bottomText) return;

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Animate top text down and out
      hoverTimeline.fromTo(
        topText,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "-100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }
      );

      // Animate bottom text up and in (starting from below)
      hoverTimeline.fromTo(
        bottomText,
        {
          y: "100%",
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1" // Start slightly before top animation ends
      );
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Animate bottom text down and out
      hoverTimeline.fromTo(
        bottomText,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }
      );

      // Animate top text up and in (starting from above)
      hoverTimeline.fromTo(
        topText,
        {
          y: "-100%",
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1" // Start slightly before bottom animation ends
      );
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  return (
    <a
      ref={containerRef}
      href={href}
      className="relative inline-block overflow-hidden text-gray-500 hover:text-black text-md cursor-pointer"
      style={{ fontFamily: "var(--font-figtree)" }}
      onClick={onClick}
    >
      <span className="block relative">
        <span ref={topTextRef} className="block">
          {children}
        </span>
        <span
          ref={bottomTextRef}
          className="block absolute top-0 left-0 w-full"
          style={{ opacity: 0, transform: "translateY(-100%)" }}
        >
          {children}
        </span>
      </span>
    </a>
  );
}

export default function ShopDropdown({ isOpen, onClose, shopLinkRef }: ShopDropdownProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial state on mount
  useEffect(() => {
    if (overlayRef.current && contentRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: -10 });
    }
  }, []);

  // Update position based on Shop link position
  useEffect(() => {
    if (!containerRef.current || !shopLinkRef?.current) return;
    
    const shopLinkRect = shopLinkRef.current.getBoundingClientRect();
    containerRef.current.style.left = `${shopLinkRect.left}px`;
  }, [isOpen, shopLinkRef]);

  // Animate on isOpen change
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    if (isOpen) {
      // Animate in - smooth opacity 0 -> 1
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Animate out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 z-40"
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Dropdown container - positioned below navbar with small gap */}
      <div ref={containerRef} className="fixed top-32 z-50 w-full max-w-3xl px-2">
        <div
          ref={contentRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex">
            {/* Left Sidebar - Navigation Menu */}
            <div className="w-56 p-6">
              <h2
                className="text-xl font-light italic text-black mb-5"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                Shop
              </h2>
              <nav className="flex flex-col gap-3">
                {menuItems.map((item, index) => (
                  <AnimatedMenuItem
                    key={index}
                    href={item.href}
                    onClick={onClose}
                  >
                    {item.label}
                  </AnimatedMenuItem>
                ))}
              </nav>
            </div>

            {/* Right Content Area - Product Cards */}
            <div className="flex-1 p-3">
              <div className="grid grid-cols-2 gap-3 max-w-xl">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCardClick={(id) => {
                      // Handle product click
                      console.log("Product clicked:", id);
                      onClose();
                    }}
                    onFavoriteClick={(id) => {
                      // Handle favorite click
                      console.log("Favorite toggled:", id);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


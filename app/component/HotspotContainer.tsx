"use client";

import { useRef, useEffect, forwardRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ArrowAnimation from "./ArrowAnimation";

export interface HotspotProduct {
  id: number;
  category: string;
  name: string;
  price: string;
  image?: string;
}

interface HotspotContainerProps {
  product: HotspotProduct;
  position?: { x: number; y: number };
  onClose?: () => void;
  onNavigate?: () => void;
  isVisible?: boolean;
}

const HotspotContainer = forwardRef<HTMLDivElement, HotspotContainerProps>(
  function HotspotContainer(
    {
      product,
      position = { x: 0, y: 0 },
      onClose,
      onNavigate,
      isVisible = true,
    },
    ref
  ) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Handle image scale animation on hover
  useEffect(() => {
    const card = cardRef.current;
    const imageContainer = imageRef.current;

    if (!card || !imageContainer) return;

    let scaleTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      if (scaleTween) scaleTween.kill();
      scaleTween = gsap.to(imageContainer, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (scaleTween) scaleTween.kill();
      scaleTween = gsap.to(imageContainer, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (scaleTween) scaleTween.kill();
    };
  }, []);

  return (
    <div
      ref={ref || containerRef}
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, 0)",
        opacity: 0,
      }}
    >
      <div
        ref={cardRef}
        className="bg-white rounded-xl shadow-xl overflow-hidden pointer-events-auto cursor-pointer hover:shadow-2xl transition-shadow duration-300"
        style={{ 
          width: "280px",
          aspectRatio: "3/1"
        }}
        onClick={(e) => {
          // Stop propagation to prevent closing when clicking inside
          e.stopPropagation();
          if (onNavigate) {
            onNavigate();
          }
        }}
      >
        <div className="flex items-center h-full px-2 py-2 gap-2">
          {/* Left Section - Product Image */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              {product.image ? (
                <div ref={imageRef} className="w-full h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                // Placeholder bottle - dark green/teal bottle with black pump
                <div ref={imageRef} className="relative w-14 h-20">
                  <div className="absolute inset-0 bg-gradient-to-b from-teal-800 via-teal-900 to-teal-800 rounded-t-full rounded-b-lg">
                    {/* Label area with faint text */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-7 h-8 bg-white/20 rounded-sm"></div>
                    {/* Black pump dispenser */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2 bg-black rounded-t-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="flex-1 flex flex-col justify-center min-w-0 h-full">
            {/* Category */}
            <p
              className="text-sm text-gray-400 mb-0 leading-tight"
              style={{ fontFamily: "var(--font-figtree)" }}
            >
              {product.category}
            </p>

            {/* Product Name and Arrow */}
            <div className="flex items-center gap-1.5 mb-0">
              <h3
                className="text-md font-light text-black flex-1 truncate leading-tight"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                {product.name}
              </h3>
              {/* Navigation Arrow */}
              <div className="w-8 h-5 flex-shrink-0 flex items-center justify-center overflow-visible">
                <ArrowAnimation className="w-6 h-5 text-gray-400" />
              </div>
            </div>

            {/* Price */}
            <p
              className="text-sm font-light text-black leading-tight"
              style={{ fontFamily: "var(--font-sentient)" }}
            >
              {product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  }
);

export default HotspotContainer;


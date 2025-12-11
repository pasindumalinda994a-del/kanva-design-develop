"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  image?: string;
  hoverImage?: string;
}

interface ProductCardProps {
  product: Product;
  onFavoriteClick?: (productId: number) => void;
  onCardClick?: (productId: number) => void;
  isFavorite?: boolean;
}

export default function ProductCard({
  product,
  onFavoriteClick,
  onCardClick,
  isFavorite = false,
}: ProductCardProps) {
  const [favorited, setFavorited] = useState(isFavorite);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorited(!favorited);
    if (onFavoriteClick) {
      onFavoriteClick(product.id);
    }
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(product.id);
    }
  };

  const handleMouseEnter = () => {
    if (product.hoverImage && mainImageRef.current && hoverImageRef.current) {
      // Fade out main image
      gsap.to(mainImageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      // Fade in hover image
      gsap.to(hoverImageRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  const handleMouseLeave = () => {
    if (product.hoverImage && mainImageRef.current && hoverImageRef.current) {
      // Fade in main image
      gsap.to(mainImageRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
      // Fade out hover image
      gsap.to(hoverImageRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-[#E8E8E1] rounded-xl relative aspect-[3/4] flex flex-col overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Heart Icon (Favorite) */}
      <button
        className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/75 transition-colors z-10 shadow-sm "
        aria-label="Add to favorites"
        onClick={handleFavoriteClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={favorited ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 ${favorited ? "text-[#757D5C]" : "text-[#757D5C]"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.312-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>

      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-2 right-2 bg-[#1A5F3F] text-white px-2 py-1 rounded-md text-xs font-semibold z-10 shadow-sm">
          {product.discount}
        </div>
      )}

      {/* Image Section - 3/4 of card */}
      <div className="relative w-full h-3/4 overflow-hidden">
        {product.image ? (
          <div className="relative w-full h-full">
            {/* Main Image */}
            <div 
              ref={mainImageRef} 
              className="absolute inset-0"
              style={{ transform: "scale(1.0)", transformOrigin: "top center" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* Hover Image */}
            {product.hoverImage && (
              <div
                ref={hoverImageRef}
                className="absolute inset-0 opacity-0"
                style={{ transform: "scale(1.0)", transformOrigin: "top center" }}
              >
                <Image
                  src={product.hoverImage}
                  alt={`${product.name} hover`}
                  fill
                  className="object-contain object-top"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Product Bottle Placeholder */}
            <div className="relative w-28 h-44">
              {/* Bottle shape */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#2D5F3F] via-[#1A5F3F] to-[#2D5F3F] rounded-t-full rounded-b-lg shadow-inner">
                {/* Bottle label area */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-16 h-20 bg-white/90 rounded-sm flex flex-col items-center justify-center p-1">
                  <div className="text-[#1A5F3F] font-bold text-xs tracking-tight">kanva</div>
                  <div className="text-[#1A5F3F] text-[6px] mt-0.5">by mockuppree.net</div>
                </div>
                {/* Pump cap */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-black rounded-t-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Text Section - 1/4 of card */}
      <div className="h-1/4 flex flex-col items-center justify-center px-6 py-4">
        <h3
          className="text-black font-light text-center mb-2 text-base"
          style={{ fontFamily: "var(--font-sentient)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-black text-sm font-light text-center"
          style={{ fontFamily: "var(--font-sentient)" }}
        >
          {product.price}
        </p>
      </div>
    </div>
  );
}


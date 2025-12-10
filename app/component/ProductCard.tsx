"use client";

import { useState } from "react";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  price: string;
  discount?: string;
  image?: string;
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

  return (
    <div
      className="bg-[#E8E8E1] rounded-xl p-4 relative aspect-[3/4] flex flex-col"
      onClick={handleCardClick}
    >
      {/* Heart Icon (Favorite) */}
      <button
        className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full hover:bg-white transition-colors z-10 shadow-sm border border-gray-200"
        aria-label="Add to favorites"
        onClick={handleFavoriteClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={favorited ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-4 h-4 ${favorited ? "text-red-500" : "text-gray-600"}`}
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
        <div className="absolute top-3 right-3 bg-[#1A5F3F] text-white px-2 py-1 rounded-md text-xs font-semibold z-10 shadow-sm">
          {product.discount}
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full flex-1 mb-3 flex items-center justify-center min-h-0">
        {product.image ? (
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="relative w-28 h-44 flex items-center justify-center">
            {/* Product Bottle Placeholder */}
            <div className="relative w-full h-full">
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

      {/* Product Name */}
      <h3
        className="text-black font-medium mb-1.5 text-sm"
        style={{ fontFamily: "var(--font-sentient)" }}
      >
        {product.name}
      </h3>

      {/* Product Price */}
      <p
        className="text-black text-sm font-normal"
        style={{ fontFamily: "var(--font-sentient)" }}
      >
        {product.price}
      </p>
    </div>
  );
}


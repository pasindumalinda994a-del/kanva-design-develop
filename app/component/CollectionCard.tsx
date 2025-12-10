"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export interface CollectionCard {
  id: number;
  name: string;
  image: string;
  href: string;
}

interface CollectionCardItemProps {
  collection: CollectionCard;
  onClick: () => void;
}

export default function CollectionCardItem({ collection, onClick }: CollectionCardItemProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    const arrow = arrowRef.current;

    if (!card || !image || !text || !arrow) return;

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Scale up image slightly
      hoverTimeline.to(image, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });

      // Move arrow to the right
      hoverTimeline.to(
        arrow,
        {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      );
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Scale down image
      hoverTimeline.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // Move arrow back
      hoverTimeline.to(
        arrow,
        {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<"
      );
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={collection.href}
      className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer block"
      onClick={onClick}
    >
      {/* Image Container */}
      <div
        ref={imageRef}
        className="relative w-full h-56 bg-[#F5F5F0] overflow-hidden"
      >
        {/* Placeholder for collection image - you can replace with actual images */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Placeholder content - styled bottles similar to image description */}
            {collection.id === 1 && (
              // Cleansers - dark olive green bottles
              <div className="relative w-full h-full flex items-center justify-center gap-6">
                <div className="relative w-16 h-28">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2D5F3F] via-[#1A5F3F] to-[#2D5F3F] rounded-t-full rounded-b-lg shadow-lg">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-black rounded-t-full"></div>
                  </div>
                </div>
                <div className="relative w-20 h-36">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2D5F3F] via-[#1A5F3F] to-[#2D5F3F] rounded-t-full rounded-b-lg shadow-lg">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-black rounded-t-full"></div>
                  </div>
                </div>
              </div>
            )}
            {collection.id === 2 && (
              // Lotions - dark grey/smoky translucent bottles
              <div className="relative w-full h-full flex items-center justify-center gap-6">
                <div className="relative w-20 h-36">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-700/80 via-gray-600/80 to-gray-700/80 rounded-t-full rounded-b-lg shadow-lg backdrop-blur-sm">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-14 h-16 bg-[#F5F5F0] rounded-sm"></div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-black rounded-t-full"></div>
                  </div>
                </div>
                <div className="relative w-16 h-28">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-700/80 via-gray-600/80 to-gray-700/80 rounded-t-full rounded-b-lg shadow-lg backdrop-blur-sm">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-14 bg-[#F5F5F0] rounded-sm"></div>
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-black rounded-t-full"></div>
                  </div>
                </div>
              </div>
            )}
            {collection.id === 3 && (
              // Moisturizers - amber glass bottles
              <div className="relative w-full h-full flex items-center justify-center gap-6">
                <div className="relative w-20 h-36">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-800/60 to-amber-900/60 rounded-t-full rounded-b-lg shadow-lg">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-14 h-16 bg-[#F5F5F0] rounded-sm"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-3 bg-gray-800 rounded-t-sm"></div>
                  </div>
                </div>
                <div className="relative w-16 h-28">
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-800/60 to-amber-900/60 rounded-t-full rounded-b-lg shadow-lg">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-12 h-14 bg-[#F5F5F0] rounded-sm"></div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-gray-800 rounded-t-sm"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text with Arrow */}
      <div
        ref={textRef}
        className="px-3 py-2.5 flex items-center justify-between border-t border-gray-100"
      >
        <span
          className="text-black text-base font-normal"
          style={{ fontFamily: "var(--font-sentient)" }}
        >
          {collection.name}
        </span>
        <span
          ref={arrowRef}
          className="inline-block text-black text-base"
          style={{ fontFamily: "var(--font-sentient)" }}
        >
          →
        </span>
      </div>
    </a>
  );
}


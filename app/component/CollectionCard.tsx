"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

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
      className="group relative bg-[#E8E8E1] rounded-2xl overflow-hidden cursor-pointer block aspect-[4/3] flex flex-col"
      onClick={onClick}
    >
      {/* Image Container */}
      <div
        ref={imageRef}
        className="relative w-full flex-1 bg-[#F5F5F0] overflow-hidden min-h-0"
      >
        {collection.image && (
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
            )}
      </div>

      {/* Text with Arrow */}
      <div
        ref={textRef}
        className="px-3 py-2.5 flex items-center justify-between border-t border-gray-100"
      >
        <span
          className="text-black text-base font-light"
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


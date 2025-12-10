"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import CollectionCardItem, { CollectionCard } from "./CollectionCard";

interface CollectionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  collectionsLinkRef?: React.RefObject<HTMLDivElement | null>;
}

const collections: CollectionCard[] = [
  {
    id: 1,
    name: "Cleansers",
    image: "/images/collection-cleansers.webp",
    href: "#",
  },
  {
    id: 2,
    name: "Lotions",
    image: "/images/collection-lotions.webp",
    href: "#",
  },
  {
    id: 3,
    name: "Moisturizers",
    image: "/images/collection-moisturizers.webp",
    href: "#",
  },
];

export default function CollectionDropdown({
  isOpen,
  onClose,
  collectionsLinkRef,
}: CollectionDropdownProps) {
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

  // Update position based on Collections link position
  useEffect(() => {
    if (!containerRef.current || !collectionsLinkRef?.current) return;

    const collectionsLinkRect = collectionsLinkRef.current.getBoundingClientRect();
    containerRef.current.style.left = `${collectionsLinkRect.left}px`;
  }, [isOpen, collectionsLinkRef]);

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
          className="bg-white rounded-2xl shadow-2xl overflow-hidden p-3"
        >
          {/* Three Collection Cards in a row */}
          <div className="grid grid-cols-3 gap-3">
            {collections.map((collection) => (
              <CollectionCardItem
                key={collection.id}
                collection={collection}
                onClick={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


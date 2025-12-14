"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import HotspotContainer, { HotspotProduct } from "./HotspotContainer";

export default function ProductSection() {
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);
  const [hotspotPositions, setHotspotPositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hotspot1Ref = useRef<HTMLButtonElement>(null);
  const hotspot2Ref = useRef<HTMLButtonElement>(null);
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);

  const hotspotProducts: HotspotProduct[] = [
    {
      id: 1,
      category: "Moisturizers",
      name: "Daily Cream",
      price: "$39.99",
      image: "/images/products/daily-cream1.png",
    },
    {
      id: 2,
      category: "Serums",
      name: "Hydra Drops",
      price: "$29.99",
      image: "/images/products/hydra-drops1.png",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate hotspot positions
  useEffect(() => {
    const updatePositions = () => {
      const positions: { [key: number]: { x: number; y: number } } = {};

      if (hotspot1Ref.current) {
        const rect = hotspot1Ref.current.getBoundingClientRect();
        positions[1] = {
          x: rect.left + rect.width / 2,
          y: rect.bottom + 20,
        };
      }

      if (hotspot2Ref.current) {
        const rect = hotspot2Ref.current.getBoundingClientRect();
        positions[2] = {
          x: rect.left + rect.width / 2,
          y: rect.bottom + 20,
        };
      }

      setHotspotPositions(positions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [scrollY]);

  // Handle hotspot hover animations
  useEffect(() => {
    const container1 = container1Ref.current;
    const container2 = container2Ref.current;

    if (hoveredHotspot === 1 && container1) {
      gsap.killTweensOf(container1);
      gsap.fromTo(
        container1,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else if (container1) {
      gsap.killTweensOf(container1);
      gsap.to(container1, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (hoveredHotspot === 2 && container2) {
      gsap.killTweensOf(container2);
      gsap.fromTo(
        container2,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else if (container2) {
      gsap.killTweensOf(container2);
      gsap.to(container2, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [hoveredHotspot]);

  // Animate image on mount
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#F2F2EF]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Product Image Container - Centered */}
        <div className="relative flex items-center justify-center">
          <div
            ref={imageRef}
            className="relative w-full max-w-4xl h-[500px] md:h-[600px] lg:h-[700px]"
          >
            <Image
              src="/images/product.png"
              alt="Product"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />

            {/* Hotspot 1 */}
            <button
              ref={hotspot1Ref}
              className="absolute top-1/4 left-1/3 z-20 group cursor-pointer"
              aria-label="Hotspot 1"
              onMouseEnter={() => setHoveredHotspot(1)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              <div className="w-3 h-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-125"></div>
              <div className="absolute inset-0 rounded-full bg-white/40 animate-ping group-hover:animate-none"></div>
            </button>

            {/* Hotspot 2 */}
            <button
              ref={hotspot2Ref}
              className="absolute top-1/2 right-1/4 z-20 group cursor-pointer"
              aria-label="Hotspot 2"
              onMouseEnter={() => setHoveredHotspot(2)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              <div className="w-3 h-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-white shadow-lg transition-all duration-300 group-hover:scale-125"></div>
              <div className="absolute inset-0 rounded-full bg-white/40 animate-ping group-hover:animate-none"></div>
            </button>
          </div>
        </div>

        {/* Hotspot Containers */}
        {hotspotPositions[1] && (
          <HotspotContainer
            ref={container1Ref}
            product={hotspotProducts[0]}
            position={hotspotPositions[1]}
            isVisible={hoveredHotspot === 1}
          />
        )}

        {hotspotPositions[2] && (
          <HotspotContainer
            ref={container2Ref}
            product={hotspotProducts[1]}
            position={hotspotPositions[2]}
            isVisible={hoveredHotspot === 2}
          />
        )}
      </div>
    </section>
  );
}


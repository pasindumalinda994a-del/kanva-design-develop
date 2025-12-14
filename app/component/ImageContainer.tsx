"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ImageContainerProps {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  width?: string;
  height?: string;
}

export default function ImageContainer({
  src,
  alt,
  delay = 0,
  className = "",
  width,
  height,
}: ImageContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Animate from starting state to current state (pop effect)
    gsap.from(imageRef.current, {
      opacity: 0,
      scale: 0.3,
      duration: 0.8,
      delay: delay,
      ease: "back.out(1.7)", // Creates a smooth pop/bounce effect
    });

    return () => {
      gsap.killTweensOf(imageRef.current);
    };
  }, [delay]);

  // Check if className contains width/height overrides
  const hasSizeOverride = className.includes("w-") || className.includes("h-") || width || height;
  const sizeClasses = hasSizeOverride ? "" : "w-10 h-10 md:w-15 md:h-15";
  const containerStyle = width && height ? { width, height } : {};

  return (
    <div
      ref={containerRef}
      className={`inline-block ${sizeClasses} rounded-lg border-5 border-white overflow-hidden shadow-sm ${className}`}
      style={containerStyle}
    >
      <div ref={imageRef} className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 40px, 48px"
        />
      </div>
    </div>
  );
}


"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface WebsiteLoadingProps {
  onComplete?: () => void;
}

export default function WebsiteLoading({ onComplete }: WebsiteLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onComplete);

  // Keep the callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const letter = letterRef.current;

    if (!container || !overlay || !letter) return;

    // Ensure container is visible immediately
    gsap.set(container, {
      opacity: 1,
      display: "block",
    });

    // Set initial states using gsap.set
    gsap.set(overlay, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      opacity: 0,
      force3D: true,
    });

    gsap.set(letter, {
      opacity: 0,
      scale: 0.8,
    });

    // Create GSAP Timeline for sequenced animations
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the loading component smoothly
        gsap.to(container, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(container, { display: "none" });
            onCompleteRef.current?.();
          },
        });
      },
    });

    // Animation Sequence - optimized for speed and smoothness:
    // 1. Clip-path reveal from bottom to top (appear) with fade in - faster and smoother
    tl.to(overlay, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
      opacity: 1,
      duration: 0.8,
      ease: "power2.inOut",
      force3D: true,
    })
      // 2. Fade in letter "k" in center - starts earlier (overlaps) for smoother transition
      .fromTo(
        letter,
        {
          opacity: 0,
          scale: 0.85,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.5" // Start 0.5s before previous animation ends (overlap)
      )
      // 3. Hold the letter visible - shorter hold
      .to({}, { duration: 0.4 })
      // 4. Final reveal - animate clip-path to hide (reveal page) - faster and smoother
      .to(overlay, {
        clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        force3D: true,
      });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto bg-[#3C4433]"
      style={{
        backgroundColor: "#3C4433",
        opacity: 1,
      }}
    >
      {/* Background overlay with clip-path animation */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full bg-[#3C4433]"
        style={{
          backgroundColor: "#3C4433",
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          opacity: 0,
          willChange: "clip-path, opacity",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Letter "k" in center */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          willChange: "opacity, transform",
        }}
      >
        <span
          ref={letterRef}
          className="text-white text-5xl md:text-5xl font-light select-none"
          style={{
            fontFamily: "var(--font-sentient)",
            opacity: 0,
            display: "block",
          }}
        >
          (kanva)
        </span>
      </div>
    </div>
  );
}


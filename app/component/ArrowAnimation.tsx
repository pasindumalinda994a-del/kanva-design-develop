"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface ArrowAnimationProps {
  className?: string;
  isHovered?: boolean;
}

export default function ArrowAnimation({
  className = "",
  isHovered = false,
}: ArrowAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const rightArrowRef = useRef<HTMLSpanElement>(null);
  const leftArrowRef = useRef<HTMLSpanElement>(null);

  // Set initial states
  useEffect(() => {
    const rightArrow = rightArrowRef.current;
    const leftArrow = leftArrowRef.current;

    if (!rightArrow || !leftArrow) return;

    // Set initial states
    gsap.set(rightArrow, { x: 0, opacity: 1 });
    gsap.set(leftArrow, { x: "100%", opacity: 0 });
  }, []);

  // Hover animations
  useEffect(() => {
    const container = containerRef.current;
    const rightArrow = rightArrowRef.current;
    const leftArrow = leftArrowRef.current;

    if (!container || !rightArrow || !leftArrow) return;

    // Find the parent card element (anchor tag or clickable div with cursor-pointer)
    const parentCard = container.closest('a[href]') || container.closest('.cursor-pointer');

    if (!parentCard) return;

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Slide right arrow out to the left
      hoverTimeline.fromTo(
        rightArrow,
        {
          x: 0,
          opacity: 1,
        },
        {
          x: "-100%",
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        }
      );

      // Slide left arrow in from the right
      hoverTimeline.fromTo(
        leftArrow,
        {
          x: "100%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1"
      );
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Slide left arrow out to the right
      hoverTimeline.fromTo(
        leftArrow,
        {
          x: 0,
          opacity: 1,
        },
        {
          x: "100%",
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        }
      );

      // Slide right arrow in from the left
      hoverTimeline.fromTo(
        rightArrow,
        {
          x: "-100%",
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1"
      );
    };

    parentCard.addEventListener("mouseenter", handleMouseEnter);
    parentCard.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parentCard.removeEventListener("mouseenter", handleMouseEnter);
      parentCard.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  // Right Arrow SVG
  const RightArrow = () => (
    <svg
      width="24"
      height="20"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black"
    >
      <path
        d="M4 12H22M22 12L15 5M22 12L15 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Left Arrow SVG
  const LeftArrow = () => (
    <svg
      width="24"
      height="20"
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black"
    >
      <path
        d="M4 12H22M22 12L15 5M22 12L15 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}
    >
      <span
        ref={rightArrowRef}
        className="inline-flex items-center justify-center"
      >
        <RightArrow />
      </span>
      <span
        ref={leftArrowRef}
        className="absolute inline-flex items-center justify-center"
        style={{ left: 0, top: 0 }}
      >
        <LeftArrow />
      </span>
    </span>
  );
}


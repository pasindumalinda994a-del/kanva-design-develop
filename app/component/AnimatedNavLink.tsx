"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedNavLink({
  href,
  children,
  className = "",
}: AnimatedNavLinkProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const topTextRef = useRef<HTMLSpanElement>(null);
  const bottomTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    if (!container || !topText || !bottomText) return;

    let hoverTimeline: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Animate top text down and out
      hoverTimeline.fromTo(
        topText,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "-100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }
      );

      // Animate bottom text up and in (starting from below)
      hoverTimeline.fromTo(
        bottomText,
        {
          y: "100%",
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1" // Start slightly before top animation ends
      );
    };

    const handleMouseLeave = () => {
      if (hoverTimeline) hoverTimeline.kill();

      hoverTimeline = gsap.timeline();

      // Animate bottom text down and out
      hoverTimeline.fromTo(
        bottomText,
        {
          y: 0,
          opacity: 1,
        },
        {
          y: "100%",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        }
      );

      // Animate top text up and in (starting from above)
      hoverTimeline.fromTo(
        topText,
        {
          y: "-100%",
          opacity: 1,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
        "<0.1" // Start slightly before bottom animation ends
      );
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTimeline) hoverTimeline.kill();
    };
  }, []);

  return (
    <a
      ref={containerRef}
      href={href}
      className={`relative inline-block overflow-hidden ${className}`}
      style={{ fontFamily: "var(--font-figtree)" }}
    >
      <span className="block relative">
        <span
          ref={topTextRef}
          className="block"
        >
          {children}
        </span>
        <span
          ref={bottomTextRef}
          className="block absolute top-0 left-0 w-full"
          style={{ opacity: 0, transform: "translateY(-100%)" }}
        >
          {children}
        </span>
      </span>
    </a>
  );
}


"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeadingTextAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function HeadingTextAnimation({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
}: HeadingTextAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [chars, setChars] = useState<string[]>([]);

  // Split text into characters
  useEffect(() => {
    setChars(text.split(""));
  }, [text]);

  useEffect(() => {
    if (!containerRef.current || chars.length === 0) return;

    const charElements = containerRef.current.querySelectorAll(".char-split");
    
    if (charElements.length === 0) return;

    // Set initial state
    gsap.set(charElements, {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    });

    // Animate from initial state to current with ScrollTrigger
    const animation = gsap.to(charElements, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1.4,
      delay: delay,
      stagger: stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none none",
      },
    });

    // Cleanup on unmount
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [chars, delay, stagger]);

  return (
    <span 
      ref={containerRef}
      className={className}
      style={{ 
        fontKerning: 'none',
        textRendering: 'optimizeSpeed',
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}
    >
      {chars.map((char, index) => (
        <span 
          key={index} 
          className="char-split"
          style={{ display: 'inline-block', whiteSpace: 'normal' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}


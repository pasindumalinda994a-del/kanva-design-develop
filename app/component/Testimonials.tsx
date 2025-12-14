"use client";

import { useRef, useEffect } from "react";
import ImageContainer from "./ImageContainer";
import gsap from "gsap";

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const reviewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate cards
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }

    // Animate text
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }

    // Animate stars
    if (starsRef.current) {
      gsap.fromTo(
        starsRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }

    // Animate reviewer info
    if (reviewerRef.current) {
      gsap.fromTo(
        reviewerRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
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
      <div className="max-w-4xl mx-auto text-center">
        {/* Overlapping Cards */}
        <div
          ref={cardsRef}
          className="flex items-center justify-center mb-8 md:mb-12 relative"
        >
          {/* Left Card - Teal with number 9 */}
          <div className="relative z-10">
            <div className="relative w-24 h-32 md:w-32 md:h-40 rounded-lg overflow-hidden shadow-md">
              {/* Light teal/muted green background */}
              <div className="absolute inset-0 bg-[#9AB5A8]"></div>
              {/* White vertical stripe on left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>
              {/* Number 9 in top right */}
              <div className="absolute top-2 right-2 text-white text-2xl md:text-3xl font-bold">
                9
              </div>
            </div>
          </div>

          {/* Right Card - Product image, partially obscured */}
          <div className="relative -ml-6 md:-ml-8 z-0">
            <ImageContainer
              src="/images/reviewimage3.webp"
              alt="Product"
              delay={0.3}
              className="w-20 h-28 md:w-28 md:h-36 rounded-lg border-0"
            />
          </div>
        </div>

        {/* Testimonial Text */}
        <p
          ref={textRef}
          className="text-xl md:text-2xl lg:text-3xl text-[#171717] mb-6 md:mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-sentient)", fontWeight: 400 }}
        >
          It feels <em className="italic">healthier</em>, <em className="italic">smoother</em> & more{" "}
          <em className="italic">radiant</em> than ever. I love knowing I'm using something natural
          and effective!
        </p>

        {/* Star Rating */}
        <div ref={starsRef} className="flex items-center justify-center gap-1 mb-4 md:mb-6">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 md:w-6 md:h-6 text-[#8B9A7A]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Reviewer Info */}
        <div ref={reviewerRef} className="flex flex-col items-center">
          <span
            className="text-lg md:text-xl text-[#171717] mb-1"
            style={{ fontFamily: "var(--font-sentient)", fontWeight: 400 }}
          >
            Jennifer K.
          </span>
          <span
            className="text-sm md:text-base text-gray-500"
            style={{ fontFamily: "var(--font-sentient)", fontWeight: 300 }}
          >
            Verified Buyer
          </span>
        </div>
      </div>
    </section>
  );
}


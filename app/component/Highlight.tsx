"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "./LoadingProvider";
import HeadingTextAnimation from "./HeadingTextAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function Highlight() {
  const { isLoading } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  const featureContainersRef = useRef<HTMLDivElement>(null);
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;

    // Animate review section
    if (reviewSectionRef.current) {
      gsap.from(reviewSectionRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
      });
    }

    // Animate feature containers
    if (featureContainersRef.current) {
      const containers = featureContainersRef.current.children;
      gsap.from(containers, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading]);


  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 md:py-24 bg-[#F2F2EF]"
    >
      <div className="max-w-8xl mx-56 px-4 md:px-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12">
          {/* Left Side - Heading */}
          <div className="flex-1">
            <div className="space-y-2 md:space-y-3">
              <h2
                className="text-xl md:text-2xl lg:text-5xl xl:text-6xl font-normal text-[#1A1C18] leading-tight"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                <HeadingTextAnimation 
                  text="Why Your Skin" 
                  delay={0.2}
                />
              </h2>
              <h3
                className="text-xl md:text-2xl lg:text-5xl xl:text-6xl font-light italic text-[#1A1C18] leading-tight"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                <HeadingTextAnimation 
                  text="Deserves the Best" 
                  delay={0.3}
                />
              </h3>
            </div>
          </div>

          {/* Right Side - Review Section */}
          <div
            ref={reviewSectionRef}
            className="flex flex-col items-start md:items-end gap-4"
          >
            {/* Rating and Review Count */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-start md:items-end gap-2">
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="#3C4433"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 md:w-5 md:h-5"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>

                <span
                  className="text-sm md:text-base text-[#1a1a1a] font-medium"
                  style={{ fontFamily: "var(--font-figtree)" }}
                >
                  4.7 (1,109 reviews)
                </span>
              </div>

              {/* Review Avatars */}
              <div ref={avatarContainerRef} className="flex items-center -space-x-2">
                {/* Image Container 1 */}
                <div
                  className="relative"
                  style={{ 
                    zIndex: 1,
                    transform: `rotate(-5deg)`
                  }}
                >
                  <div className="inline-block border-5 border-white overflow-hidden shadow-sm !w-16 !h-12 md:!w-16 md:!h-16 !rounded-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/reviewimage1.webp"
                        alt="Reviewer 1"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 64px"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Container 2 */}
                <div
                  className="relative"
                  style={{ 
                    zIndex: 2,
                    transform: `rotate(8deg)`
                  }}
                >
                  <div className="inline-block border-5 border-white overflow-hidden shadow-sm !w-16 !h-12 md:!w-16 md:!h-16 !rounded-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/reviewimage2.webp"
                        alt="Reviewer 2"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 64px"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Container 3 */}
                <div
                  className="relative"
                  style={{ 
                    zIndex: 3,
                    transform: `rotate(-3deg)`
                  }}
                >
                  <div className="inline-block border-5 border-white overflow-hidden shadow-sm !w-16 !h-12 md:!w-16 md:!h-16 !rounded-lg">
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/reviewimage3.webp"
                        alt="Reviewer 3"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 64px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Feature Containers */}
        <div
          ref={featureContainersRef}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          {/* Left Side - Proven Effectiveness */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 min-h-[500px] md:min-h-[600px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/highlightvideo.mp4" type="video/mp4" />
            </video>
            {/* Proven Effectiveness Overlay */}
            <div className="absolute bottom-8 left-8 bg-white rounded-xl p-4 md:p-6 max-w-sm shadow-lg">
              <div className="flex items-start gap-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-600 flex-shrink-0 mt-1"
                >
                  <path
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    fill="currentColor"
                  />
                </svg>
                <div>
                  <h4
                    className="text-lg md:text-xl font-medium text-[#171717] mb-1"
                    style={{ fontFamily: "var(--font-sentient)" }}
                  >
                    Proven
                  </h4>
                  <h5
                    className="text-lg md:text-xl font-light italic text-[#171717] mb-2"
                    style={{ fontFamily: "var(--font-sentient)" }}
                  >
                    Effectiveness
                  </h5>
                  <p
                    className="text-xs md:text-sm text-gray-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    Every product is carefully crafted to meet the highest quality standards.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Two Panels Stacked */}
          <div className="flex flex-col gap-4 md:gap-6 min-h-[450px] md:min-h-[550px]">
            {/* Top Right Panel - Eco-Friendly Packaging */}
            <div className="w-full flex-1 bg-[#E8E8E1] rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Recycling Symbol */}
              <div className="mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#3C4433]"
                >
                  <path
                    d="M5 7h14l-1 5H6l-1-5zm1.5-2L7 2h10l.5 3H6.5zM7 20c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm10 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h4
                className="text-3xl md:text-5xl font-medium text-[#171717] mb-1"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                Eco-Friendly
              </h4>
              <h5
                className="text-3xl md:text-5xl font-light italic text-[#171717] mb-3"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                Packaging
              </h5>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-1">
                  <p
                    className="text-sm md:text-base text-gray-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    Eco-friendly materials designed to care
                  </p>
                  <p
                    className="text-sm md:text-base text-gray-600 leading-relaxed"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    for the planet as much as your skin.
                  </p>
                </div>
                <img
                  src="/images/highlightimage3.webp"
                  alt="Eco-Friendly Packaging"
                  className="w-24 md:w-32 h-auto rounded-2xl object-contain flex-shrink-0 -mt-32 mr-16"
                />
              </div>
            </div>
            {/* Product Bottle Image */}
           
          </div>

          {/* Bottom Right Panel - 100% Natural */}
          <div className="w-full flex-1 bg-[#3C4433] rounded-2xl p-6 md:p-8 flex flex-row gap-6 relative overflow-hidden">
            <img
              src="/images/highlightimage1.webp"
              alt="100% Natural"
              className="w-32 md:w-36 h-auto rounded-2xl object-contain flex-shrink-0 "
            />
            <div className="flex-1 flex flex-col">
              <h4
                className="text-3xl md:text-5xl font-medium text-white mb-1"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                100% Natural
              </h4>
              <h5
                className="text-3xl md:text-5xl font-light italic text-white mb-4"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                100% You
              </h5>
              {/* Bullet Points */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                  >
                    <path
                      d="M19.79 5L18.5 3.21c-.37-.37-.88-.58-1.42-.58H6.92c-.54 0-1.05.21-1.42.58L4.21 5H2v2h1.79l1.5 1.5v9.5c0 1.38 1.12 2.5 2.5 2.5h9.5c1.38 0 2.5-1.12 2.5-2.5V8.5l1.5-1.5H22V5h-2.21z"
                      fill="currentColor"
                    />
                    <line
                      x1="4"
                      y1="4"
                      x2="20"
                      y2="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p
                    className="text-sm md:text-base text-white"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    No Harsh Chemicals
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                  >
                    <path
                      d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66c.81-2.34 1.62-4.56 2.96-6.38C10.5 14.5 13 14 17 12V8z"
                      fill="currentColor"
                    />
                  </svg>
                  <p
                    className="text-sm md:text-base text-white"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    Plant-Based Goodness
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-green-400 flex-shrink-0"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                    />
                  </svg>
                  <p
                    className="text-sm md:text-base text-white"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    Ethically Sourced
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

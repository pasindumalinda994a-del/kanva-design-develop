"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "./LoadingProvider";
import HeadingTextAnimation from "./HeadingTextAnimation";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Benefit() {
  const { isLoading } = useLoading();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  // Set initial hidden state for headline
  useEffect(() => {
    if (!containerRef.current) return;

    if (headlineRef.current) {
      gsap.set(headlineRef.current, {
        opacity: 0,
      });
    }
  }, []);

  // Start animations when component enters viewport using ScrollTrigger
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        setShouldAnimate(true);
      },
      once: true,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    // Animate image container
    if (imageContainerRef.current) {
      gsap.from(imageContainerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      });
    }
  }, [isLoading]);

  // Animate headline container
  useEffect(() => {
    if (!shouldAnimate || !headlineRef.current) return;

    gsap.to(headlineRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      if (headlineRef.current) gsap.killTweensOf(headlineRef.current);
    };
  }, [shouldAnimate]);

  const features = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Chemical flask/beaker */}
          <path
            d="M8 2H16V4H14V8H18C19.1 8 20 8.9 20 10V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V10C4 8.9 4.9 8 6 8H10V4H8V2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Crossed out line */}
          <line
            x1="7"
            y1="7"
            x2="17"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      text: "No Harsh Chemicals",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Leaf */}
          <path
            d="M12 2C8 2 5 5 5 9C5 13 8 18 12 22C16 18 19 13 19 9C19 5 16 2 12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      text: "Plant-Based Goodness",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Heart */}
          <path
            d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ribbon/loop */}
          <path
            d="M8 8C8 8 10 6 12 8C14 6 16 8 16 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      text: "Ethically Sourced",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-8 md:py-12 bg-[#F2F2EF]"
    >
      {/* Content Container */}
      <div className="max-w-8xl mx-16 px-4">
        {/* Image Container with Text Overlay */}
        <div
          ref={imageContainerRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-4xl overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/benifitimage.webp"
              alt="Natural skincare benefits"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
              priority
            />
          </div>

          {/* Left Gradient Overlay for text readability */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 md:w-2/5 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-20"></div>

          {/* Text Content Overlay */}
          <div className="absolute left-8 md:left-16 lg:left-28 top-1/2 -translate-y-1/2 z-30 max-w-lg md:max-w-2xl space-y-3 md:space-y-5">
            {/* Headline */}
            <div 
              ref={headlineRef}
              className="space-y-1 md:space-y-2"
            >
              <h2
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white leading-tight"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                <HeadingTextAnimation
                  text="Eco-Friendly,"
                  delay={shouldAnimate ? 0.4 : 0}
                  stagger={0.04}
                />
              </h2>
              <h3
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light italic text-gray-200 leading-tight"
                style={{ fontFamily: "var(--font-sentient)" }}
              >
                <HeadingTextAnimation
                  text="Skin-Friendly"
                  delay={shouldAnimate ? 0.5 : 0}
                  stagger={0.04}
                />
              </h3>
            </div>

            {/* Body Paragraph */}
            <div
              className="text-sm md:text-base lg:text-2xl text-gray-200/75 leading-relaxed mt-1 md:mt-2"
              style={{ fontFamily: "var(--font-figtree)" }}
            >
              <div>100% natural means every ingredient is</div>
              <div>carefully selected from nature to provide</div>
              <div>safe, effective, and gentle care for your skin.</div>
            </div>

            {/* Features List */}
            <div
              className="space-y-3 md:space-y-4 pt-8 md:pt-12"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="feature-item flex items-center gap-3 md:gap-4 text-gray-200/75"
                >
                  <div className="flex-shrink-0 text-gray-300/75">
                    {feature.icon}
                  </div>
                  <span
                    className="text-sm md:text-base lg:text-lg"
                    style={{ fontFamily: "var(--font-figtree)" }}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

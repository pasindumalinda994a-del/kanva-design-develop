"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shopNowLinkRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  
  const images = [
    "/images/heroimage1.webp",
    "/images/heroimage2.webp",
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImage(index);
  };

  useEffect(() => {
    let isTransitioning = false;
    
    // Handle carousel transition
    if (imageContainerRef.current) {
      isTransitioning = true;
      imageContainerRef.current.style.transition = 'transform 500ms ease-in-out';
      
      // Reset transition after animation completes
      setTimeout(() => {
        if (imageContainerRef.current) {
          isTransitioning = false;
          imageContainerRef.current.style.transition = 'none';
        }
      }, 500);
    }
  }, [currentImage]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const link = shopNowLinkRef.current;
    const underline = underlineRef.current;

    if (!link || !underline) return;

    let hoverTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      if (hoverTween) hoverTween.kill();
      
      // Animate underline to 2/3 of its original width (decrease by 1/3)
      hoverTween = gsap.to(underline, {
        scaleX: 0.33, // 2/3 of original width
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      
      // Animate underline back to full width
      hoverTween = gsap.to(underline, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverTween) hoverTween.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-screen">
      {/* Full Screen Image Carousel */}
      <div className="w-full h-screen relative overflow-hidden">
        <div
          ref={imageContainerRef}
          className="flex h-full will-change-transform"
          style={{
            transform: `translateX(-${currentImage * 100}%) translateY(${scrollY * 0.5}px)`
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full relative">
              <Image
                src={image}
                alt={`Hero image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Left Gradient Overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black/40 to-transparent z-10 pointer-events-none"></div>

        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black/40 to-transparent z-10 pointer-events-none"></div>

        {/* Heading Text Overlay */}
        <div 
          ref={textRef} 
          className="absolute left-12 md:left-20 lg:left-28 xl:left-32 top-1/2 z-20 max-w-lg will-change-transform"
          style={{
            transform: `translateY(calc(-50% + ${scrollY * 0.3}px))`
          }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-white mb-2" style={{ fontFamily: 'var(--font-sentient)' }}>
            Natural
          </h1>
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light italic text-gray-200 mb-4" style={{ fontFamily: 'var(--font-sentient)' }}>
            Skincare
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-6" style={{ fontFamily: 'var(--font-figtree)' }}>
            Start your day with gentle care and nourishing ingredients designed to awaken your skin naturally.
          </p>
          <a
            ref={shopNowLinkRef}
            href="#shop"
            className="text-white text-base md:text-lg hover:text-gray-200 transition-colors relative inline-block"
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
            Shop Now
            <div
              ref={underlineRef}
              className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left"
            />
          </a>
        </div>

        {/* Container for aligned controls - matches Navbar layout */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="w-full max-w-8xl mx-6 relative h-full">
            {/* Left Arrow */}
            <button
              onClick={prevImage}
              className="absolute bg-[#1A1C18]/50 rounded-lg left-0 top-1/2 -translate-y-1/2 z-10 transition-opacity"
              aria-label="Previous image"
            >
              <Image
                src="/images/leftarrow.svg"
                alt="Previous"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextImage}
              className="absolute bg-[#1A1C18]/50 rounded-lg right-0 top-1/2 -translate-y-1/2 z-10 transition-opacity"
              aria-label="Next image"
            >
              <Image
                src="/images/rightarrow.svg"
                alt="Next"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-[#1A1C18]/25 backdrop-blur-sm rounded-full px-2 py-2">
              {[0, 1].map((index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`h-2 rounded-full transition-all ${
                    currentImage === index
                      ? "bg-white w-2"
                      : "bg-white/50 hover:bg-white/75 w-2"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

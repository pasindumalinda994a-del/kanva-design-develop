"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
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

  return (
    <section className="relative w-full min-h-screen">
      {/* Full Screen Image Carousel */}
      <div className="w-full h-screen relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
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

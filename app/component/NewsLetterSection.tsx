"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function NewsLetterSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate container
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power2.out",
      }
    );

    // Animate form
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
        }
      );
    }

    // Animate image
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          x: 20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power2.out",
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <section className="w-full py-20 md:py-32 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#F2F2EF]">
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="bg-[#3C4433] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
            {/* Left Side - Text and Form */}
            <div
              ref={formRef}
              className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
            >
              <div className="flex flex-col space-y-4 md:space-y-6">
                {/* Main Heading */}
                <h2
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight"
                  style={{ fontFamily: "var(--font-sentient)" }}
                >
                  Stay Updated,
                </h2>

                {/* Subheading */}
                <h3
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal italic text-gray-300 leading-tight"
                  style={{ fontFamily: "var(--font-sentient)" }}
                >
                  Stay Radiant
                </h3>

                {/* Description */}
                <p
                  className="text-sm md:text-base text-gray-300 mt-4 md:mt-6 max-w-md leading-relaxed"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                >
                  Be the first to know about new products, offers, and skincare tips.
                </p>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mt-6 md:mt-8">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm md:text-base"
                    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#6B7A5F] text-white font-medium hover:bg-[#5A6754] transition-colors duration-300 text-sm md:text-base whitespace-nowrap"
                    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side - Product Image with Leaves */}
            <div
              ref={imageRef}
              className="flex-1 relative w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-full overflow-visible"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Product Image - Using product.png, replace with actual newsletter product image if available */}
                <div className="relative w-full h-full max-w-md">
                  <Image
                    src="/images/product.png"
                    alt="Skincare Product"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeadingTextAnimation from "./HeadingTextAnimation";
import ProductCard, { Product } from "./ProductCard";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BestSelling() {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Cleansers");
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const himage1Ref = useRef<HTMLDivElement>(null);
  const himage2Ref = useRef<HTMLDivElement>(null);
  const himage3Ref = useRef<HTMLDivElement>(null);

  // Set initial hidden states
  useEffect(() => {
    if (!containerRef.current) return;

    // Hide all content initially
    gsap.set([line1Ref.current, line2Ref.current], {
      opacity: 0,
    });

    if (himage1Ref.current) {
      gsap.set(himage1Ref.current, {
        opacity: 0,
        scale: 0.3,
        rotation: -5,
      });
    }
    if (himage2Ref.current) {
      gsap.set(himage2Ref.current, {
        opacity: 0,
        scale: 0.3,
        rotation: 5,
      });
    }
    if (himage3Ref.current) {
      gsap.set(himage3Ref.current, {
        opacity: 0,
        scale: 0.3,
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

  // Animate himage1
  useEffect(() => {
    if (!shouldAnimate || !himage1Ref.current) return;

    gsap.fromTo(himage1Ref.current, {
      opacity: 0,
      scale: 0.3,
      rotation: -5,
    }, {
      opacity: 1,
      scale: 1,
      rotation: 8,
      duration: 0.8,
      delay: 1.2,
      ease: "back.out(1.7)",
    });

    return () => {
      gsap.killTweensOf(himage1Ref.current);
    };
  }, [shouldAnimate]);

  // Animate himage2
  useEffect(() => {
    if (!shouldAnimate || !himage2Ref.current) return;

    gsap.fromTo(himage2Ref.current, {
      opacity: 0,
      scale: 0.3,
      rotation: 5,
    }, {
      opacity: 1,
      scale: 1,
      rotation: -8,
      duration: 0.8,
      delay: 2.1,
      ease: "back.out(1.7)",
    });

    return () => {
      gsap.killTweensOf(himage2Ref.current);
    };
  }, [shouldAnimate]);

  // Animate himage3
  useEffect(() => {
    if (!shouldAnimate || !himage3Ref.current) return;

    gsap.fromTo(himage3Ref.current, {
      opacity: 0,
      scale: 0.3,
    }, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: 3.2,
      ease: "back.out(1.7)",
    });

    return () => {
      gsap.killTweensOf(himage3Ref.current);
    };
  }, [shouldAnimate]);

  // Animate line containers
  useEffect(() => {
    if (!shouldAnimate) return;

    if (line1Ref.current) {
      gsap.to(line1Ref.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    if (line2Ref.current) {
      gsap.to(line2Ref.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
        ease: "power2.out",
      });
    }

    return () => {
      if (line1Ref.current) gsap.killTweensOf(line1Ref.current);
      if (line2Ref.current) gsap.killTweensOf(line2Ref.current);
    };
  }, [shouldAnimate]);

  const categories = ["Cleansers", "Lotions", "Moisturizers"];
  const productsRef = useRef<HTMLDivElement>(null);

  // Product data for each category
  const productsData: Product[] = [
    // Cleansers
    {
      id: 1,
      name: "Hydra Drops Cleanser",
      price: "$29.99",
      discount: "20% OFF",
      image: "/images/products/hydra-drops1.png",
      hoverImage: "/images/products/hydra-drops2.jpg",
    },
    {
      id: 2,
      name: "Gentle Foam Cleanser",
      price: "$24.99",
      image: "/images/products/hydra-drops1.png",
      hoverImage: "/images/products/hydra-drops2.jpg",
    },
    {
      id: 3,
      name: "Purifying Gel Cleanser",
      price: "$26.99",
      discount: "10% OFF",
      image: "/images/products/hydra-drops1.png",
      hoverImage: "/images/products/hydra-drops2.jpg",
    },
    // Lotions
    {
      id: 4,
      name: "Glow Milk Lotion",
      price: "$34.99",
      discount: "15% OFF",
      image: "/images/products/glow-milk1.png",
      hoverImage: "/images/products/glow-milk2.jpg",
    },
    {
      id: 5,
      name: "Nourishing Body Lotion",
      price: "$27.99",
      image: "/images/products/glow-milk1.png",
      hoverImage: "/images/products/glow-milk2.jpg",
    },
    {
      id: 6,
      name: "Silk Touch Lotion",
      price: "$32.99",
      discount: "12% OFF",
      image: "/images/products/glow-milk1.png",
      hoverImage: "/images/products/glow-milk2.jpg",
    },
    // Moisturizers
    {
      id: 7,
      name: "Daily Cream Moisturizer",
      price: "$39.99",
      discount: "25% OFF",
      image: "/images/products/daily-cream1.png",
      hoverImage: "/images/products/daily-cream2.jpg",
    },
    {
      id: 8,
      name: "Intensive Hydration Cream",
      price: "$44.99",
      image: "/images/products/daily-cream1.png",
      hoverImage: "/images/products/daily-cream2.jpg",
    },
    {
      id: 9,
      name: "Night Repair Moisturizer",
      price: "$49.99",
      discount: "18% OFF",
      image: "/images/products/daily-cream1.png",
      hoverImage: "/images/products/daily-cream2.jpg",
    },
  ];

  // Filter products based on active category
  const getProductsByCategory = (category: string): Product[] => {
    switch (category) {
      case "Cleansers":
        return productsData.slice(0, 3);
      case "Lotions":
        return productsData.slice(3, 6);
      case "Moisturizers":
        return productsData.slice(6, 9);
      default:
        return [];
    }
  };

  const displayedProducts = getProductsByCategory(activeCategory);

  return (
    <section 
      ref={containerRef}
      className="w-full py-16 px-6 md:px-12 lg:px-20 xl:px-32 bg-[#F2F2EF]"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Category Buttons */}
       

        {/* First Line */}
        <div 
          ref={line1Ref}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          style={{ fontFamily: 'var(--font-sentient)', fontStyle: 'italic', fontWeight: 400 }}
        >
          <HeadingTextAnimation 
            text="Refresh your skin," 
            delay={shouldAnimate ? 0.5 : 0} 
            stagger={0.04}
          />
          <div
            ref={himage1Ref}
            className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-lg border-5 border-white overflow-hidden shadow-sm"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/himage1.webp"
                alt="Healthy skin"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48px, 64px"
              />
            </div>
          </div>
          <HeadingTextAnimation 
            text="love yourself," 
            delay={shouldAnimate ? 1.4 : 0} 
            stagger={0.04}
          />
          <div
            ref={himage2Ref}
            className="inline-block w-12 h-12 md:w-16 md:h-16 rounded-lg border-5 border-white overflow-hidden shadow-sm"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/himage2.webp"
                alt="Himage 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 48px, 64px"
              />
            </div>
          </div>
        </div>

        {/* Second Line */}
        <div 
          ref={line2Ref}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          style={{ fontFamily: 'var(--font-sentient)', fontStyle: 'italic', fontWeight: 400 }}
        >
          <HeadingTextAnimation 
            text="renew your glow." 
            delay={shouldAnimate ? 2.5 : 0} 
            stagger={0.04}
          />
          <div 
            ref={himage3Ref}
            className="inline-block relative w-20 h-20 md:w-24 md:h-24"
          >
            <Image
              src="/images/himage3.png"
              alt="Himage 3"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80px, 96px"
            />
          </div>
        </div>

        {/* Category Buttons Below Headings */}
        <div 
          className="flex items-center justify-center gap-2 md:gap-3 mt-12 md:mt-16"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`
                  px-2 md:px-3 py-1 md:py-1.5 rounded-md
                  transition-all duration-300 ease-in-out
                  font-tight text-sm
                  ${isActive 
                    ? 'bg-[#3C4433] text-white shadow-md' 
                    : 'bg-[#DBDBD1] text-gray-700'
                  }
                `}
                style={{ fontFamily: 'var(--font-figtree)' }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div 
          ref={productsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16 max-w-6xl mx-auto"
        >
          {displayedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <ProductCard
                product={product}
                onCardClick={(productId) => {
                  console.log("Product clicked:", productId);
                }}
                onFavoriteClick={(productId) => {
                  console.log("Favorite clicked:", productId);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


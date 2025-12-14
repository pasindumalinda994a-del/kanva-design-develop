"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import HotspotContainer, { HotspotProduct } from "./HotspotContainer";
import HeadingTextAnimation from "./HeadingTextAnimation";
import { useLoading } from "./LoadingProvider";

export default function Hero() {
  const { isLoading } = useLoading();
  const [shouldAnimateHeadings, setShouldAnimateHeadings] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [clickedHotspot, setClickedHotspot] = useState<number | null>(null);
  const [hotspotPositions, setHotspotPositions] = useState<{ [key: number]: { x: number; y: number } }>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shopNowLinkRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const hotspot1Ref = useRef<HTMLButtonElement>(null);
  const hotspot2Ref = useRef<HTMLButtonElement>(null);
  const container1Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLButtonElement>(null);
  const rightArrowRef = useRef<HTMLButtonElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const hotspot1ContainerRef = useRef<HTMLDivElement>(null);
  const hotspot2ContainerRef = useRef<HTMLDivElement>(null);

  // Start heading animations only after loading completes
  useEffect(() => {
    if (!isLoading) {
      setShouldAnimateHeadings(true);
    }
  }, [isLoading]);
  
  const images = [
    "/images/heroimage1.webp",
    "/images/heroimage2.webp",
  ];

  const hotspotProducts: HotspotProduct[] = [
    {
      id: 1,
      category: "Moisturizers",
      name: "Daily Cream",
      price: "$11.00",
      image: "/images/products/daily-cream1.png",
    },
    {
      id: 2,
      category: "Serums",
      name: "Vitamin C Serum",
      price: "$15.00",
      image: "/images/products/hydra-drops1.png",
    },
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

  // Apply parallax effect to all elements on the same layer
  useEffect(() => {
    const parallaxSpeed = 0.3; // Same speed for all elements to keep them aligned
    
    const updateParallax = () => {
      if (textRef.current) {
        textRef.current.style.transform = `translateY(calc(-50% + ${scrollY * parallaxSpeed}px))`;
      }
      
      if (leftArrowRef.current) {
        leftArrowRef.current.style.transform = `translateY(calc(-50% + ${scrollY * parallaxSpeed}px))`;
      }
      
      if (rightArrowRef.current) {
        rightArrowRef.current.style.transform = `translateY(calc(-50% + ${scrollY * parallaxSpeed}px))`;
      }
      
      if (indicatorsRef.current) {
        indicatorsRef.current.style.transform = `translateX(-50%) translateY(${scrollY * parallaxSpeed}px)`;
      }
      
      if (hotspot1ContainerRef.current) {
        hotspot1ContainerRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
      
      if (hotspot2ContainerRef.current) {
        hotspot2ContainerRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };
    
    requestAnimationFrame(updateParallax);
  }, [scrollY]);

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

  // Calculate hotspot positions and handle hover animations
  useEffect(() => {
    const updatePositions = () => {
      const positions: { [key: number]: { x: number; y: number } } = {};
      
      if (hotspot1Ref.current) {
        const rect = hotspot1Ref.current.getBoundingClientRect();
        positions[1] = {
          x: rect.left + rect.width / 2,
          y: rect.bottom + 20, // Position below the hotspot
        };
      }
      
      if (hotspot2Ref.current) {
        const rect = hotspot2Ref.current.getBoundingClientRect();
        positions[2] = {
          x: rect.left + rect.width / 2,
          y: rect.bottom + 20, // Position below the hotspot
        };
      }
      
      setHotspotPositions(positions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, [currentImage, scrollY]);

  // Handle hotspot click toggling
  const handleHotspotClick = (hotspotId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setClickedHotspot((prev) => (prev === hotspotId ? null : hotspotId));
  };

  // Close hotspot when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if click is outside hotspot buttons and containers
      if (
        clickedHotspot !== null &&
        !target.closest('[aria-label^="Hotspot"]') &&
        !target.closest('.bg-white.rounded-xl.shadow-xl') &&
        !container1Ref.current?.contains(target) &&
        !container2Ref.current?.contains(target)
      ) {
        setClickedHotspot(null);
      }
    };

    if (clickedHotspot !== null) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [clickedHotspot]);

  // Handle hotspot click animations
  useEffect(() => {
    const container1 = container1Ref.current;
    const container2 = container2Ref.current;

    if (clickedHotspot === 1 && container1) {
      gsap.killTweensOf(container1);
      gsap.fromTo(
        container1,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else if (container1) {
      gsap.killTweensOf(container1);
      gsap.to(container1, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }

    if (clickedHotspot === 2 && container2) {
      gsap.killTweensOf(container2);
      gsap.fromTo(
        container2,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );
    } else if (container2) {
      gsap.killTweensOf(container2);
      gsap.to(container2, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [clickedHotspot]);

  // Animate paragraph and link after loading completes and headings finish
  useEffect(() => {
    if (isLoading) return;
    
    // Calculate when headings finish: "Skincare" starts at 0.4s delay + (8 letters * 0.06 stagger) ≈ 0.88s
    // Add extra delay to start after headings complete
    const headingCompleteTime = 0.4 + (8 * 0.06) + 0.2; // ~1.08s after loading
    
    let paragraphTween: gsap.core.Tween | null = null;
    let linkTween: gsap.core.Tween | null = null;
    
    if (paragraphRef.current) {
      paragraphTween = gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: headingCompleteTime,
      });
    }
    
    if (shopNowLinkRef.current) {
      linkTween = gsap.from(shopNowLinkRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        delay: headingCompleteTime + 0.3,
      });
    }
    
    return () => {
      if (paragraphTween) paragraphTween.kill();
      if (linkTween) linkTween.kill();
    };
  }, [isLoading]);

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

        {/* Hotspot Dots */}
        <div ref={hotspot1ContainerRef} className="absolute right-8/20 top-8/20 z-20 will-change-transform">
          <button
            ref={hotspot1Ref}
            className="relative group cursor-pointer"
            aria-label="Hotspot 1"
            onClick={(e) => handleHotspotClick(1, e)}
          >
            <div className={`w-3 h-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-white shadow-lg transition-all duration-300 ${
              clickedHotspot === 1 ? 'scale-75' : 'group-hover:scale-75'
            }`}></div>
            <div className={`absolute inset-0 rounded-full bg-white/40 ${
              clickedHotspot === 1 ? '' : 'animate-ping group-hover:animate-none'
            }`}></div>
          </button>
        </div>

        <div ref={hotspot2ContainerRef} className="absolute right-6/20 top-15/20 z-20 will-change-transform">
          <button
            ref={hotspot2Ref}
            className="relative group cursor-pointer"
            aria-label="Hotspot 2"
            onClick={(e) => handleHotspotClick(2, e)}
          >
            <div className={`w-3 h-3 rounded-full bg-white/80 backdrop-blur-sm border-2 border-white shadow-lg transition-all duration-300 ${
              clickedHotspot === 2 ? 'scale-75' : 'group-hover:scale-75'
            }`}></div>
            <div className={`absolute inset-0 rounded-full bg-white/40 ${
              clickedHotspot === 2 ? '' : 'animate-ping group-hover:animate-none'
            }`}></div>
          </button>
        </div>

        {/* Heading Text Overlay */}
        <div 
          ref={textRef} 
          className="absolute left-12 md:left-20 lg:left-28 xl:left-32 top-[70%] z-20 max-w-lg will-change-transform"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal text-white mb-2" style={{ fontFamily: 'var(--font-sentient)' }}>
            {shouldAnimateHeadings ? (
              <HeadingTextAnimation text="Natural" delay={0.2} stagger={0.06} />
            ) : (
              <span>Natural</span>
            )}
          </h1>
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light italic text-gray-200 mb-4" style={{ fontFamily: 'var(--font-sentient)' }}>
            {shouldAnimateHeadings ? (
              <HeadingTextAnimation text="Skincare" delay={0.4} stagger={0.06} />
            ) : (
              <span>Skincare</span>
            )}
          </h2>
          <p 
            ref={paragraphRef}
            className="text-base md:text-lg text-gray-300 mb-6" 
            style={{ fontFamily: 'var(--font-figtree)' }}
          >
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
              ref={leftArrowRef}
              onClick={prevImage}
              className="absolute bg-[#1A1C18]/50 rounded-lg left-0 top-1/2 z-20 transition-opacity will-change-transform"
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
              ref={rightArrowRef}
              onClick={nextImage}
              className="absolute bg-[#1A1C18]/50 rounded-lg right-0 top-1/2 z-20 transition-opacity will-change-transform"
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
            <div ref={indicatorsRef} className="absolute bottom-8 left-1/2 flex gap-2 z-20 bg-[#1A1C18]/25 backdrop-blur-sm rounded-full px-2 py-2 will-change-transform">
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

        {/* Hotspot Containers */}
        {hotspotPositions[1] && (
          <HotspotContainer
            ref={container1Ref}
            product={hotspotProducts[0]}
            position={hotspotPositions[1]}
            isVisible={clickedHotspot === 1}
            onClose={() => setClickedHotspot(null)}
          />
        )}

        {hotspotPositions[2] && (
          <HotspotContainer
            ref={container2Ref}
            product={hotspotProducts[1]}
            position={hotspotPositions[2]}
            isVisible={clickedHotspot === 2}
            onClose={() => setClickedHotspot(null)}
          />
        )}
      </div>
    </section>
  );
}

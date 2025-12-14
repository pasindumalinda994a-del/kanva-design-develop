"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: "usa", name: "United States (USD)", flag: "/images/usa.svg" },
  { code: "ger", name: "Germany (EUR)", flag: "/images/Ger.svg" },
  { code: "fr", name: "Czechia (CZK)", flag: "/images/fr.svg" },
];

interface CountrySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: Country) => void;
  selectedCountry: Country;
  countryButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export default function CountrySelector({
  isOpen,
  onClose,
  onSelectCountry,
  selectedCountry,
  countryButtonRef,
}: CountrySelectorProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isMounted = useRef(false);

  // Set initial state on mount and mark as mounted
  useEffect(() => {
    if (overlayRef.current && contentRef.current) {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(contentRef.current, { opacity: 0, y: -10 });
      // Mark as mounted after a small delay to ensure initial state is set
      setTimeout(() => {
        isMounted.current = true;
      }, 0);
    }
  }, []);

  // Update position based on country button position
  useEffect(() => {
    if (!containerRef.current || !countryButtonRef?.current) return;

    const buttonRect = countryButtonRef.current.getBoundingClientRect();
    containerRef.current.style.left = `${buttonRect.left}px`;
  }, [isOpen, countryButtonRef]);

  // Animate on isOpen change
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return;

    // Skip animation on first render - always skip the first render to prevent flash
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Ensure initial state is set correctly
      if (!isOpen) {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(contentRef.current, { opacity: 0, y: -10 });
      }
      return;
    }

    // Don't animate until component is fully mounted
    if (!isMounted.current) {
      return;
    }

    if (isOpen) {
      // Animate in - smooth opacity 0 -> 1
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      // Animate out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const handleCountrySelect = (country: Country) => {
    onSelectCountry(country);
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 z-40"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
        }}
        onClick={onClose}
      />

      {/* Dropdown container - positioned below navbar with small gap */}
      <div
        ref={containerRef}
        className="fixed top-32 z-50"
        style={{ visibility: isOpen ? "visible" : "hidden" }}
      >
        <div
          ref={contentRef}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden min-w-[250px]"
        >
          <div className="p-2">
            {countries
              .filter((country) => country.code !== selectedCountry.code)
              .map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-50"
                >
                  <Image
                    src={country.flag}
                    alt={country.name}
                    width={24}
                    height={18}
                    className="w-6 h-auto"
                  />
                  <span className="text-sm text-gray-800 font-normal">
                    {country.name}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}


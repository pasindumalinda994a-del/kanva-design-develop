"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import WebsiteLoading from "./WebsiteLoading";

interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the callback to prevent dependency array changes
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle body scroll locking and background
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.backgroundColor = "#3C4433";
    } else {
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.backgroundColor = "";
    };
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {isLoading && <WebsiteLoading onComplete={handleLoadingComplete} />}
      <div 
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.3s ease-in-out",
          visibility: isLoading ? "hidden" : "visible"
        }}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  );
}


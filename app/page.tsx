"use client";

import Navbar from "./component/Navbar";
import Hero from "./component/Hero";
import FeatureCards from "./component/FeatureCards";
import BestSelling from "./component/BestSelling";
import Benefit from "./component/Benefit";
import Highlight from "./component/Highlight";
import Testimonials from "./component/Testimonials";
import ProductSection from "./component/ProductSection";
import NewsLetterSection from "./component/NewsLetterSection";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
     
      <FeatureCards />
      <BestSelling />
      <Benefit />
      <Highlight />
      <Testimonials />
      <ProductSection />
      <NewsLetterSection />
    </div>
  );
}

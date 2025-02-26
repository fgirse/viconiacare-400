"use client";

import IntroWebside from "@/src/sections/Intro";
import Hero from "@/src/sections/Hero";
import FeatureAnimated from "@/src/sections/FeatureAnimated";
import ColorChangeCards from "@/src/sections/ColorChangeCards";
import  CallToAct from "@/src/sections/CallToAct";
import HorizontalScroll from "@/src/components/HorizontalScrollCarousel";
import CollapseCardFeatures from "@/src/sections/ColllapsCardFeatures";
import ArrayTest from "@/src/sections/ColllapsCardFeatures";  
          
export default function Page() {
  return (
    <>
      <div className="bg-[#302f2e] lg:px-[2.5vw] text-white">
        <Hero />
        <IntroWebside />
        <div className="bg-[#0D121F] text-white">
          <CollapseCardFeatures />
          <FeatureAnimated />   
          <ColorChangeCards />
          <CallToAct />
         <HorizontalScroll />
        </div>
      </div>
    </>
  );
}
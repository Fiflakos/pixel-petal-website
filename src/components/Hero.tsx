
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  console.log("Rendering Hero component");
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 bg-white">
      <div className="container mx-auto px-4 relative z-10 pt-20 md:pt-0 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={300} animation="fade-in-up">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <p className="uppercase tracking-widest text-sm md:text-base font-light text-black">Witaj</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-tight text-black">
                  Wiktor Zalewski
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg font-light">
                Eleganckie, profesjonalne prace modelingowe z dbałością o detal i artystyczny wyraz.
              </p>
              <div className="pt-4 flex space-x-4">
                <a 
                  href="#sesje" 
                  className="inline-block border border-gray-900 px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  Zobacz Prace
                </a>
                <a 
                  href="/sesje" 
                  className="inline-block bg-gray-900 text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-700 transition-all duration-300"
                >
                  Sesje
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={600} animation="fade-in">
            <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden relative">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 italic">Główne zdjęcie</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-9 border border-gray-400 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400">Przewiń</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

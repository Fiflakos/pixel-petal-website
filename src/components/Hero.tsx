
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30 backdrop-blur-[2px]" />
      </div>
      
      <div className="container-padding max-w-7xl mx-auto relative z-10 pt-20 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={300} animation="fade-in-up">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <p className="uppercase tracking-widest text-sm md:text-base font-light">Welcome</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium leading-tight">
                  Minimalist Portfolio
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-700 max-w-lg font-light text-pretty">
                I create elegant, functional designs with meticulous attention to detail and thoughtful interactions.
              </p>
              <div className="pt-4">
                <a 
                  href="#works" 
                  className="inline-block border border-gray-900 px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all duration-300"
                >
                  View Work
                </a>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={600} animation="fade-in">
            <div className="aspect-square bg-gray-100 rounded-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                alt="Portfolio Hero" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-6 h-9 border border-gray-400 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full" />
          </div>
          <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

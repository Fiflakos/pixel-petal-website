
import React from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';
import ResponsiveImage from './ResponsiveImage';

const About = () => {
  return (
    <section id="about" className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-widest text-sm mb-3">About</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6">
              The Philosophy
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              My approach to design is rooted in minimalism and functionality. 
              I believe that great design should be invisible, allowing the content to shine.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={300}>
            <div className="aspect-[3/4] bg-gray-200 rounded-sm overflow-hidden">
              <ResponsiveImage 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Designer at work"
                objectFit="cover"
              />
            </div>
          </AnimatedSection>
          
          <div className="space-y-10">
            <AnimatedSection delay={400}>
              <div>
                <h3 className="text-xl font-serif font-medium mb-4">Less, But Better</h3>
                <p className="text-gray-700 leading-relaxed">
                  Inspired by Dieter Rams, I believe in designs that are honest, useful, and unobtrusive. 
                  By focusing on what truly matters, we can create experiences that resonate and endure.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <div>
                <h3 className="text-xl font-serif font-medium mb-4">Attention to Detail</h3>
                <p className="text-gray-700 leading-relaxed">
                  In my work, every pixel, interaction, and transition is deliberate. 
                  I believe that the details aren't just details—they make the design.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <div>
                <h3 className="text-xl font-serif font-medium mb-4">User-Centered Approach</h3>
                <p className="text-gray-700 leading-relaxed">
                  My designs prioritize the user experience above all else, creating intuitive interfaces that feel 
                  natural and effortless to navigate.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

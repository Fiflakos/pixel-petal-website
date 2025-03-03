
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';
import ResponsiveImage from './ResponsiveImage';

// Sample project data
const projects = [
  {
    id: 1,
    title: "Monochrome Beauty",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    year: "2023"
  },
  {
    id: 2,
    title: "Digital Minimalism",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    year: "2023"
  },
  {
    id: 3,
    title: "Tech Elegance",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    year: "2022"
  }
];

const Works = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="works" className="section-padding overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-widest text-sm mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6">
              Selected Works
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              A curated collection of my most meaningful projects, showcasing my approach to design and problem-solving.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection 
              key={project.id} 
              delay={300 + (index * 150)}
              className="group"
            >
              <div 
                className="relative overflow-hidden aspect-[4/5] cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute inset-0 bg-black/5 z-10 transition-opacity duration-300 group-hover:opacity-0" />
                <ResponsiveImage 
                  src={project.image} 
                  alt={project.title}
                  className={cn(
                    "transition-all duration-700 ease-in-out",
                    hoveredProject === project.id ? "scale-105" : "scale-100"
                  )}
                />
                <div className={cn(
                  "absolute inset-0 bg-white/90 flex flex-col justify-end p-6 transition-transform duration-500 ease-in-out",
                  hoveredProject === project.id ? "translate-y-0" : "translate-y-full"
                )}>
                  <span className="text-sm text-gray-500">{project.year} — {project.category}</span>
                  <h3 className="text-xl font-serif font-medium mt-1">{project.title}</h3>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;

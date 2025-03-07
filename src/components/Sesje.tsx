
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';
import ResponsiveImage from './ResponsiveImage';

// Przykładowe dane projektów
const projects = [
  {
    id: 1,
    title: "Sesja Monochromatyczna",
    category: "Branding",
    image: "",
    year: "2023"
  },
  {
    id: 2,
    title: "Minimalizm Cyfrowy",
    category: "Projektowanie stron",
    image: "",
    year: "2023"
  },
  {
    id: 3,
    title: "Elegancja Technologii",
    category: "Fotografia",
    image: "",
    year: "2022"
  }
];

const Sesje = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="sesje" className="section-padding overflow-hidden">
      <div className="container-padding max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="uppercase tracking-widest text-sm mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-6">
              Wybrane Sesje
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Wyselekcjonowane Projekty w których brałem udział jako model
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
                className="relative overflow-hidden aspect-[4/5] cursor-pointer bg-gray-100"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute inset-0 bg-black/5 z-10 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 italic">Zdjęcie sesji</p>
                </div>
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

export default Sesje;

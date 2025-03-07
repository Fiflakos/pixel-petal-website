
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
            <p className="uppercase tracking-widest text-sm mb-3">O Mnie</p>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium">
              Moje podejście do modelingu opiera się na minimalizmie i funkcjonalności. 
              Wierzę, że doskonały modeling powinien być subtelny, pozwalając treści zabłysnąć.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={300}>
            <div className="aspect-[3/4] bg-gray-200 rounded-sm overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 italic">Zdjęcie profilowe</p>
              </div>
            </div>
          </AnimatedSection>
          
          <div className="space-y-10">
            <AnimatedSection delay={400}>
              <div>
                <h3 className="text-xl font-serif font-bold mb-4">Mniej, Ale Lepiej</h3>
                <p className="text-gray-700 leading-relaxed">
                  Inspirowana dziełami mistrzów, wierzę w modeling, który jest szczery, użyteczny i nieinwazyjny. 
                  Skupiając się na tym, co naprawdę ważne, możemy tworzyć doświadczenia, które rezonują i trwają.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <div>
                <h3 className="text-xl font-serif font-bold mb-4">Dbałość o Szczegóły</h3>
                <p className="text-gray-700 leading-relaxed">
                  W mojej pracy każdy detal, interakcja i przejście są przemyślane. 
                  Wierzę, że detale nie są tylko detalami — to one tworzą całość.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <div>
                <h3 className="text-xl font-serif font-bold mb-4">Podejście Zorientowane na Cel</h3>
                <p className="text-gray-700 leading-relaxed">
                  Moje podejście do modelingu stawia cel sesji ponad wszystko inne, tworząc naturalny 
                  i efektowny przekaz, który jest łatwy w odbiorze.
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

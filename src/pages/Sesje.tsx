
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';

const categories = [
  { id: 1, name: "Natura", count: 12 },
  { id: 2, name: "Studio", count: 8 },
  { id: 3, name: "Moda", count: 15 },
  { id: 4, name: "Portrety", count: 10 },
  { id: 5, name: "Klasyka", count: 6 },
  { id: 6, name: "Miejskie", count: 9 },
];

const Sesje = () => {
  console.log("Sesje page rendering");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection delay={200}>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 text-black">Sesje</h1>
              <p className="text-gray-700 text-lg leading-relaxed">
                Przeglądaj moje sesje fotograficzne podzielone na kategorie. Każda kolekcja prezentuje unikalny styl i nastrój.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <AnimatedSection key={category.id} delay={300 + (index * 100)}>
                <a 
                  href={`/sesje/${category.name.toLowerCase()}`} 
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden relative mb-4 bg-gray-100">
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 italic">Zdjęcie kategorii {category.name}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-xl font-serif text-black mb-1">{category.name}</h3>
                  <p className="text-gray-500 text-sm">{category.count} zdjęć</p>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sesje;

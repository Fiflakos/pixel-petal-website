
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';

const categories = [
  { id: 1, name: "Nature", imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b", count: 12 },
  { id: 2, name: "Studio", imageUrl: "https://images.unsplash.com/photo-1534103362078-d07e750bd0c4", count: 8 },
  { id: 3, name: "Fashion", imageUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b", count: 15 },
  { id: 4, name: "Portraits", imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04", count: 10 },
  { id: 5, name: "Classic", imageUrl: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93", count: 6 },
  { id: 6, name: "Urban", imageUrl: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd", count: 9 },
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
                Browse through my photography sessions organized by categories. Each collection showcases a unique style and mood.
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
                  <div className="aspect-[4/3] overflow-hidden relative mb-4">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                  <h3 className="text-xl font-serif text-black mb-1">{category.name}</h3>
                  <p className="text-gray-500 text-sm">{category.count} photos</p>
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

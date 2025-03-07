
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedSection from '../components/AnimatedSection';
import { supabase, SessionType } from '@/lib/supabase';

const Sesje = () => {
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string, count: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Generuj kategorie na podstawie danych sesji
      const sessionsData = data || [];
      setSessions(sessionsData);
      
      // Grupuj sesje według kategorii
      const categoryMap = new Map<string, number>();
      
      sessionsData.forEach(session => {
        const category = session.category;
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      });
      
      // Konwertuj mapę na tablicę obiektów
      const categoriesArray = Array.from(categoryMap.entries()).map(([name, count], index) => ({
        id: `category-${index + 1}`,
        name,
        count
      }));
      
      setCategories(categoriesArray);
    } catch (error) {
      console.error('Błąd pobierania sesji:', error);
    } finally {
      setLoading(false);
    }
  };

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
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <AnimatedSection key={index} delay={300 + (index * 100)}>
                  <div className="aspect-[4/3] bg-gray-100 animate-pulse mb-4"></div>
                  <div className="h-6 bg-gray-100 animate-pulse mb-2 w-1/3"></div>
                  <div className="h-4 bg-gray-100 animate-pulse w-1/4"></div>
                </AnimatedSection>
              ))
            ) : categories.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">Brak dostępnych kategorii.</p>
              </div>
            ) : (
              categories.map((category, index) => (
                <AnimatedSection key={category.id} delay={300 + (index * 100)}>
                  <a 
                    href={`/sesje/${category.name.toLowerCase()}`} 
                    className="group block"
                  >
                    {/* Znajdź pierwszą sesję z danej kategorii i użyj jej obrazu */}
                    <div className="aspect-[4/3] overflow-hidden relative mb-4">
                      {sessions.find(s => s.category === category.name)?.image_urls?.[0] ? (
                        <img 
                          src={sessions.find(s => s.category === category.name)?.image_urls?.[0]} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                          <p className="text-gray-500 italic">Zdjęcie kategorii {category.name}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                    <h3 className="text-xl font-serif text-black mb-1">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.count} zdjęć</p>
                  </a>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sesje;

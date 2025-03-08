
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';
import { supabase, SessionType } from '@/lib/supabase';

const Sesje = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Przykładowe dane do wyświetlenia, gdy nie ma połączenia z Supabase
      const placeholderSessions: SessionType[] = [
        {
          id: '1',
          title: 'Sesja Letnia',
          description: 'Letnia sesja zdjęciowa w parku',
          category: 'Plener',
          year: '2023',
          image_urls: [],
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Portret Studyjny',
          description: 'Profesjonalna sesja portretowa w studio',
          category: 'Studio',
          year: '2023',
          image_urls: [],
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Modelka Fashion',
          description: 'Sesja modowa dla magazynu',
          category: 'Moda',
          year: '2022',
          image_urls: [],
          created_at: new Date().toISOString()
        }
      ];
      
      console.log('Próba pobrania sesji z Supabase...');
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) {
        console.warn('Błąd pobierania sesji z Supabase, używam danych placeholderowych:', error.message);
        setSessions(placeholderSessions);
      } else {
        console.log('Pobrano sesje z Supabase:', data);
        setSessions(data && data.length > 0 ? data : placeholderSessions);
      }
    } catch (err) {
      console.error('Błąd pobierania sesji:', err);
      setError('Nie udało się pobrać sesji. Używam danych przykładowych.');
      
      // Użyj danych przykładowych w przypadku błędu
      setSessions([
        {
          id: '1',
          title: 'Sesja Letnia',
          description: 'Letnia sesja zdjęciowa w parku',
          category: 'Plener',
          year: '2023',
          image_urls: [],
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Portret Studyjny',
          description: 'Profesjonalna sesja portretowa w studio',
          category: 'Studio',
          year: '2023',
          image_urls: [],
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Modelka Fashion',
          description: 'Sesja modowa dla magazynu',
          category: 'Moda',
          year: '2022',
          image_urls: [],
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

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
              Wyselekcjonowana kolekcja moich najważniejszych projektów, ukazująca moje podejście do modelingu i fotografii.
            </p>
            {error && <p className="text-orange-500 mt-2">{error}</p>}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <AnimatedSection key={index} delay={300 + (index * 150)}>
                <div className="relative overflow-hidden aspect-[4/5] bg-gray-100 animate-pulse">
                </div>
              </AnimatedSection>
            ))
          ) : sessions.length === 0 ? (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">Brak dostępnych sesji.</p>
            </div>
          ) : (
            sessions.map((session, index) => (
              <AnimatedSection 
                key={session.id} 
                delay={300 + (index * 150)}
                className="group"
              >
                <div 
                  className="relative overflow-hidden aspect-[4/5] cursor-pointer bg-gray-100"
                  onMouseEnter={() => setHoveredProject(session.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {session.image_urls && session.image_urls.length > 0 ? (
                    <img 
                      src={session.image_urls[0]} 
                      alt={session.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <p className="text-gray-500 italic">Zdjęcie sesji {session.title}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 z-10 transition-opacity duration-300 group-hover:opacity-0" />
                  <div className={cn(
                    "absolute inset-0 bg-white/90 flex flex-col justify-end p-6 transition-transform duration-500 ease-in-out",
                    hoveredProject === session.id ? "translate-y-0" : "translate-y-full"
                  )}>
                    <span className="text-sm text-gray-500">{session.year} — {session.category}</span>
                    <h3 className="text-xl font-serif font-medium mt-1">{session.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Sesje;

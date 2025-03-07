
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import AnimatedSection from './AnimatedSection';
import ResponsiveImage from './ResponsiveImage';
import { supabase, SessionType } from '@/lib/supabase';

const Sesje = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionType[]>([]);
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
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Błąd pobierania sesji:', error);
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
              Wyselekcjonowane Projekty w których brałem udział jako model
            </p>
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
                  className="relative overflow-hidden aspect-[4/5] cursor-pointer"
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
                      <p className="text-gray-500 italic">Brak zdjęcia</p>
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

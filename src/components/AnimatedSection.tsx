
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in';
}

const AnimatedSection = ({ 
  children, 
  className, 
  delay = 0,
  animation = 'fade-in-up'
}: AnimatedSectionProps) => {
  console.log("Rendering AnimatedSection");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  // Ensure we render the children even if not visible yet
  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all duration-700 ease-out',
        !isVisible && 'opacity-0',
        isVisible && 'opacity-100',
        animation === 'fade-in-up' && !isVisible && 'translate-y-8',
        animation === 'fade-in-down' && !isVisible && '-translate-y-8',
        animation === 'slide-in' && !isVisible && '-translate-x-full',
        isVisible && 'translate-y-0 translate-x-0',
        className
      )}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;

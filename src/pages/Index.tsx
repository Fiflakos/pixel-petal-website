
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Sesje from '../components/Sesje';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  console.log("Index component is rendering");
  
  useEffect(() => {
    console.log("Index component useEffect running");
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
    
    // Reveal animation for elements when they come into view
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    // Wyczyszczenie event listenera przy odmontowaniu komponentu
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="content-container">
        <Hero />
        <About />
        <Sesje />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

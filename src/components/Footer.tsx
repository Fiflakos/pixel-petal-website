
import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-gray-200">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-xl font-serif font-medium">
              LO.
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex items-center space-x-6">
              {['Strona Główna', 'O Mnie', 'Sesje', 'Kontakt'].map((item) => (
                <a
                  key={item}
                  href={`#${item === 'Strona Główna' ? 'home' : item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <p className="text-sm text-gray-500">
              &copy; {year} Wszelkie Prawa Zastrzeżone
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

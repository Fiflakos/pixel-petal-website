
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  
  // Define navigation items to match with the navbar
  const navItems = [
    { name: 'Strona Główna', path: '/' },
    { name: 'O Mnie', path: '/#about' },
    { name: 'Sesje', path: '/sesje' },
    { name: 'Kontakt', path: '/#contact' }
  ];
  
  // Function to handle navigation to sections
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path.includes('#') && window.location.pathname === '/') {
      e.preventDefault();
      const targetId = path.split('#')[1];
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  };
  
  return (
    <footer className="py-12 border-t border-gray-200">
      <div className="container-padding max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-serif font-medium">
              Wiktor Zalewski
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-sm uppercase tracking-wider text-gray-600 hover:text-gray-900"
                  onClick={(e) => handleNavigation(item.path, e)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500">
                &copy; {year} Wszelkie Prawa Zastrzeżone
              </p>
              <Link to="/admin" className="text-sm text-gray-400 hover:text-gray-600">
                Panel Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Works', path: '/#works' },
    { name: 'Sesje', path: '/sesje' },
    { name: 'Contact', path: '/#contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.includes(path);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-6 px-6 md:px-12 lg:px-24',
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-medium text-black">
          LO.
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                'text-sm uppercase tracking-wider hover:opacity-70',
                isActive(item.path) ? 'text-black font-medium' : 'text-gray-700'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col items-end space-y-1.5">
            <span 
              className={cn(
                "block h-px bg-current transition-all duration-300",
                isMenuOpen ? "w-6 translate-y-2.5 rotate-45" : "w-6"
              )}
            />
            <span 
              className={cn(
                "block h-px bg-current transition-all duration-300",
                isMenuOpen ? "opacity-0" : "w-4"
              )}
            />
            <span 
              className={cn(
                "block h-px bg-current transition-all duration-300",
                isMenuOpen ? "w-6 -translate-y-2.5 -rotate-45" : "w-5"
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white flex flex-col items-center justify-center z-40 transition-transform duration-500 ease-in-out md:hidden',
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        <nav className="flex flex-col items-center space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-xl uppercase tracking-wider hover:text-gray-600",
                isActive(item.path) ? 'text-black font-medium' : 'text-gray-700'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

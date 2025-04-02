
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNameAnimated, setIsNameAnimated] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated navigation items with proper paths
  const navItems = [
    { name: 'Strona Główna', path: '/' },
    { name: 'O Mnie', path: '/#about' },
    { name: 'Sesje', path: '/sesje' },
    { name: 'Kontakt', path: '/#contact' }
  ];

  // Improved active link detection
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.substring(1);
    return location.pathname.startsWith(path);
  };

  const handleNameClick = () => {
    setIsNameAnimated(true);
    setTimeout(() => setIsNameAnimated(false), 1000);
  };

  // Function to handle navigation
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path.includes('#') && location.pathname === '/') {
      e.preventDefault();
      const targetId = path.split('#')[1];
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
    } else if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-6 px-6 md:px-12 lg:px-24',
        isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className={cn(
            "text-xl font-serif font-medium text-black transition-all duration-500",
            isNameAnimated && "scale-110 text-gray-700"
          )}
          onClick={handleNameClick}
        >
          Wiktor Zalewski
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
              onClick={(e) => handleNavigation(item.path, e)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Only show admin link for admins, removed user authentication link */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-sm uppercase tracking-wider hover:opacity-70 text-gray-700"
            >
              Panel Admin
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Przełącz menu"
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
              onClick={(e) => handleNavigation(item.path, e)}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Only show admin link for admins in mobile menu */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="text-xl uppercase tracking-wider hover:text-gray-600 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Panel Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

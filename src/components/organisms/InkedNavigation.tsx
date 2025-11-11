import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  isActive?: (pathname: string) => boolean;
}

const NAV_ITEMS: NavItem[] = [
  { 
    label: 'ABOUT', 
    href: '/about',
    isActive: (path) => path.startsWith('/about')
  },
  { 
    label: 'SERVICES', 
    href: '/services',
    isActive: (path) => path.startsWith('/services')
  },
  { 
    label: 'BOOK', 
    href: '/booking',
    isActive: (path) => path.startsWith('/booking')
  },
  { 
    label: 'WORKS', 
    href: '/gallery',
    isActive: (path) => path.startsWith('/gallery') || path.startsWith('/works')
  },
  { 
    label: 'BLOGS', 
    href: '/blogs',
    isActive: (path) => path.startsWith('/blogs')
  },
  { 
    label: 'PRICING', 
    href: '/pricing',
    isActive: (path) => path.startsWith('/pricing')
  },
  { 
    label: 'CONTACT US', 
    href: '/contact',
    isActive: (path) => path.startsWith('/contact')
  }
];

export const InkedNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-white/80 transition-colors duration-300"
            >
              inked
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = item.isActive ? item.isActive(location.pathname) : location.pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium tracking-wider transition-colors duration-300 hover:text-white ${
                      isActive 
                        ? 'text-white' 
                        : 'text-white/70'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-0 text-white hover:text-white/80 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-black/95 backdrop-blur-md border-l border-white/10"
            >
              <div className="flex flex-col h-full">
                
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-white/10">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <button
                    onClick={toggleMobileMenu}
                    className="p-0 text-white hover:text-white/80 transition-colors duration-300"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 px-8 py-8 space-y-8">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive = item.isActive ? item.isActive(location.pathname) : location.pathname === item.href;
                    
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.href}
                          onClick={toggleMobileMenu}
                          className={`block text-lg font-medium tracking-wider transition-colors duration-300 hover:text-white ${
                            isActive 
                              ? 'text-white' 
                              : 'text-white/70'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InkedNavigation;

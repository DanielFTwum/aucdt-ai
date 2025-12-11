import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, Menu, X, Search, ChevronDown, MessageCircle } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onChatToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChatToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileSubmenu = (index: number) => {
    if (activeMobileSubmenu === index) {
      setActiveMobileSubmenu(null);
    } else {
      setActiveMobileSubmenu(index);
    }
  };

  return (
    <header className="w-full z-50 font-sans dark:bg-gray-900 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-aucdt-maroon text-aucdt-gold py-3 px-4 text-sm hidden lg:block dark:bg-gray-950">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-aucdt-gold" />
              <span className="text-aucdt-beige">Oyibi (off Adenta - Dodowa Road)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-aucdt-gold" />
              <a href="mailto:info@aucdt.edu.gh" className="text-aucdt-beige hover:text-white transition-colors">info@aucdt.edu.gh</a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-aucdt-gold" />
              <span className="text-aucdt-beige">+233 (0) 54 012 4400</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex space-x-3">
              <a href="#" aria-label="Facebook" className="bg-white/10 p-1.5 rounded-full hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all"><Facebook size={14} /></a>
              <a href="#" aria-label="Twitter" className="bg-white/10 p-1.5 rounded-full hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all"><Twitter size={14} /></a>
              <a href="#" aria-label="Instagram" className="bg-white/10 p-1.5 rounded-full hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all"><Instagram size={14} /></a>
              <a href="#" aria-label="LinkedIn" className="bg-white/10 p-1.5 rounded-full hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all"><Linkedin size={14} /></a>
              <a href="#" aria-label="YouTube" className="bg-white/10 p-1.5 rounded-full hover:bg-aucdt-gold hover:text-aucdt-maroon transition-all"><Youtube size={14} /></a>
            </div>
            <div className="animate-pulse text-aucdt-gold font-semibold hidden xl:block">
              January 2026 Admissions in Progress
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`w-full bg-white dark:bg-gray-900 transition-all duration-300 shadow-md ${isScrolled ? 'fixed top-0 py-2' : 'relative py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://aucdt.edu.gh/">
              <img 
                src="https://aucdt.edu.gh/wp-content/uploads/2022/04/aucdt-logo-for-web.png" 
                alt="AUCDT Logo" 
                className={`h-auto transition-all duration-300 ${isScrolled ? 'w-32' : 'w-48 md:w-64'} dark:brightness-110`} 
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <nav aria-label="Main Navigation">
              <ul className="flex space-x-1">
                {NAV_ITEMS.map((item, index) => (
                  <li key={index} className="relative group">
                    <a 
                      href={item.href} 
                      className="px-3 py-2 text-sm font-medium text-aucdt-maroon dark:text-gray-200 hover:text-aucdt-gold transition-colors uppercase flex items-center gap-1"
                      aria-haspopup={item.children ? "true" : "false"}
                      aria-expanded="false"
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} />}
                    </a>
                    
                    {/* Desktop Dropdown */}
                    {item.children && (
                      <div className="absolute top-full left-0 w-64 bg-white dark:bg-gray-800 shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 border-t-2 border-aucdt-gold z-50">
                        <ul className="py-2">
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <a 
                                href={child.href} 
                                className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-aucdt-maroon hover:pl-6 transition-all border-b border-gray-100 dark:border-gray-700 last:border-0"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="ml-4 flex items-center space-x-3">
              <ThemeToggle />

              <button 
                onClick={onChatToggle}
                className="p-2 text-aucdt-maroon dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative group"
                title="Chat with AI Assistant"
                aria-label="Open AI Chat Assistant"
              >
                <MessageCircle size={22} />
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500 transform translate-x-1/4 -translate-y-1/4"></span>
              </button>

              <button className="p-2 text-aucdt-maroon dark:text-gray-200 hover:text-aucdt-gold transition-colors" aria-label="Search">
                <Search size={22} />
              </button>

              <a 
                  href="https://portal.aucdt.edu.gh/admissions/#/home" 
                  className="bg-aucdt-gold text-aucdt-maroon px-5 py-2.5 rounded-lg font-bold hover:bg-aucdt-maroon hover:text-aucdt-gold transition-all duration-300 shadow-lg text-sm"
              >
                  APPLY NOW!
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
             <ThemeToggle />
             <button 
                onClick={onChatToggle}
                className="text-aucdt-maroon dark:text-gray-200 relative"
                aria-label="Open Chat"
              >
                <MessageCircle size={24} />
                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-500"></span>
              </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-aucdt-maroon dark:text-gray-200 p-2"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-24 px-6 pb-6 overflow-y-auto">
           <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item, index) => (
                <div key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center">
                    <a 
                      href={item.href} 
                      className="text-lg font-medium text-aucdt-maroon dark:text-gray-200 py-3 flex-grow"
                      onClick={() => !item.children && setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <button 
                        onClick={() => toggleMobileSubmenu(index)}
                        className="p-3 text-gray-500 dark:text-gray-400 hover:text-aucdt-maroon"
                        aria-label={activeMobileSubmenu === index ? "Collapse submenu" : "Expand submenu"}
                      >
                        <ChevronDown size={20} className={`transition-transform duration-300 ${activeMobileSubmenu === index ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Submenu */}
                  {item.children && (
                    <div className={`overflow-hidden transition-all duration-300 ${activeMobileSubmenu === index ? 'max-h-96 opacity-100 mb-2' : 'max-h-0 opacity-0'}`}>
                      <ul className="bg-gray-50 dark:bg-gray-800 rounded-lg pl-4 pr-2 py-2 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <a 
                              href={child.href}
                              className="block py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-aucdt-maroon"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-6 space-y-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onChatToggle();
                  }}
                  className="flex items-center justify-center w-full space-x-2 bg-gray-100 dark:bg-gray-800 text-aucdt-maroon dark:text-gray-200 px-5 py-3 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>Chat with AI Assistant</span>
                </button>

                <a 
                  href="https://portal.aucdt.edu.gh/admissions/#/home"
                  className="block w-full text-center bg-aucdt-gold text-aucdt-maroon px-5 py-3 rounded-lg font-bold"
                >
                  APPLY NOW!
                </a>
              </div>
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;
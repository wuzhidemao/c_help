import { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import navConfig from '@/config/nav.json';

interface NavbarProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Navbar({ isDark, onToggleDark }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-dark-800/95 backdrop-blur-md shadow-lg'
            : 'bg-white/95 backdrop-blur-md shadow-lg'
          : isDark
          ? 'bg-transparent'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isDark ? 'bg-accent-500/20' : 'bg-primary-100'
            } group-hover:scale-110`}>
              <Code2 className={`w-6 h-6 ${isDark ? 'text-accent-400' : 'text-primary-600'}`} />
            </div>
            <span className={`font-bold text-xl font-mono ${
              isDark ? 'text-white' : 'text-dark-800'
            }`}>
              C++ Help
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navConfig.navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? isDark
                      ? 'text-accent-400 bg-accent-500/10'
                      : 'text-primary-600 bg-primary-50'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-full ${
                    isDark ? 'bg-accent-400' : 'bg-primary-500'
                  }`} />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDark}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex flex-col space-y-2">
              {navConfig.navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? isDark
                        ? 'text-accent-400 bg-accent-500/10'
                        : 'text-primary-600 bg-primary-50'
                      : isDark
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

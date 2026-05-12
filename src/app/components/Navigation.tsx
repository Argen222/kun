import { ShoppingCart, Heart, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  cartCount: number;
  favoritesCount: number;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Navigation({ cartCount, favoritesCount, theme, onThemeToggle }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Lithophany Constructor', path: '/constructor' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg"
              style={{
                boxShadow: '0 0 30px rgba(212, 165, 116, 0.3)',
              }}
            >
              <Sun className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <span className="font-semibold text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              KUN
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <Link to="/favorites">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </motion.button>
            </Link>

            <Link to="/cart">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-muted rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onThemeToggle}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

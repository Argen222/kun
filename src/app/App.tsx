import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CatalogPage } from './components/CatalogPage';
import { LithophanyConstructor } from './components/LithophanyConstructor';
import { AboutPage } from './components/AboutPage';
import { ReviewsPage } from './components/ReviewsPage';
import { ContactPage } from './components/ContactPage';
import { CartPage } from './components/CartPage';
import { FavoritesPage } from './components/FavoritesPage';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const productData: Record<string, { name: string; price: number; image: string }> = {
  '1': {
    name: 'Golden Sunset Table Lamp',
    price: 149,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
  },
  '2': {
    name: 'Warm Glow Wall Sconce',
    price: 189,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
  },
  '3': {
    name: 'Memory Lithophany Portrait',
    price: 299,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
  },
  '4': {
    name: 'Amber Elegance Desk Lamp',
    price: 169,
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
  },
  '5': {
    name: 'Moonlight Wall Fixture',
    price: 219,
    image: 'https://images.unsplash.com/photo-1543198126-a8c82d6d9b99?w=800',
  },
  '6': {
    name: 'Custom Family Lithophany',
    price: 349,
    image: 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800',
  },
  '7': {
    name: 'Sunset Glow Reading Lamp',
    price: 129,
    image: 'https://images.unsplash.com/photo-1567225591450-74a715f3d0de?w=800',
  },
  '8': {
    name: 'Radiant Memory Cube',
    price: 279,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
  },
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleAddToCart = (id: string) => {
    const product = productData[id];
    if (!product) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id, ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((fav) => fav !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <ScrollToTop />
        <Navigation
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          favoritesCount={favorites.length}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/catalog"
            element={
              <CatalogPage
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
                favorites={favorites}
              />
            }
          />
          <Route path="/constructor" element={<LithophanyConstructor />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
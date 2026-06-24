import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import CatalogPage from "./components/CatalogPage";
import { LithophanyConstructor } from "./components/LithophanyConstructor";
import { AboutPage } from "./components/AboutPage";
import { ReviewsPage } from "./components/ReviewsPage";
import { ContactPage } from "./components/ContactPage";
import CartPage from "./components/CartPage";
import { FavoritesPage } from "./components/FavoritesPage";
import MyOrdersPage from "./components/MyOrdersPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import AdminPage from "../pages/AdminPage";

const API = "https://kun-backend1.onrender.com/api";

const productData = {
  "old-1": { name: "Алтын Күн баткандагы стол чырагы", price: 149, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800", category: "Стол чырактары" },
  "old-2": { name: "Жылуу жарык берүүчү дубал чырагы", price: 189, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", category: "Дубал чырактары" },
  "old-3": { name: "Эстелик Литофания портрети", price: 299, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", category: "Литофания" },
  "old-4": { name: "Янтарь түсүндөгү жумушчу стол чырагы", price: 169, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800", category: "Стол чырактары" },
  "old-5": { name: "Ай нуру сыяктуу дубал чырагы", price: 219, image: "https://images.unsplash.com/photo-1543198126-a8c82d6d9b99?w=800", category: "Дубал чырактары" },
  "old-6": { name: "Жеке үй-бүлөлүк Литофания", price: 349, image: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800", category: "Жеке буйрутма" },
  "old-7": { name: "Күн баткандагы окуу чырагы", price: 129, image: "https://images.unsplash.com/photo-1567225591450-74a715f3d0de?w=800", category: "Стол чырактары" },
  "old-8": { name: "Жарык берүүчү эстелик кубу", price: 279, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", category: "Литофания" },
};

function App() {
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [djangoProducts, setDjangoProducts] = useState({});

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [cart, favorites]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    // ✅ Дарек жана сүрөт шилтемелери туураланды
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        const productsMap = {};
        data.forEach((item) => {
          productsMap["django-" + item.id] = {
            id: "django-" + item.id,
            name: item.name,
            price: parseFloat(item.price),
            image: item.image_url || "https://via.placeholder.com/300",
            category: item.category?.name || "Башка",
          };
        });
        setDjangoProducts(productsMap);
      })
      .catch((err) => console.error("Товарларды жүктөөдө ката кетти:", err));
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const handleAddToCart = (id) => {
    const product = productData[id] || djangoProducts[id];
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      return existing
        ? prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { id, ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
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
          <Route path="/" element={<HomePage onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
          <Route path="/catalog" element={<CatalogPage onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} favorites={favorites} />} />
          <Route path="/constructor" element={<LithophanyConstructor />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} clearCart={clearCart} />} />
          <Route path="/favorites" element={
            <FavoritesPage
              favorites={favorites.map((id) => productData[id] || djangoProducts[id] || { id, name: "...", price: 0, image: "" })}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          } />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
import { jsx, jsxs } from "react/jsx-runtime";
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

const productData = {
  "old-1": { name: "Golden Sunset Table Lamp", price: 149, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800", category: "Table Lamps" },
  "old-2": { name: "Warm Glow Wall Sconce", price: 189, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", category: "Wall Lamps" },
  "old-3": { name: "Memory Lithophany Portrait", price: 299, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", category: "Lithophany" },
  "old-4": { name: "Amber Elegance Desk Lamp", price: 169, image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800", category: "Table Lamps" },
  "old-5": { name: "Moonlight Wall Fixture", price: 219, image: "https://images.unsplash.com/photo-1543198126-a8c82d6d9b99?w=800", category: "Wall Lamps" },
  "old-6": { name: "Custom Family Lithophany", price: 349, image: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800", category: "Custom Work" },
  "old-7": { name: "Sunset Glow Reading Lamp", price: 129, image: "https://images.unsplash.com/photo-1567225591450-74a715f3d0de?w=800", category: "Table Lamps" },
  "old-8": { name: "Radiant Memory Cube", price: 279, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", category: "Lithophany" }
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

    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const productsMap = {};
        data.forEach((item) => {
          productsMap["django-" + item.id] = {
            id: "django-" + item.id,
            name: item.name,
            price: parseFloat(item.price),
            image: item.image,
            category: item.category_name || "Table Lamps"
          };
        });
        setDjangoProducts(productsMap);
      })
      .catch((err) => console.error("Ошибка при получении продуктов:", err));
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
      return existing ? prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { id, ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const handleToggleFavorite = (id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]);
  };

  return /* @__PURE__ */ jsx(BrowserRouter, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsx(Navigation, { 
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      favoritesCount: favorites.length,
      theme,
      onThemeToggle: handleThemeToggle
    }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(HomePage, { onAddToCart: handleAddToCart, onToggleFavorite: handleToggleFavorite, favorites }) }),
      /* @__PURE__ */ jsx(Route, { path: "/catalog", element: /* @__PURE__ */ jsx(CatalogPage, { onAddToCart: handleAddToCart, onToggleFavorite: handleToggleFavorite, favorites }) }),
      /* @__PURE__ */ jsx(Route, { path: "/constructor", element: /* @__PURE__ */ jsx(LithophanyConstructor, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(AboutPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/reviews", element: /* @__PURE__ */ jsx(ReviewsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(ContactPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/cart", element: /* @__PURE__ */ jsx(CartPage, { cart, onUpdateQuantity: handleUpdateQuantity, onRemoveItem: handleRemoveItem, clearCart: clearCart }) }),
      /* @__PURE__ */ jsx(Route, { path: "/favorites", element: /* @__PURE__ */ jsx(FavoritesPage, { favorites: favorites.map(id => productData[id] || djangoProducts[id] || { id, name: "...", price: 0, image: "" }), onAddToCart: handleAddToCart, onToggleFavorite: handleToggleFavorite }) }),
      /* @__PURE__ */ jsx(Route, { path: "/my-orders", element: /* @__PURE__ */ jsx(MyOrdersPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/login", element: /* @__PURE__ */ jsx(LoginPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/register", element: /* @__PURE__ */ jsx(RegisterPage, {}) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}

export { App as default };
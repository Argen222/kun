import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react"; // useEffect добавлен
import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import { SlidersHorizontal } from "lucide-react";

const categories = ["All", "Table Lamps", "Wall Lamps", "Lithophany", "Custom Work"];

function CatalogPage({ onAddToCart, onToggleFavorite, favorites }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 1. Вместо массива, написанного вручную, создаём пустой state
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Получаем товары из Django API
  useEffect(() => {
    fetch("https://kun-backend1.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        // Преобразуем данные из Django в формат, который ожидает ProductCard
        const formattedProducts = data.map((item) => ({
          id: item.id.toString(), // твоя карточка ожидает id в виде строки
          name: item.name,
          price: parseFloat(item.price), // преобразуем цену в число
          rating: 5, // в Django пока нет рейтинга, временно ставим 5
          reviews: 0, // временно ставим 0
          image: item.image, // Django отдаёт полный адрес: https://kun-backend-941z.onrender.com/media/...
          category: item.category_name // "картинка" или добавленная тобой категория
        }));
        
        setBackendProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при подключении к Django:", err);
        setLoading(false);
      });
  }, []);

  // 3. Теперь фильтрация работает с товарами, полученными из бэкенда
  const filteredProducts = backendProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Пока товары загружаются, показываем красивое сообщение на экране
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground animate-pulse">Загрузка товаров...</p>
      </div>
    );
  }

  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Каталог" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl", children: "Откройте для себя нашу коллекцию светильников ручной работы и персонализированных изделий литофании" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto", children: categories.map((category) => /* @__PURE__ */ jsx(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              onClick: () => setSelectedCategory(category),
              className: `px-6 py-3 rounded-full whitespace-nowrap transition-all ${selectedCategory === category ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg" : "bg-muted text-foreground hover:bg-muted/80"}`,
              children: category
            },
            category
          )) }),
          /* @__PURE__ */ jsxs(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              className: "px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsx(SlidersHorizontal, { className: "w-4 h-4" }),
                "Фильтры"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredProducts.map((product, index) => /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: index * 0.1 },
            children: /* @__PURE__ */ jsx(
              ProductCard,
              {
                ...product,
                onAddToCart,
                onToggleFavorite,
                isFavorite: favorites ? favorites.includes(product.id) : false
              }
            )
          },
          product.id
        )) })
      ]
    }
  ) }) });
}

export {
  CatalogPage
};
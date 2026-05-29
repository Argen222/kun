import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react"; // useEffect кошулду
import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import { SlidersHorizontal } from "lucide-react";

const categories = ["All", "Table Lamps", "Wall Lamps", "Lithophany", "Custom Work"];

function CatalogPage({ onAddToCart, onToggleFavorite, favorites }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // 1. Колубуз менен жазылган массивдин ордуна бош state түзөбүз
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Django API-ден товарларды тартабыз
  useEffect(() => {
    fetch("https://kun-backend-qxcn.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => {
        // Django'дон келген маалыматты сенин ProductCard күткөндөй форматка ылайыктайбыз
        const formattedProducts = data.map((item) => ({
          id: item.id.toString(), // сенин картаң id-ни string катары күтөт
          name: item.name,
          price: parseFloat(item.price), // бааны сан түрүнө айлантабыз
          rating: 5, // Django'до азырынча рейтинг жок, убактылуу 5 бердик
          reviews: 0, // убактылуу 0 бердик
          image: item.image, // Django толук даректи берет: https://kun-backend-941z.onrender.com/media/...
          category: item.category_name // "картинка" же сен кошкон категория аты
        }));
        
        setBackendProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Django менен байланышууда ката кетти:", err);
        setLoading(false);
      });
  }, []);

  // 3. Эми фильтрлөө иши ушул backend-ден келген товарлар менен иштейт
  const filteredProducts = backendProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Товарлар жүктөлүп жаткан убакта экранга кооз жазуу чыгарабыз
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-muted-foreground animate-pulse">Товарлар жүктөлүүдө...</p>
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
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Catalog" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl", children: "Discover our collection of handcrafted lighting and personalized lithophany pieces" })
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
                "Filters"
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
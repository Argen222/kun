import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";

function CatalogPage({ onAddToCart, onToggleFavorite, favorites = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Все");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке продуктов:", err);
        setLoading(false);
      });
  }, []);

  // Динамикалык категориялар: Админ панелден келген категорияларды автоматтык түрдө чогултат
  const categories = ["Все", ...new Set(products.map(p => p.category_name || "Без категории"))];

  // Фильтрлөө логикасы
  const filteredProducts = selectedCategory === "Все"
    ? products
    : products.filter(p => (p.category_name || "Без категории") === selectedCategory);

  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 text-center", children: "Загрузка каталога..." });
  }

  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-amber-900 dark:text-amber-100", children: "Каталог" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Откройте нашу коллекцию ремесленных светильников" })
    ] }),

    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((cat) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setSelectedCategory(cat),
          className: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? "bg-amber-500 text-white" : "bg-muted hover:bg-muted/80"}`,
          children: cat
        },
        cat
      )) 
    }),

    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: filteredProducts.map((product) => {
      const djangoId = "django-" + product.id;
      const isFavorite = favorites ? favorites.includes(djangoId) : false;
      return /* @__PURE__ */ jsxs("div", { className: "bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between p-4", children: [
        /* @__PURE__ */ jsx("button", {
          onClick: () => onToggleFavorite(djangoId),
          className: "absolute top-6 right-6 p-2 rounded-full bg-white/80 dark:bg-black/80 shadow-sm z-10",
          children: /* @__PURE__ */ jsx(Heart, { className: `w-5 h-5 ${isFavorite ? "fill-destructive text-destructive" : "text-muted-foreground"}` })
        }),
        /* @__PURE__ */ jsx("div", { className: "aspect-square rounded-xl overflow-hidden bg-muted mb-4", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1 flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: product.category_name || "Без категории" }),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-base line-clamp-2", children: product.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold text-amber-600", children: ["$", product.price] }),
            /* @__PURE__ */ jsxs("button", {
              onClick: () => onAddToCart(djangoId),
              className: "flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              children: [
                /* @__PURE__ */ jsx(ShoppingCart, { className: "w-3.5 h-3.5" }),
                "В корзину"
              ]
            })
          ] })
        ] })
      ] }, product.id);
    }) })
  ] }) });
}

export default CatalogPage;
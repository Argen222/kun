import { jsx, jsxs } from "react/jsx-runtime";
import { Hero } from "./Hero";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Award, Zap } from "lucide-react";
import { ProductCard } from "./ProductCard";
const featuredProducts = [
  {
    id: "1",
    name: "Golden Sunset Table Lamp",
    price: 149,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    category: "Table Lamps"
  },
  {
    id: "3",
    name: "Memory Lithophany Portrait",
    price: 299,
    rating: 5,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
    category: "Lithophany"
  },
  {
    id: "6",
    name: "Custom Family Lithophany",
    price: 349,
    rating: 5,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=800",
    category: "Custom Work"
  }
];
const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Handcrafted with the finest materials"
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Custom designs for your memories"
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for excellence in design"
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quick and secure shipping worldwide"
  }
];
function HomePage({ onAddToCart, onToggleFavorite, favorites }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-muted/30", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-8", children: features.map((feature, index) => {
      const Icon = feature.icon;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: index * 0.1 },
          className: "text-center space-y-4",
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                whileHover: { scale: 1.1, rotate: 5 },
                className: "inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20",
                children: /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 text-primary" })
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: feature.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: feature.description })
          ]
        },
        feature.title
      );
    }) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "text-center space-y-4 mb-12",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Featured Collection" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Discover our most popular pieces, loved by customers worldwide" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12", children: featuredProducts.map((product, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: index * 0.1 },
          children: /* @__PURE__ */ jsx(
            ProductCard,
            {
              ...product,
              onAddToCart,
              onToggleFavorite,
              isFavorite: favorites.includes(product.id)
            }
          )
        },
        product.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.98 },
          className: "px-8 py-4 rounded-full border-2 border-primary text-foreground hover:bg-muted transition-colors inline-flex items-center gap-2",
          children: [
            "View Full Catalog",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
          ]
        }
      ) }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Create Your Own Lithophany" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "Transform your most cherished memories into stunning illuminated art. Our advanced lithophany technology brings your photos to life with beautiful light and shadow." }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["Upload any photo", "Choose your preferred shape and size", "Preview in real-time", "Receive handcrafted perfection"].map(
              (item, index) => /* @__PURE__ */ jsxs(
                motion.li,
                {
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { delay: index * 0.1 },
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }) }),
                    /* @__PURE__ */ jsx("span", { children: item })
                  ]
                },
                item
              )
            ) }),
            /* @__PURE__ */ jsx(Link, { to: "/constructor", children: /* @__PURE__ */ jsxs(
              motion.button,
              {
                whileHover: { scale: 1.05 },
                whileTap: { scale: 0.98 },
                className: "px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-2 shadow-lg",
                children: [
                  "Start Creating",
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5" })
                ]
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          className: "relative aspect-square",
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "rounded-3xl overflow-hidden",
              style: {
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)",
                boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.2)"
              },
              children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center p-12", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    boxShadow: [
                      "0 0 60px rgba(255, 179, 71, 0.4)",
                      "0 0 100px rgba(255, 179, 71, 0.6)",
                      "0 0 60px rgba(255, 179, 71, 0.4)"
                    ]
                  },
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  className: "w-full h-full rounded-2xl bg-gradient-to-br from-accent via-primary to-accent"
                }
              ) })
            }
          )
        }
      )
    ] }) }) })
  ] });
}
export {
  HomePage
};

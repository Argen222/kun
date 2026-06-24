import { jsx, jsxs } from "react/jsx-runtime";
import { ShoppingCart, Heart, Search, Sun, Moon, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";

function Navigation({ cartCount, favoritesCount, theme, onThemeToggle }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { name: "Главная", path: "/" },
    { name: "Каталог", path: "/catalog" },
    { name: "Конструктор Литофании", path: "/constructor" },
    { name: "О нас", path: "/about" },
    { name: "Отзывы", path: "/reviews" },
    { name: "Контакты", path: "/contact" },
    // Navigation.jsx файлында navItems массивине кош:
// { name: "Менин заказдарым", path: "/my-orders" },
  ];
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-20", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3 group", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            whileHover: { scale: 1.05 },
            className: "w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg",
            style: {
              boxShadow: "0 0 30px rgba(212, 165, 116, 0.3)"
            },
            children: /* @__PURE__ */ jsx(Sun, { className: "w-6 h-6 text-primary-foreground" })
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "KUN" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden lg:flex items-center gap-8", children: navItems.map((item) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.path,
          className: "relative text-foreground/70 hover:text-foreground transition-colors",
          children: [
            item.name,
            location.pathname === item.path && /* @__PURE__ */ jsx(
              motion.div,
              {
                layoutId: "activeNav",
                className: "absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
              }
            )
          ]
        },
        item.path
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.95 },
            className: "p-2 hover:bg-muted rounded-full transition-colors",
            children: /* @__PURE__ */ jsx(Search, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(Link, { to: "/favorites", children: /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.95 },
            className: "p-2 hover:bg-muted rounded-full transition-colors relative",
            children: [
              /* @__PURE__ */ jsx(Heart, { className: "w-5 h-5" }),
              favoritesCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center", children: favoritesCount })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.95 },
            className: "p-2 hover:bg-muted rounded-full transition-colors relative",
            children: [
              /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }),
              cartCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-accent text-xs rounded-full flex items-center justify-center", children: cartCount })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          motion.button,
          {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.95 },
            onClick: onThemeToggle,
            className: "p-2 hover:bg-muted rounded-full transition-colors",
            children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            className: "lg:hidden p-2 hover:bg-muted rounded-full transition-colors",
            children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: mobileMenuOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, height: 0 },
        animate: { opacity: 1, height: "auto" },
        exit: { opacity: 0, height: 0 },
        className: "lg:hidden border-t border-border overflow-hidden",
        children: /* @__PURE__ */ jsx("div", { className: "px-4 py-4 space-y-2", children: navItems.map((item) => /* @__PURE__ */ jsx(
          Link,
          {
            to: item.path,
            onClick: () => setMobileMenuOpen(false),
            className: "block px-4 py-3 rounded-lg hover:bg-muted transition-colors",
            children: item.name
          },
          item.path
        )) })
      }
    ) })
  ] });
}
export {
  Navigation
};

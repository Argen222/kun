import { jsx, jsxs } from "react/jsx-runtime";
import { Sun, Instagram, MessageCircle, Send, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border bg-card", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "w-12 h-12 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg",
              style: {
                boxShadow: "0 0 30px rgba(212, 165, 116, 0.3)"
              },
              children: /* @__PURE__ */ jsx(Sun, { className: "w-6 h-6 text-primary-foreground" })
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-semibold text-2xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "KUN" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Создаваем уникальные световые источники, которые превращают фотографии в искусство и приносят тепло в каждый дом." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx(
            motion.a,
            {
              whileHover: { scale: 1.1, y: -2 },
              href: "https://instagram.com",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors",
              children: /* @__PURE__ */ jsx(Instagram, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.a,
            {
              whileHover: { scale: 1.1, y: -2 },
              href: "https://wa.me/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors",
              children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.a,
            {
              whileHover: { scale: 1.1, y: -2 },
              href: "https://t.me/",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-2 rounded-full bg-muted hover:bg-primary/20 transition-colors",
              children: /* @__PURE__ */ jsx(Send, { className: "w-5 h-5" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Магазин" }),
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "text-muted-foreground hover:text-primary transition-colors", children: "Все товары" }),
          /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "text-muted-foreground hover:text-primary transition-colors", children: "Настольные лампы" }),
          /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "text-muted-foreground hover:text-primary transition-colors", children: "Настенные лампы" }),
          /* @__PURE__ */ jsx(Link, { to: "/catalog", className: "text-muted-foreground hover:text-primary transition-colors", children: "Литофания" }),
          /* @__PURE__ */ jsx(Link, { to: "/constructor", className: "text-muted-foreground hover:text-primary transition-colors", children: "Наказы в конструкторе" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Компания" }),
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-muted-foreground hover:text-primary transition-colors", children: "О нас" }),
          /* @__PURE__ */ jsx(Link, { to: "/reviews", className: "text-muted-foreground hover:text-primary transition-colors", children: "Отзывы" }),
          /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-muted-foreground hover:text-primary transition-colors", children: "Контакты" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-colors", children: "Доставка и возвраты" }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-muted-foreground hover:text-primary transition-colors", children: "Политика опривачности" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: "Контакты" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsx("p", { children: "Офис: ул. Летэх, 123, г. Летэх, Л-12345" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5 flex-shrink-0" }),
            /* @__PURE__ */ jsx("a", { href: "mailto:hello@kun.com", className: "hover:text-primary transition-colors", children: "hello@kun.com" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5 flex-shrink-0" }),
            /* @__PURE__ */ jsx("a", { href: "tel:+1234567890", className: "hover:text-primary transition-colors", children: "+1 (234) 567-890" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-12 pt-8 border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { children: "\xA9 2026 KUN. All rights reserved." }),
      /* @__PURE__ */ jsx("p", { children: "Handcrafted with \u2764\uFE0F for bringing light to memories" })
    ] }) })
  ] }) });
}
export {
  Footer
};

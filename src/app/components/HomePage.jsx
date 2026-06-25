import { jsx, jsxs } from "react/jsx-runtime";
import { Hero } from "./Hero";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Heart, Award, Zap } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { CatalogPage } from "./CatalogPage";

const features = [
  // ... (ваши фичи)
];

function HomePage({ onAddToCart, onToggleFavorite, favorites }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(Hero, {}),

    // === СЕКЦИЯ С ФИЧАМИ ===
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

    // === СЕКЦИЯ КАТАЛОГА ===
    /* @__PURE__ */ jsx(CatalogPage, {
      onAddToCart: onAddToCart,
      onToggleFavorite: onToggleFavorite,
      favorites: favorites
    }),

    // === СЕКЦИЯ ЛИТОФАНИИ С ИЗОБРАЖЕНИЕМ ===
    /* @__PURE__ */ jsx("section", { className: "py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Создайте свою личную литофанию" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground", children: "Превратите ваши любимые воспоминания в замечательные световые арты. Наша передовая технология литофании оживляет ваши фото с помощью прекрасного света и тени." }),
            /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: ["Загрузите любое фото", "Выберите предпочитаемую форму и размер", "Просмотрите в режиме реального времени", "Получите невероятную ручную работу"].map(
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
                  "Начать создавать",
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
              className: "rounded-3xl overflow-hidden relative",
              style: {
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)",
                boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.2)"
              },
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/img/lito.jpeg",
                  alt: "Литофания - пример работы",
                  className: "w-full h-full object-cover"
                }
              )
            }
          )
        }
      )
    ] }) }) })
  ] });
}

export { HomePage };
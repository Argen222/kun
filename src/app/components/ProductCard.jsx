import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
function ProductCard({
  id,
  name,
  price,
  rating,
  reviews,
  image,
  category,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      whileHover: { y: -8 },
      onHoverStart: () => setIsHovered(true),
      onHoverEnd: () => setIsHovered(false),
      className: "group relative bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all duration-300",
      style: {
        boxShadow: isHovered ? "0 20px 60px rgba(212, 165, 116, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.05)"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square overflow-hidden bg-muted/30", children: [
          /* @__PURE__ */ jsx(
            ImageWithFallback,
            {
              src: image,
              alt: name,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: isHovered ? 1 : 0 },
              className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            }
          ),
          /* @__PURE__ */ jsx(
            motion.button,
            {
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              onClick: () => onToggleFavorite(id),
              className: `absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${isFavorite ? "bg-accent text-primary-foreground" : "bg-background/80 text-foreground"}`,
              children: /* @__PURE__ */ jsx(Heart, { className: `w-5 h-5 ${isFavorite ? "fill-current" : ""}` })
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 },
              className: "absolute bottom-4 left-4 right-4",
              children: /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  onClick: () => onAddToCart(id),
                  className: "w-full px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center gap-2 shadow-lg",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingCart, { className: "w-4 h-4" }),
                    "Add to Cart"
                  ]
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("span", { children: category }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg text-foreground line-clamp-2", children: name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
              Star,
              {
                className: `w-4 h-4 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted-foreground"}`
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "(",
              reviews,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: [
            "$",
            price
          ] }) })
        ] })
      ]
    }
  );
}
export {
  ProductCard
};

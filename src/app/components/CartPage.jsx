import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
function CartPage({ cart, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? subtotal > 200 ? 0 : 15 : 0;
  const total = subtotal + shipping;
  if (cart.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 space-y-6", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { scale: 0 },
          animate: { scale: 1 },
          transition: { type: "spring", duration: 0.6 },
          className: "p-8 rounded-full bg-muted/50",
          children: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-20 h-20 text-muted-foreground" })
        }
      ),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Your Cart is Empty" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center max-w-md", children: "Looks like you haven't added anything to your cart yet. Start exploring our collection!" }),
      /* @__PURE__ */ jsxs(
        motion.a,
        {
          href: "/catalog",
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.98 },
          className: "px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-2 shadow-lg",
          children: [
            "Browse Catalog",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
          ]
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Shopping Cart" }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-2 space-y-4", children: cart.map((item) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, x: -100 },
              className: "bg-card border border-border rounded-2xl p-6 flex gap-6",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0", children: /* @__PURE__ */ jsx(
                  ImageWithFallback,
                  {
                    src: item.image,
                    alt: item.name,
                    className: "w-full h-full object-cover"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col justify-between", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mb-1", children: item.name }),
                    /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: [
                      "$",
                      item.price
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx(
                        motion.button,
                        {
                          whileHover: { scale: 1.1 },
                          whileTap: { scale: 0.9 },
                          onClick: () => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1)),
                          className: "p-2 rounded-full border border-border hover:bg-muted transition-colors",
                          children: /* @__PURE__ */ jsx(Minus, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "w-12 text-center font-semibold", children: item.quantity }),
                      /* @__PURE__ */ jsx(
                        motion.button,
                        {
                          whileHover: { scale: 1.1 },
                          whileTap: { scale: 0.9 },
                          onClick: () => onUpdateQuantity(item.id, item.quantity + 1),
                          className: "p-2 rounded-full border border-border hover:bg-muted transition-colors",
                          children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsx(
                      motion.button,
                      {
                        whileHover: { scale: 1.1 },
                        whileTap: { scale: 0.9 },
                        onClick: () => onRemoveItem(item.id),
                        className: "p-2 rounded-full hover:bg-destructive/10 text-destructive transition-colors",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-5 h-5" })
                      }
                    )
                  ] })
                ] })
              ]
            },
            item.id
          )) }),
          /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              className: "bg-card border border-border rounded-2xl p-6 space-y-6 sticky top-32",
              children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: "Order Summary" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsx("span", { children: "Subtotal" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      "$",
                      subtotal.toFixed(2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                    /* @__PURE__ */ jsx("span", { children: "Shipping" }),
                    /* @__PURE__ */ jsx("span", { children: shipping === 0 ? "Free" : `$${shipping.toFixed(2)}` })
                  ] }),
                  subtotal < 200 && subtotal > 0 && /* @__PURE__ */ jsxs("p", { className: "text-sm text-primary", children: [
                    "Add $",
                    (200 - subtotal).toFixed(2),
                    " more for free shipping!"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "h-px bg-border" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg font-bold", children: [
                    /* @__PURE__ */ jsx("span", { children: "Total" }),
                    /* @__PURE__ */ jsxs("span", { className: "bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: [
                      "$",
                      total.toFixed(2)
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.button,
                  {
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                    className: "w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center gap-2 shadow-lg",
                    children: [
                      "Proceed to Checkout",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "pt-6 border-t border-border space-y-3 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsx("p", { children: "\u2713 Secure checkout" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2713 Free shipping on orders over $200" }),
                  /* @__PURE__ */ jsx("p", { children: "\u2713 30-day return policy" })
                ] })
              ]
            }
          ) })
        ] })
      ]
    }
  ) }) });
}
export {
  CartPage
};

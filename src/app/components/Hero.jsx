import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";
function Hero() {
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background",
        style: {
          backgroundImage: "radial-gradient(circle at 30% 50%, rgba(212, 165, 116, 0.1) 0%, transparent 50%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          },
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          },
          className: "absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl",
          style: {
            background: "radial-gradient(circle, rgba(255, 179, 71, 0.3) 0%, transparent 70%)"
          }
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: {
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          },
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          },
          className: "absolute bottom-20 left-20 w-96 h-96 rounded-full blur-3xl",
          style: {
            background: "radial-gradient(circle, rgba(212, 165, 116, 0.3) 0%, transparent 70%)"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.8 },
          className: "space-y-8",
          children: [
            /* @__PURE__ */ jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.2 },
                className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border",
                children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-accent" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Premium Handcrafted Lighting" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("h1", { className: "text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-foreground", children: "KUN is a light" }),
              /* @__PURE__ */ jsx("span", { className: "block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "that revives" }),
              /* @__PURE__ */ jsx("span", { className: "block text-foreground", children: "memories" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-xl", children: "Transform your space with our exclusive collection of handcrafted lamps and personalized lithophany. Each piece radiates warmth, creating an atmosphere of comfort and elegance." }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
              /* @__PURE__ */ jsx(Link, { to: "/catalog", children: /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05, boxShadow: "0 0 30px rgba(212, 165, 116, 0.4)" },
                  whileTap: { scale: 0.98 },
                  className: "px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-2 shadow-lg",
                  children: [
                    "Explore Catalog",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsx(Link, { to: "/constructor", children: /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-8 py-4 rounded-full border-2 border-primary text-foreground hover:bg-muted transition-colors flex items-center gap-2",
                  children: [
                    "Create Your Lithophany",
                    /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5" })
                  ]
                }
              ) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.8, delay: 0.3 },
          className: "relative",
          children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-square", children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: {
                  rotate: [0, 360]
                },
                transition: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                },
                className: "absolute inset-0 rounded-full",
                style: {
                  background: "conic-gradient(from 0deg, transparent 0%, rgba(212, 165, 116, 0.1) 50%, transparent 100%)"
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-8 rounded-3xl backdrop-blur-sm border border-border/50 overflow-hidden",
                style: {
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)",
                  boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.2)"
                },
                children: /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: {
                      boxShadow: [
                        "0 0 40px rgba(255, 179, 71, 0.3)",
                        "0 0 80px rgba(255, 179, 71, 0.5)",
                        "0 0 40px rgba(255, 179, 71, 0.3)"
                      ]
                    },
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    className: "w-48 h-48 rounded-full bg-gradient-to-br from-accent via-primary to-accent"
                  }
                ) })
              }
            )
          ] })
        }
      )
    ] })
  ] });
}
export {
  Hero
};

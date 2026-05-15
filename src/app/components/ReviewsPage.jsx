import { jsx, jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "May 8, 2026",
    review: "The lithophany of my family is absolutely stunning! When the light shines through, every detail comes alive. This is more than just a lamp\u2014it's a piece of art that holds our memories.",
    product: "Custom Family Lithophany",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "May 5, 2026",
    review: "I bought the Golden Sunset Table Lamp and it has completely transformed my workspace. The warm glow is perfect for evening work sessions. Quality is exceptional!",
    product: "Golden Sunset Table Lamp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    date: "May 3, 2026",
    review: "The customer service was outstanding, and the final product exceeded all my expectations. My wedding photo lithophany is the centerpiece of our living room.",
    product: "Memory Lithophany Portrait",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    date: "April 28, 2026",
    review: "Perfect gift for my parents' anniversary. They were moved to tears when they saw their old photo illuminated. The craftsmanship is impeccable.",
    product: "Custom Family Lithophany",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  },
  {
    id: 5,
    name: "Jessica Lee",
    rating: 5,
    date: "April 25, 2026",
    review: "The Amber Elegance Desk Lamp is gorgeous! It adds such a sophisticated touch to my home office. Love the warm, golden light it casts.",
    product: "Amber Elegance Desk Lamp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica"
  },
  {
    id: 6,
    name: "Robert Martinez",
    rating: 5,
    date: "April 22, 2026",
    review: "Ordered three wall sconces for our hallway. The installation was easy and they look absolutely premium. The quality matches high-end boutique stores.",
    product: "Warm Glow Wall Sconce",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert"
  }
];
function ReviewsPage() {
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-12",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-6", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Customer Reviews" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "See what our customers are saying about their KUN experience" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: averageRating.toFixed(1) }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "w-6 h-6 fill-accent text-accent" }, i)) }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Average Rating" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: [
              totalReviews,
              "+"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Total Reviews" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: "98%" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Satisfaction Rate" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: reviews.map((review, index) => /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: index * 0.1 },
            whileHover: { y: -4 },
            className: "bg-card border border-border rounded-2xl p-6 space-y-4 relative overflow-hidden",
            style: {
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)"
            },
            children: [
              /* @__PURE__ */ jsx(Quote, { className: "absolute top-4 right-4 w-12 h-12 text-primary/10" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: review.avatar,
                    alt: review.name,
                    className: "w-12 h-12 rounded-full bg-muted"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-semibold", children: review.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: review.date })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(
                Star,
                {
                  className: `w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-muted-foreground"}`
                },
                i
              )) }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: review.review }),
              /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-border", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-primary font-medium", children: review.product }) })
            ]
          },
          review.id
        )) }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-8 md:p-12 text-center space-y-6",
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold", children: "Share Your Experience" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "We'd love to hear from you! Leave a review and help others discover the magic of KUN." }),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.98 },
                  className: "px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg",
                  children: "Write a Review"
                }
              )
            ]
          }
        )
      ]
    }
  ) }) });
}
export {
  ReviewsPage
};

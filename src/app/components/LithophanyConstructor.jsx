import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "motion/react";
import { Upload, Square, Circle, Heart, Star, Download, ShoppingCart } from "lucide-react";
const shapes = [
  { id: "square", name: "Square", icon: Square },
  { id: "circle", name: "Circle", icon: Circle },
  { id: "heart", name: "Heart", icon: Heart },
  { id: "star", name: "Star", icon: Star }
];
const sizes = [
  { id: "small", name: "Small", dimensions: '4" x 4"', price: 99 },
  { id: "medium", name: "Medium", dimensions: '6" x 6"', price: 149 },
  { id: "large", name: "Large", dimensions: '8" x 8"', price: 199 },
  { id: "xlarge", name: "Extra Large", dimensions: '10" x 10"', price: 249 }
];
function LithophanyConstructor() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedShape, setSelectedShape] = useState("square");
  const [selectedSize, setSelectedSize] = useState("medium");
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const selectedSizeData = sizes.find((s) => s.id === selectedSize);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "space-y-12",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "Lithophany Constructor" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Transform your precious memories into illuminated art. Upload a photo and customize your personal lithophany" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "1. Upload Your Photo" }),
              /* @__PURE__ */ jsxs(
                "label",
                {
                  htmlFor: "photo-upload",
                  className: "group relative block aspect-square rounded-2xl border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden bg-muted/30",
                  children: [
                    uploadedImage ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: uploadedImage,
                        alt: "Uploaded",
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-4", children: [
                      /* @__PURE__ */ jsx(
                        motion.div,
                        {
                          whileHover: { scale: 1.1 },
                          className: "p-6 rounded-full bg-primary/10",
                          children: /* @__PURE__ */ jsx(Upload, { className: "w-12 h-12 text-primary" })
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: "Click to upload" }),
                        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "PNG, JPG up to 10MB" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "photo-upload",
                        type: "file",
                        accept: "image/*",
                        className: "hidden",
                        onChange: handleImageUpload
                      }
                    )
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "2. Choose Shape" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: shapes.map((shape) => {
                const Icon = shape.icon;
                return /* @__PURE__ */ jsxs(
                  motion.button,
                  {
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    onClick: () => setSelectedShape(shape.id),
                    className: `p-6 rounded-xl border-2 transition-all ${selectedShape === shape.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
                    children: [
                      /* @__PURE__ */ jsx(Icon, { className: "w-8 h-8 mx-auto mb-2 text-primary" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: shape.name })
                    ]
                  },
                  shape.id
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "3. Select Size" }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  onClick: () => setSelectedSize(size.id),
                  className: `p-6 rounded-xl border-2 transition-all text-left ${selectedSize === size.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`,
                  children: [
                    /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: size.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: size.dimensions }),
                    /* @__PURE__ */ jsxs("p", { className: "text-lg font-bold text-primary mt-2", children: [
                      "$",
                      size.price
                    ] })
                  ]
                },
                size.id
              )) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-8", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-32 space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Preview" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "aspect-square rounded-2xl border border-border overflow-hidden relative",
                  style: {
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(212, 165, 116, 0.1) 100%)",
                    boxShadow: "0 8px 32px 0 rgba(212, 165, 116, 0.2)"
                  },
                  children: uploadedImage ? /* @__PURE__ */ jsx("div", { className: "relative w-full h-full p-8", children: /* @__PURE__ */ jsx(
                    motion.div,
                    {
                      animate: {
                        boxShadow: [
                          "0 0 40px rgba(255, 179, 71, 0.3)",
                          "0 0 60px rgba(255, 179, 71, 0.5)",
                          "0 0 40px rgba(255, 179, 71, 0.3)"
                        ]
                      },
                      transition: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      className: `w-full h-full overflow-hidden ${selectedShape === "circle" ? "rounded-full" : selectedShape === "square" ? "rounded-xl" : selectedShape === "heart" ? "rounded-3xl" : "rounded-2xl"}`,
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: uploadedImage,
                          alt: "Preview",
                          className: "w-full h-full object-cover opacity-90"
                        }
                      )
                    }
                  ) }) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Upload a photo to see preview" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-6 rounded-2xl bg-card border border-border space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Shape" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium capitalize", children: selectedShape })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Size" }),
                  /* @__PURE__ */ jsx("span", { className: "font-medium", children: selectedSizeData?.dimensions })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-px bg-border" }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-lg", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Total Price" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent", children: [
                    "$",
                    selectedSizeData?.price
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  disabled: !uploadedImage,
                  className: "w-full px-6 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }),
                    "Add to Cart"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  disabled: !uploadedImage,
                  className: "w-full px-6 py-3 rounded-full border border-border hover:bg-muted transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                  children: [
                    /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                    "Download Preview"
                  ]
                }
              )
            ] })
          ] }) })
        ] })
      ]
    }
  ) }) });
}
export {
  LithophanyConstructor
};

import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Upload, Square, Circle, Heart, Star, ShoppingCart, Sparkles } from "lucide-react";

// Фигуралар
const shapes = [
  { id: "square", name: "Квадрат", icon: Square },
  { id: "circle", name: "Круг", icon: Circle },
  { id: "heart", name: "Сердце", icon: Heart },
  { id: "star", name: "Звезда", icon: Star }
];

// Өлчөмдөр
const sizes = [
  { id: "small", name: "Кичинекей", dimensions: '4" x 4"' },
  { id: "medium", name: "Орто", dimensions: '6" x 6"' },
  { id: "large", name: "Чоң", dimensions: '8" x 8"' },
  { id: "xlarge", name: "Өтө чоң", dimensions: '10" x 10"' }
];

function LithophanyConstructor() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedShape, setSelectedShape] = useState("square");
  const [selectedSize, setSelectedSize] = useState("medium");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isHovering, setIsHovering] = useState(false);

  // 3D айлануу үчүн
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  // Сүрөттү жүктөө
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Автоматтык айлануу (сүрөт жүктөлгөндө)
  useEffect(() => {
    if (uploadedImage && !isHovering) {
      const interval = setInterval(() => {
        rotateY.set(rotateY.get() + 1);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [uploadedImage, isHovering, rotateY]);

  const selectedSizeData = sizes.find((s) => s.id === selectedSize);

  // Заказды жөнөтүү
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !phoneNumber) {
      setMessage({ type: "error", text: "Атыңызды жана телефон номериңизди жазыңыз!" });
      return;
    }
    if (!imageFile) {
      setMessage({ type: "error", text: "Сураныч, сүрөт жүктөп бериңиз!" });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("customer_name", customerName);
    formData.append("phone_number", phoneNumber);
    formData.append("image", imageFile);
    formData.append("shape", selectedShape);
    formData.append("size", selectedSize);

    try {
      const response = await fetch("https://kun-backend1.onrender.com/api/custom-orders/", { 
        method: "POST", 
        body: formData 
      });

      if (response.ok) {
        const text = `🕯️ Жаңы литофания заказы!\n\n👤 Кардар: ${customerName}\n📞 Телефон: ${phoneNumber}\n🔷 Формасы: ${selectedShape}\n📏 Өлчөмү: ${selectedSizeData?.dimensions}`;
        const whatsappUrl = `https://wa.me/996708515052?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        setMessage({ type: "success", text: "✅ Заказ ийгиликтүү кетти!" });
        setCustomerName("");
        setPhoneNumber("");
        setUploadedImage(null);
        setImageFile(null);
      } else {
        setMessage({ type: "error", text: "❌ Ката кетти, кийинчерээк аракет кылыңыз." });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Сервер менен байланышуу мүмкүн эмес." });
    } finally {
      setLoading(false);
    }
  };

  // Фигуранын clipPath стилин алуу
  const getClipPath = () => {
    switch(selectedShape) {
      case "circle": return "circle(50% at 50% 50%)";
      case "heart": return "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')";
      case "star": return "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
      default: return "none";
    }
  };

  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-amber-50/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
    
    /* === СОЛ ЖАГЫ: 3D ПРЕВЬЮ + КОНСТРУКТОР === */
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      
      /* 3D Превью контейнери */
      /* @__PURE__ */ jsxs("div", { 
        className: "relative aspect-square rounded-2xl bg-gradient-to-br from-amber-100/50 to-amber-200/30 shadow-2xl overflow-hidden border-2 border-amber-200/50",
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
        children: [
          // 3D жарык эффекти (градиент)
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-amber-500/10 pointer-events-none z-10" }),
          
          // Сүрөт же жүктөө плашкасы
          uploadedImage ? (
            /* @__PURE__ */ jsx(motion.div, {
              className: "w-full h-full p-4 flex items-center justify-center",
              style: {
                perspective: "1200px",
                rotateX: rotateX,
                rotateY: rotateY,
                scale: scale,
                transformStyle: "preserve-3d",
              },
              whileHover: { scale: 1.05 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsx("img", { 
                src: uploadedImage, 
                className: "w-full h-full object-cover rounded-xl shadow-2xl",
                style: {
                  clipPath: getClipPath(),
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                  transform: "translateZ(20px)", // 3D калыңдык эффекти
                }
              })
            })
          ) : (
            /* Сүрөт жүктөлбөгөн учур */
            /* @__PURE__ */ jsxs("label", { 
              htmlFor: "photo-upload", 
              className: "block w-full h-full cursor-pointer flex items-center justify-center",
              children: [
                /* @__PURE__ */ jsxs(motion.div, { 
                  className: "text-center p-8",
                  initial: { scale: 0.9, opacity: 0.5 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
                  children: [
                    /* @__PURE__ */ jsx(Upload, { className: "w-16 h-16 mx-auto text-amber-400" }),
                    /* @__PURE__ */ jsx("p", { className: "mt-4 text-amber-600 font-medium text-lg", children: "🖼️ Сүрөт жүктөө" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-400/70", children: "3D эффект үчүн сүрөт тандаңыз" })
                  ]
                })
              ]
            })
          ),
          
          // 3D көрсөткүч белги (сүрөт жүктөлгөндө)
          uploadedImage && (
            /* @__PURE__ */ jsx(motion.div, { 
              className: "absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full z-20",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              children: "✨ 3D режим"
            })
          )
        ]
      }),
      
      /* Сүрөт жүктөө инпуту (жашыруун) */
      /* @__PURE__ */ jsx("input", { id: "photo-upload", type: "file", className: "hidden", onChange: handleImageUpload }),
      
      /* Фигуралар */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: shapes.map((shape) => /* @__PURE__ */ jsxs("motion.button", { 
        whileHover: { scale: 1.05, y: -2 },
        whileTap: { scale: 0.95 },
        onClick: () => setSelectedShape(shape.id), 
        className: `p-6 rounded-xl border-2 transition-all ${selectedShape === shape.id ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20" : "border-border hover:border-amber-500/50"}`, 
        children: [
          /* @__PURE__ */ jsx(shape.icon, { className: `w-8 h-8 mx-auto ${selectedShape === shape.id ? "text-amber-600" : "text-foreground/60"}` }),
          /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${selectedShape === shape.id ? "text-amber-600 font-semibold" : "text-foreground/60"}` }, shape.name)
        ] 
      }, shape.id)) }),

      /* Өлчөмдөр */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxs("motion.button", { 
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
        onClick: () => setSelectedSize(size.id), 
        className: `p-6 rounded-xl border-2 transition-all ${selectedSize === size.id ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20" : "border-border hover:border-amber-500/50"}`, 
        children: [
          /* @__PURE__ */ jsx("p", { className: `font-semibold ${selectedSize === size.id ? "text-amber-600" : "text-foreground"}` }, size.name),
          /* @__PURE__ */ jsx("p", { className: `text-sm ${selectedSize === size.id ? "text-amber-500" : "text-foreground/50"}` }, size.dimensions)
        ] 
      }, size.id)) })
    ] }),

    /* === ОН ЖАГЫ: ЗАКАЗ ФОРМАСЫ === */
    /* @__PURE__ */ jsxs("div", { className: "lg:sticky lg:top-32 self-start", children: [
      /* @__PURE__ */ jsxs(motion.div, { 
        className: "bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-100 shadow-xl",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: [
          /* Башчысы */
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "w-6 h-6 text-amber-500" }),
            /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-amber-800", children: "Заказ берүү" })
          ] }),
          
          /* Форма */
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground/70", children: "👤 Атыңыз" }),
              /* @__PURE__ */ jsx("input", { 
                placeholder: "Аты-жөнүңүз", 
                value: customerName, 
                onChange: (e) => setCustomerName(e.target.value), 
                className: "w-full p-4 rounded-xl border border-amber-200 bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" 
              })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-foreground/70", children: "📞 Телефон" }),
              /* @__PURE__ */ jsx("input", { 
                placeholder: "0700 123 456", 
                value: phoneNumber, 
                onChange: (e) => setPhoneNumber(e.target.value), 
                className: "w-full p-4 rounded-xl border border-amber-200 bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" 
              })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-amber-50 p-4 rounded-xl border border-amber-200/50", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-amber-700 font-medium", children: "📋 Заказ маалыматтары:" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-amber-600/70", children: ["Фигура: ", selectedShape] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-amber-600/70", children: ["Өлчөм: ", selectedSizeData?.dimensions] })
            ] })
          ] }),
          
          /* Ката/Ийгилик билдирүүсү */
          message.text && /* @__PURE__ */ jsx(motion.p, { 
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            className: `text-center p-3 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`,
            children: message.text 
          }),
          
          /* Заказ берүү баскычы */
          /* @__PURE__ */ jsxs(motion.button, { 
            whileHover: { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.2)" },
            whileTap: { scale: 0.98 },
            onClick: handleSubmitOrder, 
            disabled: loading, 
            className: "w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all",
            children: [
              /* @__PURE__ */ jsx(ShoppingCart, { className: "w-5 h-5" }), 
              loading ? "⏳ Жөнөтүлүүдө..." : "📩 Ватсап аркылуу заказ берүү"
            ]
          })
        ]
      })
    ] })
  ] }) }) });
}

export { LithophanyConstructor };
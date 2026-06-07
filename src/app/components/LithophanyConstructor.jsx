import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Upload, Square, Circle, Heart, Star, ShoppingCart } from "lucide-react";

// Фигуралар
const shapes = [
  { id: "square", name: "Квадрат", icon: Square },
  { id: "circle", name: "Круг", icon: Circle },
  { id: "heart", name: "Сердце", icon: Heart },
  { id: "star", name: "Звезда", icon: Star }
];

// Өлчөмдөр
const sizes = [
  { id: "small", name: "Маленькая", dimensions: '4" x 4"' },
  { id: "medium", name: "Средняя", dimensions: '6" x 6"' },
  { id: "large", name: "Большая", dimensions: '8" x 8"' },
  { id: "xlarge", name: "Очень большая", dimensions: '10" x 10"' }
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

  // 3D превью үчүн абал
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const selectedSizeData = sizes.find((s) => s.id === selectedSize);

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

    // 1. Алгач серверге жөнөтүү
    const formData = new FormData();
    formData.append("customer_name", customerName);
    formData.append("phone_number", phoneNumber);
    formData.append("image", imageFile);
    formData.append("shape", selectedShape);
    formData.append("size", selectedSize);

    try {
      const response = await fetch("http://localhost:8000/api/custom-orders/", { method: "POST", body: formData });

      if (response.ok) {
        // 2. Ватсапка билдирүү жөнөтүү
        const text = `Саламатсызбы! Жаңы жеке заказ:\n\nКардар: ${customerName}\nТелефон: ${phoneNumber}\nФормасы: ${selectedShape}\nӨлчөмү: ${selectedSizeData?.dimensions}`;
        const whatsappUrl = `https://wa.me/996708515052?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");

        setMessage({ type: "success", text: "Заказ ийгиликтүү кетти!" });
        setCustomerName(""); setPhoneNumber(""); setUploadedImage(null);
      } else {
        setMessage({ type: "error", text: "Ката кетти, кийинчерээк аракет кылыңыз." });
      }
    } catch {
      setMessage({ type: "error", text: "Сервер менен байланышуу мүмкүн эмес." });
    } finally {
      setLoading(false);
    }
  };

  // 3D айлануу эффектти
  useEffect(() => {
    if (uploadedImage) {
      const interval = setInterval(() => {
        setRotation((prev) => ({ x: prev.x + 0.2, y: prev.y + 0.5 }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [uploadedImage]);

  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
    
    /* Сол жагы: Конструктор жана Интерактивдүү 3D Превью */
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      
      /* Интерактивдүү 3D Превью Аймагы */
      /* @__PURE__ */ jsx("div", { 
        className: "relative aspect-square rounded-2xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-muted/30",
        style: {
          perspective: '1000px', // 3D перспектив эффектиси
        },
        children: uploadedImage ? 
          /* @__PURE__ */ jsx(motion.div, {
            className: `w-full h-full p-6 flex items-center justify-center`,
            style: {
              transformStyle: 'preserve-3d', // 3D трансформацияны сактайт
              rotateX: `${rotation.x}deg`, // X огу боюнча айлануу
              rotateY: `${rotation.y}deg`, // Y огу боюнча айлануу
            },
            transition: { duration: 0.1, ease: 'linear' }, // Жумшак кыймыл
            children: /* @__PURE__ */ jsx("img", { 
              src: uploadedImage, 
              className: `w-full h-full object-cover shadow-2xl`,
              style: {
                // Тандалган фигурага карата клипти колдонуу
                clipPath: selectedShape === "circle" ? "circle(50% at 50% 50%)" :
                          selectedShape === "heart" ? "path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z')" : 
                          selectedShape === "star" ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" :
                          "none", // Квадрат үчүн clip-path керек эмес
              },
            })
          }) : 
          /* Сүрөт жүктөлбөгөн учур (Мурдагыдай эле) */
          /* @__PURE__ */ jsx("label", { htmlFor: "photo-upload", className: "block aspect-square rounded-2xl border-2 border-dashed border-border cursor-pointer flex items-center justify-center overflow-hidden bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [/* @__PURE__ */ jsx(Upload, { className: "w-12 h-12 mx-auto text-primary" }), /* @__PURE__ */ jsx("p", { children: "Сүрөт жүктөө" })] }) })
      }),
      
      /* @__PURE__ */ jsx("input", { id: "photo-upload", type: "file", className: "hidden", onChange: handleImageUpload }),
      
      /* Формалар (Мурдагыдай эле) */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: shapes.map((shape) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedShape(shape.id), className: `p-6 rounded-xl border-2 ${selectedShape === shape.id ? "border-amber-500 bg-amber-500/10" : "border-border hover:border-amber-500/50"}`, children: [/* @__PURE__ */ jsx(shape.icon, { className: "w-8 h-8 mx-auto text-primary" }), /* @__PURE__ */ jsx("p", { className: "text-sm", children: shape.name })] }, shape.id)) }),

      /* Өлчөмдөр (Мурдагыдай эле) */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelectedSize(size.id), className: `p-6 rounded-xl border-2 ${selectedSize === size.id ? "border-amber-500 bg-amber-500/10" : "border-border hover:border-amber-500/50"}`, children: [/* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: size.name }), /* @__PURE__ */ jsx("p", { className: "text-sm", children: size.dimensions })] }, size.id)) })
    ] }),

    /* Оң жагы: Заказ берүү жана Контакттар (Мурдагыдай эле) */
    /* @__PURE__ */ jsxs("div", { className: "bg-card p-8 rounded-2xl border border-border sticky top-32 space-y-6 shadow-xl", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Контактные данные для заказа:" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Атыңыз", value: customerName, onChange: (e) => setCustomerName(e.target.value), className: "w-full p-4 rounded-xl border border-border bg-background text-foreground text-sm focus:border-amber-500" }),
        /* @__PURE__ */ jsx("input", { placeholder: "Телефон номериңиз (мисалы, 0700123456)", value: phoneNumber, onChange: (e) => setPhoneNumber(e.target.value), className: "w-full p-4 rounded-xl border border-border bg-background text-foreground text-sm focus:border-amber-500" })
      ] }),
      message.text && /* @__PURE__ */ jsx("p", { className: `text-center p-2 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`, children: message.text }),
      /* @__PURE__ */ jsxs(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: handleSubmitOrder, disabled: loading, className: "w-full py-4 bg-amber-600 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed", children: [/* @__PURE__ */ jsx(ShoppingCart, {}), loading ? "Жөнөтүлүүдө..." : "Ватсап аркылуу заказ берүү"] })
    ] })
  ] }) }) });
}

export { LithophanyConstructor };
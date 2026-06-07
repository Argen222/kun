import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "motion/react";
import { Star, Quote, Camera, X } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "May 8, 2026",
    review: "Литофания сонун чыкты! Жарык күйгөндө бардык деталдар тирилгенсийт.",
    product: "Custom Family Lithophany",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  }
];

function ReviewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [reviewImage, setReviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [comment, setComment] = useState(""); // Комментарийди сактоо үчүн
  const [loading, setLoading] = useState(false); // Жүктөлүп жатканын көрсөтүү үчүн

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setReviewImage(null);
    setPreviewUrl(null);
  };

  // Жөнөтүү логикасы
  const handleSendReview = async () => {
    if (!comment || !reviewImage) {
      alert("Сураныч, комментарий жазып жана сүрөт тандаңыз!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("image", reviewImage);

    try {
      const response = await fetch("http://localhost:8000/api/reviews/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Рахмат! Отзывыңыз ийгиликтүү жөнөтүлдү.");
        setShowForm(false);
        setComment("");
        clearImage();
      } else {
        alert("Ката кетти, кийинчерээк аракет кылыңыз.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Сервер менен байланышуу мүмкүн эмес.");
    } finally {
      setLoading(false);
    }
  };

  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen pt-32 pb-20 px-4", children: [
    /* ... (Башкы бөлүк мурункудай эле калат) ... */
    
    /* Отзыв калтыруу бөлүмү */
    /* @__PURE__ */ jsxs(motion.div, { className: "max-w-3xl mx-auto mt-20 p-8 bg-amber-500/5 rounded-3xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Пикириңизди калтырыңыз" }),
      !showForm ? (
        /* @__PURE__ */ jsx("button", { onClick: () => setShowForm(true), className: "px-8 py-3 bg-amber-600 text-white rounded-full font-bold", children: "Пикир жазуу" })
      ) : (
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("textarea", { 
            placeholder: "Сиздин пикириңиз...", 
            value: comment,
            onChange: (e) => setComment(e.target.value),
            className: "w-full p-4 rounded-xl border border-border bg-background" 
          }),
          
          !previewUrl ? (
            /* @__PURE__ */ jsxs("label", { className: "flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-amber-500 transition-colors", children: [
              /* @__PURE__ */ jsx(Camera, { className: "text-amber-600" }),
              /* @__PURE__ */ jsx("span", { children: "Товардын сүрөтүн тиркөө" }),
              /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: handleImageChange })
            ] })
          ) : (
            /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
              /* @__PURE__ */ jsx("img", { src: previewUrl, className: "w-32 h-32 object-cover rounded-xl border-2 border-amber-500" }),
              /* @__PURE__ */ jsx("button", { onClick: clearImage, className: "absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full", children: /* @__PURE__ */ jsx(X, { size: 16 }) })
            ] })
          ),
          
          /* @__PURE__ */ jsx("button", { 
            onClick: handleSendReview, 
            disabled: loading,
            className: "w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50", 
            children: loading ? "Жөнөтүлүүдө..." : "Жөнөтүү" 
          })
        ] })
      )
    ] })
  ] });
}

export { ReviewsPage };
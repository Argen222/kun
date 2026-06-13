import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Camera, X, MessageSquare, Heart } from "lucide-react";

const API = "https://kun-backend1.onrender.com/api";

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      {review.image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={review.image_url}
            alt="Отзыв сүрөтү"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-foreground leading-relaxed">{review.comment}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(review.created_at).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
}

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/reviews`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSendReview = async () => {
    if (!comment.trim()) {
      alert("Сураныч, пикириңизди жазыңыз!");
      return;
    }

    setSending(true);
    const formData = new FormData();
    formData.append("comment", comment);
    if (reviewImage) formData.append("image", reviewImage);

    try {
      const res = await fetch(`${API}/reviews`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setComment("");
        clearImage();
        setShowForm(false);
        setRating(5);
        fetchReviews();
        alert("Рахмат! Пикириңиз жарыяланды.");
      } else {
        alert("Ката кетти, кийинчерээк аракет кылыңыз.");
      }
    } catch {
      alert("Сервер менен байланышуу мүмкүн эмес.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Баш бөлүм */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Кардарлардын пикири
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Биздин кардарлар эмне дейт
          </p>

          {/* Статистика */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">{reviews.length}</p>
              <p className="text-sm text-muted-foreground">Пикир</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 font-bold text-lg">5.0</span>
            </div>
          </div>
        </motion.div>

        {/* Пикир жазуу баскычы */}
        {!showForm && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto"
            >
              <MessageSquare className="w-5 h-5" />
              Пикир калтыруу
            </motion.button>
          </div>
        )}

        {/* Пикир жазуу формасы */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-card border border-border rounded-3xl p-8 shadow-lg space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Пикириңизди жазыңыз</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="p-2 hover:bg-muted rounded-full transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Рейтинг */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Баалоо</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Пикир текст */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Пикириңиз *</label>
                  <textarea
                    placeholder="Биздин товар жөнүндө пикириңизди жазыңыз..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full p-4 rounded-xl border border-border bg-background resize-none focus:border-amber-500 outline-none transition"
                  />
                </div>

                {/* Сүрөт */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сүрөт (милдеттүү эмес)</label>
                  {!previewUrl ? (
                    <label className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-amber-500 transition-colors">
                      <Camera className="w-6 h-6 text-amber-600" />
                      <span className="text-muted-foreground">Товардын сүрөтүн тиркөө</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  ) : (
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        className="w-40 h-40 object-cover rounded-xl border-2 border-amber-500"
                        alt="preview"
                      />
                      <button
                        onClick={clearImage}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Жөнөтүү */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 border border-border rounded-xl font-medium hover:bg-muted transition"
                  >
                    Жокко чыгаруу
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendReview}
                    disabled={sending}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition disabled:opacity-50"
                  >
                    {sending ? "Жөнөтүлүүдө..." : "Жарыялоо"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Отзывдар тизмеси */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground mt-4">Жүктөлүүдө...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground opacity-30" />
            <p className="text-xl text-muted-foreground">Азырынча пикир жок</p>
            <p className="text-muted-foreground">Биринчи болуп пикир калтырыңыз!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ReviewsPage };
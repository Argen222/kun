import { useState, useEffect } from "react";
import { Heart, ShoppingCart, X, Star, Package } from "lucide-react";

const API = "http://localhost:8000/api";

function ProductModal({ product, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Сүрөт */}
          <div className="aspect-square bg-muted relative">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Маалымат */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <p className="text-xs text-amber-500 font-medium uppercase tracking-wide">
                {product.category?.name || "Категориясыз"}
              </p>
              <h2 className="text-2xl font-bold">{product.name}</h2>

              {/* Рейтинг */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">(5.0)</span>
              </div>

              {/* Сүрөттөмө */}
              {product.description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Склад */}
              <p className="text-sm text-muted-foreground">
                Складда: <span className="font-semibold text-foreground">{product.stock} дана</span>
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-3xl font-bold text-amber-500">${product.price}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onAddToCart("django-" + product.id);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Корзинага
                </button>

                <button
                  onClick={() => onToggleFavorite("django-" + product.id)}
                  className={`p-3 rounded-xl border-2 transition ${
                    isFavorite
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
                      : "border-border hover:border-amber-400"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogPage({ onAddToCart, onToggleFavorite, favorites = [] }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Товарлар
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Категориялар
    fetch(`${API}/products/categories`)
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []));
  }, []);

  // Фильтрлөө
  const filtered = products.filter(p => {
    const matchCat = selectedCategory === "Все" || p.category?.name === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Товарлар жүктөлүүдө...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Баш бөлүм */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-amber-900 dark:text-amber-100">Каталог</h1>
          <p className="text-muted-foreground">Откройте нашу коллекцию ремесленных светильников</p>
        </div>

        {/* Издөө */}
        <input
          type="text"
          placeholder="🔍 Товар издөө..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-border rounded-xl bg-background focus:border-amber-500 outline-none"
        />

        {/* Категориялар */}
        <div className="flex flex-wrap gap-2">
          {["Все", ...categories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-amber-500 text-white"
                  : "bg-muted hover:bg-amber-100 dark:hover:bg-amber-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Товарлар */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Товар табылган жок</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => {
              const djangoId = "django-" + product.id;
              const isFavorite = favorites.includes(djangoId);

              return (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Сүрөт — басканда modal ачылат */}
                  <div
                    className="aspect-square bg-muted relative cursor-pointer overflow-hidden group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground opacity-40" />
                      </div>
                    )}

                    {/* Favorite баскычы */}
                    <button
                      onClick={e => { e.stopPropagation(); onToggleFavorite(djangoId); }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-black/80 shadow-sm z-10 hover:scale-110 transition"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                    </button>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                        Көбүрөөк →
                      </span>
                    </div>
                  </div>

                  {/* Маалымат */}
                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <p className="text-xs text-amber-500 font-medium">
                        {product.category?.name || "Категориясыз"}
                      </p>
                      <h3
                        className="font-semibold text-base line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600">${product.price}</span>
                      <button
                        onClick={() => onAddToCart(djangoId)}
                        className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Корзинага
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Товар деталь модалы */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes("django-" + selectedProduct.id)}
        />
      )}
    </div>
  );
}

export default CatalogPage;
export { CatalogPage };
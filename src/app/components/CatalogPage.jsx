import { useState, useEffect, useCallback } from "react";
import { 
  Heart, ShoppingCart, X, Star, Package, RefreshCw, Search, 
  ArrowUpDown, TrendingUp, ArrowDownAZ, ArrowUpAZ 
} from "lucide-react";

const API = "https://kun-backend1.onrender.com/api";

// ========== ProductModal компоненти ==========
function ProductModal({ product, onClose, onAddToCart, onToggleFavorite, isFavorite }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Мобильный индикатор */}
        <div className="sm:hidden w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mt-3" />
        
        <div className="grid md:grid-cols-2">
          {/* Изображение */}
          <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Информация */}
          <div className="p-4 sm:p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <p className="text-xs text-amber-500 font-medium uppercase tracking-wide">
                {product.category?.name || "Без категории"}
              </p>
              <h2 className="text-xl sm:text-2xl font-bold dark:text-white">{product.name}</h2>

              {/* Рейтинг */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-gray-500 ml-1">(5.0)</span>
              </div>

              {/* Описание */}
              {product.description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Склад */}
              <p className="text-sm text-gray-500 dark:text-gray-400">
                На складе: <span className="font-semibold text-gray-900 dark:text-white">{product.stock} шт.</span>
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl font-bold text-amber-500">{product.price} сом</p>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    onAddToCart("django-" + product.id);
                    onClose();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold transition text-sm sm:text-base"
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  В корзину
                </button>

                <button
                  onClick={() => onToggleFavorite("django-" + product.id)}
                  className={`p-3 rounded-xl border-2 transition ${
                    isFavorite
                      ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-500"
                      : "border-gray-200 dark:border-gray-700 hover:border-amber-400"
                  }`}
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== CatalogPage компоненти ==========
function CatalogPage({ onAddToCart, onToggleFavorite, favorites = [] }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [retrying, setRetrying] = useState(false);
  const [sortType, setSortType] = useState("default"); // default, price-asc, price-desc, name-asc, name-desc
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Маалыматтарды жүктөө функциясы
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setRetrying(true);

      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${API}/products`),
        fetch(`${API}/products/categories`)
      ]);

      if (!productsRes.ok || !categoriesRes.ok) {
        throw new Error("Ошибка загрузки данных с сервера");
      }

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(Array.isArray(productsData) ? productsData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err) {
      console.error("Ошибка загрузки:", err);
      setError("Не удалось загрузить товары. Проверьте подключение к интернету.");
    } finally {
      setLoading(false);
      setRetrying(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Фильтрация
  const filtered = products.filter(p => {
    const matchCat = selectedCategory === "Все" || p.category?.name === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Сортировка
  const sorted = [...filtered].sort((a, b) => {
    switch (sortType) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0; // default - кандай келсе ошондой
    }
  });

  // Сортировка опциялары
  const sortOptions = [
    { id: "default", label: "По умолчанию", icon: ArrowUpDown },
    { id: "price-asc", label: "Цена: по возрастанию", icon: TrendingUp },
    { id: "price-desc", label: "Цена: по убыванию", icon: TrendingUp },
    { id: "name-asc", label: "Название: А-Я", icon: ArrowDownAZ },
    { id: "name-desc", label: "Название: Я-А", icon: ArrowUpAZ },
  ];

  const currentSort = sortOptions.find(o => o.id === sortType);

  // ========== ЖҮКТӨӨ ЭКРАНЫ ==========
  if (loading) {
    return (
      <div className="min-h-screen pt-20 sm:pt-32 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-lg">Загрузка товаров...</p>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">Пожалуйста, подождите</p>
        </div>
      </div>
    );
  }

  // ========== КАТА ЭКРАНЫ ==========
  if (error) {
    return (
      <div className="min-h-screen pt-20 sm:pt-32 flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 dark:text-white">Ошибка загрузки</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{error}</p>
          </div>
          <button
            onClick={fetchData}
            disabled={retrying}
            className="px-5 py-2.5 sm:px-6 sm:py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition flex items-center gap-2 mx-auto disabled:opacity-50 text-sm sm:text-base"
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${retrying ? "animate-spin" : ""}`} />
            {retrying ? "Повторяем..." : "Повторить загрузку"}
          </button>
        </div>
      </div>
    );
  }

  // ========== НЕГИЗГИ КАТАЛОГ ==========
  return (
    <div className="min-h-screen pt-20 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 space-y-4 sm:space-y-6">

        {/* Заголовок */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-amber-900 dark:text-amber-100">Каталог</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Откройте нашу коллекцию ремесленных светильников
          </p>
        </div>

        {/* Поиск и Сортировка - десктоп */}
        <div className="flex gap-2 sm:gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск товара..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-amber-500 outline-none text-sm sm:text-base dark:text-white"
            />
          </div>
          
          {/* Десктоп сортировка */}
          <div className="hidden sm:flex gap-2">
            {sortOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSortType(option.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  sortType === option.id
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Мобильная кнопка сортировки */}
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="sm:hidden p-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800"
          >
            <ArrowUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Мобильное меню сортировки */}
        {showSortMenu && (
          <div className="sm:hidden bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2 space-y-1">
            {sortOptions.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  setSortType(option.id);
                  setShowSortMenu(false);
                }}
                className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors flex items-center gap-2 ${
                  sortType === option.id
                    ? "bg-amber-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <option.icon className="w-4 h-4" />
                {option.label}
              </button>
            ))}
          </div>
        )}

        {/* Категории */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
          {["Все", ...categories.map(c => c.name)].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Результаты */}
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Найдено: {sorted.length} товаров
          {selectedCategory !== "Все" && ` в категории "${selectedCategory}"`}
        </div>

        {/* Товары */}
        {sorted.length === 0 ? (
          <div className="text-center py-12 sm:py-20 text-gray-400 dark:text-gray-500">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-30" />
            <p className="text-sm sm:text-base">Товары не найдены</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {sorted.map(product => {
              const djangoId = "django-" + product.id;
              const isFavorite = favorites.includes(djangoId);

              return (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 sm:hover:-translate-y-1 flex flex-col"
                >
                  {/* Изображение */}
                  <div
                    className="aspect-square bg-gray-100 dark:bg-gray-700 relative cursor-pointer overflow-hidden group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 opacity-40" />
                      </div>
                    )}

                    {/* Кнопка избранного */}
                    <button
                      onClick={e => { e.stopPropagation(); onToggleFavorite(djangoId); }}
                      className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-black/80 shadow-sm z-10 active:scale-110 transition"
                    >
                      <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                    </button>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-medium bg-black/50 px-2 sm:px-3 py-1 rounded-full">
                        Подробнее →
                      </span>
                    </div>
                  </div>

                  {/* Информация */}
                  <div className="p-2 sm:p-4 flex flex-col flex-1 justify-between space-y-1.5 sm:space-y-3">
                    <div>
                      <p className="text-[10px] sm:text-xs text-amber-500 font-medium truncate">
                        {product.category?.name || "Без категории"}
                      </p>
                      <h3
                        className="font-semibold text-xs sm:text-base line-clamp-2 cursor-pointer hover:text-amber-600 transition-colors dark:text-white mt-0.5"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm sm:text-xl font-bold text-amber-600">{product.price} сом</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(djangoId);
                        }}
                        className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span className="hidden sm:inline">В корзину</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Модальное окно */}
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
export { CatalogPage, ProductModal };
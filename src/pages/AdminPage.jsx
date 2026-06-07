import { useState, useEffect } from "react";
import { Trash2, Plus, Package, Tag } from "lucide-react";

const API = "https://kun-backend1.onrender.com/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("products"); // "products" | "categories"

  // Products state
  const [products, setProducts] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [productMsg, setProductMsg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Categories state
  const [categories, setCategories] = useState([]);
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [loadingCat, setLoadingCat] = useState(false);
  const [catMsg, setCatMsg] = useState("");

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = () => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []));
  };

  const fetchCategories = () => {
    fetch(`${API}/products/categories`)
      .then(r => r.json())
      .then(data => setCategories(Array.isArray(data) ? data : []));
  };

  // ── PRODUCTS ──────────────────────────────────────────────
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setProductMsg("❌ Аты жана баасы милдеттүү!");
      return;
    }
    setLoadingProduct(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock || 0);
    if (categoryId) formData.append("category_id", categoryId);
    if (image) formData.append("image", image);

    const res = await fetch(`${API}/products`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      setProductMsg("✅ Товар кошулду!");
      setName(""); setDescription(""); setPrice("");
      setStock(""); setCategoryId(""); setImage(null); setPreview(null);
      fetchProducts();
    } else {
      const err = await res.json().catch(() => ({}));
      setProductMsg("❌ Ката: " + (err.detail || "Белгисиз ката"));
    }
    setLoadingProduct(false);
    setTimeout(() => setProductMsg(""), 3000);
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Товарды өчүрөсүзбү?")) return;
    await fetch(`${API}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  // ── CATEGORIES ────────────────────────────────────────────
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!catName || !catSlug) {
      setCatMsg("❌ Аты жана slug милдеттүү!");
      return;
    }
    setLoadingCat(true);
    const res = await fetch(`${API}/products/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: catName, slug: catSlug }),
    });

    if (res.ok) {
      setCatMsg("✅ Категория кошулду!");
      setCatName(""); setCatSlug("");
      fetchCategories();
    } else {
      const err = await res.json().catch(() => ({}));
      setCatMsg("❌ Ката: " + (err.detail || "Белгисиз ката"));
    }
    setLoadingCat(false);
    setTimeout(() => setCatMsg(""), 3000);
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm("Категорияны өчүрөсүзбү?")) return;
    await fetch(`${API}/products/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCategories();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-amber-800 dark:text-amber-200">
        🛠️ Admin Panel
      </h1>

      {/* Табдар */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-6 py-3 rounded-full font-bold transition ${
            activeTab === "products"
              ? "bg-amber-500 text-white"
              : "bg-muted hover:bg-amber-100 dark:hover:bg-amber-900/30"
          }`}
        >
          <Package className="inline w-4 h-4 mr-2" />
          Товарлар
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-6 py-3 rounded-full font-bold transition ${
            activeTab === "categories"
              ? "bg-amber-500 text-white"
              : "bg-muted hover:bg-amber-100 dark:hover:bg-amber-900/30"
          }`}
        >
          <Tag className="inline w-4 h-4 mr-2" />
          Категориялар
        </button>
      </div>

      {/* ── ТОВАРЛАР ТАБЫ ── */}
      {activeTab === "products" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Товар кошуу формасы */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-600" />
              Жаңы товар кошуу
            </h2>

            {productMsg && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${
                productMsg.includes("✅") ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}>
                {productMsg}
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Товардын аты *"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <textarea
                className="w-full p-3 border border-border rounded-xl bg-background resize-none"
                placeholder="Сүрөттөмөсү"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  className="p-3 border border-border rounded-xl bg-background"
                  placeholder="Баасы (сом) *"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
                <input
                  className="p-3 border border-border rounded-xl bg-background"
                  placeholder="Складдагы саны"
                  type="number"
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                />
              </div>

              <select
                className="w-full p-3 border border-border rounded-xl bg-background"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
              >
                <option value="">Категория тандаңыз</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              {preview ? (
                <div className="relative">
                  <img src={preview} className="w-full h-48 object-cover rounded-xl" alt="preview" />
                  <button
                    type="button"
                    onClick={() => { setImage(null); setPreview(null); }}
                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Өчүрүү
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-amber-400 rounded-xl cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/20 transition">
                  <span className="text-amber-600 font-medium">📸 Сүрөт тандаңыз</span>
                  <span className="text-xs text-muted-foreground mt-1">JPG, PNG, WEBP</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}

              <button
                type="submit"
                disabled={loadingProduct}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition disabled:opacity-50"
              >
                {loadingProduct ? "Жүктөлүүдө..." : "➕ Товар кошуу"}
              </button>
            </form>
          </div>

          {/* Товарлар тизмеси */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              Товарлар ({products.length})
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {products.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Товар жок</p>
              )}
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-3 p-3 border border-border rounded-xl bg-background">
                  <img
                    src={p.image_url || "https://via.placeholder.com/60"}
                    className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    alt={p.name}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{p.name}</p>
                    <p className="text-amber-600 font-bold">{p.price} сом</p>
                    <p className="text-xs text-muted-foreground">
                      Склад: {p.stock} | {p.category?.name || "Категориясыз"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(p.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── КАТЕГОРИЯЛАР ТАБЫ ── */}
      {activeTab === "categories" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Категория кошуу */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-600" />
              Жаңы категория кошуу
            </h2>

            {catMsg && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${
                catMsg.includes("✅") ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}>
                {catMsg}
              </div>
            )}

            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Категориянын аты * (мис: Настольные лампы)"
                value={catName}
                onChange={e => {
                  setCatName(e.target.value);
                  // Автоматтык slug түзүү
                  setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
                }}
              />
              <input
                className="w-full p-3 border border-border rounded-xl bg-background"
                placeholder="Slug * (мис: table-lamps)"
                value={catSlug}
                onChange={e => setCatSlug(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Slug — URL үчүн латын тамгалар гана (мис: table-lamps)
              </p>
              <button
                type="submit"
                disabled={loadingCat}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition disabled:opacity-50"
              >
                {loadingCat ? "Жүктөлүүдө..." : "➕ Категория кошуу"}
              </button>
            </form>
          </div>

          {/* Категориялар тизмеси */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-amber-600" />
              Категориялар ({categories.length})
            </h2>

            <div className="space-y-3">
              {categories.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Категория жок</p>
              )}
              {categories.map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 border border-border rounded-xl bg-background">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">slug: {c.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(c.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
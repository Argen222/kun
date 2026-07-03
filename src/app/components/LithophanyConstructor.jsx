import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { RotateCw, Sun, Moon, Camera, ShoppingCart, Image as ImageIcon, Check } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========== 3D Литофания Лампа Компоненти (өзгөрүүсүз) ==========
// (Бул жерде сиздин мурунку LithophanyLamp компонентиңиз толугу менен келтирилбейт,
//  бирок ал ошол бойдон конструктордун ичинде колдонулат.)

// ========== Жаңыланган Конструктор ==========
function LithophanyConstructor() {
  // Сүрөттөр
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);

  // Жарык жөндөөлөрү
  const [lightOn, setLightOn] = useState(true);
  const [brightness, setBrightness] = useState(1.83);
  const [contrast, setContrast] = useState(0.78);
  const [warmth, setWarmth] = useState(0.5);
  const [autoRotate, setAutoRotate] = useState(true);

  // Заказ формасы
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const resetCameraRef = useRef(null);

  // Сүрөт жүктөө
  const handleImageUpload = (e, slot) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (slot === 1) {
          setUploadedImage1(reader.result);
          setImageFile1(file);
        } else {
          setUploadedImage2(reader.result);
          setImageFile2(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Заказ жөнөтүү
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerName || !phoneNumber) {
      setMessage({ type: "error", text: "Введите имя и номер телефона!" });
      return;
    }
    if (!imageFile1 && !imageFile2) {
      setMessage({ type: "error", text: "Загрузите хотя бы одно фото!" });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("customer_name", customerName);
    formData.append("phone_number", phoneNumber);
    if (imageFile1) formData.append("image_front", imageFile1);
    if (imageFile2) formData.append("image_back", imageFile2);

    try {
      const response = await fetch("https://kun-backend1.onrender.com/api/custom-orders/", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const text = `🕯️ Новый заказ литофании!\n\n👤 Клиент: ${customerName}\n📞 Телефон: ${phoneNumber}`;
        const whatsappUrl = `https://wa.me/996708515052?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        setMessage({ type: "success", text: "✅ Заказ отправлен!" });
        setCustomerName("");
        setPhoneNumber("");
      } else {
        setMessage({ type: "error", text: "❌ Ошибка, попробуйте позже." });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Нет связи с сервером." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col lg:flex-row">
      {/* ========== 3D Сцена (сол тарап) ========== */}
      <div className="flex-1 min-h-[300px] lg:min-h-screen p-2 sm:p-4 flex items-center justify-center">
        <LithophanyLamp
          uploadedImage1={uploadedImage1}
          uploadedImage2={uploadedImage2}
          lightOn={lightOn}
          brightness={brightness}
          contrast={contrast}
          warmth={warmth}
          autoRotate={autoRotate}
          onResetCamera={resetCameraRef}
        />
      </div>

      {/* ========== Башкаруу панели (оң тарап) ========== */}
      <div className="w-full lg:w-[420px] bg-gray-900/95 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-gray-800 p-4 space-y-6 overflow-y-auto max-h-screen">
        
        {/* Тез баскычтар */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setLightOn(!lightOn)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition ${
              lightOn
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            {lightOn ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {lightOn ? 'Выкл' : 'Вкл'}
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition ${
              autoRotate
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            {autoRotate ? 'Стоп' : 'Вращать'}
          </button>

          <button
            onClick={() => resetCameraRef.current?.()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700"
          >
            🎯 Сброс
          </button>
        </div>

        {/* Сүрөт жүктөө */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">📸 Загрузите фото</h3>
          <div className="flex gap-2">
            <label className="flex-1 flex items-center gap-2 p-3 bg-gray-800/80 border border-gray-700 rounded-xl cursor-pointer hover:border-amber-500/40 transition group">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20">
                <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-300 truncate">
                  {uploadedImage1 ? '✅ Загружено' : 'Передняя'}
                </p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 1)} />
            </label>

            <label className="flex-1 flex items-center gap-2 p-3 bg-gray-800/80 border border-gray-700 rounded-xl cursor-pointer hover:border-amber-500/40 transition group">
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-amber-500/20">
                <ImageIcon className="w-4 h-4 text-gray-400 group-hover:text-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-300 truncate">
                  {uploadedImage2 ? '✅ Загружено' : 'Задняя'}
                </p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 2)} />
            </label>
          </div>
        </div>

        {/* Жарык жөндөөлөрү (дайыма көрүнүп турат) */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">💡 Настройки света</h3>
          <div className="space-y-4">
            {/* Яркость */}
            <div>
              <label className="flex justify-between text-sm text-gray-300 mb-2">
                ☀️ Яркость
                <span className="text-amber-400 font-mono text-xs">{brightness.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.01"
                value={brightness}
                onChange={(e) => setBrightness(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Тускло</span><span>Ярко</span>
              </div>
            </div>

            {/* Контраст */}
            <div>
              <label className="flex justify-between text-sm text-gray-300 mb-2">
                🎨 Контраст
                <span className="text-amber-400 font-mono text-xs">{contrast.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0.3"
                max="1.5"
                step="0.01"
                value={contrast}
                onChange={(e) => setContrast(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Мягко</span><span>Резко</span>
              </div>
            </div>

            {/* Теплота */}
            <div>
              <label className="flex justify-between text-sm text-gray-300 mb-2">
                🔥 Теплота
                <span className="text-amber-400 font-mono text-xs">{warmth.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={warmth}
                onChange={(e) => setWarmth(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-full appearance-none accent-amber-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Холодно</span><span>Тепло</span>
              </div>
            </div>
          </div>
        </div>

        {/* Заказ формасы (дайыма ачык) */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">📋 Оформление заказа</h3>
          <div className="space-y-3">
            <input
              placeholder="Ваше имя"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:border-amber-500 outline-none"
            />
            <input
              placeholder="Телефон: 0700 123 456"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:border-amber-500 outline-none"
            />
            {message.text && (
              <p className={`text-xs p-3 rounded-xl ${
                message.type === 'success'
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {message.text}
              </p>
            )}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmitOrder}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
            >
              <ShoppingCart className="w-5 h-5" />
              {loading ? "⏳ Отправка..." : "📩 Заказать через WhatsApp"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LithophanyConstructor };
export default LithophanyConstructor;
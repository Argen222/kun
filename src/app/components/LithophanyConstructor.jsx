import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Upload, Square, Circle, Heart, Star, ShoppingCart } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const shapes = [
  { id: "square", name: "Квадрат", icon: Square },
  { id: "circle", name: "Круг", icon: Circle },
  { id: "heart", name: "Сердце", icon: Heart },
  { id: "star", name: "Звезда", icon: Star }
];

const sizes = [
  { id: "small", name: "Маленький", dimensions: '4" x 4"' },
  { id: "medium", name: "Средний", dimensions: '6" x 6"' },
  { id: "large", name: "Большой", dimensions: '8" x 8"' },
  { id: "xlarge", name: "Очень большой", dimensions: '10" x 10"' }
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
  
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const controlsRef = useRef(null);

  // Создание сцены Three.js
  useEffect(() => {
    if (!containerRef.current) return;

    // Сцена
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f0eb);
    sceneRef.current = scene;

    // Камера
    const camera = new THREE.PerspectiveCamera(40, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
    camera.position.set(3, 2, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Рендерер
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Орбитальное управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.minDistance = 2;
    controls.maxDistance = 12;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffeedd, 2);
    mainLight.position.set(5, 8, 6);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xccddff, 0.8);
    fillLight.position.set(-4, 2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffaa66, 0.5, 10);
    pointLight.position.set(0, 3, 0);
    scene.add(pointLight);

    // Пьедестал
    const planeGeometry = new THREE.CircleGeometry(2.5, 64);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e0d8,
      roughness: 0.8,
      metalness: 0.05,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.8;
    plane.receiveShadow = true;
    scene.add(plane);

    // Анимация
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Изменение размера окна
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Создание 3D модели из изображения
  useEffect(() => {
    if (!uploadedImage || !sceneRef.current) return;

    // Удаление старой модели
    if (meshRef.current) {
      sceneRef.current.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      meshRef.current.material.dispose();
      meshRef.current = null;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxSize = 256;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > maxSize) {
          height = Math.round(height * (maxSize / width));
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = Math.round(width * (maxSize / height));
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Геометрия
      const segments = 120;
      const geometry = new THREE.PlaneGeometry(2.8, 2.8, segments, segments);
      const positionAttribute = geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        const x = (vertex.x / 1.4 + 0.5) * width;
        const y = (-vertex.y / 1.4 + 0.5) * height;
        const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
        const brightness = data[idx] / 255;
        vertex.z = brightness * 0.4;
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      geometry.computeVertexNormals();

      // Материал
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xf5e6d3,
        metalness: 0.15,
        roughness: 0.35,
        clearcoat: 0.4,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide,
        envMapIntensity: 0.6,
        flatShading: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.y = 0;
      
      sceneRef.current.add(mesh);
      meshRef.current = mesh;
    };
    img.src = uploadedImage;
  }, [uploadedImage]);

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
      setMessage({ type: "error", text: "Введите ваше имя и номер телефона!" });
      return;
    }
    if (!imageFile) {
      setMessage({ type: "error", text: "Пожалуйста, загрузите изображение!" });
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
        const text = `🕯️ Новый заказ литофании!\n\n👤 Клиент: ${customerName}\n📞 Телефон: ${phoneNumber}\n🔷 Форма: ${selectedShape}\n📏 Размер: ${selectedSizeData?.dimensions}`;
        const whatsappUrl = `https://wa.me/996708515052?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        setMessage({ type: "success", text: "✅ Заказ успешно отправлен!" });
        setCustomerName("");
        setPhoneNumber("");
        setUploadedImage(null);
        setImageFile(null);
        if (meshRef.current && sceneRef.current) {
          sceneRef.current.remove(meshRef.current);
          meshRef.current = null;
        }
      } else {
        setMessage({ type: "error", text: "❌ Произошла ошибка, попробуйте позже." });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Не удалось связаться с сервером." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Левая сторона: 3D Сцена */}
          <div className="space-y-8">
            <div 
              ref={containerRef}
              className="w-full aspect-square rounded-2xl bg-gradient-to-br from-amber-100/30 to-amber-200/20 shadow-2xl overflow-hidden border-2 border-amber-200/30"
            />
            
            <input id="photo-upload" type="file" className="hidden" onChange={handleImageUpload} />
            
            <label 
              htmlFor="photo-upload"
              className="block w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-center cursor-pointer shadow-lg shadow-amber-500/30 transition-all"
            >
              <Upload className="w-5 h-5 inline-block mr-2" />
              📸 Загрузить фото (для 3D эффекта)
            </label>
            
            {/* Фигуры */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {shapes.map((shape) => (
                <button 
                  key={shape.id}
                  onClick={() => setSelectedShape(shape.id)} 
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedShape === shape.id 
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20" 
                      : "border-gray-200 hover:border-amber-500/50"
                  }`}
                >
                  <shape.icon className={`w-8 h-8 mx-auto ${
                    selectedShape === shape.id ? "text-amber-600" : "text-gray-400"
                  }`} />
                  <p className={`text-sm mt-1 ${
                    selectedShape === shape.id ? "text-amber-600 font-semibold" : "text-gray-500"
                  }`}>{shape.name}</p>
                </button>
              ))}
            </div>

            {/* Размеры */}
            <div className="grid grid-cols-2 gap-4">
              {sizes.map((size) => (
                <button 
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)} 
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedSize === size.id 
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20" 
                      : "border-gray-200 hover:border-amber-500/50"
                  }`}
                >
                  <p className={`font-semibold ${
                    selectedSize === size.id ? "text-amber-600" : "text-gray-700"
                  }`}>{size.name}</p>
                  <p className={`text-sm ${
                    selectedSize === size.id ? "text-amber-500" : "text-gray-400"
                  }`}>{size.dimensions}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Правая сторона: Форма заказа */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-100 shadow-xl">
              <h3 className="text-2xl font-bold text-amber-800 mb-6">📋 Оформление заказа</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">👤 Ваше имя</label>
                  <input 
                    placeholder="Ваше имя" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    className="w-full p-4 rounded-xl border border-amber-200 bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">📞 Телефон</label>
                  <input 
                    placeholder="0700 123 456" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    className="w-full p-4 rounded-xl border border-amber-200 bg-amber-50/50 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" 
                  />
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200/50">
                  <p className="text-sm text-amber-700 font-medium">📋 Данные заказа:</p>
                  <p className="text-sm text-amber-600/70">Фигура: {selectedShape}</p>
                  <p className="text-sm text-amber-600/70">Размер: {selectedSizeData?.dimensions}</p>
                </div>
              </div>
              
              {message.text && (
                <p className={`text-center p-3 rounded-lg ${
                  message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                }`}>{message.text}</p>
              )}
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitOrder} 
                disabled={loading} 
                className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {loading ? "⏳ Отправка..." : "📩 Заказать через WhatsApp"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LithophanyConstructor };
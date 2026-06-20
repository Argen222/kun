import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Upload, Square, Circle, Heart, Star, ShoppingCart } from "lucide-react";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Фигуралар
const shapes = [
  { id: "square", name: "Квадрат", icon: Square },
  { id: "circle", name: "Тегерек", icon: Circle },
  { id: "heart", name: "Жүрөк", icon: Heart },
  { id: "star", name: "Жылдыз", icon: Star }
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
  
  // Three.js референстери
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const controlsRef = useRef(null);
  const animationIdRef = useRef(null);

  // Three.js сценасын түзүү
  useEffect(() => {
    if (!containerRef.current) return;

    // Сцена
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f4f0);
    sceneRef.current = scene;

    // Камера
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100);
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Орбиталык башкаруу
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.minDistance = 3;
    controls.maxDistance = 15;
    controlsRef.current = controls;

    // Жарыктар
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffeedd, 0.5);
    fillLight.position.set(-5, 0, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, -5, -5);
    scene.add(rimLight);

    // Пьедестал (кооздоп коюу үчүн)
    const planeGeometry = new THREE.CircleGeometry(3.5, 32);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e0d8,
      roughness: 0.7,
      metalness: 0.1,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.5;
    plane.receiveShadow = true;
    scene.add(plane);

    // Анимация циклы
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Терезе өлчөмүн өзгөртүү
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Тазалоо
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, []);

  // Сүрөт жүктөлгөндө 3D модель түзүү
  useEffect(() => {
    if (!uploadedImage || !sceneRef.current) return;

    // Эски модельди өчүрүү
    if (meshRef.current) {
      sceneRef.current.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      meshRef.current.material.dispose();
      meshRef.current = null;
    }

    // Сүрөттү height map кылып иштетүү
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Геометрия түзүү (көп бөлүктүү)
      const segments = 128;
      const geometry = new THREE.PlaneGeometry(3, 3, segments, segments);
      const positionAttribute = geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        const x = (vertex.x / 1.5 + 0.5) * canvas.width;
        const y = (-vertex.y / 1.5 + 0.5) * canvas.height;
        const index = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
        const brightness = data[index] / 255;
        vertex.z = brightness * 0.5;
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }

      geometry.computeVertexNormals();

      // Фигуранын формасын кесүү (clip-path эмес, геометрия менен)
      // Бул жерде жөнөкөйлөтүп, тек сүрөттүн өзүн көрсөтөбүз

      // Материал
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xf5e6d3,
        metalness: 0.1,
        roughness: 0.4,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide,
        envMapIntensity: 0.6
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.y = 0;
      
      sceneRef.current.add(mesh);
      meshRef.current = mesh;

      // Орбиталык башкарууну сүрөткө багыттоо
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
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
        // 3D моделирди тазалоо
        if (meshRef.current && sceneRef.current) {
          sceneRef.current.remove(meshRef.current);
          meshRef.current = null;
        }
      } else {
        setMessage({ type: "error", text: "❌ Ката кетти, кийинчерээк аракет кылыңыз." });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Сервер менен байланышуу мүмкүн эмес." });
    } finally {
      setLoading(false);
    }
  };

  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pt-32 pb-20 bg-gradient-to-br from-amber-50 via-white to-amber-50/50", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12", children: [
    
    /* === СОЛ ЖАГЫ: 3D СЦЕНА + КОНСТРУКТОР === */
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      
      /* 3D Контейнер */
      /* @__PURE__ */ jsx("div", { 
        ref: containerRef,
        className: "w-full aspect-square rounded-2xl bg-gradient-to-br from-amber-100/30 to-amber-200/20 shadow-2xl overflow-hidden border-2 border-amber-200/30",
      }),
      
      /* Сүрөт жүктөө инпуту */
      /* @__PURE__ */ jsx("input", { id: "photo-upload", type: "file", className: "hidden", onChange: handleImageUpload }),
      
      /* Сүрөт жүктөө баскычы */
      /* @__PURE__ */ jsxs("label", { 
        htmlFor: "photo-upload",
        className: "block w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-center cursor-pointer shadow-lg shadow-amber-500/30 transition-all",
        children: [
          /* @__PURE__ */ jsx(Upload, { className: "w-5 h-5 inline-block mr-2" }),
          "📸 Сүрөт жүктөө (3D эффект үчүн)"
        ]
      }),
      
      /* Фигуралар */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: shapes.map((shape) => /* @__PURE__ */ jsxs("button", { 
        onClick: () => setSelectedShape(shape.id), 
        className: `p-6 rounded-xl border-2 transition-all ${selectedShape === shape.id ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20" : "border-border hover:border-amber-500/50"}`, 
        children: [
          /* @__PURE__ */ jsx(shape.icon, { className: `w-8 h-8 mx-auto ${selectedShape === shape.id ? "text-amber-600" : "text-foreground/60"}` }),
          /* @__PURE__ */ jsx("p", { className: `text-sm mt-1 ${selectedShape === shape.id ? "text-amber-600 font-semibold" : "text-foreground/60"}` }, shape.name)
        ] 
      }, shape.id)) }),

      /* Өлчөмдөр */
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxs("button", { 
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
      /* @__PURE__ */ jsxs("div", { 
        className: "bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-100 shadow-xl",
        children: [
          /* Башчысы */
          /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-amber-800 mb-6", children: "📋 Заказ берүү" }),
          
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
          message.text && /* @__PURE__ */ jsx("p", { 
            className: `text-center p-3 rounded-lg ${message.type === "success" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`,
            children: message.text 
          }),
          
          /* Заказ берүү баскычы */
          /* @__PURE__ */ jsxs(motion.button, { 
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: handleSubmitOrder, 
            disabled: loading, 
            className: "w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all",
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
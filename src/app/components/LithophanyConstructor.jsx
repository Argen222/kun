import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Upload, X, ChevronRight, RotateCw, Zap, Sun, Moon } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========== 3D Литофания Лампа Компоненти ==========
function LithophanyLamp({ 
  uploadedImage1, 
  uploadedImage2, 
  lightOn, 
  brightness, 
  contrast, 
  warmth 
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cylinderRef = useRef(null);
  const innerLightRef = useRef(null);
  const glowCylRef = useRef(null);
  const poolRef = useRef(null);
  const controlsRef = useRef(null);
  const materialRef = useRef(null);
  const groupRef = useRef(null);

  // Текстураларды сактоо
  const texturesRef = useRef({ map1: null, map2: null });

  // Константалар
  const R = 1.3;
  const H = 5.0;
  const DEFAULT_CAM = new THREE.Vector3(0, 1.2, 9.5);

  // Сценаны бир жолу түзүү
  useEffect(() => {
    if (!containerRef.current) return;

    // Сцена
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0f14);
    sceneRef.current = scene;

    // Камера
    const camera = new THREE.PerspectiveCamera(
      40,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.copy(DEFAULT_CAM);
    cameraRef.current = camera;

    // Рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Орбитальное управление
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 5;
    controls.maxDistance = 16;
    controls.target.set(0, 0.6, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.maxPolarAngle = Math.PI * 0.92;
    controlsRef.current = controls;

    // Освещение комнаты
    scene.add(new THREE.AmbientLight(0x4a5260, 0.6));
    const keyLight = new THREE.DirectionalLight(0x9fb0c8, 0.5);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    // Внутренний свет лампы
    const innerLight = new THREE.PointLight(0xffd9a0, 0, 30, 1.6);
    innerLight.position.set(0, 0.4, 0);
    scene.add(innerLight);
    innerLightRef.current = innerLight;

    // Группа для лампы
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Цилиндр-литофания
    const cylGeo = new THREE.CylinderGeometry(R, R, H, 320, 320, true);

    // Шейдер материалы
    const litoMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      transparent: false,
      uniforms: {
        map: { value: null },
        map2: { value: null },
        hasImage: { value: 0.0 },
        hasImage2: { value: 0.0 },
        imgAR1: { value: 1.0 },
        imgAR2: { value: 1.0 },
        panelAR: { value: (Math.PI * R) / H },
        lightOn: { value: 1.0 },
        brightness: { value: 1.83 },
        contrast: { value: 0.78 },
        warmColor: { value: new THREE.Color(0xffd9a0) },
        coolColor: { value: new THREE.Color(0xf3f6ff) },
        warmth: { value: 0.5 },
        baseColor: { value: new THREE.Color(0xe9e4d8) },
        relief: { value: 0.07 },
        bumpStrength: { value: 3.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        uniform sampler2D map;
        uniform sampler2D map2;
        uniform float hasImage, hasImage2, imgAR1, imgAR2, panelAR, relief;

        vec2 coverUV(vec2 luv, float imgAR){
          vec2 uvv = luv; float ratio = imgAR / panelAR;
          if(ratio > 1.0){ uvv.x = (uvv.x - 0.5)/ratio + 0.5; }
          else           { uvv.y = (uvv.y - 0.5)*ratio + 0.5; }
          return uvv;
        }
        float sampleLum(vec2 ruv){
          float u2 = fract(ruv.x + 0.25);
          float isBack = step(0.5, u2);
          vec2 luvF = vec2(u2 / 0.5, ruv.y);
          vec2 luvB = vec2((u2 - 0.5) / 0.5, ruv.y);
          vec3 tF = texture2D(map,  coverUV(luvF, imgAR1)).rgb;
          vec3 tB = texture2D(map2, coverUV(luvB, imgAR2)).rgb;
          vec3 t = mix(tF, tB, isBack);
          return dot(t, vec3(0.299,0.587,0.114));
        }
        void main(){
          vUv = uv;
          float lum = sampleLum(uv);
          float disp = (1.0 - lum) * relief;
          vec3 pos = position + normal * disp;
          vNormal = normalize(normalMatrix * normal);
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          vViewDir = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform sampler2D map;
        uniform sampler2D map2;
        uniform float hasImage, hasImage2, imgAR1, imgAR2, panelAR;
        uniform float lightOn, brightness, contrast, warmth, bumpStrength;
        uniform vec3 warmColor, coolColor, baseColor;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;

        vec2 coverUV(vec2 luv, float imgAR){
          vec2 uv = luv;
          float ratio = imgAR / panelAR;
          if(ratio > 1.0){ uv.x = (uv.x - 0.5) / ratio + 0.5; }
          else           { uv.y = (uv.y - 0.5) * ratio + 0.5; }
          return uv;
        }
        float lumAtRaw(vec2 ruv){
          float u2 = fract(ruv.x + 0.25);
          float isBack = step(0.5, u2);
          vec2 luvF = vec2(u2 / 0.5, ruv.y);
          vec2 luvB = vec2((u2 - 0.5) / 0.5, ruv.y);
          vec3 tF = texture2D(map,  coverUV(luvF, imgAR1)).rgb;
          vec3 tB = texture2D(map2, coverUV(luvB, imgAR2)).rgb;
          vec3 t = mix(tF, tB, isBack);
          float l = dot(t, vec3(0.299,0.587,0.114));
          return clamp((l - 0.5) * contrast + 0.5, 0.0, 1.0);
        }

        void main(){
          float u2 = fract(vUv.x + 0.25);
          float isBack = step(0.5, u2);
          vec2 luvF = vec2(u2 / 0.5, vUv.y);
          vec2 luvB = vec2((u2 - 0.5) / 0.5, vUv.y);
          vec3 texF = texture2D(map,  coverUV(luvF, imgAR1)).rgb;
          vec3 texB = texture2D(map2, coverUV(luvB, imgAR2)).rgb;
          vec3 tex = mix(texF, texB, isBack);
          float hasImg = mix(hasImage, hasImage2, isBack);
          if(hasImg < 0.5) tex = vec3(0.8);

          float lum = dot(tex, vec3(0.299,0.587,0.114));
          lum = clamp((lum - 0.5) * contrast + 0.5, 0.0, 1.0);

          vec3 lampColor = mix(coolColor, warmColor, warmth);
          float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0), 2.0);

          float eps = 0.0016;
          float hl = lumAtRaw(vUv - vec2(eps, 0.0));
          float hr = lumAtRaw(vUv + vec2(eps, 0.0));
          float hd = lumAtRaw(vUv - vec2(0.0, eps));
          float hu = lumAtRaw(vUv + vec2(0.0, eps));
          vec3 bn = normalize(vec3((hr - hl) * bumpStrength, (hu - hd) * bumpStrength, 1.0));
          vec3 Ldir = normalize(vec3(0.4, 0.5, 0.85));
          float diff = max(dot(bn, Ldir), 0.0);
          float spec = pow(max(bn.z, 0.0), 6.0);

          float glow = pow(lum, 1.15) * brightness;
          vec3 onCol = lampColor * (glow * 1.15 + 0.05);
          onCol *= (0.78 + 0.32 * diff);
          onCol += lampColor * spec * 0.12 * brightness;
          onCol += lampColor * fres * 0.25 * brightness;
          float layers = 0.97 + 0.03 * sin(vUv.y * 900.0);
          onCol *= layers;

          float reliefShade = 0.55 + lum * 0.45;
          vec3 offCol = baseColor * reliefShade * (0.5 + 0.6 * diff + fres * 0.4);

          vec3 col = mix(offCol, onCol, lightOn);
          gl_FragColor = vec4(col, 1.0);
        }
      `
    });
    
    const cylinder = new THREE.Mesh(cylGeo, litoMaterial);
    cylinder.position.y = 0.0;
    group.add(cylinder);
    cylinderRef.current = cylinder;
    materialRef.current = litoMaterial;

    // Внутреннее свечение
    const glowGeo = new THREE.CylinderGeometry(R * 0.96, R * 0.96, H * 0.99, 64, 1, true);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffe2b0,
      transparent: true,
      opacity: 0.0,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const glowCyl = new THREE.Mesh(glowGeo, glowMat);
    group.add(glowCyl);
    glowCylRef.current = glowCyl;

    // Крышки
    const baseMat = new THREE.MeshStandardMaterial({ 
      color: 0x1b1d22, 
      roughness: 0.5, 
      metalness: 0.3 
    });
    const grilleMat = new THREE.MeshStandardMaterial({ 
      color: 0x111316, 
      roughness: 0.7 
    });

    const CAP_H = 0.18;
    const CAP_R = R + 0.07 + 0.03;
    const CAP_OVERLAP = 0.06;

    // Нижняя крышка
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(CAP_R, CAP_R, CAP_H, 64),
      baseMat
    );
    base.position.y = -H / 2 + CAP_OVERLAP - CAP_H / 2;
    group.add(base);

    const baseBottom = new THREE.Mesh(
      new THREE.CircleGeometry(CAP_R * 0.9, 48),
      grilleMat
    );
    baseBottom.rotation.x = Math.PI / 2;
    baseBottom.position.y = -H / 2 + CAP_OVERLAP - CAP_H;
    group.add(baseBottom);

    // Верхняя крышка
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(CAP_R, CAP_R, CAP_H, 64),
      baseMat
    );
    cap.position.y = H / 2 - CAP_OVERLAP + CAP_H / 2;
    group.add(cap);

    const capTop = new THREE.Mesh(
      new THREE.CircleGeometry(CAP_R * 0.9, 48),
      grilleMat
    );
    capTop.rotation.x = -Math.PI / 2;
    capTop.position.y = H / 2 - CAP_OVERLAP + CAP_H;
    group.add(capTop);

    group.position.y = 0.55;

    // Пол
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x16181d,
      roughness: 0.85,
      metalness: 0.1
    });
    const floor = new THREE.Mesh(new THREE.CircleGeometry(40, 64), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -H / 2 + group.position.y - 0.44;
    scene.add(floor);

    // Лужа света
    const poolMat = new THREE.MeshBasicMaterial({
      color: 0xffcf8a,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const pool = new THREE.Mesh(new THREE.CircleGeometry(5, 48), poolMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = floor.position.y + 0.01;
    scene.add(pool);
    poolRef.current = pool;

    // Заглушка текстуры
    const ph = makePlaceholder();
    litoMaterial.uniforms.map.value = ph;
    litoMaterial.uniforms.map2.value = ph;
    litoMaterial.uniforms.hasImage.value = 1.0;
    litoMaterial.uniforms.hasImage2.value = 1.0;
    litoMaterial.uniforms.imgAR1.value = 600 / 900;
    litoMaterial.uniforms.imgAR2.value = 600 / 900;

    // Анимация
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const on = litoMaterial.uniforms.lightOn.value;
      const b = litoMaterial.uniforms.brightness.value;
      
      innerLight.intensity += (on * b * 14 - innerLight.intensity) * 0.1;
      innerLight.color.copy(
        new THREE.Color().lerpColors(
          new THREE.Color(0xf3f6ff),
          new THREE.Color(0xffd9a0),
          litoMaterial.uniforms.warmth.value
        )
      );
      glowMat.opacity += (on * Math.min(b, 1) * 0.35 - glowMat.opacity) * 0.1;
      poolMat.opacity += (on * Math.min(b, 1.2) * 0.22 - poolMat.opacity) * 0.1;
      
      const targetBg = new THREE.Color().lerpColors(
        new THREE.Color(0x161a20),
        new THREE.Color(0x0a0b0e),
        on * Math.min(b, 1)
      );
      scene.background.lerp(targetBg, 0.05);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
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

  // Заглушка текстурасы
  function makePlaceholder() {
    const c = document.createElement('canvas');
    c.width = 600;
    c.height = 900;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 900);
    g.addColorStop(0, '#cfcfcf');
    g.addColorStop(1, '#7a7a7a');
    x.fillStyle = g;
    x.fillRect(0, 0, 600, 900);
    x.fillStyle = '#444';
    x.font = 'bold 46px sans-serif';
    x.textAlign = 'center';
    x.fillText('Загрузите фото', 300, 430);
    x.font = '28px sans-serif';
    x.fillStyle = '#555';
    x.fillText('🖼️', 300, 500);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  // Изображение жүктөө
  const loadImageTexture = useCallback((url, slot) => {
    const loader = new THREE.TextureLoader();
    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.anisotropy = rendererRef.current?.capabilities.getMaxAnisotropy() || 1;
      const ar = tex.image.width / tex.image.height;
      
      if (materialRef.current) {
        if (slot === 2) {
          materialRef.current.uniforms.map2.value = tex;
          materialRef.current.uniforms.hasImage2.value = 1.0;
          materialRef.current.uniforms.imgAR2.value = ar;
          texturesRef.current.map2 = tex;
        } else {
          materialRef.current.uniforms.map.value = tex;
          materialRef.current.uniforms.hasImage.value = 1.0;
          materialRef.current.uniforms.imgAR1.value = ar;
          texturesRef.current.map1 = tex;
        }
      }
    });
  }, []);

  // Сүрөт жүктөлгөндө
  useEffect(() => {
    if (uploadedImage1) {
      loadImageTexture(uploadedImage1, 1);
    }
  }, [uploadedImage1, loadImageTexture]);

  useEffect(() => {
    if (uploadedImage2) {
      loadImageTexture(uploadedImage2, 2);
    }
  }, [uploadedImage2, loadImageTexture]);

  // Жарыкты күйгүзүү/өчүрүү
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.lightOn.value = lightOn ? 1.0 : 0.0;
    }
  }, [lightOn]);

  // Жарыктык
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.brightness.value = brightness;
    }
  }, [brightness]);

  // Контраст
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.contrast.value = contrast;
    }
  }, [contrast]);

  // Жылуулук
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.warmth.value = warmth;
    }
  }, [warmth]);

  return (
    <div ref={containerRef} className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl" />
  );
}

// ========== Негизги Литофания Конструктору ==========
function LithophanyConstructor() {
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [lightOn, setLightOn] = useState(true);
  const [brightness, setBrightness] = useState(1.83);
  const [contrast, setContrast] = useState(0.78);
  const [warmth, setWarmth] = useState(0.5);
  const [autoRotate, setAutoRotate] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPanel, setShowPanel] = useState(true);

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
      setMessage({ type: "error", text: "Введите ваше имя и номер телефона!" });
      return;
    }
    if (!imageFile1 && !imageFile2) {
      setMessage({ type: "error", text: "Пожалуйста, загрузите хотя бы одно изображение!" });
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
        const text = `🕯️ Новый заказ литофании!\n\n👤 Клиент: ${customerName}\n📞 Телефон: ${phoneNumber}\n💡 Свет: ${lightOn ? 'Вкл' : 'Выкл'}`;
        const whatsappUrl = `https://wa.me/996708515052?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, "_blank");
        setMessage({ type: "success", text: "✅ Заказ успешно отправлен!" });
        setCustomerName("");
        setPhoneNumber("");
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
    <div className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Мобильный переключатель панели */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="lg:hidden fixed top-4 left-4 z-20 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 flex items-center justify-center text-white"
        >
          {showPanel ? <X className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          
          {/* Боковая панель */}
          <div className={`${showPanel ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-10 lg:z-auto transition-transform duration-300 w-[320px] h-full lg:h-auto`}>
            <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 space-y-6 h-full lg:h-auto overflow-y-auto">
              
              {/* Бренд */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-300 to-amber-600 shadow-lg shadow-amber-500/30" />
                <h2 className="text-lg font-bold text-white">Литофановая лампа</h2>
              </div>
              <p className="text-sm text-gray-400">
                Загрузите 2 фото — для передней и задней стороны лампы
              </p>

              {/* Загрузка фото */}
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">📸 Фотографии</p>
                
                <label className="block p-4 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-amber-500/50 transition-colors text-center">
                  <Upload className="w-6 h-6 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-300">Фото 1 — передняя сторона</p>
                  <p className="text-xs text-gray-500 mt-1">выберите или перетащите</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 1)}
                  />
                </label>

                <label className="block p-4 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-amber-500/50 transition-colors text-center">
                  <Upload className="w-6 h-6 mx-auto text-gray-500 mb-2" />
                  <p className="text-sm text-gray-300">Фото 2 — задняя сторона</p>
                  <p className="text-xs text-gray-500 mt-1">выберите или перетащите</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 2)}
                  />
                </label>
              </div>

              {/* Свет */}
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">💡 Свет</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLightOn(true)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      lightOn 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400 border' 
                        : 'bg-gray-800 border border-gray-700 text-gray-400'
                    }`}
                  >
                    <Sun className="w-4 h-4 inline mr-1" /> Вкл
                  </button>
                  <button
                    onClick={() => setLightOn(false)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      !lightOn 
                        ? 'bg-gray-700 border-gray-600 text-white border' 
                        : 'bg-gray-800 border border-gray-700 text-gray-400'
                    }`}
                  >
                    <Moon className="w-4 h-4 inline mr-1" /> Выкл
                  </button>
                </div>
              </div>

              {/* Настройки */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">🎚️ Настройки</p>
                
                <div>
                  <label className="flex justify-between text-sm text-gray-300 mb-1">
                    Яркость <span className="text-amber-400">{brightness.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.01"
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-gray-300 mb-1">
                    Контраст <span className="text-amber-400">{contrast.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0.3"
                    max="1.5"
                    step="0.01"
                    value={contrast}
                    onChange={(e) => setContrast(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <label className="flex justify-between text-sm text-gray-300 mb-1">
                    Теплота <span className="text-amber-400">{warmth.toFixed(2)}</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={warmth}
                    onChange={(e) => setWarmth(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Форма заказа */}
              <div className="space-y-3 pt-4 border-t border-gray-800">
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">📋 Заказ</p>
                
                <input
                  placeholder="Ваше имя"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 outline-none"
                />
                
                <input
                  placeholder="Телефон (0700 123 456)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-amber-500 outline-none"
                />

                {message.text && (
                  <p className={`text-sm p-3 rounded-lg ${
                    message.type === 'success' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {message.text}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  <Zap className="w-5 h-5" />
                  {loading ? "⏳ Отправка..." : "📩 Заказать через WhatsApp"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* 3D Сцена */}
          <div className="space-y-4">
            <LithophanyLamp
              uploadedImage1={uploadedImage1}
              uploadedImage2={uploadedImage2}
              lightOn={lightOn}
              brightness={brightness}
              contrast={contrast}
              warmth={warmth}
            />
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  autoRotate 
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700'
                }`}
              >
                <RotateCw className="w-4 h-4 inline mr-2" />
                Автоповорот {autoRotate ? 'ON' : 'OFF'}
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm">
              🖱️ Перетащите, чтобы вращать · колёсико для масштаба
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { LithophanyConstructor };
export default LithophanyConstructor;
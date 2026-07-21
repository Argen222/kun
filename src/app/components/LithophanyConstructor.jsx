import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCw, Sun, Moon, Camera, Settings, ShoppingCart, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, Send, SlidersHorizontal } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ========== WhatsApp номери ==========
const WHATSAPP_NUMBER = "996770150025";

// ========== 3D Литофания Лампа Компоненти ==========
function LithophanyLamp({ 
  uploadedImage1, 
  uploadedImage2, 
  lightOn, 
  brightness, 
  contrast, 
  warmth,
  autoRotate,
  onResetCamera
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const controlsRef = useRef(null);
  const groupRef = useRef(null);

  const R = 1.3;
  const H = 5.0;
  const DEFAULT_CAM = new THREE.Vector3(0, 0.8, 9.5); // Камера бир аз ылдый

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0f14);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      40,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.copy(DEFAULT_CAM);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 4;
    controls.maxDistance = 14;
    controls.target.set(0, 0.3, 0); // Фокус ылдый
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;
    controls.maxPolarAngle = Math.PI * 0.92;
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0x4a5260, 0.6));
    const keyLight = new THREE.DirectionalLight(0x9fb0c8, 0.5);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const innerLight = new THREE.PointLight(0xffd9a0, 0, 30, 1.6);
    innerLight.position.set(0, 0.4, 0);
    scene.add(innerLight);

    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    const cylGeo = new THREE.CylinderGeometry(R, R, H, 320, 320, true);

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
    cylinder.position.y = -0.3; // Лампаны ылдый жылдыруу
    group.add(cylinder);
    materialRef.current = litoMaterial;

    const glowGeo = new THREE.CylinderGeometry(R * 0.96, R * 0.96, H * 0.99, 64, 1, true);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffe2b0, transparent: true, opacity: 0.0,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const glowCyl = new THREE.Mesh(glowGeo, glowMat);
    glowCyl.position.y = -0.3;
    group.add(glowCyl);

    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1b1d22, roughness: 0.5, metalness: 0.3 });
    const grilleMat = new THREE.MeshStandardMaterial({ color: 0x111316, roughness: 0.7 });

    const CAP_H = 0.18;
    const CAP_R = R + 0.07 + 0.03;
    const CAP_OVERLAP = 0.06;
    const Y_OFFSET = -0.3;

    const base = new THREE.Mesh(new THREE.CylinderGeometry(CAP_R, CAP_R, CAP_H, 64), baseMat);
    base.position.y = -H / 2 + CAP_OVERLAP - CAP_H / 2 + Y_OFFSET;
    group.add(base);

    const baseBottom = new THREE.Mesh(new THREE.CircleGeometry(CAP_R * 0.9, 48), grilleMat);
    baseBottom.rotation.x = Math.PI / 2;
    baseBottom.position.y = -H / 2 + CAP_OVERLAP - CAP_H + Y_OFFSET;
    group.add(baseBottom);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(CAP_R, CAP_R, CAP_H, 64), baseMat);
    cap.position.y = H / 2 - CAP_OVERLAP + CAP_H / 2 + Y_OFFSET;
    group.add(cap);

    const capTop = new THREE.Mesh(new THREE.CircleGeometry(CAP_R * 0.9, 48), grilleMat);
    capTop.rotation.x = -Math.PI / 2;
    capTop.position.y = H / 2 - CAP_OVERLAP + CAP_H + Y_OFFSET;
    group.add(capTop);

    group.position.y = 0.55;

    const floorMat = new THREE.MeshStandardMaterial({ color: 0x16181d, roughness: 0.85, metalness: 0.1 });
    const floor = new THREE.Mesh(new THREE.CircleGeometry(40, 64), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -H / 2 + group.position.y - 0.44;
    scene.add(floor);

    const poolMat = new THREE.MeshBasicMaterial({
      color: 0xffcf8a, transparent: true, opacity: 0.0,
      blending: THREE.AdditiveBlending, depthWrite: false
    });
    const pool = new THREE.Mesh(new THREE.CircleGeometry(5, 48), poolMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.y = floor.position.y + 0.01;
    scene.add(pool);

    const ph = makePlaceholder();
    litoMaterial.uniforms.map.value = ph;
    litoMaterial.uniforms.map2.value = ph;
    litoMaterial.uniforms.hasImage.value = 1.0;
    litoMaterial.uniforms.hasImage2.value = 1.0;
    litoMaterial.uniforms.imgAR1.value = 600 / 900;
    litoMaterial.uniforms.imgAR2.value = 600 / 900;

    const animate = () => {
      requestAnimationFrame(animate);
      const on = litoMaterial.uniforms.lightOn.value;
      const b = litoMaterial.uniforms.brightness.value;
      
      innerLight.intensity += (on * b * 14 - innerLight.intensity) * 0.1;
      innerLight.color.copy(new THREE.Color().lerpColors(
        new THREE.Color(0xf3f6ff), new THREE.Color(0xffd9a0), litoMaterial.uniforms.warmth.value
      ));
      glowMat.opacity += (on * Math.min(b, 1) * 0.35 - glowMat.opacity) * 0.1;
      poolMat.opacity += (on * Math.min(b, 1.2) * 0.22 - poolMat.opacity) * 0.1;
      
      const targetBg = new THREE.Color().lerpColors(
        new THREE.Color(0x161a20), new THREE.Color(0x0a0b0e), on * Math.min(b, 1)
      );
      scene.background.lerp(targetBg, 0.05);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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

  function makePlaceholder() {
    const c = document.createElement('canvas');
    c.width = 600; c.height = 900;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 0, 900);
    g.addColorStop(0, '#cfcfcf'); g.addColorStop(1, '#7a7a7a');
    x.fillStyle = g; x.fillRect(0, 0, 600, 900);
    x.fillStyle = '#444'; x.font = 'bold 46px sans-serif'; x.textAlign = 'center';
    x.fillText('Загрузите фото', 300, 430);
    x.font = '28px sans-serif'; x.fillStyle = '#555';
    x.fillText('🖼️', 300, 500);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

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
        } else {
          materialRef.current.uniforms.map.value = tex;
          materialRef.current.uniforms.hasImage.value = 1.0;
          materialRef.current.uniforms.imgAR1.value = ar;
        }
      }
    });
  }, []);

  useEffect(() => { if (uploadedImage1) loadImageTexture(uploadedImage1, 1); }, [uploadedImage1, loadImageTexture]);
  useEffect(() => { if (uploadedImage2) loadImageTexture(uploadedImage2, 2); }, [uploadedImage2, loadImageTexture]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.lightOn.value = lightOn ? 1.0 : 0.0; }, [lightOn]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.brightness.value = brightness; }, [brightness]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.contrast.value = contrast; }, [contrast]);
  useEffect(() => { if (materialRef.current) materialRef.current.uniforms.warmth.value = warmth; }, [warmth]);
  useEffect(() => { if (controlsRef.current) controlsRef.current.autoRotate = autoRotate; }, [autoRotate]);

  const handleResetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.copy(DEFAULT_CAM);
      controlsRef.current.target.set(0, 0.3, 0);
      controlsRef.current.update();
    }
  }, []);

  useEffect(() => { if (onResetCamera) onResetCamera.current = handleResetCamera; }, [handleResetCamera, onResetCamera]);

  return (
    <div ref={containerRef} className="w-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ aspectRatio: '1/1', maxHeight: 'calc(100vh - 250px)', minHeight: '280px' }} />
  );
}

// ========== Негизги Конструктор (Настройкалар САКТАЛДЫ) ==========
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
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  
  const resetCameraRef = useRef(null);

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

  const handleSubmitOrder = () => {
    if (!customerName.trim()) {
      setMessage({ type: "error", text: "❌ Введите ваше имя!" });
      return;
    }
    if (!phoneNumber.trim()) {
      setMessage({ type: "error", text: "❌ Введите номер телефона!" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    const text = `🕯️ *НОВЫЙ ЗАКАЗ ЛИТОФАНИИ*\n\n` +
                 `👤 *Клиент:* ${customerName.trim()}\n` +
                 `📞 *Телефон:* ${phoneNumber.trim()}\n\n` +
                 `📸 *Фото 1 (перед):* ${imageFile1 ? '✅ Загружено (' + (imageFile1.size / 1024).toFixed(1) + ' KB)' : '❌ Не загружено'}\n` +
                 `📸 *Фото 2 (зад):* ${imageFile2 ? '✅ Загружено (' + (imageFile2.size / 1024).toFixed(1) + ' KB)' : '❌ Не загружено'}\n\n` +
                 `💡 *Свет:* ${lightOn ? 'Включен ✓' : 'Выключен ✗'}\n` +
                 `☀️ *Яркость:* ${brightness.toFixed(1)}\n` +
                 `🎨 *Контраст:* ${contrast.toFixed(2)}\n` +
                 `🔥 *Теплота:* ${warmth.toFixed(2)}\n` +
                 `🔄 *Автоповорот:* ${autoRotate ? 'Да' : 'Нет'}\n\n` +
                 `📅 *Дата заказа:* ${new Date().toLocaleString('ru-RU')}\n\n` +
                 `⚠️ *ВАЖНО:* Отправьте фото ОТДЕЛЬНО в этот чат!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    try {
      const formData = new FormData();
      formData.append("customer_name", customerName.trim());
      formData.append("phone_number", phoneNumber.trim());
      formData.append("light_on", lightOn);
      formData.append("brightness", brightness);
      formData.append("contrast", contrast);
      formData.append("warmth", warmth);
      if (imageFile1) formData.append("image_front", imageFile1);
      if (imageFile2) formData.append("image_back", imageFile2);

      fetch("https://kun-backend1.onrender.com/api/custom-orders/", {
        method: "POST",
        body: formData
      }).catch(() => console.log("⚠️ Сервер недоступен"));
    } catch (error) {
      console.log("ℹ️ API error");
    }

    setMessage({ type: "success", text: "✅ Открываем WhatsApp..." });
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 500);

    setTimeout(() => {
      setCustomerName("");
      setPhoneNumber("");
      setLoading(false);
      setMessage({ type: "", text: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      
      {/* 3D Сцена */}
      <div className="flex-1 flex flex-col pt-4 sm:pt-8">
        <div className="flex-1 p-2 sm:p-4 flex items-center justify-center">
          <div className="w-full max-w-[500px] sm:max-w-[600px]">
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
        </div>

        {/* Кнопки управления */}
        <div className="px-4 pb-3 flex gap-2 justify-center flex-wrap">
          <button onClick={() => setLightOn(!lightOn)}
            className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              lightOn 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}>
            {lightOn ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            {lightOn ? 'Выкл' : 'Вкл'}
          </button>
          
          <button onClick={() => setAutoRotate(!autoRotate)}
            className={`px-4 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              autoRotate 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-gray-800 text-gray-400 border border-gray-700'
            }`}>
            <RotateCw className="w-3.5 h-3.5" />
            {autoRotate ? 'Стоп' : 'Вращать'}
          </button>
          
          <button onClick={() => resetCameraRef.current?.()}
            className="px-4 py-2.5 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 flex items-center gap-1.5">
            🎯 Сброс
          </button>
          
          <button onClick={() => setShowPanel(true)}
            className="px-4 py-2.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Настройки
          </button>
        </div>
      </div>

      {/* Мобильная панель (Настройкалар сакталды!) */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 rounded-t-3xl max-h-[80vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl pt-3 pb-2 px-4 z-10">
              <div className="w-10 h-1 bg-gray-700 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-amber-400" />
                  Настройки лампы
                </h3>
                <button onClick={() => setShowPanel(false)} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Табы */}
            <div className="px-4 pb-2">
              <div className="flex gap-2 bg-gray-800 rounded-xl p-1">
                {[
                  { id: 'upload', icon: Camera, label: 'Фото' },
                  { id: 'settings', icon: Settings, label: 'Свет' },
                  { id: 'order', icon: ShoppingCart, label: 'Заказ' },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === tab.id ? 'bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/30' : 'text-gray-400 hover:text-white'
                    }`}>
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-4 pb-8 space-y-4">
              
              {/* Таб: Загрузка фото */}
              {activeTab === 'upload' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Загрузите 1 или 2 фото для разных сторон лампы</p>
                  
                  <label className="block p-4 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-amber-500/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition">
                        <ImageIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{uploadedImage1 ? '✅ Фото 1 загружено' : '📸 Передняя сторона'}</p>
                        <p className="text-xs text-gray-500">Нажмите, чтобы выбрать</p>
                      </div>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 1)} />
                  </label>

                  <label className="block p-4 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-amber-500/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-amber-500/10 transition">
                        <ImageIcon className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{uploadedImage2 ? '✅ Фото 2 загружено' : '📸 Задняя сторона'}</p>
                        <p className="text-xs text-gray-500">Нажмите, чтобы выбрать</p>
                      </div>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 2)} />
                  </label>
                </div>
              )}

              {/* Таб: Настройки света (САКТАЛДЫ!) */}
              {activeTab === 'settings' && (
                <div className="space-y-5">
                  <p className="text-sm text-gray-400">Настройте яркость, контраст и теплоту свечения</p>
                  
                  <div className="bg-gray-800/50 rounded-xl p-4 space-y-4">
                    <div>
                      <label className="flex justify-between text-sm text-gray-300 mb-2">
                        <span className="flex items-center gap-2">☀️ Яркость</span>
                        <span className="text-amber-400 font-mono text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">{brightness.toFixed(2)}</span>
                      </label>
                      <input type="range" min="0.5" max="3" step="0.01" value={brightness}
                        onChange={(e) => setBrightness(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-full appearance-none accent-amber-500 cursor-pointer" />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                        <span>Тускло</span><span>Ярко</span>
                      </div>
                    </div>

                    <div>
                      <label className="flex justify-between text-sm text-gray-300 mb-2">
                        <span className="flex items-center gap-2">🎨 Контраст</span>
                        <span className="text-amber-400 font-mono text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">{contrast.toFixed(2)}</span>
                      </label>
                      <input type="range" min="0.3" max="1.5" step="0.01" value={contrast}
                        onChange={(e) => setContrast(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-full appearance-none accent-amber-500 cursor-pointer" />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                        <span>Мягко</span><span>Чётко</span>
                      </div>
                    </div>

                    <div>
                      <label className="flex justify-between text-sm text-gray-300 mb-2">
                        <span className="flex items-center gap-2">🔥 Теплота</span>
                        <span className="text-amber-400 font-mono text-xs bg-amber-500/10 px-2 py-0.5 rounded-full">{warmth.toFixed(2)}</span>
                      </label>
                      <input type="range" min="0" max="1" step="0.01" value={warmth}
                        onChange={(e) => setWarmth(parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-full appearance-none accent-amber-500 cursor-pointer" />
                      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                        <span>Холодный</span><span>Тёплый</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Таб: Заказ */}
              {activeTab === 'order' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Заполните данные для оформления заказа</p>
                  
                  <input placeholder="Ваше имя *" value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 outline-none text-sm transition" />
                  
                  <input placeholder="Телефон: 0700 123 456 *" value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} type="tel"
                    className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-amber-500 outline-none text-sm transition" />

                  {message.text && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-bottom-2 ${
                      message.type === 'success' 
                        ? 'bg-green-500/10 border border-green-500/30' 
                        : 'bg-red-500/10 border border-red-500/30'
                    }`}>
                      {message.type === 'success' 
                        ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        : <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      }
                      <p className={`text-sm font-medium ${
                        message.type === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}>{message.text}</p>
                    </div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-95 transition-all"
                  >
                    {loading ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Отправка...</>
                    ) : (
                      <><Send className="w-5 h-5" /> 📩 Заказать через WhatsApp</>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-500 text-center">
                    * Откроется WhatsApp. Фото отправьте отдельно в чат.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowPanel(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export { LithophanyConstructor };
export default LithophanyConstructor;
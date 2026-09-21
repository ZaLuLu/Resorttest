import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RealisticEarthCanvasProps {
  progress: number; // 0 (Space orbit) -> 0.45 (Rotate to India) -> 0.8 (Zoom into Coorg) -> 1.0 (Fade into resort)
  onLoaded?: () => void;
  onIndiaFocused?: (isFocused: boolean) => void;
  onTriggerZoom?: () => void;
}

// Coorg, Karnataka, India Coordinates: 12.3375° N, 75.8062° E
const COORG_LAT = 12.3375;
const COORG_LON = 75.8062;
const EARTH_RADIUS = 2.0;

export const RealisticEarthCanvas: React.FC<RealisticEarthCanvasProps> = ({
  progress,
  onLoaded,
  onIndiaFocused,
  onTriggerZoom,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const pinSpriteRef = useRef<THREE.Sprite | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const atmosphereMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);

  const progressRef = useRef(progress);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isIndiaFocusedRef = useRef(false);

  // Drag-to-rotate interaction & momentum state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const manualRotRef = useRef({ x: 0.35, y: -1.2 });
  const dragVelocityRef = useRef({ x: 0, y: 0 });
  const lastDragPosRef = useRef({ x: 0, y: 0, time: 0 });
  const hasUserRotatedRef = useRef(false);
  const hasAutoTriggeredRef = useRef(false);

  const [, setTexturesLoaded] = useState(false);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Convert Lat/Lon to 3D Cartesian coordinates on sphere
  const latLonToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  };

  // Generate crisp 2D Vector Map Pin Texture (Teardrop shape with sharp tip at bottom)
  const create2DPinTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, 128, 128);

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;

    // Classic 2D Teardrop Pin Path with tip at bottom (64, 122)
    ctx.beginPath();
    ctx.moveTo(64, 122);
    ctx.bezierCurveTo(40, 84, 22, 64, 22, 44);
    ctx.arc(64, 44, 42, Math.PI, 0, false);
    ctx.bezierCurveTo(106, 64, 88, 84, 64, 122);
    ctx.closePath();

    ctx.fillStyle = '#E63946'; // Vibrant Ruby Red
    ctx.fill();

    // Crisp white border outline
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // White inner center dot
    ctx.beginPath();
    ctx.arc(64, 44, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera centered on Earth
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);
    cameraRef.current = camera;

    // 2. WebGL Renderer with ACES Filmic Tone Mapping (capped at 1.35 DPR for smooth performance on old laptops & mobile)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Viewport Intersection Observer to pause rendering when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 3. Natural Sunlight & Deep Space Contrast
    const ambientLight = new THREE.AmbientLight(0x151820, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff7ea, 2.3);
    sunLight.position.set(7, 3, 6);
    scene.add(sunLight);

    // 4. Multi-Layer Deep Space Starfield
    const starsCount = 2400;
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      const radius = THREE.MathUtils.randFloat(35, 110);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = radius * Math.cos(phi);
      starPositions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const brightness = THREE.MathUtils.randFloat(0.5, 1.0);
      starColors[i] = brightness;
      starColors[i + 1] = brightness * THREE.MathUtils.randFloat(0.9, 1.0);
      starColors[i + 2] = brightness * THREE.MathUtils.randFloat(0.95, 1.0);
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starsMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);
    starsRef.current = stars;

    // 5. Earth Parent Group (Centered at 0, 0, 0)
    const earthGroup = new THREE.Group();
    earthGroup.rotation.x = manualRotRef.current.x;
    earthGroup.rotation.y = manualRotRef.current.y;
    scene.add(earthGroup);
    earthGroupRef.current = earthGroup;

    // 6. NASA Textures Loader
    const loadingManager = new THREE.LoadingManager(() => {
      setTexturesLoaded(true);
      if (onLoaded) onLoaded();
    });
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const dayTexture = textureLoader.load('/textures/earth/earth_day.jpg');
    const normalTexture = textureLoader.load('/textures/earth/earth_normal.jpg');
    const specularTexture = textureLoader.load('/textures/earth/earth_specular.jpg');
    const cloudsTexture = textureLoader.load('/textures/earth/earth_clouds.png');
    const lightsTexture = textureLoader.load('/textures/earth/earth_lights.jpg');

    // 7. Natural Satellite Earth Mesh with Night Lights Emissive
    const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.65, 0.65),
      roughnessMap: specularTexture,
      roughness: 0.65,
      metalness: 0.05,
      emissiveMap: lightsTexture,
      emissive: new THREE.Color(0xffd479),
      emissiveIntensity: 0.45,
      color: 0xffffff,
    });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // 7b. Atmospheric Fresnel Rim Glow Sphere with Dynamic Fade
    // uFade prevents the "blue screen pop-up" when zooming close to the surface
    const atmosphereGeometry = new THREE.SphereGeometry(EARTH_RADIUS * 1.025, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uFade: { value: 1.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uFade;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, normalize(-vPosition)), 3.2);
          gl_FragColor = vec4(0.25, 0.60, 1.0, intensity * 0.88 * uFade);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphereMesh);
    atmosphereMeshRef.current = atmosphereMesh;
    atmosphereMaterialRef.current = atmosphereMaterial;

    // 8. Natural Cloud Sphere Layer
    const cloudsGeometry = new THREE.SphereGeometry(EARTH_RADIUS + 0.015, 64, 64);
    const cloudsMaterial = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      roughness: 0.95,
      depthWrite: false,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    earthGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // 9. Map Pin Sprite & Coordinates for Coorg
    const coorgPos = latLonToVector3(COORG_LAT, COORG_LON, EARTH_RADIUS + 0.005);
    const pinTexture = create2DPinTexture();
    let pinSprite: THREE.Sprite | null = null;

    if (pinTexture) {
      const pinMaterial = new THREE.SpriteMaterial({
        map: pinTexture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      pinSprite = new THREE.Sprite(pinMaterial);
      pinSprite.center.set(0.5, 0.0);
      pinSprite.position.copy(coorgPos);
      pinSprite.scale.set(0.13, 0.13, 1);
      earthGroup.add(pinSprite);
      pinSpriteRef.current = pinSprite;
    }

    // Target Euler Angles so Coorg points directly at camera (+Z axis)
    const targetRotY = -((COORG_LON + 90) * (Math.PI / 180));
    const targetRotX = COORG_LAT * (Math.PI / 180);

    // 10. Pointer Drag & Interaction System (Mouse Drag & Touch Swipe)
    let pointerMovedDistance = 0;

    const handlePointerDown = (e: PointerEvent) => {
      // Disallow drag if already triggered or past space orbit
      if (progressRef.current >= 0.45 || hasAutoTriggeredRef.current) return;
      isDraggingRef.current = true;
      pointerMovedDistance = 0;
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        rotX: manualRotRef.current.x,
        rotY: manualRotRef.current.y,
      };
      lastDragPosRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: performance.now(),
      };
      dragVelocityRef.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Subtle parallax when not dragging
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 0.25;
      mouseRef.current.targetY = normY * 0.25;

      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      pointerMovedDistance += Math.hypot(e.clientX - lastDragPosRef.current.x, e.clientY - lastDragPosRef.current.y);

      // Sensitivity factor
      const sensitivity = 0.005;
      manualRotRef.current.y = dragStartRef.current.rotY + deltaX * sensitivity;
      manualRotRef.current.x = THREE.MathUtils.clamp(
        dragStartRef.current.rotX + deltaY * sensitivity,
        -Math.PI / 2.5,
        Math.PI / 2.5
      );

      // Measure instantaneous velocity for inertia release
      const now = performance.now();
      const dt = Math.max(1, now - lastDragPosRef.current.time);
      dragVelocityRef.current = {
        y: ((e.clientX - lastDragPosRef.current.x) / dt) * 16 * sensitivity,
        x: ((e.clientY - lastDragPosRef.current.y) / dt) * 16 * sensitivity,
      };

      lastDragPosRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: now,
      };
      hasUserRotatedRef.current = true;
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // 11. Render Loop with Inertia & Indian Subcontinent Alignment Check
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current; // 0 to 1

      // Mouse parallax damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Cloud slow drift
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y = elapsedTime * 0.008;
      }

      // Starfield subtle cosmic drift
      if (starsRef.current) {
        starsRef.current.rotation.y = elapsedTime * 0.001;
      }

      // Drag inertia physics (decay momentum when released)
      if (!isDraggingRef.current) {
        manualRotRef.current.y += dragVelocityRef.current.y;
        manualRotRef.current.x = THREE.MathUtils.clamp(
          manualRotRef.current.x + dragVelocityRef.current.x,
          -Math.PI / 2.5,
          Math.PI / 2.5
        );
        dragVelocityRef.current.x *= 0.94;
        dragVelocityRef.current.y *= 0.94;

        // If user is idle and hasn't dragged recently, gently spin globe
        if (!hasUserRotatedRef.current && Math.abs(dragVelocityRef.current.y) < 0.0001) {
          manualRotRef.current.y += 0.0012;
        }
      }

      // ATMOSPHERE FADE-OUT: Eliminate the blue screen pop-up!
      // Inverted blue Fresnel geometry fades to 0 before camera zooms close to the surface
      if (atmosphereMaterialRef.current && atmosphereMeshRef.current) {
        const atmoFade = p < 0.3 ? 1.0 : Math.max(0, 1.0 - (p - 0.3) / 0.25);
        atmosphereMaterialRef.current.uniforms.uFade.value = atmoFade;
        atmosphereMeshRef.current.visible = atmoFade > 0.01;
      }

      // ROTATION & CAMERA SCROLL CHOREOGRAPHY
      if (earthGroupRef.current && cameraRef.current) {
        if (p < 0.45) {
          // Free manual drag-to-rotate mode in space orbit
          earthGroupRef.current.rotation.y = manualRotRef.current.y;
          earthGroupRef.current.rotation.x = manualRotRef.current.x;

          cameraRef.current.position.set(
            mouseRef.current.x,
            mouseRef.current.y,
            7.2
          );
          earthGroupRef.current.scale.set(1, 1, 1);
        } else {
          // Scroll lock: smoothly steer from current orientation to Coorg target angles
          const lockT = Math.min(1, (p - 0.45) / 0.15);
          const smoothLockT = lockT * lockT * (3 - 2 * lockT);

          earthGroupRef.current.rotation.y = THREE.MathUtils.lerp(manualRotRef.current.y, targetRotY, smoothLockT);
          earthGroupRef.current.rotation.x = THREE.MathUtils.lerp(manualRotRef.current.x, targetRotX, smoothLockT);

          if (p < 0.8) {
            // Zooming from space directly onto the 2D Pin in Coorg
            const zoomT = Math.min(1, Math.max(0, (p - 0.45) / 0.35));
            const smoothZoom = 1 - Math.pow(2, -10 * zoomT);

            const camZ = THREE.MathUtils.lerp(7.2, 2.06, smoothZoom);
            const camX = THREE.MathUtils.lerp(mouseRef.current.x, 0, smoothZoom);
            const camY = THREE.MathUtils.lerp(mouseRef.current.y, 0, smoothZoom);

            cameraRef.current.position.set(camX, camY, camZ);
            earthGroupRef.current.scale.set(1, 1, 1);
          } else {
            // Cloud dive & mist dissolve (0.8 -> 1.0)
            const dissolveT = (p - 0.8) / 0.2;
            const zoomScale = 1 + dissolveT * 4.5;
            earthGroupRef.current.scale.set(zoomScale, zoomScale, zoomScale);
            cameraRef.current.position.set(0, 0, 2.06 - dissolveT * 0.25);
          }
        }

        // 2D Pin scale & fade transition
        if (pinSpriteRef.current) {
          const pinScaleT = THREE.MathUtils.clamp((p - 0.15) / 0.3, 0, 1);
          const zoomScaleMod = p > 0.5 ? Math.max(0.4, 1 - (p - 0.5) * 1.5) : 1.0;
          const baseScale = 0.13 * pinScaleT * zoomScaleMod;
          pinSpriteRef.current.scale.set(baseScale, baseScale, 1);
        }

        // Reset auto trigger when user scrolls back to the very top
        if (p < 0.03) {
          hasAutoTriggeredRef.current = false;
          if (mountRef.current && p < 0.45) {
            mountRef.current.style.pointerEvents = 'auto';
          }
        }

        // DETECT INDIAN SUBCONTINENT / COORG ALIGNMENT & AUTO-TRIGGER DESCENT
        // Check if Coorg's coordinate vector is facing forward (+Z towards camera)
        const coorgWorld = coorgPos.clone().applyEuler(earthGroupRef.current.rotation);
        const isNearIndia = coorgWorld.z > 1.05;

        if (isNearIndia !== isIndiaFocusedRef.current) {
          isIndiaFocusedRef.current = isNearIndia;
          if (onIndiaFocused) onIndiaFocused(isNearIndia);
        }

        // AUTOMATIC SCROLL TRIGGER:
        // No matter how they rotate, if they come near Indian subcontinent, automatically trigger the scroll descent
        if (isNearIndia && !hasAutoTriggeredRef.current && p < 0.28) {
          hasAutoTriggeredRef.current = true;
          isDraggingRef.current = false;
          dragVelocityRef.current = { x: 0, y: 0 };
          if (mountRef.current) {
            mountRef.current.style.pointerEvents = 'none';
          }
          if (onTriggerZoom) {
            onTriggerZoom();
          }
        }
      }

      // Paused when offscreen or completely transitioned into resort section
      if (!isVisible || p >= 0.99) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 12. Handle Window Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);

      if (rendererRef.current && rendererRef.current.domElement && container.contains(rendererRef.current.domElement)) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      starsGeo.dispose();
      starsMat.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      cloudsGeometry.dispose();
      cloudsMaterial.dispose();
      if (pinTexture) pinTexture.dispose();
    };
  }, []);

  const isInteractive = progress < 0.75;

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full overflow-hidden select-none ${
        isInteractive ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
      }`}
      style={{
        opacity: Math.max(0, 1 - Math.max(0, (progress - 0.78) / 0.22)),
        transition: 'opacity 0.1s linear',
      }}
    />
  );
};

export default RealisticEarthCanvas;

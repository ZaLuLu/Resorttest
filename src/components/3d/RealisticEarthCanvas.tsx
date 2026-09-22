import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RealisticEarthCanvasProps {
  progress: number; // 0 (Space orbit) -> 0.45 (Rotate to India) -> 0.8 (Zoom into Coorg) -> 1.0 (Fade into resort)
  onLoaded?: () => void;
}

// Coorg, Karnataka, India Coordinates: 12.3375° N, 75.8062° E
const COORG_LAT = 12.3375;
const COORG_LON = 75.8062;
const EARTH_RADIUS = 2.0;

export const RealisticEarthCanvas: React.FC<RealisticEarthCanvasProps> = ({
  progress,
  onLoaded,
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

  // Generate sleek, handcrafted luxury pin texture (Champagne Gold / Radiant Pearl)
  const createLuxuryPinTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.clearRect(0, 0, 256, 256);

    // 1. Soft Ground Contact Shadow at Pin Tip (centered at x=128, y=244)
    ctx.save();
    const shadowGrad = ctx.createRadialGradient(128, 244, 2, 128, 244, 28);
    shadowGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0.70)');
    shadowGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
    shadowGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(128, 244, 26, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Slender Luxury Pin Silhouette
    // Tip at (128, 240), head centered at (128, 88) with radius 46
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;

    ctx.beginPath();
    ctx.moveTo(128, 240); // Needle tip anchored to coordinate
    // Left curve up to circular head
    ctx.bezierCurveTo(96, 172, 82, 128, 82, 88);
    // Upper head arc
    ctx.arc(128, 88, 46, Math.PI, 0, false);
    // Right curve back down to needle tip
    ctx.bezierCurveTo(174, 128, 160, 172, 128, 240);
    ctx.closePath();

    // Rich Champagne Gold Metallic Gradient
    const goldGrad = ctx.createLinearGradient(82, 42, 174, 240);
    goldGrad.addColorStop(0.0, '#FFF5E4'); // Radiant specular peak
    goldGrad.addColorStop(0.25, '#E8C896'); // Lustrous champagne gold
    goldGrad.addColorStop(0.65, '#C7A583'); // Signature Laya resort gold
    goldGrad.addColorStop(1.0, '#8B6F47'); // Burnished bronze needle tip
    ctx.fillStyle = goldGrad;
    ctx.fill();

    // Ultra-crisp hairline specular edge
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.restore();

    // 3. Luxurious Concentric Pearl Core
    // Outer bronze bezel
    ctx.beginPath();
    ctx.arc(128, 88, 21, 0, Math.PI * 2);
    ctx.fillStyle = '#654C2B';
    ctx.fill();

    // Inner gold rim
    ctx.beginPath();
    ctx.arc(128, 88, 18, 0, Math.PI * 2);
    ctx.fillStyle = '#E5C48E';
    ctx.fill();

    // Radiant pearl center
    const pearlGrad = ctx.createRadialGradient(125, 84, 1, 128, 88, 14);
    pearlGrad.addColorStop(0.0, '#FFFFFF');
    pearlGrad.addColorStop(0.7, '#F7EFE6');
    pearlGrad.addColorStop(1.0, '#D6C0A6');
    ctx.beginPath();
    ctx.arc(128, 88, 14, 0, Math.PI * 2);
    ctx.fillStyle = pearlGrad;
    ctx.fill();

    // Micro specular highlight
    ctx.beginPath();
    ctx.arc(124, 83, 3.5, 0, Math.PI * 2);
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

    // 2. WebGL Renderer with ACES Filmic Tone Mapping (capped at 1.35 DPR for smooth performance)
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
    const ambientLight = new THREE.AmbientLight(0x151820, 0.55);
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
    scene.add(earthGroup);
    earthGroupRef.current = earthGroup;

    // 6. NASA Master 4K Textures Loader
    const loadingManager = new THREE.LoadingManager(() => {
      setTexturesLoaded(true);
      if (onLoaded) onLoaded();
    });
    const textureLoader = new THREE.TextureLoader(loadingManager);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // High-Resolution 4K NASA Blue Marble Equirectangular Texture
    const dayTexture = textureLoader.load('/textures/earth/earth_day_4k.webp');
    dayTexture.anisotropy = maxAnisotropy;
    dayTexture.minFilter = THREE.LinearMipmapLinearFilter;
    dayTexture.magFilter = THREE.LinearFilter;
    dayTexture.generateMipmaps = true;

    const normalTexture = textureLoader.load('/textures/earth/earth_normal.jpg');
    normalTexture.anisotropy = maxAnisotropy;
    normalTexture.minFilter = THREE.LinearMipmapLinearFilter;
    normalTexture.magFilter = THREE.LinearFilter;

    const specularTexture = textureLoader.load('/textures/earth/earth_specular.jpg');
    const cloudsTexture = textureLoader.load('/textures/earth/earth_clouds.png');
    cloudsTexture.anisotropy = Math.min(4, maxAnisotropy);

    const lightsTexture = textureLoader.load('/textures/earth/earth_lights.jpg');
    lightsTexture.anisotropy = maxAnisotropy;

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

    // 9. Sleek Luxury Map Pin Anchored to Coorg
    const coorgPos = latLonToVector3(COORG_LAT, COORG_LON, EARTH_RADIUS + 0.003);
    const pinTexture = createLuxuryPinTexture();
    let pinSprite: THREE.Sprite | null = null;

    if (pinTexture) {
      const pinMaterial = new THREE.SpriteMaterial({
        map: pinTexture,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      pinSprite = new THREE.Sprite(pinMaterial);
      // Anchor needle tip (y=240 on 256h canvas) precisely to surface coordinates
      pinSprite.center.set(0.5, (256 - 240) / 256);
      pinSprite.position.copy(coorgPos);
      pinSprite.scale.set(0.040, 0.040, 1);
      earthGroup.add(pinSprite);
      pinSpriteRef.current = pinSprite;
    }

    // Target Euler Angles so Coorg points directly at camera (+Z axis)
    const startRotY = -1.2;
    const startRotX = 0.35;
    const targetRotY = -((COORG_LON + 90) * (Math.PI / 180));
    const targetRotX = COORG_LAT * (Math.PI / 180);

    // 10. Subtle Perspective Parallax with Damped Mouse Movement
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 0.25;
      mouseRef.current.targetY = normY * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 11. Render Loop with Cinematic Scroll Scrub
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

      // Atmospheric glow fade during descent
      if (atmosphereMaterialRef.current && atmosphereMeshRef.current) {
        const atmoFade = p < 0.3 ? 1.0 : Math.max(0, 1.0 - (p - 0.3) / 0.25);
        atmosphereMaterialRef.current.uniforms.uFade.value = atmoFade;
        atmosphereMeshRef.current.visible = atmoFade > 0.01;
      }

      // PURE CINEMATIC ROTATION & CAMERA CHOREOGRAPHY
      if (earthGroupRef.current && cameraRef.current) {
        // Phase 1 (0 -> 0.45): Smooth S-curve rotation from space to India & Coorg
        const rotT = Math.min(1, p / 0.45);
        const smoothRotT = rotT * rotT * (3 - 2 * rotT);

        earthGroupRef.current.rotation.y = THREE.MathUtils.lerp(startRotY, targetRotY, smoothRotT);
        earthGroupRef.current.rotation.x = THREE.MathUtils.lerp(startRotX, targetRotX, smoothRotT);

        if (p < 0.45) {
          // In space orbit with mouse parallax tilt
          cameraRef.current.position.set(
            mouseRef.current.x,
            mouseRef.current.y,
            7.2
          );
          earthGroupRef.current.scale.set(1, 1, 1);
        } else if (p < 0.8) {
          // Phase 2 (0.45 -> 0.8): Zooming from space directly onto the Sleek Pin in Coorg
          const zoomT = Math.min(1, Math.max(0, (p - 0.45) / 0.35));
          const smoothZoom = 1 - Math.pow(2, -10 * zoomT);

          const camZ = THREE.MathUtils.lerp(7.2, 2.06, smoothZoom);
          const camX = THREE.MathUtils.lerp(mouseRef.current.x, 0, smoothZoom);
          const camY = THREE.MathUtils.lerp(mouseRef.current.y, 0, smoothZoom);

          cameraRef.current.position.set(camX, camY, camZ);
          earthGroupRef.current.scale.set(1, 1, 1);
        } else {
          // Phase 3 (0.8 -> 1.0): Cloud dive & mountain mist dissolve into resort grounds
          const dissolveT = (p - 0.8) / 0.2;
          const zoomScale = 1 + dissolveT * 4.5;
          earthGroupRef.current.scale.set(zoomScale, zoomScale, zoomScale);
          cameraRef.current.position.set(0, 0, 2.06 - dissolveT * 0.25);
        }

        // SLEEK LUXURY PIN DYNAMIC SCALE & FADE
        if (pinSpriteRef.current) {
          // Fade in as Earth rotates towards India
          const pinEntrance = THREE.MathUtils.clamp((p - 0.12) / 0.25, 0, 1);

          // As camera approaches from distance 7.2 to 2.06, scale down world units so screen size remains sleek (~42px)
          let currentScale = 0.040;
          if (p > 0.45) {
            const zoomProgress = Math.min(1, (p - 0.45) / 0.33);
            currentScale = THREE.MathUtils.lerp(0.040, 0.0052, Math.pow(zoomProgress, 0.85));
          }

          const finalScale = currentScale * pinEntrance;
          pinSpriteRef.current.scale.set(finalScale, finalScale, 1);

          // Gracefully fade out pin as we pass through the morning mist (p >= 0.72)
          if (pinSpriteRef.current.material) {
            const pinFade = p < 0.72 ? 1.0 : Math.max(0, 1.0 - (p - 0.72) / 0.08);
            pinSpriteRef.current.material.opacity = pinFade * pinEntrance;
            pinSpriteRef.current.visible = pinFade > 0.01 && pinEntrance > 0.01;
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
      window.removeEventListener('mousemove', handleMouseMove);
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

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none"
      style={{
        opacity: Math.max(0, 1 - Math.max(0, (progress - 0.78) / 0.22)),
        transition: 'opacity 0.1s linear',
      }}
    />
  );
};

export default RealisticEarthCanvas;

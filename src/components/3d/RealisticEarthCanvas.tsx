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
  const progressRef = useRef(progress);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [texturesLoaded, setTexturesLoaded] = useState(false);

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
    // Drop shadow under the 2D pin
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

    ctx.fillStyle = '#EF4444'; // Clean Crimson Red
    ctx.fill();

    // Crisp white border outline
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // White inner center dot
    ctx.beginPath();
    ctx.arc(64, 44, 15, 0, Math.PI * 2);
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

    // 1. Scene & Camera centered on the Earth
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
    const ambientLight = new THREE.AmbientLight(0x111111, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    sunLight.position.set(7, 3, 6);
    scene.add(sunLight);

    // 4. Multi-Layer Deep Space Starfield
    const starsCount = 2500;
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

    // 7b. Atmospheric Fresnel Rim Glow Sphere
    const atmosphereGeometry = new THREE.SphereGeometry(EARTH_RADIUS * 1.025, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
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
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, normalize(-vPosition)), 3.2);
          gl_FragColor = vec4(0.25, 0.60, 1.0, intensity * 0.88);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    earthGroup.add(atmosphereMesh);

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

    // 9. CRISP 2D MAP PIN SPRITE & GOLD BEACON
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

    // Target Euler Angles so Coorg points directly at the camera (+Z axis)
    const targetRotY = -((COORG_LON + 90) * (Math.PI / 180));
    const targetRotX = (COORG_LAT * (Math.PI / 180));

    // 10. Mouse Move Listener for 3D Perspective Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX * 0.3;
      mouseRef.current.targetY = normY * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 11. Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const elapsedTime = clock.getElapsedTime();
      const p = progressRef.current; // 0 to 1

      // Damped mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Cloud drift
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y = elapsedTime * 0.008;
      }

      // Starfield subtle rotation & parallax
      if (starsRef.current) {
        starsRef.current.rotation.y = elapsedTime * 0.001;
      }

      // SCROLL CHOREOGRAPHY LOGIC
      if (earthGroupRef.current && cameraRef.current) {
        // Rotation: Phase 1 (0 -> 0.45)
        const rotT = Math.min(1, p / 0.45);
        const smoothRotT = rotT * rotT * (3 - 2 * rotT);
        
        // Initial space orientation -> Targeted India/Coorg orientation
        const startRotY = -1.2;
        const startRotX = 0.35;
        
        earthGroupRef.current.rotation.y = THREE.MathUtils.lerp(startRotY, targetRotY, smoothRotT);
        earthGroupRef.current.rotation.x = THREE.MathUtils.lerp(startRotX, targetRotX, smoothRotT);

        // Camera Zoom & Position
        if (p < 0.45) {
          // In space orbit with mouse parallax tilt
          cameraRef.current.position.set(
            mouseRef.current.x,
            mouseRef.current.y,
            7.2
          );
          earthGroupRef.current.scale.set(1, 1, 1);
        } else if (p < 0.8) {
          // Zooming from space directly onto the 2D Pin in Coorg (Exponential ease-out for cinematic crane landing)
          const zoomT = Math.min(1, Math.max(0, (p - 0.45) / 0.35));
          const smoothZoom = 1 - Math.pow(2, -10 * zoomT);
          
          const camZ = THREE.MathUtils.lerp(7.2, 2.06, smoothZoom);
          const camX = THREE.MathUtils.lerp(mouseRef.current.x, 0, smoothZoom);
          const camY = THREE.MathUtils.lerp(mouseRef.current.y, 0, smoothZoom);

          cameraRef.current.position.set(camX, camY, camZ);
          earthGroupRef.current.scale.set(1, 1, 1);
        } else {
          // Final cloud dive & dissolve (0.8 -> 1.0)
          const dissolveT = (p - 0.8) / 0.2; // 0 to 1
          const zoomScale = 1 + dissolveT * 5.0;
          earthGroupRef.current.scale.set(zoomScale, zoomScale, zoomScale);
          cameraRef.current.position.set(0, 0, 2.06 - dissolveT * 0.3);
        }

        // 2D Pin scale & fade transition
        if (pinSpriteRef.current) {
          const pinScaleT = THREE.MathUtils.clamp((p - 0.15) / 0.3, 0, 1);
          // Scale smoothly down slightly during extreme zoom so it stays sharp and clean
          const zoomScaleMod = p > 0.5 ? Math.max(0.4, 1 - (p - 0.5) * 1.5) : 1.0;
          const baseScale = 0.13 * pinScaleT * zoomScaleMod;
          pinSpriteRef.current.scale.set(baseScale, baseScale, 1);
        }
      }

      // Paused when offscreen or completely transitioned into the resort section
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: Math.max(0, 1 - Math.max(0, (progress - 0.82) / 0.18)),
        transition: 'opacity 0.08s linear',
      }}
    />
  );
};

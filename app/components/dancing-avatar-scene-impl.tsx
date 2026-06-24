import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type AvatarPart = THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;

function makeSphere(
  geometry: THREE.SphereGeometry,
  material: THREE.Material,
  position: [number, number, number],
  scale: [number, number, number] = [1, 1, 1],
) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  return mesh;
}

export function DancingAvatarSceneImpl() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || webglUnavailable) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.15, 5.7);
    camera.lookAt(0, 0.55, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#dfe8ff", 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 2.5);
    keyLight.position.set(2.5, 4, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight("#8da2ff", 2);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    const skin = new THREE.MeshToonMaterial({ color: "#f1c8aa" });
    const skinShadow = new THREE.MeshToonMaterial({ color: "#d99f7d" });
    const hair = new THREE.MeshToonMaterial({ color: "#211827" });
    const hoodie = new THREE.MeshToonMaterial({ color: "#5f9ccc" });
    const hoodieDark = new THREE.MeshToonMaterial({ color: "#326f9d" });
    const shirt = new THREE.MeshToonMaterial({ color: "#f7fbff" });
    const dark = new THREE.MeshToonMaterial({ color: "#16131a" });
    const blush = new THREE.MeshToonMaterial({ color: "#f49ca6" });
    const shoe = new THREE.MeshToonMaterial({ color: "#202638" });

    const avatar = new THREE.Group();
    avatar.position.y = -0.35;
    scene.add(avatar);

    const body = new THREE.Group();
    avatar.add(body);

    const head = new THREE.Group();
    head.position.y = 1.72;
    avatar.add(head);

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.52, 0.78, 8, 18), hoodie);
    torso.position.y = 0.72;
    torso.scale.set(1.18, 1, 0.7);
    body.add(torso);

    const collar = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.34, 3), shirt);
    collar.position.set(0, 1.15, 0.42);
    collar.rotation.z = Math.PI;
    collar.scale.set(1.25, 0.75, 0.7);
    body.add(collar);

    const neck = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.18, 8, 14), skin);
    neck.position.y = 1.26;
    body.add(neck);

    const armGeometry = new THREE.CapsuleGeometry(0.12, 0.82, 8, 14);
    const leftArm = new THREE.Mesh(armGeometry, hoodieDark);
    const rightArm = new THREE.Mesh(armGeometry, hoodieDark);
    leftArm.position.set(-0.68, 0.72, 0);
    rightArm.position.set(0.68, 0.72, 0);
    leftArm.rotation.z = -0.35;
    rightArm.rotation.z = 0.35;
    body.add(leftArm, rightArm);

    const handGeometry = new THREE.SphereGeometry(0.14, 18, 18);
    const leftHand = new THREE.Mesh(handGeometry, skin);
    const rightHand = new THREE.Mesh(handGeometry, skin);
    leftHand.position.set(-0.82, 0.23, 0);
    rightHand.position.set(0.82, 0.23, 0);
    body.add(leftHand, rightHand);

    const legGeometry = new THREE.CapsuleGeometry(0.13, 0.66, 8, 14);
    const leftLeg = new THREE.Mesh(legGeometry, hoodieDark);
    const rightLeg = new THREE.Mesh(legGeometry, hoodieDark);
    leftLeg.position.set(-0.23, -0.12, 0);
    rightLeg.position.set(0.23, -0.12, 0);
    body.add(leftLeg, rightLeg);

    const footGeometry = new THREE.CapsuleGeometry(0.1, 0.35, 8, 12);
    const leftFoot = new THREE.Mesh(footGeometry, shoe);
    const rightFoot = new THREE.Mesh(footGeometry, shoe);
    leftFoot.position.set(-0.28, -0.55, 0.05);
    rightFoot.position.set(0.28, -0.55, 0.05);
    leftFoot.rotation.z = Math.PI / 2;
    rightFoot.rotation.z = Math.PI / 2;
    body.add(leftFoot, rightFoot);

    const face = new THREE.Mesh(new THREE.SphereGeometry(0.64, 32, 32), skin);
    face.scale.set(0.9, 1.08, 0.78);
    head.add(face);

    const leftEar = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), skinShadow);
    const rightEar = new THREE.Mesh(new THREE.SphereGeometry(0.13, 18, 18), skinShadow);
    leftEar.position.set(-0.58, 0.02, -0.02);
    rightEar.position.set(0.58, 0.02, -0.02);
    head.add(leftEar, rightEar);

    const eyeGeometry = new THREE.SphereGeometry(0.065, 16, 16);
    const leftEye = makeSphere(eyeGeometry, dark, [-0.21, 0.07, 0.5], [1, 1.1, 0.6]);
    const rightEye = makeSphere(eyeGeometry, dark, [0.21, 0.07, 0.5], [1, 1.1, 0.6]);
    head.add(leftEye, rightEye);

    const leftCheek = makeSphere(handGeometry, blush, [-0.33, -0.1, 0.48], [0.8, 0.42, 0.22]);
    const rightCheek = makeSphere(handGeometry, blush, [0.33, -0.1, 0.48], [0.8, 0.42, 0.22]);
    head.add(leftCheek, rightCheek);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.18, 16), skinShadow);
    nose.position.set(0, -0.05, 0.55);
    nose.rotation.x = Math.PI / 2;
    head.add(nose);

    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.012, 8, 28, Math.PI), dark);
    smile.position.set(0, -0.25, 0.54);
    smile.rotation.set(0, 0, Math.PI);
    smile.scale.y = 0.55;
    head.add(smile);

    const hairGeometry = new THREE.SphereGeometry(0.19, 18, 18);
    const hairBubbles: AvatarPart[] = [
      makeSphere(hairGeometry, hair, [-0.38, 0.46, 0.22], [1, 0.9, 0.95]),
      makeSphere(hairGeometry, hair, [-0.2, 0.62, 0.28], [1.08, 1, 1]),
      makeSphere(hairGeometry, hair, [0.02, 0.68, 0.3], [1.15, 1.08, 1]),
      makeSphere(hairGeometry, hair, [0.24, 0.6, 0.25], [1.08, 1, 1]),
      makeSphere(hairGeometry, hair, [0.42, 0.42, 0.18], [0.95, 0.9, 0.9]),
      makeSphere(hairGeometry, hair, [-0.18, 0.42, 0.36], [1.05, 0.95, 0.9]),
      makeSphere(hairGeometry, hair, [0.08, 0.42, 0.4], [1.08, 0.94, 0.9]),
      makeSphere(hairGeometry, hair, [0.32, 0.35, 0.3], [0.96, 0.86, 0.86]),
    ];
    hairBubbles.forEach((bubble) => head.add(bubble));

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(1.7, 48),
      new THREE.MeshBasicMaterial({ color: "#8da2ff", transparent: true, opacity: 0.12 }),
    );
    floor.position.y = -0.94;
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const sparkleMaterial = new THREE.MeshBasicMaterial({
      color: "#ff4d7e",
      transparent: true,
      opacity: 0.75,
    });
    const sparkles = Array.from({ length: 12 }, (_, index) => {
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.035, 0), sparkleMaterial);
      const angle = (index / 12) * Math.PI * 2;
      star.position.set(Math.cos(angle) * 1.45, 0.85 + Math.sin(index) * 0.55, Math.sin(angle) * 0.2);
      scene.add(star);
      return star;
    });

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();
      const bounce = Math.abs(Math.sin(time * 3.2)) * 0.16;
      const sway = Math.sin(time * 2.2);
      const sideStep = Math.sin(time * 1.6) * 0.18;

      avatar.position.x = sideStep;
      avatar.position.y = -0.35 + bounce;
      avatar.rotation.z = sway * 0.08;
      avatar.rotation.y = Math.sin(time * 1.4) * 0.18;

      head.rotation.z = -sway * 0.16;
      head.rotation.y = Math.sin(time * 2.1) * 0.16;
      head.position.y = 1.72 + Math.sin(time * 4.5) * 0.025;

      torso.rotation.z = sway * 0.07;
      leftArm.rotation.z = -0.8 - Math.sin(time * 3.4) * 0.72;
      rightArm.rotation.z = 0.8 + Math.sin(time * 3.4 + Math.PI) * 0.72;
      leftHand.position.y = 0.25 + Math.cos(time * 3.4) * 0.22;
      rightHand.position.y = 0.25 + Math.cos(time * 3.4 + Math.PI) * 0.22;

      leftLeg.rotation.z = Math.sin(time * 3.2) * 0.2;
      rightLeg.rotation.z = Math.sin(time * 3.2 + Math.PI) * 0.2;
      leftFoot.rotation.y = Math.sin(time * 4) * 0.28;
      rightFoot.rotation.y = Math.sin(time * 4 + Math.PI) * 0.28;

      hairBubbles.forEach((bubble, index) => {
        bubble.position.y += Math.sin(time * 5 + index) * 0.0009;
      });

      sparkles.forEach((sparkle, index) => {
        sparkle.rotation.z = time * 1.8 + index;
        sparkle.rotation.y = time * 1.2;
        sparkle.material.opacity = 0.35 + Math.abs(Math.sin(time * 2.5 + index)) * 0.45;
      });

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, [webglUnavailable]);

  if (webglUnavailable) {
    return <DancingAvatarFallback />;
  }

  return (
    <div
      ref={mountRef}
      className="h-[min(58vh,34rem)] min-h-[22rem] w-full overflow-hidden rounded-[1.6rem] border border-[var(--line-soft)] bg-[radial-gradient(circle_at_50%_28%,rgba(141,162,255,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]"
      aria-label="Dancing 3D avatar preview"
    />
  );
}

function DancingAvatarFallback() {
  return (
    <div className="grid h-[min(58vh,34rem)] min-h-[22rem] w-full place-items-center overflow-hidden rounded-[1.6rem] border border-[var(--line-soft)] bg-[radial-gradient(circle_at_50%_28%,rgba(141,162,255,0.22),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015))]">
      <svg
        viewBox="0 0 360 360"
        role="img"
        aria-label="Dancing cartoon avatar fallback"
        className="h-[min(80%,26rem)] w-auto drop-shadow-[0_22px_36px_rgba(0,0,0,0.28)]"
      >
        <defs>
          <linearGradient id="fallbackHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6fa8d8" />
            <stop offset="100%" stopColor="#3d78a8" />
          </linearGradient>
          <linearGradient id="fallbackSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d4b8" />
            <stop offset="100%" stopColor="#e5ad8c" />
          </linearGradient>
        </defs>

        <ellipse cx="180" cy="315" rx="86" ry="18" fill="#8da2ff" opacity="0.16">
          <animate attributeName="rx" values="76;92;76" dur="0.72s" repeatCount="indefinite" />
        </ellipse>

        <g transform="translate(0 0)">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-8 0; 8 -12; -8 0"
            dur="0.72s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            additive="sum"
            type="rotate"
            values="-3 180 205; 4 180 205; -3 180 205"
            dur="0.72s"
            repeatCount="indefinite"
          />

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-18 125 210; 28 125 210; -18 125 210"
              dur="0.72s"
              repeatCount="indefinite"
            />
            <path
              d="M132 204c-30 18-42 43-35 72"
              fill="none"
              stroke="#326f9d"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="97" cy="277" r="12" fill="url(#fallbackSkin)" />
          </g>

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="24 235 210; -24 235 210; 24 235 210"
              dur="0.72s"
              repeatCount="indefinite"
            />
            <path
              d="M228 204c32 18 44 43 36 72"
              fill="none"
              stroke="#326f9d"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="264" cy="277" r="12" fill="url(#fallbackSkin)" />
          </g>

          <path
            d="M116 305c11-58 35-94 64-94s53 36 64 94H116Z"
            fill="url(#fallbackHoodie)"
            stroke="#1f3448"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M150 219c11 22 21 36 30 43 10-7 20-21 31-43l14 42-25 44h-40l-25-44 15-42Z"
            fill="#f7fbff"
            stroke="rgba(31,52,72,0.35)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="5 180 142; -5 180 142; 5 180 142"
              dur="0.72s"
              repeatCount="indefinite"
            />
            <ellipse cx="180" cy="145" rx="54" ry="65" fill="url(#fallbackSkin)" stroke="#291b16" strokeWidth="4" />
            <circle cx="128" cy="148" r="13" fill="url(#fallbackSkin)" stroke="#291b16" strokeWidth="4" />
            <circle cx="232" cy="148" r="13" fill="url(#fallbackSkin)" stroke="#291b16" strokeWidth="4" />

            <g fill="#211827" stroke="#111014" strokeWidth="2.5">
              <circle cx="138" cy="91" r="18" />
              <circle cx="158" cy="75" r="21" />
              <circle cx="184" cy="69" r="23" />
              <circle cx="211" cy="76" r="21" />
              <circle cx="229" cy="96" r="18" />
              <circle cx="151" cy="112" r="21" />
              <circle cx="180" cy="108" r="24" />
              <circle cx="211" cy="113" r="21" />
            </g>

            <path d="M145 130c13-7 27-8 40-4" stroke="#241714" strokeWidth="6" strokeLinecap="round" />
            <path d="M195 126c14-4 28-2 40 5" stroke="#241714" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="160" cy="151" rx="14" ry="11" fill="#fffdf8" />
            <ellipse cx="204" cy="151" rx="14" ry="11" fill="#fffdf8" />
            <circle cx="160" cy="152" r="5" fill="#17120f">
              <animate attributeName="cx" values="157;163;157" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="204" cy="152" r="5" fill="#17120f">
              <animate attributeName="cx" values="201;207;201" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <path
              d="M181 153c-4 13-7 25-8 37 6 4 13 4 20 1"
              fill="none"
              stroke="#9d5a3c"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M164 204c8 8 25 8 33 0" fill="none" stroke="#5c241d" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

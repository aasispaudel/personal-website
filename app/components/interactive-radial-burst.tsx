import { useEffect, useRef } from "react";

type Ray = {
  angle: number;
  length: number;
  phase: number;
  speed: number;
  width: number;
  opacity: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const rayCount = 86;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function createRays(): Ray[] {
  const random = seededRandom(24061994);

  return Array.from({ length: rayCount }, (_, index) => {
    const progress = index / (rayCount - 1);
    const edgeFalloff = Math.sin(progress * Math.PI);

    return {
      angle: -Math.PI + progress * Math.PI + (random() - 0.5) * 0.075,
      length: 0.36 + random() * (0.38 + edgeFalloff * 0.26),
      phase: random() * Math.PI * 2,
      speed: 0.56 + random() * 0.81,
      width: 0.55 + random() * 0.8,
      opacity: 0.22 + random() * 0.55,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    };
  });
}

export function InteractiveRadialBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rays = createRays();
    const pointer = { x: 0, y: 0, strength: 0, pressed: false };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let brand = "#8da2ff";
    let kicker = "#ff4d7e";

    const readColors = () => {
      const styles = getComputedStyle(canvas);
      brand = styles.getPropertyValue("--brand").trim() || brand;
      kicker = styles.getPropertyValue("--text-kicker").trim() || kicker;
    };

    const basePosition = (ray: Ray, time: number) => {
      const originX = width * 0.5;
      const originY = height - 7;
      const verticalReach = Math.min(width * 0.54, height * 1.08) * ray.length;
      const horizontalReach = Math.min(width * 0.62, height * 1.28) * ray.length;
      const sway = reducedMotion ? 0 : Math.sin(time * ray.speed + ray.phase) * 2.4;

      return {
        originX,
        originY,
        x:
          originX +
          Math.cos(ray.angle) * horizontalReach +
          Math.cos(ray.angle + Math.PI / 2) * sway,
        y:
          originY +
          Math.sin(ray.angle) * verticalReach +
          Math.sin(ray.angle + Math.PI / 2) * sway,
      };
    };

    const draw = (timeMs: number) => {
      const time = timeMs / 1000;
      context.clearRect(0, 0, width, height);

      const originX = width * 0.5;
      const originY = height - 7;
      const glow = context.createRadialGradient(originX, originY, 0, originX, originY, height * 0.95);
      glow.addColorStop(0, brand);
      glow.addColorStop(0.45, kicker);
      glow.addColorStop(1, "transparent");
      context.save();
      context.globalAlpha = 0.09;
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      context.restore();

      const lineGradient = context.createLinearGradient(0, height, 0, 0);
      lineGradient.addColorStop(0, brand);
      lineGradient.addColorStop(1, kicker);

      for (const ray of rays) {
        const base = basePosition(ray, time);

        if (ray.x === 0 && ray.y === 0) {
          ray.x = base.x;
          ray.y = base.y;
        }

        if (!reducedMotion) {
          const dx = ray.x - pointer.x;
          const dy = ray.y - pointer.y;
          const distance = Math.max(Math.hypot(dx, dy), 1);
          const influenceRadius = Math.min(width, height) * 0.42;

          if (pointer.strength > 0 && distance < influenceRadius) {
            const influence = 1 - distance / influenceRadius;
            const force = influence * influence * pointer.strength * 1.55;
            ray.vx += (dx / distance) * force;
            ray.vy += (dy / distance) * force;
          }

          ray.vx += (base.x - ray.x) * 0.045;
          ray.vy += (base.y - ray.y) * 0.045;
          ray.vx *= 0.88;
          ray.vy *= 0.88;
          ray.x += ray.vx;
          ray.y += ray.vy;
        } else {
          ray.x = base.x;
          ray.y = base.y;
        }

        const offsetX = ray.x - base.x;
        const offsetY = ray.y - base.y;
        const controlX = base.originX + (ray.x - base.originX) * 0.62 + offsetX * 0.3;
        const controlY = base.originY + (ray.y - base.originY) * 0.62 + offsetY * 0.3;

        context.beginPath();
        context.moveTo(base.originX, base.originY);
        context.quadraticCurveTo(controlX, controlY, ray.x, ray.y);
        context.strokeStyle = lineGradient;
        context.globalAlpha = ray.opacity;
        context.lineWidth = ray.width;
        context.stroke();

        context.beginPath();
        context.arc(ray.x, ray.y, 1 + ray.width * 0.55, 0, Math.PI * 2);
        context.fillStyle = ray.y < height * 0.48 ? kicker : brand;
        context.globalAlpha = Math.min(ray.opacity + 0.2, 0.9);
        context.fill();
      }

      context.globalAlpha = 1;
      pointer.strength *= pointer.pressed ? 0.97 : 0.9;

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      for (const ray of rays) {
        ray.x = 0;
        ray.y = 0;
      }

      if (reducedMotion) draw(0);
    };

    const updatePointer = (event: PointerEvent, strength: number) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.strength = Math.max(pointer.strength, strength);
    };

    const handlePointerMove = (event: PointerEvent) => updatePointer(event, pointer.pressed ? 1.4 : 0.72);
    const handlePointerDown = (event: PointerEvent) => {
      pointer.pressed = true;
      updatePointer(event, 1.8);
    };
    const handlePointerEnd = () => {
      pointer.pressed = false;
    };

    readColors();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reducedMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerEnd);
    canvas.addEventListener("pointercancel", handlePointerEnd);
    canvas.addEventListener("pointerleave", handlePointerEnd);

    if (!reducedMotion) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerEnd);
      canvas.removeEventListener("pointercancel", handlePointerEnd);
      canvas.removeEventListener("pointerleave", handlePointerEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="mt-6 h-36 w-full touch-pan-y select-none sm:h-40"
    />
  );
}

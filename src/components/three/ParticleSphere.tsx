"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

export type ParticleSphereHandle = {
  setProgress: (value: number) => void;
};

const COUNT = 1400;
const RADIUS = 1.4;

function buildGeometry() {
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const violet = new THREE.Color("#a78bfa");
  const cyan = new THREE.Color("#5eead4");
  const pink = new THREE.Color("#f472b6");

  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    positions[i * 3] = x * RADIUS;
    positions[i * 3 + 1] = y * RADIUS;
    positions[i * 3 + 2] = z * RADIUS;

    const mixT = (y + 1) / 2;
    const color =
      mixT < 0.5
        ? violet.clone().lerp(cyan, mixT * 2)
        : cyan.clone().lerp(pink, (mixT - 0.5) * 2);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

const ParticleSphere = forwardRef<ParticleSphereHandle>(
  function ParticleSphere(_props, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);

    useImperativeHandle(ref, () => ({
      setProgress: (value: number) => {
        progressRef.current = value;
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
      camera.position.z = 3.4;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const geometry = buildGeometry();
      const material = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const resize = () => {
        const { clientWidth, clientHeight } = container;
        if (!clientWidth || !clientHeight) return;
        renderer.setSize(clientWidth, clientHeight);
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
      };
      resize();

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      let rafId = 0;
      let running = false;
      const clock = new THREE.Clock();

      const tick = () => {
        rafId = requestAnimationFrame(tick);
        const delta = clock.getDelta();
        const speed = prefersReducedMotion
          ? 0.03
          : 0.12 + progressRef.current * 0.5;
        points.rotation.y += delta * speed;
        points.rotation.x = Math.sin(progressRef.current * Math.PI) * 0.2;
        renderer.render(scene, camera);
      };

      const start = () => {
        if (running) return;
        running = true;
        clock.getDelta();
        tick();
      };
      const stop = () => {
        running = false;
        cancelAnimationFrame(rafId);
      };

      let isIntersecting = false;
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !document.hidden) start();
          else stop();
        },
        { threshold: 0 }
      );
      intersectionObserver.observe(container);

      const onVisibility = () => {
        if (document.hidden) stop();
        else if (isIntersecting) start();
      };
      document.addEventListener("visibilitychange", onVisibility);

      return () => {
        stop();
        document.removeEventListener("visibilitychange", onVisibility);
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        container.removeChild(renderer.domElement);
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className="h-full w-full [&>canvas]:h-full [&>canvas]:w-full"
        aria-hidden
      />
    );
  }
);

export default ParticleSphere;

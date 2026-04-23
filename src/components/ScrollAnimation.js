import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import * as THREE from "three";

function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}

/* ── Name text
   CSS `translate` keeps them off-screen initially.
   JS `style.transform` compounds with it each frame.
──────────────────────────────────────────────────── */
const textBase = `
  position: fixed;
  font-size: clamp(5rem, 16vw, 18rem);
  z-index: 2;
  color: #e8ecff;
  font-family: "RoleModel", sans-serif;
  font-weight: 100;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  will-change: transform;
  letter-spacing: -0.02em;
`;

/* starts off-screen right */
const Nishchay = styled.div`
  ${textBase}
  top: 0;
  left: 0;
  translate: 100vw;
`;

/* starts off-screen left */
const Nilabh = styled.div`
  ${textBase}
  bottom: 0;
  left: 0;
  translate: -100vw;
`;

/* ── Scroll indicator ── */
const pulse = keyframes`
  0%   { opacity: 0.5; transform: translateY(0); }
  50%  { opacity: 1;   transform: translateY(8px); }
  100% { opacity: 0.5; transform: translateY(0); }
`;

const Indicator = styled.div`
  position: fixed;
  bottom: 2.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.5s ease;
`;

const IndicatorLabel = styled.span`
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(180, 205, 255, 0.5);
`;

const IndicatorLine = styled.div`
  width: 1px;
  height: 26px;
  background: linear-gradient(to bottom, rgba(107, 156, 240, 0.7), transparent);
  animation: ${pulse} 1.8s ease-in-out infinite;
`;

/* ── Vignette ── */
const Vignette = styled.div`
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 38%, rgba(6, 8, 15, 0.65) 100%);
  pointer-events: none;
  z-index: 1;
`;

/* ── Component ── */
const ScrollAnimation = ({ onComplete }) => {
  const canvasRef    = useRef(null);
  const nishchayRef  = useRef(null);
  const nilabhRef    = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const maxScroll    = window.innerHeight * 3;
    const switchScroll = maxScroll / 1.5;

    let targetScroll  = 0;   // raw window.scrollY
    let currentScroll = 0;   // lerped value
    let scrollLock    = false;
    let isScrolled    = false;
    let rotX          = 0;
    let rotY          = 0;
    let rafId;

    /* ── Three.js setup ── */
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    /* Lights — DirectionalLights have no distance falloff (PBR-safe) */
    scene.add(new THREE.AmbientLight(0x223366, 3));

    const keyLight = new THREE.DirectionalLight(0x4f8ef7, 4);
    keyLight.position.set(1, 1, 1);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x1a3aaa, 2);
    fillLight.position.set(-1, -0.5, 0.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x87b4ff, 3);
    rimLight.position.set(0, -1, -1);
    scene.add(rimLight);

    /* Cube */
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({
      color:       0x0e2766,
      emissive:    0x06103a,
      specular:    0x6b9cf0,
      shininess:   90,
      transparent: true,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    /* Wireframe edges */
    const wireGeo = new THREE.EdgesGeometry(geometry);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x6b9cf0, transparent: true, opacity: 0.4 });
    const wireframe = new THREE.LineSegments(wireGeo, wireMat);
    scene.add(wireframe);

    /* ── Native scroll → targetScroll ── */
    const onScroll = () => {
      targetScroll = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── RAF loop: lerp currentScroll, drive all animations ── */
    const animate = () => {
      rafId = requestAnimationFrame(animate);

      currentScroll = lerp(currentScroll, targetScroll, 0.085);

      /* Slide names */
      const moveX = currentScroll * 2;
      if (nishchayRef.current)
        nishchayRef.current.style.transform  = `translateX(${-moveX}px)`;
      if (nilabhRef.current)
        nilabhRef.current.style.transform    = `translateX(${moveX}px)`;

      /* Indicator visibility — DOM-only, no re-render */
      const nowScrolled = currentScroll > 80;
      if (nowScrolled !== isScrolled) {
        isScrolled = nowScrolled;
        if (indicatorRef.current)
          indicatorRef.current.style.opacity = nowScrolled ? "0" : "1";
      }

      /* Rotate cube */
      rotX += 0.005;
      rotY += 0.008;
      cube.rotation.x      = rotX + currentScroll * 0.004;
      cube.rotation.y      = rotY + currentScroll * 0.006;
      wireframe.rotation.x = cube.rotation.x;
      wireframe.rotation.y = cube.rotation.y;

      /* Zoom + fade at end */
      if (currentScroll > switchScroll) {
        const p = Math.min((currentScroll - switchScroll) / window.innerHeight, 1);
        camera.position.z = 4 - p * 3.5;
        material.opacity  = 1 - p;
        wireMat.opacity   = (1 - p) * 0.4;
      } else {
        camera.position.z = 4;
        material.opacity  = 1;
        wireMat.opacity   = 0.4;
      }

      renderer.render(scene, camera);

      /* Navigate when the user has scrolled far enough */
      if (targetScroll >= maxScroll * 0.98 && !scrollLock) {
        scrollLock = true;
        onComplete();
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    /* 400vh tall div provides the scroll area for native scroll */
    <div style={{ height: "400vh", position: "relative" }}>
      <Vignette />
      <Indicator ref={indicatorRef}>
        <IndicatorLabel>scroll</IndicatorLabel>
        <IndicatorLine />
      </Indicator>
      <Nishchay ref={nishchayRef}>Nishchay</Nishchay>
      <Nilabh   ref={nilabhRef}>Nilabh</Nilabh>
      <div ref={canvasRef} style={{ position: "fixed", top: 0, left: 0 }} />
    </div>
  );
};

export default ScrollAnimation;

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

const textBg = styled.div`
  position: fixed;
  font-size: 20rem;
  z-index: 0;
  color: white;
  text-align: center;
  font-family: "RoleModel", sans-serif;
  font-weight: 100;
`;

const Nishchay = styled(textBg)`
  translate: 100vw;
  top: 0%;
`;

const Nilabh = styled(textBg)`
  translate: -100vw;
  bottom: 0%;
`;

const ScrollAnimation = () => {
  const canvasRef = useRef(null);
  const textElement = useRef(null);
  const textElementInverse = useRef(null);

  let scrollPosition = 0;
  const maxScroll = window.innerHeight * 3;
  const switchScroll = maxScroll / 1.5;
  let scrollLock = false;

  useEffect(() => {
    let scene, camera, renderer, cube, progress;

    const init = () => {
      // Scene, Camera, and Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasRef.current.appendChild(renderer.domElement);

      const materials = new THREE.MeshNormalMaterial({ transparent: true });
      const geometry = new THREE.BoxGeometry();
      cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);

      // Initial camera position
      camera.position.z = 3;

      // Event listeners
      window.addEventListener("scroll", onScroll);
      window.addEventListener("resize", onWindowResize);
      window.addEventListener("scroll", handleScrollLock);

      animate();
    };

    const handleScrollLock = () => {
      if (window.scrollY >= maxScroll * 0.99 && !scrollLock) {
        scrollLock = true;

        // Apply a full-screen black overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "black";
        overlay.style.zIndex = "9999";
        overlay.style.transition = "opacity 0.5s ease-out";
        document.body.appendChild(overlay);

        // Disable scrolling
        document.body.style.overflow = "hidden";
        window.scrollTo(0, maxScroll);

        // Wait for the fade effect, then navigate
        setTimeout(() => {
          window.location.replace("/landing-page");
        }, 500); // Match the duration of the overlay transition
      }
    };

    const onScroll = () => {
      scrollPosition = window.scrollY;
      const moveX = scrollPosition * 2;

      if (textElement.current) {
        textElement.current.style.transform = `translateX(${-moveX}px)`;
      }
      if (textElementInverse.current) {
        textElementInverse.current.style.transform = `translateX(${moveX}px)`;
      }
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x = scrollPosition * 0.005;
      cube.rotation.y = scrollPosition * 0.005;

      if (scrollPosition > switchScroll) {
        progress = Math.min(
          (scrollPosition - switchScroll) / window.innerHeight,
          1
        );
        camera.position.z = 3 - progress * 2.5;
        cube.material.opacity = 1 - progress;
      } else {
        cube.material.opacity = 1;
      }

      renderer.render(scene, camera);
    };

    init();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("scroll", handleScrollLock);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      {/* <img src="/images/scroll.svg" alt="Scroll Down Icon" style={{height: "100px", width: "100px"}}/> */}
      <div style={{
        position: "absolute",
        left: "47vw",
        top: "30%",
        fontFamily: "Helvetica Neue",
      }}>
        Scroll Down
      </div>
      <Nishchay ref={textElement}>Nishchay</Nishchay>
      <Nilabh ref={textElementInverse}>Nilabh</Nilabh>
      <div ref={canvasRef} style={{ position: "fixed" }}></div>
    </div>
  );
};

export default ScrollAnimation;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollAnimation from "./components/ScrollAnimation";
import LandingPage from "./components/LandingPage";
import { gsap } from "gsap";
import "lenis/dist/lenis.css";

function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

function useCustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const cursorF = document.getElementById("cursor-f");

    if (!cursor || !cursorF) return;

    let cursorX = 0;
    let cursorY = 0;
    let pageX = 0;
    let pageY = 0;
    const size = 8;
    const sizeF = 36;
    const followSpeed = 0.16;

    if ("ontouchstart" in window) {
      cursor.style.display = "none";
      cursorF.style.display = "none";
      return;
    }

    cursor.style.setProperty("--size", `${size}px`);
    cursorF.style.setProperty("--size", `${sizeF}px`);
    cursor.style.opacity = "0";
    cursorF.style.opacity = "0";

    const handleMouseMove = (e) => {
      pageX = e.clientX;
      pageY = e.clientY;
      cursor.style.left = `${pageX - size / 2}px`;
      cursor.style.top = `${pageY - size / 2}px`;
      cursor.style.opacity = "1";
      cursorF.style.opacity = "1";
    };

    const loop = () => {
      cursorX = lerp(cursorX, pageX, followSpeed);
      cursorY = lerp(cursorY, pageY, followSpeed);
      cursorF.style.left = `${cursorX - sizeF / 2}px`;
      cursorF.style.top = `${cursorY - sizeF / 2}px`;
      requestAnimationFrame(loop);
    };

    const handleMouseDown = () => {
      gsap.to(cursor, { scale: 4.5 });
      gsap.to(cursorF, { scale: 0.4 });
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1 });
      gsap.to(cursorF, { scale: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
}

function HomePage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showLanding, setShowLanding] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {!isMobile && !showLanding && (
        <ScrollAnimation onComplete={() => { window.scrollTo(0, 0); setShowLanding(true); }} />
      )}
      {showLanding && (
        <div className="landing-page">
          <LandingPage />
        </div>
      )}
    </div>
  );
}

function App() {
  useCustomCursor();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;

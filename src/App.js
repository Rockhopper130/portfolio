import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
    let clicked = false;

    if ("ontouchstart" in window) {
      cursor.style.display = "none";
      cursorF.style.display = "none";
      return;
    }

    cursor.style.setProperty("--size", `${size}px`);
    cursorF.style.setProperty("--size", `${sizeF}px`);

    const handleMouseMove = (e) => {
      pageX = e.clientX;
      pageY = e.clientY;
      cursor.style.left = `${pageX - size / 2}px`;
      cursor.style.top = `${pageY - size / 2}px`;
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
      clicked = true;
    };

    const handleMouseUp = () => {
      gsap.to(cursor, { scale: 1 });
      gsap.to(cursorF, { scale: 1 });
      clicked = false;
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

function App() {
  useCustomCursor();

  const [defaultRoute, setDefaultRoute] = useState("/");

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setDefaultRoute("/landing-page");
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            defaultRoute === "/" ? (
              <ScrollAnimation />
            ) : (
              <Navigate to="/landing-page" replace />
            )
          }
        />
        <Route path="/landing-page" element={<LandingPageWrapper />} />
      </Routes>
    </Router>
  );
}

function LandingPageWrapper() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-screen"></div>
      ) : (
        <div className="landing-page">
          <LandingPage />
        </div>
      )}
    </div>
  );
}

export default App;

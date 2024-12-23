"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import Socials from "./Socials";
import ParallaxImage from "./ParallaxImage";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Footer from "./Footer";

import ScrollTrigger from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Lenis from "lenis";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
  color: white;
  overflow: hidden;

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    height: auto;
    text-align: center;
  }
`;

const TextBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8rem 0rem;
  font-size: 2rem;
  font-weight: 100;
  align-items: flex-start;
  width: 50%;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin: 4rem 0rem;
    width: 80%;
  }
`;

const TextBox = () => {
  return (
    <TextBoxContainer>
      <div>
        <p>
          Hi, I am{" "}
          <div style={{ fontWeight: "500", fontSize: "4rem" }}>Nishchay</div>
        </p>
        <p
          style={{
            fontSize: "1.5rem",
          }}
        >
          Final-year student, IIT Guwahati
        </p>
        <p
          style={{
            fontSize: "1.5rem",
          }}
        >
          Major in Data Science and Artificial Intelligence
        </p>
      </div>
      <Socials></Socials>
    </TextBoxContainer>
  );
};

const LandingPage = () => {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8rem",
      }}
    >
      <Header>
        <ParallaxImage src="/images/landing-image.jpeg"></ParallaxImage>
        <TextBox></TextBox>
      </Header>
      <div id="experiences">
        <Experiences />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

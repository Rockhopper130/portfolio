"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import Socials from "./Socials";
import ParallaxImage from "./ParallaxImage";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Skills from "./Skills";
import Footer from "./Footer";
import ScrollTrigger from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Lenis from "lenis";
import { personal } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/* ── Hero ── */
const Hero = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 0 5rem;
  gap: 4rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 6rem 2.5rem 4rem;
    justify-content: center;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    padding: 5rem 1.5rem 3rem;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 580px;

  @media (max-width: 1024px) {
    align-items: center;
    text-align: center;
    max-width: 100%;
  }
`;

const Greeting = styled.span`
  font-size: 1.1rem;
  font-weight: 300;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
  margin-bottom: 0.3rem;
`;

const BigName = styled.h1`
  font-family: "RoleModel", sans-serif;
  font-size: clamp(5rem, 9.5vw, 8.5rem);
  font-weight: 400;
  margin: 0 0 1.4rem 0;
  line-height: 0.93;
  color: var(--text);
  letter-spacing: -0.01em;
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin: 0 0 0.4rem 0;
`;

const Major = styled.p`
  font-size: 1rem;
  font-weight: 300;
  color: var(--text-tertiary);
  margin: 0 0 1.6rem 0;
  letter-spacing: 0.02em;
`;

const Divider = styled.div`
  width: 2.5rem;
  height: 1px;
  background: var(--border-strong);
  margin-bottom: 1.1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Bio = styled.p`
  font-size: 0.97rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0 0 2.5rem 0;
  max-width: 440px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

/* ── Main wrapper ── */
const Main = styled.main`
  padding: 0 5rem;

  @media (max-width: 1024px) {
    padding: 0 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 0 1.5rem;
  }
`;

const LandingPage = () => {
  useEffect(() => {
    document.documentElement.style.height = "auto";
    return () => { document.documentElement.style.height = ""; };
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div>
      <Hero>
        <HeroText>
          <Greeting>Hi, I'm</Greeting>
          <BigName>{personal.firstName}</BigName>
          <Tagline>{personal.tagline}</Tagline>
          <Major>{personal.major}</Major>
          <Divider />
          <Bio>{personal.bio}</Bio>
          <Socials />
        </HeroText>
        <ParallaxImage src={personal.photo} alt={personal.name} />
      </Hero>

      <Main>
        <Skills />
        <div id="projects">
          <Projects />
        </div>
        <div id="experiences">
          <Experiences />
        </div>
      </Main>

      <Footer />
    </div>
  );
};

export default LandingPage;

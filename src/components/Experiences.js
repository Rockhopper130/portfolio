import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, OrbitControls, Environment } from "@react-three/drei";
import styled from "styled-components";
import { experiences } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/* ── Three.js disc ── */
const RotatingDisc = ({ image }) => {
  const groupRef = useRef();
  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.008;
  });
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <cylinderGeometry args={[4, 4, 0.4, 64]} />
        <meshPhysicalMaterial
          color="#4a7fff"
          transparent
          opacity={0.75}
          roughness={0.6}
          metalness={0.9}
          clearcoat={0.8}
          clearcoatRoughness={0.5}
          transmission={0.6}
          ior={1.5}
        />
        <Image url={image} position={[0, 0.21, 0]}  rotation={[-Math.PI / 2, 0, 0]}        scale={[7, 7, 1]} transparent />
        <Image url={image} position={[0, -0.21, 0]} rotation={[-Math.PI / 2, -Math.PI, 0]} scale={[7, 7, 1]} transparent />
      </mesh>
    </group>
  );
};

const FloatingDisc = ({ image }) => (
  <div style={{ width: "100%", aspectRatio: "1/1", position: "relative" }}>
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.4} color={0x3366ff} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={0x6699ff} />
      <pointLight position={[-8, -5, 5]} intensity={1} color={0x1133aa} />
      <Environment preset="city" />
      <RotatingDisc image={image} />
      <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
    </Canvas>
  </div>
);

/* ── Styles ── */
const Section = styled.section`
  padding: 6rem 0;
  border-top: 1px solid var(--border);
`;

const Heading = styled.h2`
  font-family: "RoleModel", sans-serif;
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  font-weight: 400;
  margin: 0 0 3.5rem 0;
  color: var(--text);
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 2.25rem 0;
  border-bottom: 1px solid var(--border);
  opacity: 0;

  &:last-child { border-bottom: none; }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.25rem;
    align-items: flex-start;
  }
`;

const DiscWrap = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 5rem;
    height: 5rem;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const CompanyName = styled.p`
  font-size: 1.18rem;
  font-weight: 500;
  color: var(--text);
  margin: 0 0 0.35rem 0;
`;

const Role = styled.p`
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
`;

const Time = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  color: var(--text-tertiary);
  white-space: nowrap;
  flex-shrink: 0;

  @media (max-width: 768px) { white-space: normal; }
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid rgba(107, 156, 240, 0.35);
  border-radius: 3px;
  padding: 0.15rem 0.45rem;
  margin-left: 0.65rem;
  vertical-align: middle;
`;

const Experiences = () => {
  const listRef = useRef(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll(".exp-item");
    if (!items) return;
    gsap.to(items, {
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: listRef.current, start: "top 80%" },
    });
  }, []);

  return (
    <Section>
      <Heading>Experience</Heading>
      <List ref={listRef}>
        {experiences.map((exp) => (
          <Item key={exp.name} className="exp-item">
            <DiscWrap>
              <FloatingDisc image={exp.image} />
            </DiscWrap>
            <Info>
              <CompanyName>
                {exp.name}
                {exp.upcoming && <Badge>upcoming</Badge>}
              </CompanyName>
              <Role>{exp.role}</Role>
            </Info>
            <Time>{exp.time}</Time>
          </Item>
        ))}
      </List>
    </Section>
  );
};

export default Experiences;

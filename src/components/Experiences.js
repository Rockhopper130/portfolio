import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, OrbitControls, Environment } from "@react-three/drei";
import { expData } from "../data/expData";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);

const RotatingDisc = ({ image }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <cylinderGeometry args={[4, 4, 0.4, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
          roughness={0.9}
          metalness={0.9}
          clearcoat={0.7}
          clearcoatRoughness={1}
          transmission={0.9}
          ior={1.5}
        />
        <Image
          url={image}
          position={[0, 0.21, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[7, 7, 1]}
          transparent
        />
        <Image
          url={image}
          position={[0, -0.21, 0]}
          rotation={[-Math.PI / 2, -Math.PI, 0]}
          scale={[7, 7, 1]}
          transparent
        />
      </mesh>
    </group>
  );
};

const FloatingDisc = ({ image }) => {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        margin: "0 auto",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ width: "100%", height: "100%", position: "inherit" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="forest" />
        <RotatingDisc image={image} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 90vw;
  margin: 0;
  padding: 0 4rem;

  @media (max-width: 1024px) {
    padding: 0;
    gap: 8rem;
  }
`;

const DiscItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
  }
`;

const DiscWrapper = styled.div`
  width: 15rem;
  height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;

  @media (max-width: 1024px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  text-align: left;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Time = styled.p`
  font-size: 0.9rem;
  font-style: italic;

  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const ExpDataComponent = () => (
  <Container>
    {expData.map((disc, index) => (
      <DiscItem key={index}>
        <DiscWrapper>
          <FloatingDisc image={disc.image} />
        </DiscWrapper>
        <TextWrapper>
          <div>
            <Title>{disc.name}</Title>
            <Subtitle>{disc.role}</Subtitle>
          </div>
          <Time>{disc.time}</Time>
        </TextWrapper>
      </DiscItem>
    ))}
  </Container>
);

const Heading = styled.h2`
  font-family: "RoleModel";
  font-size: 4rem;
  margin: 0;
  padding-left: 4rem;
  padding-bottom: 8rem;
  text-align: left;
  flex-grow: 1;
  align-self: stretch;

  @media (max-width: 1024px) {
    padding-left: 0;
    text-align: center;
  }
`;

const Experiences = () => {
  const experiencesRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      experiencesRef.current,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: experiencesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={experiencesRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Heading>Experiences</Heading>
      <ExpDataComponent />
    </div>
  );
};

export default Experiences;

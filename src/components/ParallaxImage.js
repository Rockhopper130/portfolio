import React, { useState } from "react";
import styled from "styled-components";

const ParallaxContainer = styled.div`
  overflow: hidden;
  display: inline-block;
  perspective: 1000px;
  border-radius: 10px;
  height: 100%;
  width: 40%;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ParallaxImageStyled = styled.img`
  transform: ${({ offsetX, offsetY, isHovered }) =>
    `translate(${offsetX}px, ${offsetY}px) scale(${isHovered ? 1.05 : 1})`};
  transition: transform 0.8s ease-out;
  will-change: transform;
  height: 100%;
  width: 100%;
  object-fit: cover;
  user-select: none;
`;

const ParallaxImage = ({ src, alt, maxOffset = 15 }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    const x = ((clientX - left) / width - 0.5) * -0.5 * maxOffset;
    const y = ((clientY - top) / height - 0.5) * -0.5 * maxOffset;

    setOffset({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <ParallaxContainer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParallaxImageStyled
        src={src}
        alt={alt}
        offsetX={offset.x}
        offsetY={offset.y}
        isHovered={isHovered}
        draggable="false"
      />
    </ParallaxContainer>
  );
};

export default ParallaxImage;

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 38%;
  aspect-ratio: 4 / 3;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  align-self: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transform: ${({ $ox, $oy, $hovered }) =>
    `translate(${$ox}px, ${$oy}px) scale(${$hovered ? 1.04 : 1})`};
  transition: transform 0.7s ease-out;
  will-change: transform;
  user-select: none;
`;

const ParallaxImage = ({ src, alt = "", maxOffset = 10 }) => {
  const [offset, setOffset]   = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    setOffset({
      x: ((clientX - left) / width  - 0.5) * -0.5 * maxOffset,
      y: ((clientY - top)  / height - 0.5) * -0.5 * maxOffset,
    });
    setHovered(true);
  };

  return (
    <Container
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setOffset({ x: 0, y: 0 }); setHovered(false); }}
    >
      <Img
        src={src}
        alt={alt}
        $ox={offset.x}
        $oy={offset.y}
        $hovered={hovered}
        draggable="false"
      />
    </Container>
  );
};

export default ParallaxImage;

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { skills } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;

  @media (max-width: 900px)  { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px)  { grid-template-columns: 1fr 1fr; gap: 1.5rem; }
`;

const CategoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  opacity: 0;
  transform: translateY(22px);
`;

const CategoryLabel = styled.p`
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin: 0 0 0.2rem 0;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--text-secondary);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.32rem 0.7rem;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  cursor: default;

  &:hover {
    color: var(--accent-bright);
    border-color: var(--border-strong);
    background: var(--accent-dim);
  }
`;

const Skills = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const blocks = gridRef.current?.querySelectorAll(".skill-block");
    if (!blocks) return;
    gsap.to(blocks, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: gridRef.current, start: "top 82%" },
    });
  }, []);

  return (
    <Section>
      <Heading>Skills</Heading>
      <Grid ref={gridRef}>
        {skills.map((group) => (
          <CategoryBlock key={group.category} className="skill-block">
            <CategoryLabel>{group.category}</CategoryLabel>
            <TagList>
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </TagList>
          </CategoryBlock>
        ))}
      </Grid>
    </Section>
  );
};

export default Skills;

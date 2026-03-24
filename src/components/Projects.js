import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { projects } from "../data/content";

gsap.registerPlugin(ScrollTrigger);

/* ── Card ── */
const CardOuter = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  cursor: default;
  aspect-ratio: 3 / 4;
  background: var(--surface);
  transition: border-color 0.35s ease;

  &:hover {
    border-color: var(--border-strong);
  }
`;

const CardImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(${({ $h }) => ($h ? 1.06 : 1)});
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.6s ease;
  filter: ${({ $h }) => ($h ? "brightness(0.28) saturate(0.6)" : "brightness(0.52)")};
  will-change: transform, filter;
`;

const GradientBand = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 65%;
  background: linear-gradient(to top, rgba(6, 8, 15, 0.98) 0%, rgba(6,8,15,0.3) 60%, transparent 100%);
  pointer-events: none;
`;

const CardContent = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
`;

/*
  Grid row trick: animates 0fr → 1fr to the exact content height.
  Far smoother than max-height, no overshoot/jump.
*/
const DescArea = styled.div`
  display: grid;
  grid-template-rows: ${({ $h }) => ($h ? "1fr" : "0fr")};
  opacity: ${({ $h }) => ($h ? 1 : 0)};
  margin-bottom: ${({ $h }) => ($h ? "1rem" : "0")};
  overflow: hidden;
  transition:
    grid-template-rows 0.44s cubic-bezier(0.4, 0, 0.2, 1),
    opacity            0.36s ease,
    margin-bottom      0.44s cubic-bezier(0.4, 0, 0.2, 1);
`;

/* Required inner wrapper so grid-template-rows collapse works */
const DescInner = styled.div`
  min-height: 0;
  overflow: hidden;
`;

const Subtitle = styled.p`
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 0.55rem 0;
`;

const Description = styled.p`
  font-size: 0.88rem;
  line-height: 1.65;
  color: rgba(180, 205, 255, 0.82);
  margin: 0 0 0.8rem 0;
`;

const GitHubLink = styled.a`
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--accent-bright);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  border-bottom: 1px solid rgba(137, 180, 255, 0.3);
  padding-bottom: 1px;
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.08rem;
  font-weight: 500;
  color: var(--text);
  margin: 0 0 0.55rem 0;
  line-height: 1.3;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`;

const Tag = styled.span`
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(107, 156, 240, 0.08);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 0.2rem 0.5rem;
  letter-spacing: 0.04em;
`;

const Card = ({ image, title, subtitle, description, tags, githubLink }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <CardOuter
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardImg src={image} alt={title} draggable="false" $h={hovered} />
      <GradientBand />
      <CardContent>
        {/* grid-template-rows trick for smooth height animation */}
        <DescArea $h={hovered}>
          <DescInner>
            <Subtitle>{subtitle}</Subtitle>
            <Description>{description}</Description>
            <GitHubLink href={githubLink} target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </GitHubLink>
          </DescInner>
        </DescArea>
        <CardTitle>{title}</CardTitle>
        <TagRow>
          {tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </TagRow>
      </CardContent>
    </CardOuter>
  );
};

/* ── Section ── */
const Section = styled.section`
  padding: 6rem 0;
  border-top: 1px solid var(--border);
`;

const Heading = styled.h2`
  font-family: "RoleModel", sans-serif;
  font-size: clamp(2.8rem, 5vw, 4.2rem);
  font-weight: 400;
  margin: 0 0 3rem 0;
  color: var(--text);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`;

const Projects = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll("article");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <Section>
      <Heading>Projects</Heading>
      <Grid ref={gridRef}>
        {projects.map((p) => (
          <Card
            key={p.name}
            image={p.image}
            title={p.name}
            subtitle={p.sub}
            description={p.desc}
            tags={p.tags}
            githubLink={p.github}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default Projects;

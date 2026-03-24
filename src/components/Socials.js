import React from "react";
import styled from "styled-components";
import { socials } from "../data/content";

const Row = styled.div`
  display: flex;
  gap: 1.75rem;
  align-items: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: 0.6;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  filter: brightness(0.9);
`;

const Socials = () => (
  <Row>
    {socials.map(({ label, href, icon }) => (
      <SocialLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon src={icon} alt={label} />
      </SocialLink>
    ))}
  </Row>
);

export default Socials;

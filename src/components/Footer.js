import React from "react";
import styled from "styled-components";
import { personal } from "../data/content";

const FooterEl = styled.footer`
  border-top: 1px solid var(--border);
  padding: 2rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.5rem 2.5rem;
    text-align: center;
  }
`;

const Copy = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: var(--text-tertiary);
  letter-spacing: 0.03em;
`;

const Footer = () => (
  <FooterEl>
    <Copy>© {new Date().getFullYear()} {personal.name}</Copy>
    <Copy>Built with React &amp; Three.js</Copy>
  </FooterEl>
);

export default Footer;

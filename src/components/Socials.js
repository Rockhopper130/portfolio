import React from "react";
import styled from "styled-components";

const Link = styled.img`
  width: 28px;
  filter: opacity(70%);
  transition: filter 0.2s ease;
  
  &:hover {
    filter: opacity(100%);
  }
`;

const Socials = () => {
  return (
    <div
      style={{
        display: "flex",
        paddingTop: "8rem",
        gap: "40px",
        marginTop: "20px",
      }}
    >
      <a
        href="https://www.linkedin.com/in/nishchay-nilabh/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link
          src="/images/linkedin.svg"
          alt="LinkedIn"
        />
      </a>
      <a
        href="https://github.com/Rockhopper130/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link
          src="/images/github.svg"
          alt="GitHub"
        />
      </a>
      <a
        href="https://codeforces.com/profile/rockhopper130"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link
          src="/images/codeforces.svg"
          alt="Codeforces"
        />
      </a>
      <a
        href="https://drive.google.com/file/d/1RML3aP9fHuzZUqZ3Nf1WW7mk6VRJJSRP/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link
          src="/images/resume.svg"
          alt="Resume"
        />
      </a>
      <a
        href="mailto:nishchay.n2003@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Link
          src="/images/mail.svg"
          alt="Mail"
        />
      </a>
    </div>
  );
};

export default Socials;

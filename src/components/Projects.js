import React, { useState } from "react";
import styled from "styled-components";
import { projectsData } from "../data/projectsData";

const CardWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  height: 500px;
  margin: 20px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #333;
  display: flex;
  box-shadow: 0 12px 24px rgba(213, 213, 213, 0.13);
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  perspective: 1000px;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(223, 223, 223, 0.71);
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  ${(props) => props.flipped && "transform: rotateY(180deg);"}
`;

const CardImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 4px solid rgb(90, 90, 90);
  transition: transform 0.3s ease;
`;

const CardContent = styled.div`
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
`;

const CardBack = styled.div`
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: rotateY(180deg);
  backface-visibility: hidden;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 8px;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s ease;
`;

const CardSubtitle = styled.p`
  font-size: 0.8rem;
  text-align: left;
  color: #bbb;
  margin-bottom: 16px;
  line-height: 1.6;
  flex-grow: 1;
`;

const CardDescription = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  text-align: left;
  color: #bbb;
  margin-bottom: 16px;
  line-height: 1.6;
  flex-grow: 1;
`;

const CardLink = styled.a`
  font-size: 14px;
  padding: 0.5rem;
  color: white;
  background-color: rgb(90, 90, 90);
  border: none;
  font-weight: bold;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.1s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: rgb(76, 76, 76);
  }
`;

const Card = ({ image, title, subtitle, description, githubLink }) => {
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <CardWrapper onClick={handleClick}>
      <CardInner flipped={flipped}>
        <div>
          <CardImage src={image} alt={title} draggable="false" />
          <CardContent>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{subtitle}</CardSubtitle>
            <CardLink
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </CardLink>
          </CardContent>
        </div>
        <CardBack>
          <CardDescription
            dangerouslySetInnerHTML={{ __html: description }}
          ></CardDescription>
        </CardBack>
      </CardInner>
    </CardWrapper>
  );
};

const Heading = styled.h2`
  font-family: "RoleModel";
  font-size: 4rem;
  margin: 0;
  padding-left: 4rem;
  padding-bottom: 8rem;
  @media (max-width: 1024px) {
    padding-left: 0;
    text-align: center;
  }
`;

const Project = () => {
  return (
    <div>
      <Heading>Projects</Heading>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {projectsData.map((project, index) => (
          <Card
            key={index}
            image={project.image}
            title={project.name}
            subtitle={project.sub}
            description={project.desc}
            githubLink={project.github}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;

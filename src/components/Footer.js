import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgb(50, 50, 50);
  color: #ccc;
  padding: 20px;
  text-align: center;
  font-size: 14px;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>&copy; 2024 Nishchay Nilabh. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

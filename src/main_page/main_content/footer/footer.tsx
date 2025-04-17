import React from 'react';
import { StyledFooter, FooterLink, CopyRight } from './footer.styled';

interface FootProps {
  collapsed?: boolean;
  isDashboard?: boolean;
}

const Foot: React.FC<FootProps> = ({
  collapsed = false,
  isDashboard = false,
}) => {
  return (
    <StyledFooter collapsed={isDashboard ? collapsed : false}>
      <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
      <FooterLink to="/support">Support</FooterLink>
      <FooterLink to="/contact">Contact us</FooterLink>
      <CopyRight>© 2025 BalaSteps</CopyRight>
    </StyledFooter>
  );
};

export default Foot;

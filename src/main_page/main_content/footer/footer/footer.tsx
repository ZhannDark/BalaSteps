import React from 'react';
import {
  StyledFooter,
  FooterNav,
  FooterLink,
  FooterSocial,
  CopyRight,
} from './footer.styled';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookMessenger,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterNav>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/about-us">About Us</FooterLink>
        <FooterLink to="/services">Services</FooterLink>
        <FooterLink to="/support">Support</FooterLink>
        <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink to="/contact-us">Contact</FooterLink>
      </FooterNav>
      <FooterSocial>
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebookF size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <FaLinkedinIn size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FaInstagram size={20} />
        </a>
        <a href="https://messenger.com" target="_blank" rel="noreferrer">
          <FaFacebookMessenger size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter size={20} />
        </a>
      </FooterSocial>

      <CopyRight>© 2025 BalaSteps. All rights reserved.</CopyRight>
    </StyledFooter>
  );
};

export default Footer;

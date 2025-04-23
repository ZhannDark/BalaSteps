import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo/main_logo.png';
import {
  StyledHeader,
  LogoContainer,
  Logo,
  RightSection,
  NavLinks,
  NavLink,
  StyledButton,
} from './main_page_header.styled';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);

  const handleButtonClick = (auth: string): void => {
    if (location.pathname === '/register' || auth === 'login') {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  useEffect(() => {
    if (location.pathname === '/register') {
      setShowNav(false);
      setShowLoginButton(true);
      setShowRegisterButton(false);
    } else if (location.pathname === '/login') {
      setShowNav(false);
      setShowLoginButton(false);
      setShowRegisterButton(true);
    } else if (location.pathname === '/forgot-password') {
      setShowNav(false);
    } else if (location.pathname === '/send-otp') {
      setShowNav(false);
      setShowLoginButton(true);
      setShowRegisterButton(false);
    } else {
      setShowNav(true);
    }
  }, [location.pathname]);

  return (
    <StyledHeader>
      <LogoContainer>
        <Link to="/">
          <Logo src={logo} alt="Balasteps" />
        </Link>
      </LogoContainer>

      {showNav && (
        <RightSection>
          <NavLinks>
            <NavLink to="/login">News</NavLink>
            <NavLink to="/login">iKomek</NavLink>
            <NavLink to="/login">Forums</NavLink>
            <NavLink to="/login">Marketplace</NavLink>
            <NavLink to="/about-us">About us</NavLink>
          </NavLinks>
        </RightSection>
      )}

      {showRegisterButton && (
        <StyledButton onClick={() => handleButtonClick('register')}>
          Register
        </StyledButton>
      )}
      {showLoginButton && (
        <StyledButton onClick={() => handleButtonClick('login')}>
          Login
        </StyledButton>
      )}
    </StyledHeader>
  );
};

export default AppHeader;

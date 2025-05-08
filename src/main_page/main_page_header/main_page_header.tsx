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
  ButtonGroup,
  Burger,
  UserFullName,
} from './main_page_header.styled';
import axios from 'axios';

const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNav, setShowNav] = useState(true);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullName, setFullName] = useState<string | null>(null);

  const token = localStorage.getItem('accessToken');
  const isAuthenticated = Boolean(token);

  const handleButtonClick = (auth: 'login' | 'register'): void => {
    navigate(`/${auth}`);
  };

  const handleProtectedRoute = (e: React.MouseEvent, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
    } else {
      navigate(path);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const path = location.pathname;

    if (path === '/register') {
      setShowNav(false);
      setShowLoginButton(true);
      setShowRegisterButton(false);
    } else if (path === '/login') {
      setShowNav(false);
      setShowLoginButton(false);
      setShowRegisterButton(true);
    } else if (['/forgot-password', '/send-otp'].includes(path)) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }

    if (isAuthenticated) {
      axios
        .get('https://project-back-81mh.onrender.com/auth/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFullName(res.data.full_name);
        })
        .catch(() => {
          setFullName(null);
        });
    } else {
      setFullName(null);
    }
  }, [location.pathname]);

  return (
    <StyledHeader>
      <LogoContainer>
        <Link to="/">
          <Logo src={logo} alt="Balasteps" />
        </Link>
      </LogoContainer>

      <Burger onClick={() => setMenuOpen(!menuOpen)}>&#9776;</Burger>

      {showNav && (
        <RightSection $isOpen={menuOpen}>
          <NavLinks>
            <NavLink
              onClick={(e) => handleProtectedRoute(e, '/info_hub')}
              to="/info_hub"
            >
              News
            </NavLink>
            <NavLink
              onClick={(e) => handleProtectedRoute(e, '/ikomek')}
              to="/ikomek_assistant"
            >
              iKomek
            </NavLink>
            <NavLink
              onClick={(e) => handleProtectedRoute(e, '/forum')}
              to="/discussion-forum"
            >
              Forums
            </NavLink>
            <NavLink
              onClick={(e) => handleProtectedRoute(e, '/marketplace')}
              to="/marketplace"
            >
              Marketplace
            </NavLink>
            <NavLink
              onClick={(e) => handleProtectedRoute(e, '/symptom-tracker')}
              to="/symptom-tracker"
            >
              Tracker
            </NavLink>
          </NavLinks>

          <ButtonGroup>
            {fullName ? (
              <UserFullName
                onClick={() => navigate('profile')}
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                {fullName}
              </UserFullName>
            ) : (
              <>
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
              </>
            )}
          </ButtonGroup>
        </RightSection>
      )}
    </StyledHeader>
  );
};

export default AppHeader;

import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import 'antd/dist/reset.css';
import './header.scss';
import logo from '../../images/logo/main_logo.png';
import { Layout } from 'antd';

const { Header } = Layout;

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
      console.log('send otp');
      setShowNav(false);
      setShowLoginButton(true);
      setShowRegisterButton(false);
    } else {
      setShowNav(true);
    }
  }, [location.pathname]);

  return (
    <Header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Balasteps" className="logo" />
        </Link>
      </div>
      {showNav && (
        <div className="right-section">
          <nav className="nav-links">
            <Link className="link" to="/">
              News
            </Link>
            <Link className="link" to="/ikomek">
              iKomek
            </Link>
            <Link className="link" to="/forum">
              Forums
            </Link>
            <Link className="link" to="/marketplace">
              Marketplace
            </Link>
            <Link className="link" to="/about-us">
              About us
            </Link>
          </nav>
        </div>
      )}
      <Button
        style={{ display: showRegisterButton ? 'flex' : 'none' }}
        className="register-btn"
        onClick={() => handleButtonClick('register')}
      >
        Register
      </Button>
      <Button
        style={{ display: showLoginButton ? 'flex' : 'none' }}
        className="register-btn"
        onClick={() => handleButtonClick('login')}
      >
        Login
      </Button>
    </Header>
  );
};

export default AppHeader;

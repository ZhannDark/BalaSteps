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
  const [buttonText, setButtonText] = useState('Register');

  const handleButtonClick = () => {
    if (location.pathname === '/register') {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  useEffect(() => {
    if (location.pathname === '/register') {
      setShowNav(false);
      setButtonText('Login');
    } else if (location.pathname === '/login') {
      setShowNav(false);
      setButtonText('Register');
    } else if (location.pathname === '/forgot-password') {
      setShowNav(false);
      setButtonText('Register');
    } else if (location.pathname === '/send-otp') {
      setShowNav(false);
      setButtonText('Login');
    } else {
      setShowNav(true);
      setButtonText('Register');
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
      <Button className="register-btn" onClick={handleButtonClick}>
        {buttonText}
      </Button>
    </Header>
  );
};

export default AppHeader;

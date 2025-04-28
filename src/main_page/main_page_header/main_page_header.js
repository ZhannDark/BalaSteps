import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo/main_logo.png';
import { StyledHeader, LogoContainer, Logo, RightSection, NavLinks, NavLink, StyledButton, ButtonGroup, Burger, } from './main_page_header.styled';
const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showNav, setShowNav] = useState(true);
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showRegisterButton, setShowRegisterButton] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const isAuthenticated = Boolean(localStorage.getItem('accessToken'));
    const handleButtonClick = (auth) => {
        if (location.pathname === '/register' || auth === 'login') {
            navigate('/login');
        }
        else {
            navigate('/register');
        }
    };
    useEffect(() => {
        if (location.pathname === '/register') {
            setShowNav(false);
            setShowLoginButton(true);
            setShowRegisterButton(false);
        }
        else if (location.pathname === '/login') {
            setShowNav(false);
            setShowLoginButton(false);
            setShowRegisterButton(true);
        }
        else if (location.pathname === '/forgot-password') {
            setShowNav(false);
        }
        else if (location.pathname === '/send-otp') {
            setShowNav(false);
            setShowLoginButton(true);
            setShowRegisterButton(false);
        }
        else {
            setShowNav(true);
        }
    }, [location.pathname]);
    return (_jsxs(StyledHeader, { children: [_jsx(LogoContainer, { children: _jsx(Link, { to: "/", children: _jsx(Logo, { src: logo, alt: "Balasteps" }) }) }), _jsx(Burger, { onClick: () => setMenuOpen(!menuOpen), children: "\u2630" }), showNav && (_jsxs(RightSection, { isOpen: menuOpen, children: [_jsxs(NavLinks, { children: [_jsx(NavLink, { to: "/info-hub", onClick: (e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault();
                                        navigate('/login');
                                    }
                                }, children: "News" }), _jsx(NavLink, { to: "/ikomek", onClick: (e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault();
                                        navigate('/login');
                                    }
                                }, children: "iKomek" }), _jsx(NavLink, { to: "/forum", onClick: (e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault();
                                        navigate('/login');
                                    }
                                }, children: "Forums" }), _jsx(NavLink, { to: "/marketplace", onClick: (e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault();
                                        navigate('/login');
                                    }
                                }, children: "Marketplace" }), _jsx(NavLink, { to: "/about-us", children: "About us" })] }), _jsxs(ButtonGroup, { children: [showRegisterButton && (_jsx(StyledButton, { onClick: () => handleButtonClick('register'), children: "Register" })), showLoginButton && (_jsx(StyledButton, { onClick: () => handleButtonClick('login'), children: "Login" }))] })] }))] }));
};
export default AppHeader;

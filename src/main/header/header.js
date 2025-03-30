import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
        }
        else {
            navigate('/register');
        }
    };
    useEffect(() => {
        if (location.pathname === '/register') {
            setShowNav(false);
            setButtonText('Login');
        }
        else if (location.pathname === '/login') {
            setShowNav(false);
            setButtonText('Register');
        }
        else if (location.pathname === '/forgot-password') {
            setShowNav(false);
            setButtonText('Register');
        }
        else if (location.pathname === '/send-otp') {
            setShowNav(false);
            setButtonText('Login');
        }
        else {
            setShowNav(true);
            setButtonText('Register');
        }
    }, [location.pathname]);
    return (_jsxs(Header, Object.assign({ className: "header" }, { children: [_jsx("div", Object.assign({ className: "logo-container" }, { children: _jsx(Link, Object.assign({ to: "/" }, { children: _jsx("img", { src: logo, alt: "Balasteps", className: "logo" }) })) })), showNav && (_jsx("div", Object.assign({ className: "right-section" }, { children: _jsxs("nav", Object.assign({ className: "nav-links" }, { children: [_jsx(Link, Object.assign({ className: "link", to: "/" }, { children: "News" })), _jsx(Link, Object.assign({ className: "link", to: "/ikomek" }, { children: "iKomek" })), _jsx(Link, Object.assign({ className: "link", to: "/forum" }, { children: "Forums" })), _jsx(Link, Object.assign({ className: "link", to: "/marketplace" }, { children: "Marketplace" })), _jsx(Link, Object.assign({ className: "link", to: "/about-us" }, { children: "About us" }))] })) }))), _jsx(Button, Object.assign({ className: "register-btn", onClick: handleButtonClick }, { children: buttonText }))] })));
};
export default AppHeader;
//# sourceMappingURL=header.js.map
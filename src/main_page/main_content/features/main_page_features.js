import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ikomekImage from '../../../assets/images/main_content/features/ikomek_img.png';
import communityImage from '../../../assets/images/main_content/features/forum_img.png';
import marketImage from '../../../assets/images/main_content/features/marketplace_img.png';
import aboutUsImage from '../../../assets/images/main_content/features/about_us_img.png';
import { ButtonContainer, ButtonBlock, ButtonContent, ButtonText, ButtonTitle, ButtonImage, } from './main-page-features.styled';
const HeaderButtons = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('accessToken');
    const handleProtectedClick = (path) => {
        if (isAuthenticated) {
            navigate('/login');
        }
        else {
            navigate(path);
        }
    };
    const sections = [
        {
            title: 'iKomek',
            text: 'Get instant answers and expert recommendations.',
            image: ikomekImage,
            path: '/ikomek_assistant',
        },
        {
            title: 'Community Forum',
            text: 'Connect with other parents, share experiences, and get support.',
            image: communityImage,
            path: '/discussion-forum',
        },
        {
            title: 'Marketplace',
            text: 'Share, sell and buy second-hand items.',
            image: marketImage,
            path: '/marketplace',
        },
        {
            title: 'About us',
            text: "Personalized step-by-step guidance tailored to your child's needs.",
            image: aboutUsImage,
            path: '/about-us',
        },
    ];
    return (_jsx(ButtonContainer, { children: sections.map((section, index) => (_jsx(motion.div, { initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: index * 0.2 }, viewport: { once: false }, children: _jsx(ButtonBlock, { isReversed: index % 2 !== 0, onClick: () => handleProtectedClick(section.path), style: { cursor: 'pointer' }, children: _jsxs(ButtonContent, { isReversed: index % 2 !== 0, children: [_jsxs(ButtonText, { children: [_jsx(ButtonTitle, { children: section.title }), _jsx("p", { children: section.text })] }), _jsx(ButtonImage, { src: section.image, alt: section.title })] }) }) }, index))) }));
};
export default HeaderButtons;

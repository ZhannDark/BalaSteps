import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Title from 'antd/es/typography/Title';
import { motion } from 'framer-motion';
import ikomekImage from '../../images/main_content/features/image 1.png';
import communityImage from '../../images/main_content/features/image 5.png';
import marketImage from '../../images/main_content/features/image 8.png';
import aboutUsImage from '../../images/main_content/features/image 7.png';
const HeaderButtons = () => {
    const sections = [
        {
            title: 'iKomek',
            text: 'Get instant answers and expert recommendations.',
            image: ikomekImage,
        },
        {
            title: 'Community Forum',
            text: 'Connect with other parents, share experiences, and get support.',
            image: communityImage,
        },
        {
            title: 'Marketplace',
            text: 'Share, sell and buy second-hand items.',
            image: marketImage,
        },
        {
            title: 'About us',
            text: "Personalized step-by-step guidance tailored to your child's needs.",
            image: aboutUsImage,
        },
    ];
    return (_jsx("div", Object.assign({ className: "button-cont" }, { children: sections.map((section, index) => (_jsx(motion.div, Object.assign({ className: `buttons-container ${index % 2 === 0 ? 'left' : 'right'}`, initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: index * 0.2 }, viewport: { once: false } }, { children: _jsx("div", Object.assign({ className: "buttons-content" }, { children: index % 2 === 0 ? (_jsxs(_Fragment, { children: [_jsxs("div", Object.assign({ className: "buttons-text" }, { children: [_jsx(Title, Object.assign({ className: "buttons-title" }, { children: section.title })), _jsx("p", { children: section.text })] })), _jsx("img", { src: section.image, alt: section.title, className: "buttons-image" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", Object.assign({ className: "buttons-text" }, { children: [_jsx(Title, Object.assign({ className: "buttons-title" }, { children: section.title })), _jsx("p", { children: section.text })] })), _jsx("img", { src: section.image, alt: section.title, className: "buttons-image" })] })) })) }), index))) })));
};
export default HeaderButtons;
//# sourceMappingURL=header_buttons.js.map
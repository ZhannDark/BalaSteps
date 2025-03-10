import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from 'antd/es/typography/Title';
import ikomekImage from '../../images/main_content/features/image1.png';
import communityImage from '../../images/main_content/features/image5.png';
import marketImage from '../../images/main_content/features/image8.png';
import aboutUsImage from '../../images/main_content/features/image7.png';
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
    return (_jsx("div", Object.assign({ className: "button-cont" }, { children: sections.map((section, index) => (_jsx("div", Object.assign({ className: "buttons-container" }, { children: _jsxs("div", Object.assign({ className: "buttons-content" }, { children: [_jsx("img", { src: section.image, alt: section.title, className: "buttons-image" }), _jsxs("div", Object.assign({ className: "buttons-text" }, { children: [_jsx(Title, Object.assign({ className: "buttons-title" }, { children: section.title })), _jsx("p", { children: section.text })] }))] })) }), index))) })));
};
export default HeaderButtons;
//# sourceMappingURL=header_buttons.js.map
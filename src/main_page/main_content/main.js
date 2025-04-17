import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Title from 'antd/es/typography/Title';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import photo1 from '../../images/main_content/main2.png';
import photo2 from '../../images/main_content/main1.png';
import { Button } from 'antd';
import './main.scss';
const MainContent = () => {
    const navigate = useNavigate();
    return (_jsxs("div", Object.assign({ className: "main" }, { children: [_jsx(motion.div, Object.assign({ initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 } }, { children: _jsxs(Title, Object.assign({ className: "main-title" }, { children: ["Your Step-by-Step Guide to ", _jsx("br", {}), " Support Your Special Child."] })) })), _jsx(motion.div, Object.assign({ initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5, delay: 0.5 } }, { children: _jsx(Button, Object.assign({ className: "get-started-btn", onClick: () => navigate('/register') }, { children: "Get Started" })) })), _jsxs("div", Object.assign({ className: "images-container" }, { children: [_jsx(motion.img, { src: photo1, alt: "Photo1", className: "content-image", initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1 }, viewport: { once: true } }), _jsx(motion.img, { src: photo2, alt: "Photo2", className: "content-image", initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, delay: 0.2 }, viewport: { once: true } })] }))] })));
};
export default MainContent;
//# sourceMappingURL=main.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import photo1 from '../../../assets/images/main_content/main_photos/main1.png';
import photo2 from '../../../assets/images/main_content/main_photos/main2.png';
import { MainWrapper, MainTitle, GetStartedButton, ImagesContainer, ContentImage, } from './main-page-main.styled';
const MainContent = () => {
    const navigate = useNavigate();
    const MotionImage = motion(ContentImage);
    return (_jsxs(MainWrapper, { children: [_jsx(motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1 }, children: _jsxs(MainTitle, { children: ["Your Step-by-Step Guide to ", _jsx("br", {}), " Support Your Special Child."] }) }), _jsx(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5, delay: 0.5 }, children: _jsx(GetStartedButton, { onClick: () => navigate('/register'), children: "Get Started" }) }), _jsxs(ImagesContainer, { children: [_jsx(MotionImage, { src: photo1, alt: "Photo1", initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1 }, viewport: { once: true } }), _jsx(MotionImage, { src: photo2, alt: "Photo2", initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, delay: 0.2 }, viewport: { once: true } })] })] }));
};
export default MainContent;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Wrapper = styled.div `
  max-width: 900px;
  margin: 80px auto;
  padding: 40px 20px;
  text-align: center;
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin: 60px 10px;
    padding: 20px 10px;
  }
`;
const Title = styled.h1 `
  font-size: 36px;
  font-family: 'Inknut Antiqua', serif;
  color: #4b163b;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;
const Text = styled.p `
  font-size: 18px;
  line-height: 1.8;
  color: #444;
  font-family: 'Newsreader', serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.6;
  }
`;
const BackButton = styled.button `
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #426b1f;
  color: white;
  font-family: 'Acme', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #629432;
  }
`;
export const Services = () => {
    const navigate = useNavigate();
    return (_jsx(Wrapper, { children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx(Title, { children: "Our Services" }), _jsx(Text, { children: "Explore a wide range of services provided by BalaSteps \u2014 from personalized therapy recommendations to educational content and child progress tracking tools. We aim to support you with practical, impactful features every step of the way." }), _jsx(BackButton, { onClick: () => navigate(-1), children: "\u2190 Back to Home" })] }) }));
};
export const Support = () => {
    const navigate = useNavigate();
    return (_jsx(Wrapper, { children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx(Title, { children: "Support" }), _jsx(Text, { children: "If you need assistance, we are here to help. Contact us for any technical issues, questions about using the platform, or guidance on how to get started. Our team is ready to support you with care and clarity." }), _jsx(BackButton, { onClick: () => navigate('/'), children: "\u2190 Back to Home" })] }) }));
};
export const PrivacyPolicy = () => {
    const navigate = useNavigate();
    return (_jsx(Wrapper, { children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx(Title, { children: "Privacy Policy" }), _jsx(Text, { children: "Your privacy is important to us. BalaSteps ensures that all data is securely stored and never shared with third parties without consent. Learn how we protect your information and your child data." }), _jsx(BackButton, { onClick: () => navigate(-1), children: "\u2190 Back to Home" })] }) }));
};
export const Contact = () => {
    const navigate = useNavigate();
    return (_jsx(Wrapper, { children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx(Title, { children: "Contact Us" }), _jsx(Text, { children: "Got a question? We\u2019d love to hear from you. Reach out via our contact form, email, or social media platforms. Our team is ready to support you and provide the answers you need." }), _jsx(BackButton, { onClick: () => navigate(-1), children: "\u2190 Back to Home" })] }) }));
};
export const About = () => {
    const navigate = useNavigate();
    return (_jsx(Wrapper, { children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx(Title, { children: "About BalaSteps" }), _jsx(Text, { children: "BalaSteps is a dedicated space for parents of children with special needs. We offer personalized resources, a supportive community, and tools to help you navigate everyday challenges with confidence. Our mission is to empower families with information, connection, and care." }), _jsx(BackButton, { onClick: () => navigate(-1), children: "\u2190 Back to Home" })] }) }));
};

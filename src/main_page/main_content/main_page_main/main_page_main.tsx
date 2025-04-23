import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import photo1 from '../../../assets/images/main_content/main_photos/main1.png';
import photo2 from '../../../assets/images/main_content/main_photos/main2.png';
import {
  MainWrapper,
  MainTitle,
  GetStartedButton,
  ImagesContainer,
  ContentImage,
} from './main-page-main.styled';

const MainContent = () => {
  const navigate = useNavigate();
  const MotionImage = motion(ContentImage);

  return (
    <MainWrapper>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <MainTitle>
          Your Step-by-Step Guide to <br /> Support Your Special Child.
        </MainTitle>
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <GetStartedButton onClick={() => navigate('/register')}>
          Get Started
        </GetStartedButton>
      </motion.div>
      <ImagesContainer>
        <MotionImage
          src={photo1}
          alt="Photo1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <MotionImage
          src={photo2}
          alt="Photo2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </ImagesContainer>
    </MainWrapper>
  );
};

export default MainContent;

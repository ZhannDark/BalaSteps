import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ikomekImage from '../../../assets/images/main_content/features/ikomek_img.png';
import communityImage from '../../../assets/images/main_content/features/forum_img.png';
import marketImage from '../../../assets/images/main_content/features/marketplace_img.png';
import aboutUsImage from '../../../assets/images/main_content/features/about_us_img.png';
import {
  ButtonContainer,
  ButtonBlock,
  ButtonContent,
  ButtonText,
  ButtonTitle,
  ButtonImage,
} from './main-page-features.styled';

const HeaderButtons = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleProtectedClick = (path: string) => {
    if (isAuthenticated) {
      navigate('/login');
    } else {
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

  return (
    <ButtonContainer>
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: false }}
        >
          <ButtonBlock
            $isReversed={index % 2 !== 0}
            onClick={() => handleProtectedClick(section.path)}
            style={{ cursor: 'pointer' }}
          >
            <ButtonContent $isReversed={index % 2 !== 0}>
              <ButtonText>
                <ButtonTitle>{section.title}</ButtonTitle>
                <p>{section.text}</p>
              </ButtonText>
              <ButtonImage src={section.image} alt={section.title} />
            </ButtonContent>
          </ButtonBlock>
        </motion.div>
      ))}
    </ButtonContainer>
  );
};

export default HeaderButtons;

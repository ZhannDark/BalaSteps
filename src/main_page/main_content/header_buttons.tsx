import Title from 'antd/es/typography/Title';
import React from 'react';
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

  return (
    <div className="button-cont">
      {sections.map((section, index) => (
        <motion.div
          className={`buttons-container ${index % 2 === 0 ? 'left' : 'right'}`}
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          viewport={{ once: false }}
        >
          <div className="buttons-content">
            {index % 2 === 0 ? (
              <>
                <div className="buttons-text">
                  <Title className="buttons-title">{section.title}</Title>
                  <p>{section.text}</p>
                </div>
                <img
                  src={section.image}
                  alt={section.title}
                  className="buttons-image"
                />
              </>
            ) : (
              <>
                <div className="buttons-text">
                  <Title className="buttons-title">{section.title}</Title>
                  <p>{section.text}</p>
                </div>
                <img
                  src={section.image}
                  alt={section.title}
                  className="buttons-image"
                />
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeaderButtons;

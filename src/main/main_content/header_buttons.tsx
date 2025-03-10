import Title from 'antd/es/typography/Title';
import React from 'react';
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

  return (
    <div className="button-cont">
      {sections.map((section, index) => (
        <div className="buttons-container" key={index}>
          <div className="buttons-content">
            <img
              src={section.image}
              alt={section.title}
              className="buttons-image"
            />
            <div className="buttons-text">
              <Title className="buttons-title">{section.title}</Title>
              <p>{section.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeaderButtons;

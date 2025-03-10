import Title from 'antd/es/typography/Title';
import React from 'react';
import './main.scss';
import { useNavigate } from 'react-router-dom';
import photo1 from '../../images/main_content/main2.png';
import photo2 from '../../images/main_content/main1.png';
import { Button } from 'antd';

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <Title className="main-title">
        Your Step-by-Step Guide to <br /> Support Your Special Child.
      </Title>
      <Button className="get-started-btn" onClick={() => navigate('/register')}>
        Get Started
      </Button>
      <div className="images-container">
        <img src={photo1} alt="Photo1" className="content-image" />
        <img src={photo2} alt="Photo2" className="content-image" />
      </div>
    </div>
  );
};

export default MainContent;

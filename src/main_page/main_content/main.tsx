import Title from 'antd/es/typography/Title';
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import photo1 from '../../images/main_content/main2.png';
import photo2 from '../../images/main_content/main1.png';
import { Button } from 'antd';
import './main.scss';

const MainContent = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Title className="main-title">
          Your Step-by-Step Guide to <br /> Support Your Special Child.
        </Title>
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          className="get-started-btn"
          onClick={() => navigate('/register')}
        >
          Get Started
        </Button>
      </motion.div>
      <div className="images-container">
        <motion.img
          src={photo1}
          alt="Photo1"
          className="content-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
        <motion.img
          src={photo2}
          alt="Photo2"
          className="content-image"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default MainContent;

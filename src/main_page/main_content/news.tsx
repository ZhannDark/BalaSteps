import Title from 'antd/es/typography/Title';
import React from 'react';
import { motion } from 'framer-motion';
import news1 from '../../images/main_content/news/news1.png';
import news2 from '../../images/main_content/news/news2.png';
import news3 from '../../images/main_content/news/news3.png';

const News = () => {
  return (
    <div className="news-section">
      <motion.div
        className="news-title-container"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <Title className="news-title">
          <div className="news-title-line"></div>
          NEWS
          <div className="news-title-line"></div>
        </Title>
      </motion.div>
      <div className="news-container">
        <motion.div
          className="news-item"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <img src={news1} alt="News 1" className="news-image" />
          <p className="news-text">
            The issues of parents raising special needs children were discussed
            at the JSDP platform.
          </p>
        </motion.div>
        <motion.div
          className="news-item"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <img src={news2} alt="News 2" className="news-image" />
          <p className="news-text">A special day for special children.</p>
        </motion.div>

        <motion.div
          className="news-item"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false }}
        >
          <img src={news3} alt="News 3" className="news-image" />
          <p className="news-text">
            A sports relay competition was held among special needs children in
            Nur-Sultan.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default News;

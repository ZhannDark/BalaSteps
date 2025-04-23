import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import news1 from '../../../assets/images/main_content/news/news1.png';
import news2 from '../../../assets/images/main_content/news/news2.png';
import news3 from '../../../assets/images/main_content/news/news3.png';
import {
  NewsSection,
  NewsTitleContainer,
  NewsTitleLine,
  NewsTitle,
  NewsContainer,
  NewsItem,
  NewsImage,
  NewsText,
} from './main-page-news.styled';

const News = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');

  const handleProtectedClick = () => {
    if (isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/info_hub');
    }
  };

  const news = [
    {
      id: 1,
      img: news1,
      text: 'The issues of parents raising special needs children were discussed at the JSDP platform.',
    },
    {
      id: 2,
      img: news2,
      text: 'A special day for special children.',
    },
    {
      id: 3,
      img: news3,
      text: 'A sports relay competition was held among special needs children in Nur-Sultan.',
    },
  ];

  return (
    <NewsSection>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <NewsTitleContainer>
          <NewsTitleLine />
          <NewsTitle>NEWS</NewsTitle>
          <NewsTitleLine />
        </NewsTitleContainer>
      </motion.div>

      <NewsContainer>
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: false }}
            onClick={handleProtectedClick}
            style={{ cursor: 'pointer' }}
          >
            <NewsItem>
              <NewsImage src={item.img} alt={`News ${item.id}`} />
              <NewsText>{item.text}</NewsText>
            </NewsItem>
          </motion.div>
        ))}
      </NewsContainer>
    </NewsSection>
  );
};

export default News;

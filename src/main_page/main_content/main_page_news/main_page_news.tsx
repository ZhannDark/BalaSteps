import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../main_panel/axios-instance';
import {
  NewsSection,
  NewsTitleContainer,
  NewsTitleLine,
  NewsTitle,
  NewsContainer,
  NewsItem,
  NewsImage,
  NewsText,
  TabsContainer,
  TabButton,
  ActiveDot,
  ShowMoreButton,
  NewsMeta,
} from './main-page-news.styled';

interface NewsItemType {
  id: string;
  photo: string;
  title: string;
  name?: string;
}

const InfoHubPreview = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const [active, setActive] = useState<'news' | 'specialists' | 'centers'>(
    'news'
  );
  const [items, setItems] = useState<NewsItemType[]>([]);
  type TabKey = 'news' | 'specialists' | 'centers';

  const fetchItems = async () => {
    try {
      const endpointMap = {
        news: '/info-hub/news/',
        specialists: '/info-hub/specialists/',
        centers: '/info-hub/therapy-centers/',
      };
      const response = await axiosInstance.get(endpointMap[active]);
      setItems(response.data.slice(0, 4));
    } catch {
      console.error('Failed to load content.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, [active]);

  const handleShowMore = () => {
    navigate('/info_hub');
  };

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
          <NewsTitle>INFO HUB</NewsTitle>
          <NewsTitleLine />
        </NewsTitleContainer>
      </motion.div>

      <TabsContainer>
        {(['news', 'specialists', 'centers'] as TabKey[]).map((key) => (
          <TabButton
            key={key}
            isActive={active === key}
            onClick={() => setActive(key)}
          >
            {key.toUpperCase()}
            {active === key && <ActiveDot layoutId="active-dot" />}
          </TabButton>
        ))}
      </TabsContainer>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <NewsContainer>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                onClick={handleShowMore}
                style={{ cursor: 'pointer' }}
              >
                <NewsItem>
                  <NewsImage src={item.photo} alt={`item ${item.id}`} />
                  <NewsText>{item.title}</NewsText>
                  {active !== 'news' && <NewsMeta>{item.name}</NewsMeta>}
                </NewsItem>
              </motion.div>
            ))}
          </NewsContainer>
          <ShowMoreButton onClick={handleShowMore}>Show More →</ShowMoreButton>
        </motion.div>
      </AnimatePresence>
    </NewsSection>
  );
};

export default InfoHubPreview;

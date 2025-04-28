import React, { useRef, useState } from 'react';
import { Typography, Card, Input, Button, Layout, message } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';
import Foot from '../../main_page/main_content/footer/footer/footer';

const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;
const { Header, Content } = Layout;

// Interfaces
interface NewsItem {
  id: string;
  title: string;
  content: string;
  photo?: string;
  tags: { id: string; name: string }[];
  source?: string;
}

interface SpecialistOrCenterItem {
  id: string;
  name: string;
  description: string;
  photo?: string;
  tags: { id: string; name: string }[];
}

const InformationHub = () => {
  const newsRef = useRef<HTMLDivElement | null>(null);
  const specialistsRef = useRef<HTMLDivElement | null>(null);
  const centersRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch functions
  const fetchNews = async (): Promise<NewsItem[]> => {
    const res = await axios.get(
      'https://project-back-81mh.onrender.com/info-hub/news/'
    );
    return res.data;
  };

  const fetchSpecialists = async (): Promise<SpecialistOrCenterItem[]> => {
    const res = await axios.get(
      'https://project-back-81mh.onrender.com/info-hub/specialists/'
    );
    return res.data;
  };

  const fetchCenters = async (): Promise<SpecialistOrCenterItem[]> => {
    const res = await axios.get(
      'https://project-back-81mh.onrender.com/info-hub/centers/'
    );
    return res.data;
  };

  // Queries
  const { data: news = [], isError: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
  });
  const { data: specialists = [], isError: specialistsError } = useQuery({
    queryKey: ['specialists'],
    queryFn: fetchSpecialists,
  });
  const { data: centers = [], isError: centersError } = useQuery({
    queryKey: ['centers'],
    queryFn: fetchCenters,
  });

  if (newsError || specialistsError || centersError) {
    message.error('Failed to load information hub items');
    return null;
  }

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const filterNews = () =>
    news.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filterSpecialists = () =>
    specialists.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filterCenters = () =>
    centers.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout className="info-hub-layout">
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 70 : 250 }}>
        <Header
          style={{
            padding: 0,
            marginLeft: '5px',
            background: '#E2E3E0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Main_header />
        </Header>

        <Content className="content-container">
          <div className="name-search">
            <h1 className="title">Information Hub</h1>
            <Search
              placeholder="Search for topics, keywords"
              className="search-bar"
              allowClear
              enterButton
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* News */}
          <section className="section">
            <Title level={3} className="section-title">
              Latest News:
            </Title>
            <div className="scroll-container">
              <Button
                className="scroll-btn"
                icon={<LeftOutlined />}
                onClick={() => scrollLeft(newsRef)}
              />
              <div className="scroll-content" ref={newsRef}>
                {filterNews().map((item) => (
                  <Card
                    key={item.id}
                    className="info-card"
                    hoverable
                    onClick={() => navigate(`/info_hub/news/${item.id}`)}
                  >
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="card-image"
                    />
                    <Meta
                      title={item.title}
                      description={
                        (item.content ? item.content.slice(0, 60) : '') + '...'
                      }
                    />
                  </Card>
                ))}
              </div>
              <Button
                className="scroll-btn"
                icon={<RightOutlined />}
                onClick={() => scrollRight(newsRef)}
              />
            </div>
          </section>

          {/* Specialists */}
          <section className="section">
            <Title level={3} className="section-title">
              Specialists:
            </Title>
            <div className="scroll-container">
              <Button
                className="scroll-btn"
                icon={<LeftOutlined />}
                onClick={() => scrollLeft(specialistsRef)}
              />
              <div className="scroll-content" ref={specialistsRef}>
                {filterSpecialists().map((item) => (
                  <Card
                    key={item.id}
                    className="info-card"
                    hoverable
                    onClick={() => navigate(`/info_hub/specialist/${item.id}`)}
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="card-image"
                    />
                    <Meta
                      title={item.name}
                      description={`Tags: ${item.tags.map((tag) => tag.name).join(', ')}`}
                    />
                  </Card>
                ))}
              </div>
              <Button
                className="scroll-btn"
                icon={<RightOutlined />}
                onClick={() => scrollRight(specialistsRef)}
              />
            </div>
          </section>

          {/* Centers */}
          <section className="section">
            <Title level={3} className="section-title">
              Therapy Centers:
            </Title>
            <div className="scroll-container">
              <Button
                className="scroll-btn"
                icon={<LeftOutlined />}
                onClick={() => scrollLeft(centersRef)}
              />
              <div className="scroll-content" ref={centersRef}>
                {filterCenters().map((item) => (
                  <Card
                    key={item.id}
                    className="info-card"
                    hoverable
                    onClick={() =>
                      navigate(`/info_hub/therapy-center/${item.id}`)
                    }
                  >
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="card-image"
                    />
                    <Meta
                      title={item.name}
                      description={`Tags: ${item.tags.map((tag) => tag.name).join(', ')}`}
                    />
                  </Card>
                ))}
              </div>
              <Button
                className="scroll-btn"
                icon={<RightOutlined />}
                onClick={() => scrollRight(centersRef)}
              />
            </div>
          </section>
        </Content>
        <Foot />
      </Layout>
    </Layout>
  );
};

export default InformationHub;

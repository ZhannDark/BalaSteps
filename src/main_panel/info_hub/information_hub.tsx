import React, { useRef, useState } from 'react';
import { Typography, Card, Input, Button, Layout } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './information_hub.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';

const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;
const { Header, Content } = Layout;

const newsData = [
  { title: 'Kazakhstan Allocates $2.7M in Recovered Assets', source: 'Astana Times', image: '/images/news1.jpg' },
  { title: 'Kazakhstan to Build Kindergarten for Special Needs Kids', source: 'Inform', image: '/images/news2.jpg' },
  { title: 'University of Arizona Expands Education Inclusivity', source: 'International Arizona', image: '/images/news3.jpg' },
];

const specialistsData = Array(6).fill({
  name: 'Абдиев Габит Серикович',
  specialization: 'Urolog',
  image: '/images/specialist.jpg',
});

const centersData = Array(4).fill({
  address: 'г. Алматы, ул. Розыбакиева, 37В',
  image: '/images/therapy-center.jpg',
});

const InformationHub = () => {
  const newsRef = useRef<HTMLDivElement | null>(null);
  const specialistsRef = useRef<HTMLDivElement | null>(null);
  const centersRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSpecialists = specialistsData.filter((specialist) =>
    specialist.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCenters = centersData.filter((center) =>
    center.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout className="info-hub-layout">
      <MenuPanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)}  selectedPage={'/info_hub'}/>

      <Layout style={{ marginLeft: collapsed ? 70 : 250, transition: 'margin-left 0.3s ease' }}>
        <Header className="info-header">
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

          {/* News Section */}
          <section className="section">
            <Title level={3} className="section-title">New news :</Title>
            <div className="scroll-container">
              <Button className="scroll-btn" icon={<LeftOutlined />} onClick={() => scrollLeft(newsRef)} />
              <div className="scroll-content" ref={newsRef}>
                {filteredNews.map((news, index) => (
                  <Card key={index} className="info-card" hoverable onClick={() => navigate(`/info_hub/news/${index}`)}>
                    <img src={news.image} alt={news.title} className="card-image" />
                    <Meta title={news.title} description={news.source} />
                  </Card>
                ))}
              </div>
              <Button className="scroll-btn" icon={<RightOutlined />} onClick={() => scrollRight(newsRef)} />
            </div>
          </section>

          {/* Specialists Section */}
          <section className="section">
            <Title level={3} className="section-title">Specialists :</Title>
            <div className="scroll-container">
              <Button className="scroll-btn" icon={<LeftOutlined />} onClick={() => scrollLeft(specialistsRef)} />
              <div className="scroll-content" ref={specialistsRef}>
                {filteredSpecialists.map((specialist, index) => (
                  <Card key={index} className="info-card" hoverable onClick={() => navigate(`/info_hub/specialist/${index}`)}>
                    <img src={specialist.image} alt={specialist.name} className="card-image" />
                    <Meta title={specialist.name} description={specialist.specialization} />
                  </Card>
                ))}
              </div>
              <Button className="scroll-btn" icon={<RightOutlined />} onClick={() => scrollRight(specialistsRef)} />
            </div>
          </section>

          {/* Therapy Centers Section */}
          <section className="section">
            <Title level={3} className="section-title">Therapy Centers :</Title>
            <div className="scroll-container">
              <Button className="scroll-btn" icon={<LeftOutlined />} onClick={() => scrollLeft(centersRef)} />
              <div className="scroll-content" ref={centersRef}>
                {filteredCenters.map((center, index) => (
                  <Card key={index} className="info-card" hoverable onClick={() => navigate(`/info_hub/therapy-center/${index}`)}>
                    <img src={center.image} alt={center.address} className="card-image" />
                    <Meta title={center.address} />
                  </Card>
                ))}
              </div>
              <Button className="scroll-btn" icon={<RightOutlined />} onClick={() => scrollRight(centersRef)} />
            </div>
          </section>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InformationHub;

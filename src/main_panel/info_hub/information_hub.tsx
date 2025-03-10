import React, { useState } from 'react';
import { Typography, Card, Row, Col, Input, Layout } from 'antd';
import MenuPanel from '../../menu/menu-panel';
import './information_hub.scss';
import Main_header from '../main_header/Main_header';

const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;
const { Header, Content } = Layout;

const newsData = [
  {
    title:
      'Kazakhstan Allocates $2.7 Million in Recovered Assets to Build New School',
    source: 'Astana Times',
  },
  {
    title:
      'Kazakhstan to Build Kindergarten for Special Needs Kids Worth KZT 7.8 Billion',
    source: 'Inform',
  },
  {
    title:
      'University of Arizona Invited to Expand Public Education Inclusivity in Northern Kazakhstan',
    source: 'International Arizona',
  },
  {
    title:
      'Number of Children with Special Educational Needs Exceeds 162,000 in Kazakhstan',
    source: 'Inform',
  },
  {
    title: 'Experts Commend Kazakhstan’s Commitment to Disability Rights',
    source: 'Human Rights Office',
  },
];

const specialistsData = Array(6).fill({
  name: 'Абдиев Габит Серикович',
  specialization: 'Urolog',
});

const centersData = Array(2).fill({
  address: 'г. Алматы, ул. Розыбакиева, 37В',
});

const InformationHub = () => {
  const [collapsed, setCollapsed] = useState(false); // Состояние для сворачивания панели

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed} />{' '}
      {/* Передаём пропсы в MenuPanel */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 250,
          transition: 'margin-left 0.3s',
        }}
      >
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
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            borderRadius: '8px',
          }}
        >
          <div className="name-search">
            <h1 className="title">Information Hub</h1>
            <Search
              placeholder="Search for topics, keywords"
              style={{ width: 300, marginRight: '20px' }}
              allowClear
              enterButton
            />
          </div>
          <section className="section">
            <Title level={3} style={{ color: '#556b2f' }}>
              New news :
            </Title>
            <Row gutter={[24, 24]} justify="start">
              {newsData.map((news, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={<div className="card-placeholder">Image</div>}
                  >
                    <Meta
                      title={news.title}
                      description={news.source}
                      style={{ textAlign: 'center' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section className="section">
            <Title level={3} style={{ color: '#556b2f' }}>
              Specialists :
            </Title>
            <Row gutter={[24, 24]} justify="start">
              {specialistsData.map((specialist, index) => (
                <Col key={index} xs={12} sm={8} md={6} lg={4}>
                  <Card
                    hoverable
                    cover={<div className="card-placeholder">Photo</div>}
                  >
                    <Meta
                      title={specialist.name}
                      description={specialist.specialization}
                      style={{ textAlign: 'center' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section className="section">
            <Title level={3} style={{ color: '#556b2f' }}>
              Therapy Centers :
            </Title>
            <Row gutter={[24, 24]} justify="start">
              {centersData.map((center, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={<div className="card-placeholder">Photo</div>}
                  >
                    <Meta
                      title={center.address}
                      style={{ textAlign: 'center' }}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </Content>
      </Layout>
    </Layout>
  );
};

export default InformationHub;

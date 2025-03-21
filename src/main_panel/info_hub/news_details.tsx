import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

const newsData = [
  {
    title: 'Kazakhstan Allocates $2.7M in Recovered Assets',
    source: 'Astana Times',
    date: 'March 10, 2025',
    link: 'https://astanatimes.com',
    image: '/images/news1.jpg',
    description: 'Kazakhstan is investing in schools using recovered assets...',
  },
  {
    title: 'Kazakhstan to Build Kindergarten for Special Needs Kids',
    source: 'Inform',
    date: 'March 8, 2025',
    link: 'https://inform.kz',
    image: '/images/news2.jpg',
    description: 'The government plans to build a new kindergarten...',
  },
];

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const news = newsData[Number(id)];
  const navigate = useNavigate();
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [collapsed, setCollapsed] = useState(false);


  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([newComment, ...comments]);
      setNewComment('');
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed}  selectedPage={'/info_hub'}/>
      <Layout style={{ marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s ease' }}>
          <Main_header />
        <Content className="details-container">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/info_hub')} className="back-button">
            Back
          </Button>
          <Card className="details-card">
            <img src={news.image} alt={news.title} className="details-image" />
            <Title>{news.title}</Title>
            <Text strong>Source: <a href={news.link} target="_blank" rel="noopener noreferrer">{news.source}</a></Text>
            <Text type="secondary">{news.date}</Text>
            <p>{news.description}</p>
          </Card>

          <Title level={3}>Comments</Title>
          <TextArea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="primary" onClick={handleAddComment} className="comment-button">
            Add Comment
          </Button>
          <List
            dataSource={comments}
            renderItem={(comment, index) => <List.Item key={index}>{comment}</List.Item>}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewsDetails;

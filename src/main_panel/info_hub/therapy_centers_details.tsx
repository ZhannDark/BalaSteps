import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Rate, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

const specialistsData = [
  {
    name: 'Абдиев Габит Серикович',
    specialization: 'Urologist',
    experience: '15 years',
    location: 'Almaty, Kazakhstan',
    rating: 4.5,
    image: '/images/specialist.jpg',
  },
];

const TherapyCentersDetails = () => {
  const { id } = useParams<{ id: string }>();
  const specialist = specialistsData[Number(id)];
  const navigate = useNavigate();
  const [rating, setRating] = useState(specialist.rating);
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
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed} selectedPage={'/info_hub'} />
      <Layout style={{ marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s ease' }}>
        <Main_header />
        <Content className="details-container">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/info_hub')} className="back-button">
            Back
          </Button>
          <Card className="details-card">
            <img src={specialist.image} alt={specialist.name} className="details-image" />
            <Title>{specialist.name}</Title>
            <Text strong>{specialist.specialization}</Text>
            <Text>Experience: {specialist.experience}</Text>
            <Text>Location: {specialist.location}</Text>
            <Rate allowHalf defaultValue={rating} onChange={(value) => setRating(value)} />
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

export default TherapyCentersDetails;

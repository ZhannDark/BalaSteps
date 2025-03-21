import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Rate, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

const marketplaceItems = [
  { id: 0, name: 'Pediatric Wheelchair', image: '/images/wheelchair.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 1, name: 'Nebulizer Machine', image: '/images/nebulizer.jpg', description: 'A medical nebulizer for children.', price: '$75' },
];

const MarketplaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const item = marketplaceItems[Number(id)];
  const navigate = useNavigate();
  const [rating, setRating] = useState(4.5);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [collapsed, setCollapsed] = useState(false);


  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([newComment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <Layout>
      <MenuPanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} selectedPage={'/marketplace'} />
      <Layout style={{ marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s' }}>
        <Header>
          <Main_header />
        </Header>
        <Content className="details-container">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} className="back-button">
            Back
          </Button>
          <Card className="details-card">
            <img src={item.image} alt={item.name} className="details-image" />
            <Title>{item.name}</Title>
            <Text strong>Price: {item.price}</Text>
            <p>{item.description}</p>
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

export default MarketplaceDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Input, List, Rate, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import axios from 'axios';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

const SpecialistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`https://project-back-81mh.onrender.com/info-hub/infohub/${id}/`)
      .then(res => {
        setData(res.data);
        setComments(res.data.comments);
      })
      .catch(() => message.error('Failed to load specialist'));
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/infohub/${id}/comment/`,
        { content: newComment }
      );
      setComments([response.data, ...comments]);
      setNewComment('');
    } catch {
      message.error('Failed to post comment');
    }
  };

  return (
    <Layout>
      <MenuPanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} selectedPage="/info_hub" />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header style={{ background: '#E2E3E0', height: 48 }}><Main_header /></Header>
        <Content className="details-container">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/info_hub')}>Back</Button>
          {data && (
            <Card className="details-card">
              <img src={data.photo} alt={data.title} className="details-image" />
              <Title>{data.title}</Title>
              <Text>{data.content}</Text>
              <Rate disabled value={Number(data.average_rating || 4)} />
            </Card>
          )}
          <Title level={3}>Comments</Title>
          <TextArea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <Button type="primary" onClick={handleAddComment}>Add Comment</Button>
          <List dataSource={comments} renderItem={(c) => <List.Item key={c.id}>{c.content}</List.Item>} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SpecialistDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  Card,
  Input,
  List,
  message,
  Rate,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';
import Foot from '../../main_page/main_content/footer/footer/footer';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

interface Comment {
  id: string;
  user: { id: string; username: string };
  content: string;
  created_at: string;
  rating?: number;
}

interface CenterDetailsType {
  id: string;
  name: string;
  description: string;
  photo?: string;
  tags: { id: string; name: string }[];
  created_at: string;
  comments: Comment[];
}

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [post, setPost] = useState<CenterDetailsType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://project-back-81mh.onrender.com/info-hub/centers/${id}/`
        );
        setPost(res.data);
        setComments(res.data.comments);
      } catch {
        message.error('Failed to load center details');
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      message.error('Comment content cannot be empty');
      return;
    }
    if (newRating === 0) {
      message.error('Please provide a rating before submitting');
      return;
    }
    try {
      const res = await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/centers/${id}/comment/`,
        { content: newComment, rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment('');
      setNewRating(0);
    } catch {
      message.error('Failed to add comment');
    }
  };

  return (
    <Layout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
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

        <Content className="details-container">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/info_hub')}
            className="back-button"
          >
            Back
          </Button>

          {post && (
            <Card className="details-card">
              <img src={post.photo} alt={post.name} className="details-image" />
              <Title>{post.name}</Title>
              <Text type="secondary">
                {new Date(post.created_at).toLocaleString()}
              </Text>
              <p>{post.description}</p>
            </Card>
          )}

          <Title level={3}>Comments</Title>
          <TextArea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <Text>Rate this center (required): </Text>
            <Rate value={newRating} onChange={(value) => setNewRating(value)} />
          </div>
          <Button
            type="primary"
            onClick={handleAddComment}
            className="comment-button"
            style={{ marginTop: 10 }}
          >
            Add Comment
          </Button>

          <List
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item>
                <List.Item.Meta
                  title={comment.user.username}
                  description={new Date(comment.created_at).toLocaleString()}
                />
                <p>{comment.content}</p>
                {comment.rating && (
                  <Rate
                    disabled
                    value={comment.rating}
                    style={{ fontSize: 14 }}
                  />
                )}
              </List.Item>
            )}
          />
        </Content>
        <Foot />
      </Layout>
    </Layout>
  );
};

export default CenterDetails;

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
  Tag,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import Foot from '../../main_page/main_content/footer/footer/footer';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

interface Comment {
  id: string;
  user: { id: string; username: string };
  content: string;
  created_at: string;
  updated_at: string;
  rating?: number;
  likes_count?: number;
  replies?: Comment[];
}

interface CenterDetailsType {
  id: string;
  name: string;
  description: string;
  address: string;
  photo?: string;
  tags: { id: string; name: string }[];
  tag_ids: string[];
  created_at: string;
  comments: Comment[];
  average_rating: string;
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

        <Content className="details-container" style={{ padding: 24 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/info_hub')}
            className="back-button"
            style={{ marginBottom: 16 }}
          >
            Back
          </Button>

          {post && (
            <Card className="details-card" style={{ marginBottom: 24 }}>
              {post.photo && (
                <img
                  src={post.photo}
                  alt={post.name}
                  style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
                />
              )}
              <Title level={2}>{post.name}</Title>
              <Text type="secondary">
                Created at: {new Date(post.created_at).toLocaleString()}
              </Text>
              <p style={{ marginTop: 16 }}>{post.description}</p>
              <p>
                <strong>Address:</strong> {post.address}
              </p>
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0, marginTop: '16px', borderRadius: '8px' }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(post.address)}&output=embed`}
                allowFullScreen
              ></iframe>
              <div style={{ marginTop: 16 }}>
                <strong>Tags:</strong>{' '}
                {post.tags.map((tag) => (
                  <Tag key={tag.id} color="blue">
                    {tag.name}
                  </Tag>
                ))}
              </div>
              <p style={{ marginTop: 16 }}>
                <strong>Average Rating:</strong>{' '}
                {post.average_rating || 'Not rated yet'}
              </p>
            </Card>
          )}

          <Card title="Leave a Review" style={{ marginBottom: 32 }}>
            <TextArea
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            <div style={{ marginTop: 12 }}>
              <Text strong>
                Rate this center <span style={{ color: 'red' }}>*</span>:
              </Text>
              <Rate
                value={newRating}
                onChange={(value) => setNewRating(value)}
                style={{ marginLeft: 8 }}
              />
            </div>
            <Button
              type="primary"
              onClick={handleAddComment}
              style={{ marginTop: 16 }}
              disabled={!newComment.trim() || newRating === 0}
            >
              Submit
            </Button>
          </Card>

          <Title level={3}>User Comments</Title>
          <List
            dataSource={comments}
            itemLayout="vertical"
            renderItem={(comment) => (
              <List.Item key={comment.id}>
                <List.Item.Meta
                  title={<strong>{comment.user.username}</strong>}
                  description={`Created: ${new Date(comment.created_at).toLocaleString()} | Updated: ${new Date(comment.updated_at).toLocaleString()}`}
                />
                <p>{comment.content}</p>
                {comment.rating && (
                  <Rate
                    disabled
                    value={comment.rating}
                    style={{ fontSize: 14 }}
                  />
                )}
                <Text type="secondary" style={{ marginLeft: 10 }}>
                  👍 {comment.likes_count || 0} | 💬{' '}
                  {comment.replies?.length || 0}
                </Text>
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

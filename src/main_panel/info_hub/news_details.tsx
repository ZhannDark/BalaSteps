import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  Card,
  Input,
  List,
  Popconfirm,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

interface Comment {
  id: string;
  user: string;
  content: string;
  created_at: string;
  likes_count: number;
}

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `https://project-back-81mh.onrender.com/info-hub/infohub/${id}/`
      );
      setPost(res.data);
      setComments(res.data.comments);
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/infohub/${id}/comment/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment('');
    } catch {
      message.error('Failed to add comment');
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/infohub/comment/${commentId}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch {
      message.error('Failed to delete comment');
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.patch(
        `https://project-back-81mh.onrender.com/info-hub/infohub/comment/${editingId}/`,
        { content: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, content: res.data.content } : c
        )
      );
      setEditingId(null);
    } catch {
      message.error('Failed to edit comment');
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/infohub/comment/${commentId}/like/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likes_count: c.likes_count + 1 } : c
        )
      );
    } catch {
      message.error('Failed to like comment');
    }
  };

  return (
    <Layout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
        selectedPage="/info_hub"
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
              <img
                src={post.photo}
                alt={post.title}
                className="details-image"
              />
              <Title>{post.title}</Title>
              <Text type="secondary">
                {new Date(post.created_at).toLocaleString()}
              </Text>
              <p>{post.content}</p>
            </Card>
          )}

          <Title level={3}>Comments</Title>
          <TextArea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            className="comment-button"
          >
            Add Comment
          </Button>

          <List
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item
                actions={[
                  <Button
                    icon={<LikeOutlined />}
                    onClick={() => handleLike(comment.id)}
                  >
                    {comment.likes_count}
                  </Button>,
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditingId(comment.id);
                      setEditingContent(comment.content);
                    }}
                  />,
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => handleDelete(comment.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger icon={<DeleteOutlined />} />
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={comment.user}
                  description={new Date(comment.created_at).toLocaleString()}
                />
                {editingId === comment.id ? (
                  <>
                    <TextArea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                    />
                    <Button type="primary" onClick={handleEdit}>
                      Save
                    </Button>
                  </>
                ) : (
                  <p>{comment.content}</p>
                )}
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NewsDetails;

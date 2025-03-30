import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Card,
  Button,
  Input,
  message,
  Divider,
} from 'antd';
import { ArrowLeftOutlined, MessageOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import axios from 'axios';
import dayjs from 'dayjs';
import './discussion_details.scss';

const { Title } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

interface Comment {
  id: string;
  user: string;
  content: string;
  created_at: string;
}

interface PostDetails {
  id: string;
  title: string;
  content: string;
  user: string;
  created_at: string;
  categories: { name: string }[];
  comments: Comment[];
}

const DiscussionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [post, setPost] = useState<PostDetails | null>(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('accessToken');

  const toggleCollapsed = () => setCollapsed(!collapsed);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `https://project-back-81mh.onrender.com/forum/posts/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        message.error('Failed to load discussion details');
        console.error(error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      const response = await axios.post(
        `https://project-back-81mh.onrender.com/forum/posts/${id}/comment/`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPost((prev) =>
        prev
          ? { ...prev, comments: [response.data, ...prev.comments] }
          : prev
      );
      setNewComment('');
      message.success('Comment added');
    } catch (error) {
      console.error(error);
      message.error('Failed to add comment');
    }
  };

  return (
    <Layout className="discussion-layout">
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        selectedPage="/discussion-forum"
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header className="main-header">
          <Main_header />
        </Header>
        <Content className="discussion-content">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ marginBottom: '20px', fontSize: '16px', color: '#426B1F' }}
          >
            Back
          </Button>

          {post && (
            <>
              <Title level={2} style={{ color: '#333' }}>{post.title}</Title>
              <Card className="discussion-card">
                <div className="discussion-meta">
                  <Title level={5} className="author-name">{post.user}</Title>
                  <div className="category-label">{post.categories[0]?.name}</div>
                </div>
                <Divider />
                <p className="discussion-content-text">{post.content}</p>
                <div className="comment-count">
                  <MessageOutlined style={{ marginRight: 6, color: '#426B1F' }} />
                  {post.comments.length} comments
                </div>
              </Card>

              <div className="add-comment-section">
                <TextArea
                  rows={3}
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  type="primary"
                  className="add-comment-btn"
                  onClick={handleAddComment}
                  loading={loading}
                >
                  Add Comment
                </Button>
              </div>

              {post.comments.map((comment) => (
                <Card key={comment.id} className="comment-card">
                  <div className="comment-header">
                    <Title level={5} className="comment-author">{comment.user}</Title>
                    <span className="comment-date">
                      {dayjs(comment.created_at).format('MMM D, YYYY HH:mm')}
                    </span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                </Card>
              ))}
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DiscussionDetails;

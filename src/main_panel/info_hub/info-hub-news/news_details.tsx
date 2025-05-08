import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Button,
  Typography,
  List,
  Popconfirm,
  notification,
  Input,
} from 'antd';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  LikeOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import Foot from '../../../main_page/main_content/footer/footer/footer';
import {
  StyledLayout,
  StyledHeader,
  StyledContent,
  BackButton,
  DetailsCard,
  DetailsImage,
  CommentSection,
  CommentArea,
  StyledListItem,
  CommentMeta,
} from './news-details.styled';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface Reply {
  id: string;
  user: string;
  content: string;
  created_at: string;
  parent: string;
}

interface Comment {
  id: string;
  user: { id: string; username: string };
  content: string;
  created_at: string;
  likes_count: number;
  replies: Reply[];
}

interface NewsDetailsType {
  id: string;
  title: string;
  content: string;
  photo?: string;
  tags: { id: string; name: string }[];
  created_at: string;
  comments: Comment[];
  source?: string;
}

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [post, setPost] = useState<NewsDetailsType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `https://project-back-81mh.onrender.com/info-hub/news/${id}/`
        );
        setPost(res.data);
        setComments(res.data.comments);
      } catch {
        notification.error({
          message: 'Error',
          description: 'Failed to load news',
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      notification.warning({
        message: 'Validation Error',
        description: 'Comment content cannot be empty',
      });
      return;
    }
    try {
      console.log('comment id: ', id);
      const res = await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/news/${id}/comments/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('res: ', res.data);
      setComments((prev) => [res.data, ...(prev || [])]);
      setNewComment('');
      notification.success({
        message: 'Success',
        description: 'Comment added successfully.',
      });
    } catch {
      notification.error({
        message: 'Failed to add comment',
        description: 'Try again later.',
      });
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/news/comments/${commentId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      notification.success({
        message: 'Success',
        description: 'Comment deleted successfully.',
      });
    } catch {
      notification.error({
        message: 'Failed to delete comment',
        description: 'Try again later.',
      });
    }
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !replyParentId) return;
    try {
      await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/news/comments/${replyParentId}/replies/create/`,
        { content: replyContent, parent: replyParentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyContent('');
      setReplyParentId(null);
      notification.success({
        message: 'Success',
        description: 'Reply added successfully.',
      });
    } catch {
      notification.error({
        message: 'Failed to add reply',
        description: 'Try again later.',
      });
    }
  };

  return (
    <StyledLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <StyledHeader>
          <Main_header />
        </StyledHeader>
        <StyledContent>
          <BackButton
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/info_hub')}
          >
            Back
          </BackButton>
          {post && (
            <DetailsCard>
              {post.photo && <DetailsImage src={post.photo} alt={post.title} />}
              <Title>{post.title}</Title>
              <Text type="secondary">
                {new Date(post.created_at).toLocaleString()}
              </Text>
              <p style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
              {post.source && <Text italic>Source: {post.source}</Text>}
            </DetailsCard>
          )}

          <CommentSection>
            <Title level={3}>Comments</Title>
            <CommentArea
              rows={3}
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="primary" onClick={handleAddComment}>
              Add Comment
            </Button>

            <List
              dataSource={comments}
              renderItem={(comment) => (
                <StyledListItem
                  actions={[
                    <Button key="like" icon={<LikeOutlined />} />,
                    <Popconfirm
                      key="delete"
                      title="Are you sure?"
                      onConfirm={() => handleDelete(comment.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>,
                    <Button
                      key="reply"
                      icon={<MessageOutlined />}
                      onClick={() => setReplyParentId(comment.id)}
                    />,
                  ]}
                >
                  <CommentMeta
                    title={comment.user.username}
                    description={new Date(comment.created_at).toLocaleString()}
                  />
                  <p>{comment.content}</p>
                  {replyParentId === comment.id && (
                    <div style={{ marginTop: 10 }}>
                      <TextArea
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                      />
                      <Button type="link" onClick={handleReply}>
                        Send Reply
                      </Button>
                    </div>
                  )}
                  {comment.replies?.map((reply) => (
                    <div key={reply.id} style={{ marginLeft: 20 }}>
                      <Text strong>{reply.user}</Text>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                </StyledListItem>
              )}
            />
          </CommentSection>
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default NewsDetails;

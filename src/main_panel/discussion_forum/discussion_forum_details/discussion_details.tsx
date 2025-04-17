import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Button,
  Input,
  message,
  Divider,
  Popconfirm,
} from 'antd';
import {
  ArrowLeftOutlined,
  MessageOutlined,
  LikeOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  StyledLayout,
  StyledHeader,
  StyledContent,
  BackButton,
  DiscussionCard,
  DiscussionMeta,
  AuthorName,
  CategoryLabel,
  DiscussionText,
  CommentCount,
  AddCommentSection,
  AddCommentButton,
  CommentCard,
  CommentHeader,
  CommentAuthor,
  CommentDate,
  CommentText,
  CommentActions,
} from './discussion-details.styled';

const { Title } = Typography;
const { TextArea } = Input;

interface Comment {
  id: string;
  user: string;
  content: string;
  created_at: string;
  likes_count: number;
  replies: string;
  liked_by_user: boolean;
}

interface PostDetails {
  id: string;
  title: string;
  content: string;
  user: string;
  created_at: string;
  category: string;
  comments: Comment[];
}

const DiscussionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [post, setPost] = useState<PostDetails | null>(null);
  const [newComment, setNewComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const token = localStorage.getItem('accessToken');

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(
        `https://project-back-81mh.onrender.com/forum/posts/${id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost(response.data);
    } catch (error) {
      message.error('Failed to load discussion details');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      setAddingComment(true);
      const response = await axios.post(
        `https://project-back-81mh.onrender.com/forum/posts/${id}/comment/`,
        { content: newComment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPost((prev) =>
        prev ? { ...prev, comments: [response.data, ...prev.comments] } : prev
      );
      setNewComment('');
      message.success('Comment added');
    } catch (error) {
      console.error(error);
      message.error('Failed to add comment');
    } finally {
      setAddingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/forum/comments/${commentId}/delete/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.filter((c) => c.id !== commentId),
            }
          : prev
      );
      message.success('Comment deleted');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete comment');
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await axios.post(
        `https://project-back-81mh.onrender.com/forum/comments/${commentId}/like/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPost((prev) =>
        prev
          ? {
              ...prev,
              comments: prev.comments.map((c) =>
                c.id === commentId
                  ? { ...c, likes_count: response.data.likes_count }
                  : c
              ),
            }
          : prev
      );
    } catch (error) {
      console.error(error);
      message.error('Failed to like comment');
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/forum/posts/${id}/delete/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success('Post deleted successfully');
      navigate('/discussion-forum');
    } catch (error) {
      console.error(error);
      message.error('Failed to delete post');
    }
  };

  return (
    <StyledLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        selectedPage="/discussion-forum"
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <StyledHeader>
          <Main_header />
        </StyledHeader>
        <StyledContent>
          <BackButton
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </BackButton>

          {post && (
            <>
              <Title level={2} style={{ color: '#333' }}>
                {post.title}
              </Title>
              <DiscussionCard>
                <DiscussionMeta>
                  <AuthorName>{post.user}</AuthorName>
                  <CategoryLabel>{post.category}</CategoryLabel>
                </DiscussionMeta>
                <Divider />
                <DiscussionText>{post.content}</DiscussionText>

                <CommentCount>
                  <MessageOutlined
                    style={{ marginRight: 6, color: '#426B1F' }}
                  />
                  {post.comments.length} comments
                </CommentCount>

                <Popconfirm
                  title="Are you sure you want to delete this post?"
                  onConfirm={handleDeletePost}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    style={{ marginTop: '20px' }}
                  >
                    Delete Post
                  </Button>
                </Popconfirm>
              </DiscussionCard>

              <AddCommentSection>
                <TextArea
                  rows={3}
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <AddCommentButton
                  type="primary"
                  onClick={handleAddComment}
                  loading={addingComment}
                >
                  Add Comment
                </AddCommentButton>
              </AddCommentSection>

              {post.comments.map((comment) => (
                <CommentCard key={comment.id}>
                  <CommentHeader>
                    <CommentAuthor>{comment.user}</CommentAuthor>
                    <CommentDate>
                      {dayjs(comment.created_at).format('MMM D, YYYY HH:mm')}
                    </CommentDate>
                  </CommentHeader>
                  <CommentText>{comment.content}</CommentText>
                  <CommentActions>
                    <Button
                      size="small"
                      icon={<LikeOutlined />}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      {comment.likes_count}
                    </Button>
                    <Popconfirm
                      title="Delete this comment?"
                      onConfirm={() => handleDeleteComment(comment.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        style={{ marginLeft: '10px' }}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </CommentActions>
                </CommentCard>
              ))}
            </>
          )}
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default DiscussionDetails;

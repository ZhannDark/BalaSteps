import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Button,
  Input,
  notification,
  Popconfirm,
  Empty,
} from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import Foot from '../../../main_page/main_content/footer/footer/footer';
import axiosInstance from '../../axios-instance';
import {
  StyledLayout,
  StyledHeader,
  StyledContent,
  BackButton,
  ShowRepliesButton,
  ReplyCard,
  CommentCard,
  CommentHeader,
  CommentText,
  CommentDate,
  CommentActions,
  RepliesContainer,
  CommentAuthor,
  CommentSection,
  DetailsCard,
  DetailsImage,
  CommentInputWrapper,
  InlineButton,
} from './news-details.styled';
import { useAuth } from '../../../hooks/useAuth';

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
  user: string;
  content: string;
  created_at: string;
  replies: Reply[];
}

interface NewsDetailsType {
  id: string;
  title: string;
  content: string;
  photo?: string;
  created_at: string;
  source?: string;
}

const NewsDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  const [post, setPost] = useState<NewsDetailsType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});
  const [collapsed, setCollapsed] = useState(false);
  const isAuthenticated = useAuth();

  useEffect(() => {
    fetchPost();
    if (isAuthenticated) {
      fetchComments();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/info-hub/news/${id}/`);
      setPost(res.data);
    } catch {
      notification.error({
        message: 'News Loading Failed',
        description: 'Unable to fetch news details. Please try again later.',
      });
    }
  };

  console.log('token in NewsDetails', token);
  console.log('isAuthenticated', isAuthenticated);

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/info-hub/news/${id}/comments/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(res.data);
    } catch (error) {
      console.error('Fetch comments error:', error);
      notification.error({
        message: 'Failed to Load Comments',
        description:
          'An error occurred while loading comments for this news post.',
      });
    }
  };

  const fetchReplies = async (commentId: string) => {
    try {
      const res = await axiosInstance.get(
        `/info-hub/news/comments/${commentId}/replies/`
      );
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, replies: res.data } : c))
      );
    } catch {
      notification.error({
        message: 'Failed to Load Replies',
        description: 'Could not retrieve replies for this comment.',
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return notification.warning({
        message: 'Empty Comment',
        description: 'Please enter your comment before submitting.',
      });
    }
    try {
      await axiosInstance.post(
        `/info-hub/news/${id}/comments/create/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchComments();
      notification.success({
        message: 'Comment Posted',
        description: 'Your comment was successfully added.',
      });
    } catch {
      notification.error({
        message: 'Failed to Post Comment',
        description: 'Could not post your comment. Please try again.',
      });
    }
  };

  const handleAddReply = async (commentId: string) => {
    const content = replyTexts[commentId];
    if (!content?.trim()) return;
    try {
      await axiosInstance.post(
        `/info-hub/news/comments/${commentId}/replies/create/`,
        { content, parent: commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      fetchReplies(commentId);
      notification.success({
        message: 'Reply Added',
        description: 'Your reply was successfully posted under this comment.',
      });
    } catch {
      notification.error({
        message: 'Failed to Add Reply',
        description: 'Could not post your reply. Please try again later.',
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axiosInstance.delete(
        `/info-hub/news/comments/${commentId}/delete/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();
      notification.success({
        message: 'Comment Deleted',
        description: 'The comment was successfully deleted.',
      });
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      if (detail === 'You can delete only your own comments.') {
        notification.warning({
          message: 'Access Denied',
          description: 'You can only delete your own comments.',
        });
      } else {
        notification.error({
          message: 'Failed to Delete Comment',
          description: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
  };

  const handleDeleteReply = async (replyId: string, commentId: string) => {
    try {
      await axiosInstance.delete(
        `/info-hub/news/comments/replies/${replyId}/delete/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchReplies(commentId);
      notification.success({
        message: 'Reply Deleted',
        description: 'The reply was successfully deleted.',
      });
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      if (detail === 'You can delete only your own replies.') {
        notification.warning({
          message: 'Access Denied',
          description: 'You can only delete your own replies.',
        });
      } else {
        notification.error({
          message: 'Failed to Delete Reply',
          description: 'An unexpected error occurred. Please try again later.',
        });
      }
    }
  };

  const handleToggleReplies = async (commentId: string) => {
    if (!expandedReplies[commentId]) await fetchReplies(commentId);
    setExpandedReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
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
          <BackButton icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Back
          </BackButton>

          {post && (
            <DetailsCard>
              {post.photo && <DetailsImage src={post.photo} alt={post.title} />}
              <Title>{post.title}</Title>
              <Text type="secondary">
                {dayjs(post.created_at).format('MMM D, YYYY HH:mm')}
              </Text>
              <p style={{ whiteSpace: 'pre-line' }}>{post.content}</p>
              {post.source && <Text italic>Source: {post.source}</Text>}
            </DetailsCard>
          )}

          <CommentSection>
            <Title level={3}>Comments</Title>
            {isAuthenticated ? (
              <CommentInputWrapper>
                <TextArea
                  rows={3}
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{ paddingRight: 100 }}
                />
                <InlineButton
                  type="primary"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  {' > '}
                </InlineButton>
              </CommentInputWrapper>
            ) : (
              <Text type="secondary">
                Please <a onClick={() => navigate('/login')}>log in</a> to leave
                a comment.
              </Text>
            )}
            {comments.length === 0 ? (
              <Empty description="No comments yet" style={{ marginTop: 20 }} />
            ) : (
              comments.map((comment) => (
                <CommentCard key={comment.id}>
                  <CommentHeader>
                    <CommentAuthor>{comment.user}</CommentAuthor>
                    <CommentDate>
                      {dayjs(comment.created_at).format('MMM D, YYYY HH:mm')}
                    </CommentDate>
                  </CommentHeader>
                  <CommentText>{comment.content}</CommentText>
                  <CommentActions>
                    <Popconfirm
                      title="Delete this comment?"
                      onConfirm={() => handleDeleteComment(comment.id)}
                    >
                      <Button size="small" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    {Array.isArray(comment.replies) &&
                      comment.replies.length > 0 && (
                        <ShowRepliesButton
                          type="link"
                          onClick={() => handleToggleReplies(comment.id)}
                        >
                          {expandedReplies[comment.id]
                            ? 'Hide Replies'
                            : `Show Replies (${comment.replies.length})`}
                        </ShowRepliesButton>
                      )}
                  </CommentActions>

                  {isAuthenticated ? (
                    <>
                      <TextArea
                        rows={2}
                        placeholder="Write a reply..."
                        value={replyTexts[comment.id] || ''}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }))
                        }
                        style={{ marginTop: 10 }}
                      />
                      <ShowRepliesButton
                        type="primary"
                        style={{ marginTop: 6 }}
                        disabled={!replyTexts[comment.id]?.trim()}
                        onClick={() => handleAddReply(comment.id)}
                      >
                        Reply
                      </ShowRepliesButton>
                    </>
                  ) : (
                    <Text type="secondary" style={{ marginTop: 10 }}>
                      Please <a onClick={() => navigate('/login')}>log in</a> to
                      reply.
                    </Text>
                  )}

                  {expandedReplies[comment.id] && (
                    <RepliesContainer>
                      {comment.replies.map((reply) => (
                        <ReplyCard key={reply.id}>
                          <CommentHeader>
                            <CommentAuthor>{reply.user}</CommentAuthor>
                            <CommentDate>
                              {dayjs(reply.created_at).format(
                                'MMM D, YYYY HH:mm'
                              )}
                            </CommentDate>
                            <CommentActions>
                              <Popconfirm
                                title="Delete this reply?"
                                onConfirm={() =>
                                  handleDeleteReply(reply.id, comment.id)
                                }
                              >
                                <Button
                                  size="small"
                                  danger
                                  icon={<DeleteOutlined />}
                                />
                              </Popconfirm>
                            </CommentActions>
                          </CommentHeader>
                          <CommentText>{reply.content}</CommentText>
                        </ReplyCard>
                      ))}
                    </RepliesContainer>
                  )}
                </CommentCard>
              ))
            )}
          </CommentSection>
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default NewsDetails;

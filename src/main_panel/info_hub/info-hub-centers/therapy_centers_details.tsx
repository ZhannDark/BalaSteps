import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Tag,
  Popconfirm,
  Divider,
  Layout,
  notification,
  Button,
} from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import Foot from '../../../main_page/main_content/footer/footer/footer';
import {
  StyledLayout,
  StyledHeader,
  StyledContent,
  BackButton,
  InfoCard,
  CenterImage,
  CommentForm,
  StyledTextarea,
  SubmitButton,
  CommentListContainer,
  StyledRate,
} from './therapy-centers.styled';
import {
  CommentActions,
  CommentAuthor,
  CommentCard,
  CommentDate,
  CommentHeader,
  CommentText,
  RepliesContainer,
  ReplyCard,
} from '../../discussion_forum/discussion_forum_details/discussion-details.styled';
import axiosInstance from '../../axios-instance';
import { useAuth } from '../../../hooks/useAuth';

const { Title, Text } = Typography;

interface Reply {
  id: string;
  user: string;
  content: string;
  created_at: string;
}

interface Comment {
  id: string;
  user: string;
  content: string;
  created_at: string;
  replies: Reply[];
}

interface CenterDetailsType {
  id: string;
  name: string;
  description: string;
  address: string;
  photo?: string;
  tags: { id: string; name: string }[];
  created_at: string;
  comments: Comment[];
  average_rating: string;
}

const CenterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [center, setCenter] = useState<CenterDetailsType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchCenter();
    fetchComments();
  }, [id]);

  const fetchCenter = async () => {
    try {
      const res = await axios.get(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/${id}/`
      );
      setCenter(res.data);
    } catch {
      notification.error({
        message: 'Loading Failed',
        description: 'Failed to load center details. Please refresh the page.',
      });
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(
        `/info-hub/therapy-centers/${id}/comments/`
      );
      const commentsWithEmptyReplies = res.data.map((c: Comment) => ({
        ...c,
        replies: [],
      }));
      setComments(commentsWithEmptyReplies);
    } catch {
      notification.error({ message: 'Failed to load comments' });
    }
  };

  const fetchReplies = async (commentId: string) => {
    try {
      const res = await axiosInstance.get(
        `/info-hub/therapy-centers/comments/${commentId}/replies/`
      );
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, replies: res.data } : c))
      );
    } catch {
      notification.error({ message: 'Failed to load replies' });
    }
  };

  const handleToggleReplies = async (commentId: string) => {
    if (!expandedReplies[commentId]) await fetchReplies(commentId);
    setExpandedReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || newRating === 0) {
      return notification.error({
        message: 'Incomplete Form',
        description: 'Comment and rating are required.',
      });
    }
    try {
      await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/${id}/comments/create/`,
        { content: newComment, rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      setNewRating(0);
      fetchComments();
      fetchCenter();
      notification.success({
        message: 'Comment Added',
        description: 'Your comment has been successfully posted.',
      });
    } catch {
      notification.error({
        message: 'Comment Failed',
        description: 'Failed to add your comment. Please try again.',
      });
    }
  };

  const handleAddReply = async (commentId: string) => {
    const content = replyTexts[commentId];
    if (!content?.trim()) return;
    try {
      await axiosInstance.post(
        `/info-hub/therapy-centers/comments/${commentId}/replies/create/`,
        { content, parent: commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      fetchReplies(commentId);
      notification.success({
        message: 'Reply Added',
        description: 'Your reply has been posted.',
      });
    } catch {
      notification.error({
        message: 'Failed to Add Reply',
        description: 'Could not post your reply.',
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/comments/${commentId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
      notification.success({
        message: 'Comment Deleted',
        description: 'The comment was successfully deleted.',
      });
    } catch {
      notification.error({
        message: 'Permission Denied',
        description: 'You can only delete your own comment.',
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
          <BackButton icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Back
          </BackButton>

          {center && (
            <InfoCard>
              {center.photo && (
                <CenterImage src={center.photo} alt={center.name} />
              )}
              <Title level={2}>{center.name}</Title>
              <Text type="secondary">
                {dayjs(center.created_at).format('MMMM D, YYYY')}
              </Text>
              <Divider />
              <Text strong>Address:</Text> <p>{center.address}</p>
              <Text strong>Description:</Text> <p>{center.description}</p>
              <div>
                <Text strong>Tags:</Text>{' '}
                {center.tags.map((tag) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <Text strong>Average Rating:</Text>{' '}
                <StyledRate
                  disabled
                  value={parseFloat(center.average_rating)}
                />
              </div>
              <Divider />
              <iframe
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0, borderRadius: '8px' }}
                src={`https://www.google.com/maps?q=${encodeURIComponent(center.address)}&output=embed`}
                allowFullScreen
              />
            </InfoCard>
          )}

          {isAuthenticated ? (
            <CommentForm>
              <Title level={4}>Leave a Review</Title>
              <StyledTextarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
              />
              <div style={{ marginBottom: 12 }}>
                <Text>Rating:</Text>
                <StyledRate
                  value={newRating}
                  onChange={(value) => setNewRating(value)}
                />
              </div>
              <SubmitButton type="primary" onClick={handleAddComment}>
                Submit
              </SubmitButton>
            </CommentForm>
          ) : (
            <Text type="secondary" style={{ marginTop: 24 }}>
              Please <a onClick={() => navigate('/login')}>log in</a> to leave a
              comment.
            </Text>
          )}

          <CommentListContainer>
            {comments.map((comment) => (
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
                  <Button
                    size="small"
                    onClick={() => handleToggleReplies(comment.id)}
                  >
                    {expandedReplies[comment.id]
                      ? 'Hide Replies'
                      : 'Show Replies'}
                  </Button>
                </CommentActions>

                {isAuthenticated ? (
                  <>
                    <StyledTextarea
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
                    <Button
                      type="primary"
                      size="small"
                      style={{ marginTop: 6 }}
                      disabled={!replyTexts[comment.id]?.trim()}
                      onClick={() => handleAddReply(comment.id)}
                    >
                      Reply
                    </Button>
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
                        </CommentHeader>
                        <CommentText>{reply.content}</CommentText>
                      </ReplyCard>
                    ))}
                  </RepliesContainer>
                )}
              </CommentCard>
            ))}
          </CommentListContainer>
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default CenterDetails;

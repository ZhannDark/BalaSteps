import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Button,
  Rate,
  Popconfirm,
  notification,
} from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import Foot from '../../../main_page/main_content/footer/footer/footer';
import {
  StyledHeader,
  StyledContent,
  StyledLayout,
  BackButton,
  SpecialistCard,
  InfoBlock,
  StyledImage,
  TagList,
} from './specialist-details.styled';
import axiosInstance from '../../axios-instance';
import { useAuth } from '../../../hooks/useAuth';
import {
  CommentForm,
  CommentListContainer,
  StyledRate,
  StyledTextarea,
  SubmitButton,
} from '../info-hub-centers/therapy-centers.styled';
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
import { ShowRepliesButton } from '../info-hub-news/news-details.styled';

const { Title, Text } = Typography;

interface Tag {
  id: string;
  name: string;
}

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

interface Specialist {
  id: string;
  name: string;
  contact: string;
  description: string;
  photo: string;
  tags: Tag[];
  created_at: string;
  average_rating: number | null;
  comments: Comment[];
}

const SpecialistDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = useAuth();
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchSpecialist();
    if (isAuthenticated) fetchComments();
  }, [id]);

  const fetchSpecialist = async () => {
    try {
      const res = await axios.get(
        `https://project-back-81mh.onrender.com/info-hub/specialists/${id}/`
      );
      setSpecialist(res.data);
    } catch {
      notification.error({
        message: 'Loading Failed',
        description: 'Failed to load specialist information. Please try again.',
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || newRating === 0) {
      notification.warning({
        message: 'Missing Fields',
        description: 'Please write a comment and provide a rating.',
      });
      return;
    }

    try {
      await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/specialists/${id}/comments/create/`,
        { content: newComment, rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      setNewRating(0);
      fetchComments();
      fetchSpecialist();
      notification.success({
        message: 'Comment Added',
        description: 'Your comment was successfully posted.',
      });
    } catch {
      notification.error({
        message: 'Submission Failed',
        description: 'Could not add comment. Please try again.',
      });
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(
        `/info-hub/specialists/${id}/comments/`
      );
      setComments(res.data);
    } catch {
      notification.error({ message: 'Failed to load comments' });
    }
  };

  const fetchReplies = async (commentId: string) => {
    try {
      const res = await axiosInstance.get(
        `/info-hub/specialists/comments/${commentId}/replies/`
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

  const handleAddReply = async (commentId: string) => {
    const content = replyTexts[commentId];
    if (!content?.trim()) return;
    try {
      await axiosInstance.post(
        `/info-hub/specialists/comments/${commentId}/replies/create/`,
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
        `https://project-back-81mh.onrender.com/info-hub/specialists/comments/${commentId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
      notification.success({
        message: 'Comment Deleted',
        description: 'Your comment was deleted successfully.',
      });
    } catch {
      notification.error({
        message: 'Deletion Failed',
        description: 'You can only delete your own comment.',
      });
    }
  };

  const handleDeleteReply = async (replyId: string, commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/specialists/comments/replies/${replyId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchReplies(commentId);
      notification.success({
        message: 'Reply Deleted',
        description: 'The reply was successfully deleted.',
      });
    } catch {
      notification.error({
        message: 'Deletion Failed',
        description: 'You can only delete your own reply.',
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

          {specialist && (
            <SpecialistCard>
              <InfoBlock>
                <StyledImage src={specialist.photo} />
                <Title>{specialist.name}</Title>
                <Text>{specialist.description}</Text>
                <Text>Contact: {specialist.contact}</Text>
                <Text>
                  Created: {dayjs(specialist.created_at).format('MMM D, YYYY')}
                </Text>
                <Text>
                  Rating:{' '}
                  {specialist.average_rating !== null ? (
                    <Rate disabled value={specialist.average_rating} />
                  ) : (
                    'No ratings yet'
                  )}
                </Text>
                <TagList>
                  {specialist.tags.map((tag) => (
                    <span key={tag.id}>#{tag.name}</span>
                  ))}
                </TagList>
              </InfoBlock>
            </SpecialistCard>
          )}

          {isAuthenticated ? (
            <CommentForm>
              <Title level={4}>Comments</Title>
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
                    <ShowRepliesButton
                      type="primary"
                      size="small"
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
            ))}
          </CommentListContainer>
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default SpecialistDetails;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Input,
  Button,
  List,
  Rate,
  Popconfirm,
  Divider,
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
  CommentCard,
  CommentHeader,
  CommentText,
  CommentDate,
  CommentActions,
  ReplyCard,
  ReplyInput,
} from './specialist-details.styled';
import axiosInstance from '../../axios-instance';

const { Title, Text } = Typography;
const { TextArea } = Input;

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
  user: { id: string; username: string };
  content: string;
  created_at: string;
  rating?: number;
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
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchSpecialist();
    fetchComments();
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
        `/info-hub/specialists/comments/${commentId}/replies/`
      );
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, replies: res.data } : c))
      );
    } catch {
      notification.error({ message: 'Failed to load replies' });
    }
  };

  const handleReplySubmit = async (commentId: string) => {
    const content = replyTexts[commentId]?.trim();
    if (!content) return;

    try {
      await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/specialists/comments/${commentId}/replies/create/`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSpecialist();
      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      notification.success({
        message: 'Reply Added',
        description: 'Your reply was successfully submitted.',
      });
    } catch {
      notification.error({
        message: 'Reply Failed',
        description: 'Could not send reply. Please try again.',
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/specialists/comments/${commentId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSpecialist();
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

  const handleDeleteReply = async (replyId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/specialists/comments/replies/${replyId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSpecialist();
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

          <Divider />
          <Title level={4}>Add Comment</Title>
          <TextArea
            value={newComment}
            rows={3}
            placeholder="Write your comment..."
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div style={{ marginTop: 8 }}>
            <Text>Rating:</Text>
            <Rate value={newRating} onChange={setNewRating} />
          </div>
          <Button
            type="primary"
            onClick={handleAddComment}
            style={{ marginTop: 12 }}
          >
            Submit
          </Button>

          <Divider />
          <Title level={4}>Comments</Title>
          <List
            dataSource={comments}
            renderItem={(comment) => (
              <CommentCard key={comment.id}>
                <CommentHeader>
                  <b>{comment.user.username}</b>
                  <CommentDate>
                    {dayjs(comment.created_at).format('MMM D, YYYY HH:mm')}
                  </CommentDate>
                </CommentHeader>
                <CommentText>{comment.content}</CommentText>
                {comment.rating && <Rate disabled value={comment.rating} />}
                <CommentActions>
                  <Popconfirm
                    title="Delete comment?"
                    onConfirm={() => handleDeleteComment(comment.id)}
                  >
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      size="small"
                      style={{ marginTop: 8 }}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </CommentActions>

                {comment.replies?.map((reply) => (
                  <ReplyCard key={reply.id}>
                    <CommentHeader>
                      <b>{reply.user}</b>
                      <CommentDate>
                        {dayjs(reply.created_at).format('MMM D, YYYY HH:mm')}
                      </CommentDate>
                    </CommentHeader>
                    <CommentText>{reply.content}</CommentText>
                    <Popconfirm
                      title="Delete reply?"
                      onConfirm={() => handleDeleteReply(reply.id)}
                    >
                      <Button
                        icon={<DeleteOutlined />}
                        size="small"
                        danger
                        style={{ marginTop: 4 }}
                      />
                    </Popconfirm>
                  </ReplyCard>
                ))}

                <ReplyInput
                  rows={2}
                  placeholder="Reply to comment..."
                  value={replyTexts[comment.id] || ''}
                  onChange={(e) =>
                    setReplyTexts((prev) => ({
                      ...prev,
                      [comment.id]: e.target.value,
                    }))
                  }
                />
                <Button
                  type="link"
                  onClick={() => handleReplySubmit(comment.id)}
                  disabled={!replyTexts[comment.id]?.trim()}
                >
                  Send Reply
                </Button>
              </CommentCard>
            )}
          />
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default SpecialistDetails;

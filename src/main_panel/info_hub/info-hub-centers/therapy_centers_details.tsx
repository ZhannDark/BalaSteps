import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  List,
  Tag,
  Rate,
  Popconfirm,
  Divider,
  Layout,
  notification,
} from 'antd';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  CommentOutlined,
} from '@ant-design/icons';
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
  CommentMeta,
  ReplyBox,
  ReplyMeta,
  StyledRate,
} from './therapy-centers.styled';

const { Title, Text } = Typography;

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
  updated_at: string;
  rating?: number;
  replies?: Reply[];
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

  const [collapsed, setCollapsed] = useState(false);
  const [center, setCenter] = useState<CenterDetailsType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetchCenter();
  }, [id]);

  const fetchCenter = async () => {
    try {
      const res = await axios.get(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/${id}/`
      );
      setCenter(res.data);
      setComments(res.data.comments);
    } catch {
      notification.error({
        message: 'Loading Failed',
        description: 'Failed to load center details. Please refresh the page.',
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || newRating === 0) {
      return notification.error({
        message: 'Incomplete Form',
        description: 'Comment and rating are required.',
      });
    }
    try {
      const res = await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/${id}/comments/`,
        { content: newComment, rating: newRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      setNewRating(0);
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

  const handleReply = async (commentId: string) => {
    const content = replyContent[commentId];
    if (!content.trim()) return;

    try {
      await axios.post(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/comments/${commentId}/replies/create/`,
        { content, parent: commentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCenter();
      setReplyContent((prev) => ({ ...prev, [commentId]: '' }));
      notification.success({
        message: 'Reply Sent',
        description: 'Your reply was sent successfully.',
      });
    } catch {
      notification.error({
        message: 'Reply Failed',
        description: 'Could not send your reply. Please try again.',
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/comments/${commentId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCenter();
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

  const handleDeleteReply = async (replyId: string) => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/info-hub/therapy-centers/comments/replies/${replyId}/delete/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCenter();
      notification.success({
        message: 'Reply Deleted',
        description: 'The reply was successfully deleted.',
      });
    } catch {
      notification.error({
        message: 'Delete Reply Failed',
        description: 'Failed to delete the reply. Please try again.',
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
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
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
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  center.address
                )}&output=embed`}
                allowFullScreen
              />
            </InfoCard>
          )}

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

          <CommentListContainer>
            <Title level={4}>
              <CommentOutlined /> Comments
            </Title>
            <List
              dataSource={comments}
              itemLayout="vertical"
              renderItem={(comment) => (
                <List.Item key={comment.id}>
                  <strong>{comment.user.username}</strong>
                  <CommentMeta>
                    Created:{' '}
                    {dayjs(comment.created_at).format('YYYY-MM-DD HH:mm')} |{' '}
                    Updated:{' '}
                    {dayjs(comment.updated_at).format('YYYY-MM-DD HH:mm')}
                  </CommentMeta>
                  <p>{comment.content}</p>
                  {comment.rating && <Rate disabled value={comment.rating} />}
                  <div style={{ marginTop: 8 }}>
                    <Popconfirm
                      title="Are you sure to delete this comment?"
                      onConfirm={() => handleDeleteComment(comment.id)}
                    >
                      <DeleteOutlined
                        style={{ color: 'red', cursor: 'pointer' }}
                      />
                    </Popconfirm>
                  </div>

                  <ReplyBox>
                    <StyledTextarea
                      rows={2}
                      value={replyContent[comment.id] || ''}
                      onChange={(e) =>
                        setReplyContent((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                      placeholder="Write a reply..."
                    />
                    <SubmitButton
                      size="small"
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyContent[comment.id]?.trim()}
                    >
                      Reply
                    </SubmitButton>

                    {comment.replies?.map((reply) => (
                      <div key={reply.id} style={{ marginTop: 10 }}>
                        <strong>{reply.user}</strong>
                        <ReplyMeta>
                          {dayjs(reply.created_at).format('MMM D, YYYY HH:mm')}
                        </ReplyMeta>
                        <p>{reply.content}</p>
                        <Popconfirm
                          title="Delete this reply?"
                          onConfirm={() => handleDeleteReply(reply.id)}
                        >
                          <DeleteOutlined
                            style={{ color: '#aa2222', cursor: 'pointer' }}
                          />
                        </Popconfirm>
                      </div>
                    ))}
                  </ReplyBox>
                </List.Item>
              )}
            />
          </CommentListContainer>
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default CenterDetails;

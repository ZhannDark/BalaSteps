import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Button,
  Input,
  notification,
  Popconfirm,
} from 'antd';
import {
  ArrowLeftOutlined,
  MessageOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
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
} from './news-details.styled';
import {
  CommentCard,
  CommentHeader,
  CommentAuthor,
  CommentDate,
  CommentText,
  CommentActions,
  RepliesContainer,
  ReplyCard,
} from '../../discussion_forum/discussion_forum_details/discussion-details.styled';
import axiosInstance from '../../axios-instance';

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

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/info-hub/news/${id}/`);
      setPost(res.data);
    } catch {
      notification.error({ message: 'Failed to load news details' });
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axiosInstance.get(`/info-hub/news/${id}/comments/`);
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
        `/info-hub/news/comments/${commentId}/replies/`
      );
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, replies: res.data } : c))
      );
    } catch {
      notification.error({ message: 'Failed to load replies' });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      return notification.warning({ message: 'Comment cannot be empty' });
    }

    try {
      await axiosInstance.post(
        `/info-hub/news/${id}/comments/create/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment('');
      fetchComments();
      notification.success({ message: 'Comment added' });
    } catch {
      notification.error({ message: 'Failed to add comment' });
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
      notification.success({ message: 'Comment deleted' });
    } catch {
      notification.error({ message: 'Failed to delete comment' });
    }
  };

  const handleToggleReplies = async (commentId: string) => {
    if (!expandedReplies[commentId]) {
      await fetchReplies(commentId);
    }
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
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
            <CommentArea
              rows={3}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="primary" onClick={handleAddComment}>
              Add Comment
            </Button>

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
                    icon={<MessageOutlined />}
                    onClick={() => handleToggleReplies(comment.id)}
                  >
                    {expandedReplies[comment.id]
                      ? 'Hide Replies'
                      : 'Show Replies'}
                  </Button>
                </CommentActions>

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
          </CommentSection>
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default NewsDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Button,
  Input,
  notification,
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
import axiosInstance from '../../axios-instance';
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
  RepliesContainer,
  ShowRepliesButton,
  ReplyCard,
} from './discussion-details.styled';
import Foot from '../../../main_page/main_content/footer/footer/footer';

const { Title } = Typography;
const { TextArea } = Input;

interface Reply {
  id: string;
  user: string;
  content: string;
  created_at: string;
  likes_count: number;
  parent: string;
}

interface Comment {
  id: string;
  user: string;
  content: string;
  created_at: string;
  likes_count: number;
  liked_by_user: boolean;
  replies: Reply[];
  parent_id?: string | null;
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
  const [replyTexts, setReplyTexts] = useState<{ [key: string]: string }>({});
  const [addingComment, setAddingComment] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const fetchPostDetails = async () => {
    try {
      const response = await axiosInstance.get(`/forum/posts/${id}/`);
      const postData = response.data;

      const commentsWithReplies = postData.comments.map((comment: Comment) => ({
        ...comment,
        replies: comment.replies || [],
      }));

      setPost({ ...postData, comments: commentsWithReplies });
    } catch {
      notification.error({
        message: 'Loading Failed',
        description:
          'Unable to load the discussion details. Please try again later.',
      });
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      setAddingComment(true);
      await axiosInstance.post(`/forum/posts/${id}/comment/`, {
        content: newComment,
      });
      await fetchPostDetails();
      setNewComment('');
      notification.success({
        message: 'Comment Added',
        description: 'Your comment has been successfully posted.',
      });
    } catch {
      notification.error({
        message: 'Adding Comment Failed',
        description:
          'There was a problem posting your comment. Please try again.',
      });
    } finally {
      setAddingComment(false);
    }
  };

  const handleAddReply = async (parentId: string) => {
    if (replyTexts[parentId]?.trim() === '') return;
    try {
      await axiosInstance.post(`/forum/comments/${parentId}/replies/`, {
        content: replyTexts[parentId],
        parent: parentId,
      });
      await fetchPostDetails();
      setReplyTexts((prev) => ({ ...prev, [parentId]: '' }));
      notification.success({
        message: 'Reply Added',
        description: 'Your reply has been successfully posted.',
      });
    } catch {
      notification.error({
        message: 'Reply Failed',
        description:
          'There was a problem posting your reply. Please try again.',
      });
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await axiosInstance.post(
        `/forum/comments/${commentId}/like/`
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
    } catch {
      notification.error({
        message: 'Liking Comment Failed',
        description:
          'Could not like the comment. Please refresh the page and try again.',
      });
    }
  };

  const handleLikeReply = async (replyId: string) => {
    try {
      await axiosInstance.post(`/forum/comments/replies/${replyId}/like/`);
      fetchPostDetails();
    } catch {
      notification.error({
        message: 'Liking Reply Failed',
        description: 'Could not like the reply. Please refresh and try again.',
      });
    }
  };

  const handleDeleteReplies = async (replyId: string) => {
    try {
      await axiosInstance.delete(`/forum/replies/${replyId}/delete/`);
      fetchPostDetails();
      notification.success({
        message: 'Reply Deleted',
        description: 'The reply was successfully deleted.',
      });
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      if (detail === 'You can delete only your own comments.') {
        notification.warning({
          message: 'Access Denied',
          description: 'You can only delete your own replies.',
        });
      } else {
        notification.error({
          message: 'Deleting Failed',
          description: 'Could not delete the reply. Please try again.',
        });
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await axiosInstance.delete(`/forum/comments/${commentId}/delete/`);
      fetchPostDetails();
      notification.success({
        message: 'Comment Deleted',
        description: 'The comment was successfully deleted.',
      });
    } catch (error: any) {
      const detail = error?.response?.data?.detail;
      if (detail === 'You can delete only your own comments.') {
        notification.warning({
          message: 'Access Denied',
          description: 'You can only delete your own comments.',
        });
      } else {
        notification.error({
          message: 'Deleting Failed',
          description: 'Could not delete the comment. Please try again.',
        });
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      await axiosInstance.delete(`/forum/posts/${id}/delete/`);
      notification.success({
        message: 'Post Deleted',
        description: 'The post was successfully deleted.',
      });
      navigate('/discussion-forum');
    } catch {
      notification.error({
        message: 'Deleting Post Failed',
        description: 'Could not delete the post. Please try again.',
      });
    }
  };

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <StyledLayout>
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
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
                  disabled={newComment.trim() === ''}
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

                  <div style={{ marginTop: 12 }}>
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
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: 8 }}
                      disabled={!replyTexts[comment.id]?.trim()}
                      onClick={() => handleAddReply(comment.id)}
                    >
                      Reply
                    </Button>
                  </div>

                  {comment.replies && comment.replies.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <ShowRepliesButton
                        type="link"
                        onClick={() => toggleReplies(comment.id)}
                      >
                        {expandedReplies[comment.id]
                          ? 'Hide Replies'
                          : `Show Replies (${comment.replies.length})`}
                      </ShowRepliesButton>
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
                                  <Button
                                    size="small"
                                    icon={<LikeOutlined />}
                                    onClick={() => handleLikeReply(reply.id)}
                                  >
                                    {reply.likes_count}
                                  </Button>
                                  <Popconfirm
                                    title="Delete this reply?"
                                    onConfirm={() =>
                                      handleDeleteReplies(reply.id)
                                    }
                                    okText="Yes"
                                    cancelText="No"
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
                    </div>
                  )}
                </CommentCard>
              ))}
            </>
          )}
        </StyledContent>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default DiscussionDetails;

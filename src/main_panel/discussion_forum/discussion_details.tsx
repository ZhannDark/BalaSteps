import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Button, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './discussion_details.scss';

const { Title } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

interface Comment {
  id: number;
  author: string;
  content: string;
}

const DiscussionDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { thread } = location.state as { thread: any };
  const [collapsed, setCollapsed] = useState(false);

  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Tugensheeva_tugenshe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vel felis id ligula ultrices pharetra.' },
    { id: 2, author: 'Tugensheeva_tugenshe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vel felis id ligula ultrices pharetra.' },
  ]);

  const [newComment, setNewComment] = useState('');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      id: comments.length + 1,
      author: 'Current User',
      content: newComment,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  return (
    <Layout className="discussion-layout">
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed} selectedPage={'/discussion-forum'}/>
      <Layout style={{ marginLeft: 250 }}>
        <Header className="discussion-header">
          <Main_header />
        </Header>
        <Content className="discussion-content">
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ marginBottom: '20px', fontSize: '16px', color: '#591C00' }}
          >
            Back
          </Button>

          <Card className="discussion-card" style={{ border: '1px solid #426B1F' }}>
            <Title level={4} style={{ marginBottom: '10px' }}>{thread.author}</Title>
            <div style={{ fontWeight: 'bold', color: '#000' }}>{thread.topic}</div>
            <Card className="thread-description" style={{ marginTop: '10px', background: '#F8F8F8' }}>
              <p>{thread.content}</p>
            </Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              <span style={{ fontSize: '14px', color: '#666' }}>🗨️ {comments.length}</span>
            </div>
          </Card>

          {/* Comment Input */}
          <div style={{ marginTop: '20px' }}>
            <TextArea
              rows={3}
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="primary"
              style={{ marginTop: '10px', backgroundColor: '#426B1F' }}
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </div>

          {/* Render Comments */}
          {comments.map((comment) => (
            <Card key={comment.id} className="comment-card" style={{ marginTop: '10px', borderRadius: '8px' }}>
              <Title level={5} style={{ marginBottom: '5px', fontWeight: 'bold' }}>{comment.author}</Title>
              <p>{comment.content}</p>
            </Card>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DiscussionDetails;

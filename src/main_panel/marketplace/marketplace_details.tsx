import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Typography,
  Descriptions,
  Skeleton,
  Carousel,
  Button,
  Popconfirm,
  message,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import axios from 'axios';
import {
  DetailsContainer,
  BackButton,
  DetailsCard,
  ItemImage,
  CarouselWrapper,
  ButtonGroup,
  InfoSection,
} from './marketplace-details.styled';
import imgPlaceholder from '../../assets/images/main_content/ default_img/no_img.png';

const { Header } = Layout;
const { Title } = Typography;

interface ItemDetails {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  contact_method: string;
  category: { id: string; name: string };
  condition: { id: string; name: string };
  photos: { id: string; image_url: string }[];
  owner: string;
}

const MarketplaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  const accessToken = localStorage.getItem('accessToken');
  const isMyItem = location.pathname.includes('my-items');

  const fetchItem = async () => {
    try {
      const endpoint = isMyItem
        ? `https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`
        : `https://project-back-81mh.onrender.com/marketplace/public-items/${id}/`;

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setItem(response.data);
    } catch (error) {
      console.error('Failed to load item details', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      message.success('Item deleted successfully!');
      navigate('/marketplace');
    } catch (error) {
      console.error('Failed to delete item', error);
      message.error('Failed to delete item');
    }
  };

  const handleEdit = () => {
    navigate(`/marketplace/my-items/${id}/edit`);
  };

  return (
    <Layout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
        selectedPage="/marketplace"
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header
          style={{
            padding: 0,
            background: '#E2E3E0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Main_header />
        </Header>

        <DetailsContainer>
          <BackButton
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
          >
            Back
          </BackButton>

          {loading ? (
            <Skeleton active paragraph={{ rows: 8 }} />
          ) : item ? (
            <DetailsCard>
              <CarouselWrapper>
                <Carousel autoplay>
                  {item.photos.length > 0 ? (
                    item.photos.map((photo) => (
                      <div key={photo.id}>
                        <ItemImage src={photo.image_url} alt="Item Photo" />
                      </div>
                    ))
                  ) : (
                    <div>
                      <ItemImage
                        src={imgPlaceholder}
                        alt="No image available"
                      />
                    </div>
                  )}
                </Carousel>
              </CarouselWrapper>

              <InfoSection>
                <Title level={2}>{item.name}</Title>

                {isMyItem && (
                  <ButtonGroup>
                    <Button icon={<EditOutlined />} onClick={handleEdit}>
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this item?"
                      onConfirm={handleDelete}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<DeleteOutlined />} danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </ButtonGroup>
                )}

                <Descriptions column={1} bordered size="middle">
                  <Descriptions.Item label="Description">
                    {item.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {item.price} ₸
                  </Descriptions.Item>
                  <Descriptions.Item label="Location">
                    {item.location}
                  </Descriptions.Item>
                  <Descriptions.Item label="Condition">
                    {item.condition.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact Method">
                    {item.contact_method}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    {item.category.name}
                  </Descriptions.Item>
                </Descriptions>
              </InfoSection>
            </DetailsCard>
          ) : (
            <Skeleton active />
          )}
        </DetailsContainer>
      </Layout>
    </Layout>
  );
};

export default MarketplaceDetails;

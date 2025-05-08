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
  Modal,
  Form,
  Input,
  Select,
  notification,
} from 'antd';
import {
  ArrowLeftOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import axiosInstance from '../../main_panel/axios-instance';
import {
  DetailsContainer,
  BackButton,
  DetailsCard,
  ItemImage,
  CarouselWrapper,
  ButtonGroup,
  InfoSection,
} from './marketplace-details.styled';
import Foot from '../../main_page/main_content/footer/footer/footer';
import imgPlaceholder from '../../assets/images/main_content/ default_img/no_img.png';

const { Header } = Layout;
const { Title } = Typography;
const { Option } = Select;

interface ItemDetails {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  contact_method: string;
  category: { id: string; name: string };
  condition: { id: string; name: string };
  availability: { id: string; name: string }[];
  photos: { id: string; image_url: string }[];
  owner: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: string;
  name: string;
}

interface Condition {
  id: string;
  name: string;
}

interface Availability {
  id: string;
  name: string;
}

interface EditItemFormValues {
  name: string;
  description: string;
  price: string;
  location: string;
  contact_method: string;
  category_id: string;
  condition_id: string;
  availability_ids: string[];
}

const MarketplaceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState<ItemDetails | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const isMyItem = location.pathname.includes('my-items');

  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  const fetchItem = async () => {
    try {
      const endpoint = isMyItem
        ? `/marketplace/my-items/${id}/`
        : `/marketplace/public-items/${id}/`;
      const response = await axiosInstance.get(endpoint);
      setItem(response.data);
    } catch {
      notification.error({
        message: 'Failed to load item details',
        description: 'There was a problem fetching item data from the server.',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOptions = async () => {
    const [catRes, condRes, availRes] = await Promise.all([
      axiosInstance.get('/marketplace/categories/'),
      axiosInstance.get('/marketplace/conditions/'),
      axiosInstance.get('/marketplace/availability-types/'),
    ]);
    setCategories(catRes.data);
    setConditions(condRes.data);
    setAvailabilities(availRes.data);
  };

  useEffect(() => {
    fetchItem();
    fetchOptions();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/marketplace/my-items/${id}/`);
      notification.success({
        message: 'Item Deleted',
        description: 'The item has been successfully removed.',
      });
      navigate('/marketplace');
    } catch {
      notification.error({
        message: 'Delete Failed',
        description: 'Failed to delete the item. Try again later.',
      });
    }
  };

  const handleEditSubmit = async (values: EditItemFormValues) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('location', values.location);
      formData.append('contact_method', values.contact_method);
      formData.append('category_id', values.category_id);
      formData.append('condition_id', values.condition_id);

      values.availability_ids.forEach((id: string) =>
        formData.append('availability_ids', id)
      );

      await axiosInstance.patch(`/marketplace/my-items/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      notification.success({
        message: 'Item Updated',
        description: 'Changes were saved successfully.',
      });
      setEditModalOpen(false);
      fetchItem();
    } catch {
      notification.error({
        message: 'Update Failed',
        description: 'Could not update the item.',
      });
    }
  };

  const openEditModal = () => {
    if (!item) return;
    form.setFieldsValue({
      name: item.name,
      description: item.description,
      price: item.price,
      location: item.location,
      contact_method: item.contact_method,
      category_id: item.category.id,
      condition_id: item.condition.id,
      availability_ids: item.availability.map((a) => a.id),
    });
    setEditModalOpen(true);
  };

  return (
    <Layout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header style={{ padding: 0, background: '#E2E3E0' }}>
          <Main_header />
        </Header>

        <DetailsContainer>
          <BackButton icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
            Back
          </BackButton>

          {loading ? (
            <Skeleton active />
          ) : item ? (
            <DetailsCard>
              <CarouselWrapper>
                <Carousel autoplay>
                  {item.photos.length > 0 ? (
                    item.photos.map((photo) => (
                      <div key={photo.id}>
                        <ItemImage src={photo.image_url} />
                      </div>
                    ))
                  ) : (
                    <ItemImage src={imgPlaceholder} />
                  )}
                </Carousel>
              </CarouselWrapper>

              <InfoSection>
                <Title level={2}>{item.name}</Title>

                {isMyItem && (
                  <ButtonGroup>
                    <Button
                      icon={<EditOutlined />}
                      onClick={openEditModal}
                      type="default"
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete?"
                      onConfirm={handleDelete}
                    >
                      <Button icon={<DeleteOutlined />} danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </ButtonGroup>
                )}

                <Descriptions column={1} bordered>
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
                  <Descriptions.Item label="Availability">
                    {item.availability.map((a) => a.name).join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Created At">
                    {dayjs(item.created_at).format('MMM D, YYYY HH:mm')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Updated At">
                    {dayjs(item.updated_at).format('MMM D, YYYY HH:mm')}
                  </Descriptions.Item>
                </Descriptions>
              </InfoSection>
            </DetailsCard>
          ) : (
            <Skeleton active />
          )}

          <Modal
            open={editModalOpen}
            title="Edit Item"
            onCancel={() => setEditModalOpen(false)}
            onOk={() => form.submit()}
            destroyOnClose
          >
            <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="contact_method"
                label="Contact Method"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select>
                  {categories.map((cat: Category) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="condition_id"
                label="Condition"
                rules={[{ required: true }]}
              >
                <Select>
                  {conditions.map((c: Condition) => (
                    <Option key={c.id} value={c.id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="availability_ids"
                label="Availability"
                rules={[{ required: true }]}
              >
                <Select mode="multiple">
                  {availabilities.map((a: Availability) => (
                    <Option key={a.id} value={a.id}>
                      {a.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </DetailsContainer>
        <Foot />
      </Layout>
    </Layout>
  );
};

export default MarketplaceDetails;

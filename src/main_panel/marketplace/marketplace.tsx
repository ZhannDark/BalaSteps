import React, { useState } from 'react';
import {
  Layout,
  Input,
  Modal,
  Form,
  Upload,
  Select,
  Tabs,
  message,
  Skeleton,
  Button,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosInstance from '../../main_panel/axios-instance';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import {
  MarketplaceLayout,
  MarketplaceContent,
  TopBar,
  MarketplaceTitle,
  AddItemButton,
  ItemsGrid,
  ItemCard,
  ItemImage,
} from './marketplace.styled';
import img from '../../assets/images/main_content/ default_img/no_img.png';
import Foot from '../../main_page/main_content/footer/footer/footer';

const { Header } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

interface Item {
  id: string;
  name: string;
  price: string;
  photos: { id: string; image_url: string }[];
  category: { id: string; name: string };
  owner: string;
}

interface Category {
  id: string;
  name: string;
}

interface Availability {
  id: string;
  name: string;
}

interface Condition {
  id: string;
  name: string;
}

const Marketplace = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: myItems = [], isLoading: myItemsLoading } = useQuery({
    queryKey: ['my-items'],
    queryFn: async () =>
      (await axiosInstance.get('/marketplace/my-items/')).data,
  });

  const { data: publicItems = [], isLoading: publicItemsLoading } = useQuery({
    queryKey: ['public-items'],
    queryFn: async () =>
      (await axiosInstance.get('/marketplace/public-items/')).data,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await axiosInstance.get('/marketplace/categories/')).data,
  });

  const { data: availabilities = [] } = useQuery({
    queryKey: ['availabilities'],
    queryFn: async () =>
      (await axiosInstance.get('/marketplace/availability-types/')).data,
  });

  const { data: conditions = [] } = useQuery({
    queryKey: ['conditions'],
    queryFn: async () =>
      (await axiosInstance.get('/marketplace/conditions/')).data,
  });

  const addItemMutation = useMutation({
    mutationFn: (formData: FormData) =>
      axiosInstance.post('/marketplace/my-items/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: async (response) => {
      const newItem = response.data;
      if (selectedImages.length > 0) {
        const imageForm = new FormData();
        selectedImages.forEach((file: any) => {
          imageForm.append('images', file.originFileObj);
        });
        try {
          await axiosInstance.post(
            '/marketplace/equipment-photos/',
            imageForm,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              params: { item_id: newItem.id },
            }
          );
        } catch (err) {
          console.error('Image upload error:', err);
        }
      }
      queryClient.invalidateQueries({ queryKey: ['my-items'] });
      queryClient.invalidateQueries({ queryKey: ['public-items'] });
      message.success('Item added!');
      resetForm();
    },
    onError: () => message.error('Failed to add item'),
  });

  const deleteItemMutation = useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/marketplace/my-items/${id}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-items'] });
      message.success('Item deleted!');
    },
    onError: () => message.error('Failed to delete item'),
  });

  const resetForm = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedImages([]);
    setEditingItem(null);
  };

  const handleAddItem = (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('location', values.location);
    formData.append('contact_method', values.contact_method);
    formData.append('category_id', values.category);
    formData.append('condition_id', values.condition);
    if (Array.isArray(values.availability)) {
      values.availability.forEach((id: string) => {
        formData.append('availability_ids', id);
      });
    }
    addItemMutation.mutate(formData);
  };

  const handleCardClick = (item: Item) => {
    if (activeTab === 'my') {
      navigate(`/marketplace/my-items/${item.id}`);
    } else {
      navigate(`/marketplace/public-items/${item.id}`);
    }
  };

  const displayedItems = activeTab === 'my' ? myItems : publicItems;
  const filteredItems = displayedItems.filter((item: Item) =>
    selectedCategory ? item.category.id === selectedCategory : true
  );

  const loading = myItemsLoading || publicItemsLoading;

  return (
    <MarketplaceLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header style={{ background: '#E2E3E0', height: '48px', padding: 0 }}>
          <Main_header />
        </Header>

        <MarketplaceContent>
          <TopBar>
            <MarketplaceTitle>Marketplace</MarketplaceTitle>
            <AddItemButton onClick={() => setIsModalOpen(true)}>
              <PlusOutlined /> Add Item
            </AddItemButton>
          </TopBar>

          <Tabs defaultActiveKey="all" onChange={setActiveTab}>
            <TabPane tab="All" key="all" />
            <TabPane tab="My Items" key="my" />
          </Tabs>

          <Select
            placeholder="Filter by category"
            style={{ width: 250, marginBottom: 20 }}
            onChange={(value) => setSelectedCategory(value as string)}
            allowClear
          >
            {categories.map((cat: Category) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>

          <ItemsGrid>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton.Button
                    key={index}
                    active
                    style={{ width: 280, height: 340 }}
                  />
                ))
              : filteredItems.map((item: Item) => (
                  <ItemCard key={item.id} onClick={() => handleCardClick(item)}>
                    <ItemImage
                      src={
                        item?.photos?.length ? item.photos[0].image_url : img
                      }
                      alt={item.name}
                    />
                    <div style={{ padding: '10px' }}>
                      <h3 style={{ marginBottom: 8 }}>{item.name}</h3>
                      <p style={{ fontWeight: 'bold' }}>{item.price} ₸</p>
                    </div>
                    {activeTab === 'my' && (
                      <div
                        style={{
                          marginTop: 10,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Popconfirm
                          title="Delete this item?"
                          onConfirm={() => deleteItemMutation.mutate(item.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={(e) => e.stopPropagation()}
                          />
                        </Popconfirm>
                      </div>
                    )}
                  </ItemCard>
                ))}
          </ItemsGrid>

          {isModalOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Modal
                title="Add New Item"
                open={isModalOpen}
                onCancel={() => resetForm()}
                footer={null}
                destroyOnClose
              >
                <Form layout="vertical" form={form} onFinish={handleAddItem}>
                  {/* Все поля */}
                  <Form.Item
                    name="name"
                    label="Item Name"
                    rules={[{ required: true }]}
                  >
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
                    <Input type="number" />
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
                    name="availability"
                    label="Availability"
                    rules={[{ required: true }]}
                  >
                    <Select mode="multiple" placeholder="Select availability">
                      {availabilities.map((a: Availability) => (
                        <Option key={a.id} value={a.id}>
                          {a.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="condition"
                    label="Condition"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select condition">
                      {conditions.map((c: Condition) => (
                        <Option key={c.id} value={c.id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select category">
                      {categories.map((cat: Category) => (
                        <Option key={cat.id} value={cat.id}>
                          {cat.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {/* Upload images */}
                  <Form.Item label="Upload Images">
                    <Upload.Dragger
                      multiple
                      listType="picture"
                      beforeUpload={() => false}
                      fileList={selectedImages}
                      onChange={({ fileList }) =>
                        setSelectedImages(fileList.slice(0, 5))
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p>Click or drag files here to upload (Max 5)</p>
                    </Upload.Dragger>
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Add Item
                  </Button>
                </Form>
              </Modal>
            </motion.div>
          )}
        </MarketplaceContent>
        <Foot />
      </Layout>
    </MarketplaceLayout>
  );
};

export default Marketplace;

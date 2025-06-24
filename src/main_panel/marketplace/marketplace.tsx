import React, { useState } from 'react';
import {
  Layout,
  Input,
  Modal,
  Form,
  Upload,
  Select,
  Tabs,
  Skeleton,
  notification,
  UploadFile,
} from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axiosInstance from '../../main_panel/axios-instance';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import DonationCard from './donation/donationCard';
import { Row, Col } from 'antd';
import {
  MarketplaceLayout,
  MarketplaceContent,
  TopBar,
  MarketplaceTitle,
  AddItemButton,
  ItemsGrid,
  ItemCard,
  ItemImage,
  ItemInfo,
  ItemTitle,
  ItemPrice,
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

interface AddItemFormValues {
  name: string;
  description: string;
  price: string;
  location: string;
  contact_method: string;
  category: string;
  condition: string;
  availability: string[];
}

interface DonationPhoto {
  id: number;
  image: string;
}

interface DonationRequest {
  id: number;
  user: string;
  child: string;
  purpose: string;
  goal_amount: string;
  donated_amount: string;
  remaining: string;
  kaspi_code: string;
  kaspi_qr: string;
  deadline: string;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
  photos: DonationPhoto[];
}

export interface Child {
  id: string;
  full_name: string;
  date_of_birth?: string;
  gender?: string;
}

export interface CreateDonationFormValues {
  child: string;
  purpose: string;
  goal_amount: string;
  deadline: string;
}

const Marketplace = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImages, setSelectedImages] = useState<UploadFile[]>([]);
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [donationForm] = Form.useForm();

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
        selectedImages.forEach((file) => {
          if (file.originFileObj) {
            imageForm.append('images', file.originFileObj as File);
          }
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
      notification.success({
        message: 'Success',
        description: 'Item added successfully.',
      });
      resetForm();
    },
    onError: () =>
      notification.error({
        message: 'Error',
        description: 'Failed to add item.',
      }),
  });

  const { data: donations = [], isLoading: donationsLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => (await axiosInstance.get('/donations/donation/')).data,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  console.log('donations: ', donations);

  const resetForm = () => {
    setIsModalOpen(false);
    form.resetFields();
    setSelectedImages([]);
  };

  const handleAddItem = (values: AddItemFormValues) => {
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
    navigate(
      `/marketplace/${activeTab === 'my' ? 'my-items' : 'public-items'}/${item.id}`
    );
  };

  const displayedItems = activeTab === 'my' ? myItems : publicItems;
  const filteredItems = displayedItems
    .filter((item: Item) => {
      const matchesCategory = selectedCategory
        ? item.category.id === selectedCategory
        : true;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a: Item, b: Item) => {
      const priceA: number = parseFloat(a.price);
      const priceB: number = parseFloat(b.price);
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  const { data: children = [] } = useQuery({
    queryKey: ['children'],
    queryFn: async () => (await axiosInstance.get('/auth/children/')).data,
  });

  const handleCreateDonation = async (values: CreateDonationFormValues) => {
    const formData = new FormData();
    formData.append('child', values.child);
    formData.append('purpose', values.purpose);
    formData.append('goal_amount', values.goal_amount);
    formData.append('deadline', values.deadline);
    formData.append('is_active', 'true');

    if (selectedImages[0]?.originFileObj) {
      formData.append('photos', selectedImages[0].originFileObj);
    }

    try {
      await axiosInstance.post('/donations/donation/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notification.success({
        message: 'Success',
        description: 'Donation request created.',
      });
      setIsDonationModalOpen(false);
      setActiveTab('donations');
      donationForm.resetFields();
      setSelectedImages([]);
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Error',
        description: 'Failed to create donation.',
      });
    }
  };

  const loading = myItemsLoading || publicItemsLoading;

  return (
    <MarketplaceLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header
          style={{
            padding: 0,
            marginLeft: '5px',
            background: '#E2E3E0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Main_header />
        </Header>

        <MarketplaceContent>
          <TopBar>
            <MarketplaceTitle>Marketplace</MarketplaceTitle>
            <AddItemButton
              onClick={() =>
                activeTab === 'donations'
                  ? setIsDonationModalOpen(true)
                  : setIsModalOpen(true)
              }
            >
              <PlusOutlined />{' '}
              {activeTab === 'donations' ? 'Create Donation' : 'Add Item'}
            </AddItemButton>
          </TopBar>

          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            <TabPane tab="All" key="all" />
            <TabPane tab="My Items" key="my" />
            <TabPane tab="Donations" key="donations" />
          </Tabs>

          {activeTab !== 'donations' && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <Select
                placeholder="Filter by category"
                style={{ width: 250 }}
                onChange={(value) => setSelectedCategory(value as string)}
                allowClear
              >
                {categories.map((cat: Category) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>

              <Select
                defaultValue="asc"
                style={{ width: 180 }}
                onChange={(value) => setSortOrder(value as 'asc' | 'desc')}
              >
                <Option value="asc">Price: Low to High</Option>
                <Option value="desc">Price: High to Low</Option>
              </Select>

              <Input.Search
                placeholder="Search by item name"
                style={{ width: 300 }}
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          )}
          <ItemsGrid>
            {activeTab === 'donations'
              ? donationsLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      active
                      style={{ width: 280, height: 340 }}
                    />
                  ))
                : donations.map((donation: DonationRequest) => (
                    <DonationCard
                      key={donation.id}
                      donation={donation}
                      defaultImg={img}
                    />
                  ))
              : loading
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton.Button
                      key={index}
                      active
                      style={{ width: 280, height: 340 }}
                    />
                  ))
                : filteredItems.map((item: Item) => (
                    <ItemCard
                      key={item.id}
                      onClick={() => handleCardClick(item)}
                    >
                      <ItemImage
                        src={
                          item?.photos?.length ? item.photos[0].image_url : img
                        }
                        alt={item.name}
                      />
                      <ItemInfo>
                        <ItemTitle>{item.name}</ItemTitle>
                        <ItemPrice>{item.price} ₸</ItemPrice>
                      </ItemInfo>
                    </ItemCard>
                  ))}
          </ItemsGrid>

          {isDonationModalOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Modal
                title="Create Donation Request"
                open={isDonationModalOpen}
                onCancel={() => {
                  setIsDonationModalOpen(false);
                  donationForm.resetFields();
                }}
                footer={null}
                destroyOnClose
              >
                <Form
                  layout="vertical"
                  form={donationForm}
                  onFinish={handleCreateDonation}
                >
                  <Form.Item
                    name="child"
                    label="Child"
                    rules={[{ required: true }]}
                  >
                    <Select placeholder="Select child">
                      {children.map((child: Child) => (
                        <Option key={child.id} value={child.id}>
                          {child.full_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="purpose"
                    label="Purpose"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="goal_amount"
                    label="Goal Amount (₸)"
                    rules={[{ required: true }]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    name="deadline"
                    label="Deadline"
                    rules={[{ required: true }]}
                  >
                    <Input type="date" />
                  </Form.Item>
                  <Form.Item label="Upload Photo">
                    <Upload.Dragger
                      multiple={false}
                      listType="picture"
                      beforeUpload={() => false}
                      fileList={selectedImages}
                      accept=".jpg,.jpeg,.png,.gif,.webp,.heic"
                      onChange={({ fileList }) =>
                        setSelectedImages(fileList.slice(0, 1))
                      }
                    >
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p>Click or drag image here</p>
                    </Upload.Dragger>
                  </Form.Item>
                  <AddItemButton htmlType="submit" block>
                    Submit Donation
                  </AddItemButton>
                </Form>
              </Modal>
            </motion.div>
          )}

          {isModalOpen && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Modal
                title="Add New Item"
                open={isModalOpen}
                onCancel={resetForm}
                footer={null}
                destroyOnClose
                width={800} // Увеличенная ширина
              >
                <Form layout="vertical" form={form} onFinish={handleAddItem}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="name"
                        label="Item Name"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true }]}
                      >
                        <Input type="number" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="location"
                        label="Location"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="contact_method"
                        label="Contact Method"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="availability"
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
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="condition"
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
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="category"
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
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={24}>
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
                    </Col>
                  </Row>

                  <AddItemButton htmlType="submit" block>
                    Add Item
                  </AddItemButton>
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

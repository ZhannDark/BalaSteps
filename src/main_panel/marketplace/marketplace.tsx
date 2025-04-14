import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Input,
  Button,
  Card,
  Modal,
  Form,
  Upload,
  Select,
  Tabs,
  message,
  Drawer,
  Descriptions,
  Popconfirm,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import './marketplace.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Meta } = Card;
const { Option } = Select;
const { TabPane } = Tabs;
const { Dragger } = Upload;

const accessToken = localStorage.getItem('accessToken');

interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  location: string;
  contact_method: string;
  category_id: string;
  condition: string;
  category: { id: string; name: string };
  owner: string;
}

interface Category {
  id: string;
  name: string;
}

const Marketplace = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const queryClient = useQueryClient();

  const { data: myItemsData } = useQuery({
    queryKey: ['my-items'],
    queryFn: async () =>
      (await axios.get('https://project-back-81mh.onrender.com/marketplace/my-items/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })).data,
  });
  const myItems: Item[] = myItemsData || [];

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () =>
      (await axios.get('https://project-back-81mh.onrender.com/marketplace/categories/', {
      })).data,
  });

  const categories: Category[] = categoriesData || [];
  console.log(categories);

  const { data: publicItems = [] } = useQuery<Item[]>({
    queryKey: ['public-items'],
    queryFn: async () =>
      (await axios.get('https://project-back-81mh.onrender.com/marketplace/public-items/')).data,
  });

  const addItem = useMutation({
    mutationFn: (formData: FormData) =>
      axios.post('https://project-back-81mh.onrender.com/marketplace/my-items/', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items']});
      message.success('Item added!');
    },
    onError: () => message.error('Failed to add item'),
  });

  const updateItem = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      axios.patch(`https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items']});
      message.success('Item updated!');
    },
    onError: () => message.error('Failed to update item'),
  });

  const deleteItem = useMutation({
    mutationFn: (id: string) =>
      axios.delete(`https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items']});
      message.success('Item deleted!');
    },
    onError: () => message.error('Failed to delete item'),
  });

  const showDrawer = (item: Item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const showModal = (item?: Item) => {
    setIsEditMode(!!item);
    if (item) {
      form.setFieldsValue({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category.id,
        location: item.location,
        contact_method: item.contact_method,
        condition: item.condition,
      });
      setSelectedItem(item);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleAddOrEdit = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);
    formData.append('location', values.location);
    formData.append('contact_method', values.contact_method);
    formData.append('condition', values.condition);
    formData.append('category', values.category);
    if (values.image && values.image[0]?.originFileObj) {
      formData.append('image', values.image[0].originFileObj);
    }

    if (isEditMode && selectedItem) {
      updateItem.mutate({ id: selectedItem.id, formData });
    } else {
      addItem.mutate(formData);
    }

    setIsModalOpen(false);
    form.resetFields();
  };

  const displayedItems = activeTab === 'my' ? myItems : publicItems;

  const filteredItems = displayedItems.filter((item) =>
    selectedCategory ? item.category.id === selectedCategory : true
  );

  return (
    <Layout className="marketplace-layout">
      <MenuPanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)} selectedPage="/marketplace" />
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
        <Content className="marketplace-content">
          <div className="top-bar">
            <Title level={2}>Marketplace</Title>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Item
            </Button>
          </div>
          <Tabs defaultActiveKey="all" onChange={setActiveTab}>
            <TabPane tab="All" key="all" />
            <TabPane tab="My Items" key="my" />
          </Tabs>

          <Select
            placeholder="Filter by category"
            style={{ width: 250, marginBottom: 20 }}
            onChange={setSelectedCategory}
            allowClear
          >
            {categories.map((cat: Category) => (
              <Option key={cat.id} value={cat.id}>
                {cat.name}
              </Option>
            ))}
          </Select>

          <div className="items-grid">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="item-card"
                hoverable
                cover={<img alt={item.name} src={item.image} className="item-image" />}
                onClick={() => showDrawer(item)}
              >
                <Meta title={item.name} description={`$${item.price}`} />
              </Card>
            ))}
          </div>

          {/* Drawer for item detail */}
          <Drawer
            title={selectedItem?.name}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            width={420}
          >
            {selectedItem && (
              <>
                <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', marginBottom: 20 }} />
                <Descriptions column={1}>
                  <Descriptions.Item label="Description">{selectedItem.description}</Descriptions.Item>
                  <Descriptions.Item label="Price">${selectedItem.price}</Descriptions.Item>
                  <Descriptions.Item label="Location">{selectedItem.location}</Descriptions.Item>
                  <Descriptions.Item label="Condition">{selectedItem.condition}</Descriptions.Item>
                  <Descriptions.Item label="Contact">{selectedItem.contact_method}</Descriptions.Item>
                  <Descriptions.Item label="Category">{selectedItem.category.name}</Descriptions.Item>
                </Descriptions>
                <div style={{ marginTop: 20 }}>
                  <Button icon={<EditOutlined />} style={{ marginRight: 8 }} onClick={() => showModal(selectedItem)}>
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this item?"
                    onConfirm={() => deleteItem.mutate(selectedItem.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button icon={<DeleteOutlined />} danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              </>
            )}
          </Drawer>

          {/* Modal to add/edit item */}
          <Modal
            title={isEditMode ? 'Edit Item' : 'Add New Item'}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Form layout="vertical" form={form} onFinish={handleAddOrEdit}>
              <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Upload Image">
                <Upload listType="picture" maxCount={1} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                <Input type="number" />
              </Form.Item>
              <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="contact_method" label="Contact Method" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="condition" label="Condition" rules={[{ required: true }]}>
                <Select>
                  <Option value="new">New</Option>
                  <Option value="used">Used</Option>
                </Select>
              </Form.Item>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select>
                  {categories.map((cat: Category) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {isEditMode ? 'Update' : 'Add Item'}
              </Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Marketplace;

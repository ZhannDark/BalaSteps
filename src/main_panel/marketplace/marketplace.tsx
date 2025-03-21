import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Input, Button, Card, Modal, Form, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './marketplace.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Meta } = Card;
const { Dragger } = Upload;

interface Item {
  id: number;
  name: string;
  image: string;
  description: string;
  price: string;
}

const marketplaceItems = [
  { id: 0, name: 'Pediatric Wheelchair', image: '/images/wheelchair.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 1, name: 'Nebulizer Machine', image: '/images/nebulizer.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 2, name: 'Standing Frame for Kids', image: '/images/standing-frame.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 3, name: 'Gait Trainer Walker', image: '/images/walker.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 4, name: 'Adaptive Stroller', image: '/images/stroller.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 5, name: 'Orthopedic Braces & Splints', image: '/images/braces.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 6, name: 'Feeding Pump & Accessories', image: '/images/feeding-pump.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
  { id: 7, name: 'Hospital Bed for Home Use', image: '/images/hospital-bed.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
];

const Marketplace = () => {
  const [items, setItems] = useState<Item[]>(marketplaceItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Modal Open/Close
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Handle Item Addition
  const handleAddItem = (values: any) => {
    const newItem: Item = {
      id: items.length + 1,
      name: values.name,
      image: values.image?.file?.response?.url || '/images/default-placeholder.png', // Default image if none uploaded
      description: values.description,
      price: `$${values.price}`,
    };
    setItems([...items, newItem]);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Layout className="marketplace-layout">
      <MenuPanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)}  selectedPage={'/marketplace'}/>
      <Layout style={{ marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s' }}>
          <Main_header />
        <Content className="marketplace-content">
          <div className="search-add-container">
            <Title className="marketplace-title">Marketplace</Title>
            <Input
              placeholder="Search for topics, keywords"
              className="search-bar"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" icon={<PlusOutlined />} className="add-item-button" onClick={showModal}>
              Add Item
            </Button>
          </div>

          {/* Items Grid */}
          <div className="items-grid">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="item-card"
                hoverable
                cover={<img alt={item.name} src={item.image} className="item-image" />}
                onClick={() => navigate(`/marketplace/${item.id}`)}
              >
                <Meta title={item.name} className="item-title" />
              </Card>
            ))}
          </div>
        </Content>
      </Layout>

      {/* Add Item Modal */}
      <Modal title="Add New Item" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleAddItem}>
          <Form.Item label="Item Name" name="name" rules={[{ required: true, message: 'Enter item name' }]}>
            <Input placeholder="Enter item name..." />
          </Form.Item>
          <Form.Item label="Upload Image" name="image">
            <Dragger name="file" action="/upload" listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Dragger>
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Enter item description' }]}>
            <Input.TextArea rows={3} placeholder="Enter description..." />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Enter item price' }]}>
            <Input type="number" placeholder="Enter price in $" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Add Item
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Marketplace;

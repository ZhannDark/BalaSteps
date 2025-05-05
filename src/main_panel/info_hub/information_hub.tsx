import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Typography,
  Card,
  Input,
  Button,
  Layout,
  message,
  Tooltip,
  Space,
  Dropdown,
  Checkbox,
} from 'antd';
import { DownOutlined, RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import Foot from '../../main_page/main_content/footer/footer/footer';

const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;
const { Header, Content } = Layout;

const StyledLayout = styled(Layout)`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const ContentContainer = styled(Content)`
  width: 100%;
  margin: auto;
  padding: 40px;
`;

const NameSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchBar = styled(Search)`
  width: 300px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled(Title)`
  && {
    color: #426b1f;
    margin-bottom: 10px;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ScrollContent = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 15px;
  padding: 10px 0;
  white-space: nowrap;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled(Button)`
  background-color: #426b1f;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  &:hover {
    background-color: #6b8e23 !important;
  }
`;

const InfoCard = styled(Card)`
  width: 250px;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const TagDropdownContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

interface TagType {
  id: string;
  name: string;
}

const InformationHub = () => {
  const newsRef = useRef<HTMLDivElement | null>(null);
  const specialistsRef = useRef<HTMLDivElement | null>(null);
  const centersRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const { data: news = [], isError: newsError } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const res = await axios.get(
        'https://project-back-81mh.onrender.com/info-hub/news/'
      );
      return res.data;
    },
  });

  const { data: specialists = [], isError: specialistsError } = useQuery({
    queryKey: ['specialists'],
    queryFn: async () => {
      const res = await axios.get(
        'https://project-back-81mh.onrender.com/info-hub/specialists/'
      );
      return res.data;
    },
  });

  const { data: centers = [], isError: centersError } = useQuery({
    queryKey: ['centers'],
    queryFn: async () => {
      const res = await axios.get(
        'https://project-back-81mh.onrender.com/info-hub/centers/'
      );
      return res.data;
    },
  });

  if (newsError || specialistsError || centersError) {
    message.error('Failed to load information hub items');
    return null;
  }

  const allTags = Array.from(
    new Set(
      [...news, ...specialists, ...centers].flatMap((item) =>
        item.tags.map((tag: { name: string }) => tag.name)
      )
    )
  ).sort();

  const truncate = (text: string, maxLength = 30) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  const matchesSearchAndTag = (item: {
    title?: string;
    name?: string;
    tags: TagType[];
  }) => {
    const text = item.title || item.name;
    const matchesSearch = text
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTags.length > 0
        ? item.tags.some((t) => selectedTags.includes(t.name))
        : true;
    return matchesSearch && matchesTag;
  };

  const sortedNews = [...news].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const sortedSpecialists = [...specialists].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const sortedCenters = [...centers].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const tagMenu = (
    <TagDropdownContainer>
      <Checkbox.Group
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        options={allTags.map((tag) => ({ label: tag, value: tag }))}
        value={selectedTags}
        onChange={(checkedValues) => setSelectedTags(checkedValues as string[])}
      />
    </TagDropdownContainer>
  );

  return (
    <StyledLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 70 : 250 }}>
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

        <ContentContainer>
          <NameSearch>
            <h1 className="title">Information Hub</h1>
            <Space>
              <Dropdown
                overlay={tagMenu}
                trigger={['click']}
                placement="bottomLeft"
              >
                <Button>
                  Filter by tags <DownOutlined />
                </Button>
              </Dropdown>
              <SearchBar
                placeholder="Search for topics, keywords"
                allowClear
                enterButton
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Space>
          </NameSearch>

          {[
            {
              title: 'Latest News',
              data: sortedNews,
              ref: newsRef,
              path: 'news',
              label: 'title',
              subtitle: (item: any) => `Source: ${item.source || 'N/A'}`,
            },
            {
              title: 'Specialists',
              data: sortedSpecialists,
              ref: specialistsRef,
              path: 'specialist',
              label: 'name',
              subtitle: (item: any) =>
                `Rating: ${item.rating?.toFixed(1) || 'N/A'}`,
            },
            {
              title: 'Therapy Centers',
              data: sortedCenters,
              ref: centersRef,
              path: 'therapy-center',
              label: 'name',
              subtitle: (item: any) =>
                `Rating: ${item.rating?.toFixed(1) || 'N/A'}`,
            },
          ].map(({ title, data, ref, path, label, subtitle }) => (
            <Section key={title}>
              <SectionTitle level={3}>
                {title} ({data.filter(matchesSearchAndTag).length})
              </SectionTitle>
              <ScrollContainer>
                <ScrollButton
                  icon={<LeftOutlined />}
                  onClick={() => scrollLeft(ref)}
                />
                <ScrollContent ref={ref}>
                  {data.filter(matchesSearchAndTag).map((item) => (
                    <InfoCard
                      key={item.id}
                      hoverable
                      onClick={() => navigate(`/info_hub/${path}/${item.id}`)}
                    >
                      <CardImage src={item.photo} alt={`${title} image`} />
                      <Meta
                        title={
                          <Tooltip title={item[label]}>
                            {truncate(item[label])}
                          </Tooltip>
                        }
                        description={subtitle(item)}
                      />
                    </InfoCard>
                  ))}
                </ScrollContent>
                <ScrollButton
                  icon={<RightOutlined />}
                  onClick={() => scrollRight(ref)}
                />
              </ScrollContainer>
            </Section>
          ))}
        </ContentContainer>
        <Foot />
      </Layout>
    </StyledLayout>
  );
};

export default InformationHub;

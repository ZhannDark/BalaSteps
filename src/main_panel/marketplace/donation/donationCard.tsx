import React, { useState } from 'react';
import {
  Modal,
  Input,
  Button,
  Progress,
  Card,
  Typography,
  Image,
  notification,
  Divider,
  Tooltip,
} from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import axiosInstance from '../../axios-instance';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const { Title, Paragraph, Text } = Typography;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 12px 0;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;

interface DonationPhoto {
  id: number;
  image: string;
}

const AnimatedInputWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

interface Child {
  id: string;
  full_name: string;
}

interface DonationCardProps {
  donation: DonationRequest;
  defaultImg: string;
}

const DonationCard: React.FC<DonationCardProps> = ({
  donation,
  defaultImg,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const queryClient = useQueryClient();

  const { data: children = [] } = useQuery<Child[]>({
    queryKey: ['children'],
    queryFn: async () => (await axiosInstance.get('/auth/children/')).data,
  });

  const childName =
    children.find((c) => c.id === donation.child)?.full_name || donation.child;

  const progress =
    (parseFloat(donation.donated_amount) / parseFloat(donation.goal_amount)) *
    100;

  const getBorderColor = (deadline: string): string => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diff =
      (deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
    if (diff < 0) return '#ff4d4f';
    if (diff <= 3) return '#faad14';
    return '#d9d9d9';
  };

  const borderColor = getBorderColor(donation.deadline);
  const formattedDeadline = dayjs(donation.deadline).format('DD MMM YYYY');
  const formattedCreated = dayjs(donation.created_at).format(
    'DD MMM YYYY HH:mm'
  );

  const handleDonateClick = () => setShowInputs(true);

  const handleCopyKaspiCode = () => {
    navigator.clipboard.writeText(donation.kaspi_code);
    notification.success({
      message: 'Kaspi Code Copied',
      description: 'The Kaspi code has been copied to clipboard.',
    });
  };

  const mutation = useMutation({
    mutationFn: (payload: {
      donation_request: number;
      amount: string;
      comment: string;
    }) => axiosInstance.post('/donations/donation/confirm/', payload),
    onSuccess: () => {
      notification.success({
        message: 'Donation Confirmed',
        description: 'Thank you! Your donation has been successfully recorded.',
      });
      setIsModalOpen(false);
      setShowInputs(false);
      setAmount('');
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['donations'] });
    },
    onError: () => {
      notification.error({
        message: 'Donation Failed',
        description: 'Something went wrong while processing your donation.',
      });
    },
  });

  const handleConfirm = () => {
    if (!amount) {
      notification.warning({
        message: 'Amount Required',
        description: 'Please enter an amount to proceed with the donation.',
      });
      return;
    }
    mutation.mutate({
      donation_request: donation.id,
      amount,
      comment,
    });
  };

  return (
    <>
      <Card
        hoverable
        style={{
          borderColor,
          borderWidth: 2,
          borderStyle: 'solid',
          marginBottom: 16,
        }}
        cover={
          <Image
            src={donation.photos[0]?.image || defaultImg}
            alt="img"
            height={200}
            preview={false}
            style={{ objectFit: 'cover' }}
          />
        }
        onClick={() => setIsModalOpen(true)}
      >
        <Title level={4}>{donation.purpose}</Title>
        <Paragraph>
          <b>Goal:</b> {donation.goal_amount} ₸
        </Paragraph>
        <Paragraph>
          <b>Remaining:</b> {donation.remaining} ₸
        </Paragraph>
        <Progress
          percent={Math.min(progress, 100)}
          size="small"
          status="active"
          strokeColor="#426b1f"
        />
        <Paragraph>
          <b>Deadline:</b> {formattedDeadline}
        </Paragraph>
      </Card>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setShowInputs(false);
        }}
        title={<Text strong>{donation.purpose}</Text>}
        footer={null}
        width={400}
        style={{ top: 48 }}
        bodyStyle={{ padding: 0 }}
      >
        <ModalBody>
          <StyledImage
            src={donation.photos[0]?.image || defaultImg}
            alt="donation"
            width="100%"
            height={220}
            preview
          />

          <Divider orientation="left">Donation Info</Divider>
          <InfoGroup>
            <InfoRow>
              <Text strong>Child:</Text>
              <span>{childName}</span>
            </InfoRow>
            <InfoRow>
              <Text strong>Goal:</Text>
              <span>{donation.goal_amount} ₸</span>
            </InfoRow>
            <InfoRow>
              <Text strong>Donated:</Text>
              <span>{donation.donated_amount} ₸</span>
            </InfoRow>
            <InfoRow>
              <Text strong>Remaining:</Text>
              <span>{donation.remaining} ₸</span>
            </InfoRow>
            <InfoRow>
              <Text strong>Deadline:</Text>
              <span>{formattedDeadline}</span>
            </InfoRow>
            <InfoRow>
              <Text strong>Status:</Text>
              <span>
                {donation.is_approved ? 'Approved' : 'Pending'} |{' '}
                {donation.is_active ? 'Active' : 'Inactive'}
              </span>
            </InfoRow>
            <InfoRow>
              <Text strong>Created:</Text>
              <span>{formattedCreated}</span>
            </InfoRow>
          </InfoGroup>

          <Divider orientation="left">Payment Info</Divider>
          <InfoGroup>
            <InfoRow>
              <Text strong>Kaspi Code:</Text>
              <span>
                {donation.kaspi_code}{' '}
                <Tooltip title="Copy">
                  <Button
                    size="small"
                    type="link"
                    icon={<CopyOutlined />}
                    onClick={handleCopyKaspiCode}
                  />
                </Tooltip>
              </span>
            </InfoRow>
            <InfoRow>
              <Text strong>Kaspi QR:</Text>
              <Image
                src={donation.kaspi_qr}
                alt="QR"
                width={120}
                style={{ borderRadius: 4 }}
              />
            </InfoRow>
          </InfoGroup>

          <Progress
            percent={Math.min(progress, 100)}
            status="active"
            strokeColor="#426b1f"
          />

          {!showInputs ? (
            <Button
              style={{ backgroundColor: '#426b1f', color: '#fff' }}
              type="primary"
              onClick={handleDonateClick}
              block
            >
              Make a Donation
            </Button>
          ) : (
            <AnimatePresence>
              <AnimatedInputWrapper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Input.TextArea
                  placeholder="Enter comment (optional)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  style={{ backgroundColor: '#426b1f', color: '#fff' }}
                  type="primary"
                  onClick={handleConfirm}
                  loading={mutation.isPending}
                  block
                >
                  Confirm Donation
                </Button>
              </AnimatedInputWrapper>
            </AnimatePresence>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default DonationCard;

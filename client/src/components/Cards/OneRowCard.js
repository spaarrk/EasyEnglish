import { Avatar, Box, Card, Typography } from '@mui/material';
import { useMemo } from 'react';
import { LEVEL_ENGLISH_COLORS } from '../../utils/testConstants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { CARDS_ROUTE } from '../../utils/consts';

const OneRowCard = (props) => {
  const { item } = props;
  const { id, topic, description, level, user, createdAt } = item;
  const navigate = useNavigate();
  const currentDescription =
    description.length > 100 ? description.substring(0, 100) + '...' : description;
  const navigateTo = () => {
    navigate(`${CARDS_ROUTE}/${id}`);
  };
  return (
    <Card
      sx={{
        padding: '20px 20px 10px',
        position: 'relative',
        overflow: 'unset',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: '0.4s',
        ':hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={navigateTo}
    >
      <Typography sx={{ fontWeight: '700', fontSize: '22px' }}>{topic}</Typography>
      <Typography sx={{ flex: '1 0 auto', minHeight: '36px' }}>{currentDescription}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '12px', fontWeight: '300' }}>
          {dayjs(createdAt).format('YYYY-MM-DD')}
        </Typography>
        <Box
          sx={{
            flex: '1 0 auto',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Typography>{user.name}</Typography>
          <Avatar
            alt="avatar"
            src={user.img ? `${process.env.REACT_APP_API_URL}${user.img}` : '/img/header/empty.png'}
          ></Avatar>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '-15px',
          right: '-12px',
          backgroundColor: LEVEL_ENGLISH_COLORS[level],
          padding: '8px 16px',
          borderRadius: '10px',
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: '600', fontSize: '16px' }}>
          {level}
        </Typography>
      </Box>
    </Card>
  );
};
export default OneRowCard;

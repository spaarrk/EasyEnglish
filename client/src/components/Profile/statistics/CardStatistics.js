import { Box, Card, CircularProgress, Typography } from '@mui/material';
import Loader from '../../UI/Loader/Loade';

const CardStatistics = (props) => {
  const { title, value, loading } = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 17px',
        boxSizing: 'border-box',
        minHeight: '115px',
      }}
    >
      <Typography
        sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '18px', flex: '1 0 auto' }}
      >
        {title}
      </Typography>
      <Typography sx={{ fontSize: '22px', fontWeight: '700', lineHeight: '18px' }}>
        {loading ? <CircularProgress size={20} /> : value}
      </Typography>
    </Card>
  );
};
export default CardStatistics;

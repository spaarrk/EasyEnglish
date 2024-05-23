import { Box, Container, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { CARDS_ROUTE } from '../../../../utils/consts';
import { Context } from '../../../..';
import { useTestLogic } from '../../../../Hooks/useTestLogic';
import Loader from '../../../UI/Loader/Loade';
import NoItemExists from '../../../UI/noItemExists/NoItemExists';
import EndTest from '../../../NewTest/endTest/EndTest';
import SliderCards from './sliderCards/SliderCards';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CardView = (props) => {
  const { loading, activeTest } = useTestLogic({
    withPopup: false,
  });
  const loader = (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Loader></Loader>
    </div>
  );
  if (loading) return loader;
  const noItemExists = <NoItemExists title="" buttonText="" />;
  if (Object.keys(activeTest).length === 0) return noItemExists;
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box
        component={Link}
        to={CARDS_ROUTE}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          marginTop: '20px',
          position: 'absolute',
        }}
      >
        <ArrowBackIosIcon sx={{ color: '#0047FD', width: '21px' }} />
        <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#0047FD' }}>
          Back to Cards
        </Typography>
      </Box>
      <SliderCards />
    </Container>
  );
};
export default CardView;

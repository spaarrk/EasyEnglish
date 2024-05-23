import { Box, Typography, LinearProgress } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Context } from '../../..';
import { observer, useObserver } from 'mobx-react-lite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom';

const TestHeader = observer((props) => {
  const { currentStep } = props;
  const { testStore } = useContext(Context);
  const { activeTest } = testStore;
  const getValue = () => {
    if (currentStep === 0 || Object.keys(activeTest).length === 0) return 0;
    return (currentStep / activeTest.questions.length) * 100;
  };
  return (
    <Box
      sx={{
        padding: '42px 40px 20px',
        zIndex: '10',
        position: 'absolute',
        width: '100%',
      }}
    >
      <Box
        component={Link}
        to={'/exercises'}
        sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <ArrowBackIosIcon sx={{ color: '#0047FD', width: '21px' }} />
        <Typography sx={{ fontSize: '18px', fontWeight: '600', color: '#0047FD' }}>
          Back to Exercises
        </Typography>
      </Box>
      <Box sx={{ width: '100%', marginTop: '27px' }}>
        <LinearProgress
          sx={{
            height: '16px',
            borderRadius: '8px',
            backgroundColor: '#D6E7F0',
            '& .MuiLinearProgress-bar': { backgroundColor: '#3BBC40' },
          }}
          variant="determinate"
          value={getValue()}
        />
      </Box>
    </Box>
  );
});
export default TestHeader;

import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Context } from '../../..';
import CircularProgressWithLabel from '../../UI/CircularProgressWithLabel';
import Statistics from './statistics/Statistics';
import { AnimatePresence } from 'framer-motion';

const resultEnum = {
  GREAT: {
    img: '/img/testResult/great.png',
    title: 'Great result!',
    color: '#AEE9A4',
  },
  SO_SO: {
    img: '/img/testResult/so_so.png',
    title: 'Be a little more attentive and everything will go well!',
    color: '#EEE981',
  },
  BAD: {
    img: '/img/testResult/bad.png',
    title: "Don't be sad and practice more!",
    color: '#FF9393',
  },
};

const EndTest = observer((props) => {
  const {} = props;
  const { testStore } = useContext(Context);
  const { activeTest, resultTest } = testStore;
  const [isOpenStatistics, setIsOpenStatistics] = useState(false);
  const isSuccess = resultTest?.percentageCorrect > 50;
  const result = useMemo(() => {
    switch (true) {
      case resultTest.percentageCorrect > 50:
        return resultEnum.GREAT;
      case resultTest.percentageCorrect === 50:
        return resultEnum.SO_SO;
      default:
        return resultEnum.BAD;
    }
  }, [resultTest]);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontSize: '20px', fontWeight: '600', marginTop: '93px' }}>
        {result.title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '55px',
          marginTop: '40px',
        }}
      >
        <img src={result.img}></img>
        <Box
          sx={{
            backgroundColor: result.color,
            height: '180px',
            borderRadius: '50%',
            color: '#124066',
          }}
        >
          <CircularProgressWithLabel
            sxLabel={{ fontSize: '26px', fontWeight: '600', color: 'black' }}
            size={180}
            color="inherit"
            labelColor="white"
            value={resultTest?.percentageCorrect}
          />
        </Box>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          onClick={() => {
            setIsOpenStatistics((prev) => !prev);
          }}
          sx={{
            marginTop: '40px',
            width: '100%',
            maxWidth: '285px',
            height: '67px',
            borderRadius: '15px',
            backgroundColor: '#005995',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            ':hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 0px 15px 5px rgba(0,0,0,0.3)',
            },
          }}
        >
          <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: '600' }}>
            {isOpenStatistics ? 'Hide' : 'Show'} results
          </Typography>
          <Box
            sx={{ transition: '0.6s', transform: isOpenStatistics ? 'rotate(180deg)' : 'unset' }}
            component={'img'}
            src="/img/testResult/arrow.svg"
          ></Box>
        </Box>
        <AnimatePresence>{isOpenStatistics && <Statistics />}</AnimatePresence>
      </Box>
    </Box>
  );
});
export default EndTest;

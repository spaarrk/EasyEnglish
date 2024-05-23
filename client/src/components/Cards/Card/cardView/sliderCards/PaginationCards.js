import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { Context } from '../../../../..';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoopIcon from '@mui/icons-material/Loop';
import { useTranslation } from 'react-i18next';
const PaginationCards = (props) => {
  const { currentCard, setCurrentCard } = props;
  const { testStore } = useContext(Context);
  const { activeTest } = testStore;
  const { t } = useTranslation();
  const size = useMemo(() => {
    return testStore.activeTest.questions.length;
  }, [testStore]);
  const back = () => {
    console.log('da');
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
    }
  };
  const next = () => {
    console.log('net', size);
    if (currentCard < size - 1) {
      setCurrentCard((prev) => prev + 1);
    }
  };
  const mix = () => {
    testStore.setActiveTest({
      ...activeTest,
      questions: activeTest.questions
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value),
    });
  };
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '70%' },
        display: 'flex',
        padding: '10px',
        position: 'relative',
      }}
    >
      <Tooltip
        sx={{ position: 'absolute', top: '50%', left: '0', transform: 'translate(0px , -50%)' }}
        title={t('card.mix')}
        onClick={mix}
      >
        <IconButton>
          <LoopIcon />
        </IconButton>
      </Tooltip>
      <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <IconButton
          sx={{
            maxWidth: '34px',
            maxHeight: '34px',
            ':hover': {
              backgroundColor: 'black',
            },
            backgroundColor: 'blue',
          }}
          onClick={back}
        >
          <ArrowBackIosNewIcon sx={{ color: 'white', width: '100%' }}></ArrowBackIosNewIcon>
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: '400' }}>{currentCard + 1}</Typography>/
          <Typography sx={{ fontSize: '20px', fontWeight: '400' }}>{size}</Typography>
        </Box>
        <IconButton
          sx={{
            maxWidth: '34px',
            maxHeight: '34px',
            ':hover': {
              backgroundColor: 'black',
            },
            backgroundColor: 'blue',
          }}
          onClick={next}
        >
          <ArrowForwardIosIcon sx={{ color: 'white', width: '100%' }}></ArrowForwardIosIcon>
        </IconButton>
      </Box>
    </Box>
  );
};
export default PaginationCards;

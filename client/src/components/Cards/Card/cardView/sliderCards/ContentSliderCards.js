import { useContext, useEffect, useRef } from 'react';
import { Context } from '../../../../..';
import { Box } from '@mui/material';
import SwiperCard from './swiperCard/SwiperCard';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';

const ContentSliderCards = observer((props) => {
  const { currentCard } = props;
  const { testStore } = useContext(Context);
  const { activeTest } = testStore;
  const prevStepRef = useRef();
  useEffect(() => {
    prevStepRef.current = currentCard;
  }, [currentCard]);
  const prevCard = prevStepRef.current;
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: { xs: '100%', md: '70%' },
        width: '100%',
        overflowX: 'scroll',
        paddingBottom: { xs: '100%', sm: '70%', md: '40%' },
        position: 'relative',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
      }}
    >
      {activeTest.questions.map((oneQ, i) => (
        <AnimatePresence key={oneQ.id}>
          {currentCard === i && <SwiperCard item={oneQ} isNext={currentCard > prevCard} />}
        </AnimatePresence>
      ))}
    </Box>
  );
});
export default ContentSliderCards;

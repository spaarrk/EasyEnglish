import { Box } from '@mui/material';
import ContentSliderCards from './ContentSliderCards';
import PaginationCards from './PaginationCards';
import { useContext, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../../..';
import { createProgress } from '../../../../../http/userProgresAPI';

const SliderCards = observer(() => {
  const { testStore, userStore } = useContext(Context);
  const { activeTest } = testStore;
  const [currentCard, setCurrentCard] = useState(0);

  const size = useMemo(() => {
    return activeTest?.questions.length || 0;
  }, [activeTest]);
  useEffect(() => {
    setCurrentCard(0);
  }, [activeTest]);

  useEffect(() => {
    if (currentCard == (size > 0 ? size - 1 : 0)) {
      createProgress({ userId: userStore.user.id, testId: activeTest.id });
    }
  }, [currentCard]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ContentSliderCards currentCard={currentCard} />
      <PaginationCards currentCard={currentCard} setCurrentCard={setCurrentCard} />
    </Box>
  );
});
export default SliderCards;

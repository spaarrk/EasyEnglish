import { useContext, useEffect, useState } from 'react';
import CardsHeader from '../components/Cards/CardsHeader';
import { Context } from '..';
import Loader from '../components/UI/Loader/Loade';
import { LEVEL_ENGLISH_ENUM_NUMBER, TYPE_TEST_NAME_ENUM } from '../utils/testConstants';
import { Box, Container, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form-mui';
import Card from './Card';
import OneRowCard from '../components/Cards/OneRowCard';
import { useTranslation } from 'react-i18next';
const Cards = () => {
  const { testStore, userStore } = useContext(Context);
  const { t } = useTranslation();
  const { cards, getCardsList } = testStore;
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    topic: '',
    onlyMe: false,
    level: null,
  };
  const form = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const topic = form.watch('topic');
  const onlyMe = form.watch('onlyMe');
  const level = form.watch('level');
  useEffect(() => {
    setLoading(true);
    const currentUserId = onlyMe ? { userId: userStore.user.id } : {};
    const currentTopic = topic ? { topic } : {};
    const currentLevel = level ? { level: LEVEL_ENGLISH_ENUM_NUMBER[level] } : {};
    const filters = {
      testType: TYPE_TEST_NAME_ENUM.CARDS,
      ...currentUserId,
      ...currentTopic,
      ...currentLevel,
    };
    getCardsList(filters).finally(() => setLoading(false));
  }, [topic, onlyMe, level]);

  return (
    <Container sx={{ height: '100%' }}>
      <FormProvider {...form}>
        <CardsHeader />
        <Typography sx={{ marginTop: '40px', fontSize: '18px', fontWeight: '400' }}>
          {t('cards.size') + cards.length}
        </Typography>
        {loading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              display: 'grid',
              margin: '10px 0px 40px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '20px',
            }}
          >
            {cards?.map((oneItem) => (
              <OneRowCard key={oneItem.id} item={oneItem} />
            ))}
          </Box>
        )}
      </FormProvider>
    </Container>
  );
};
export default Cards;

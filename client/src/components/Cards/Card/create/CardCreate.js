import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';
import {
  FormProvider,
  SelectElement,
  TextFieldElement,
  useFieldArray,
  useForm,
} from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import Fields from './Fields';
import StickyHeader from './StickyHeader';
import { LEVEL_ENGLISH, TYPE_TEST_ENM } from '../../../../utils/testConstants';

const CardCreate = () => {
  const { t } = useTranslation();
  const defaultValues = {
    topic: null,
    difficulte: 'easy',
    level: LEVEL_ENGLISH[0],
    testTypeId: 2,
    questions: [
      {
        question: '',
        answers: [
          {
            isRight: true,
            content: '',
          },
        ],
      },
    ],
  };
  const form = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  });

  return (
    <Box
      sx={{
        overflowY: 'scroll',
        maxHeight: 'calc(100vh - 90px)',
        height: '100%',
      }}
    >
      <Box sx={{ marginTop: '30px' }}>
        <FormProvider {...form}>
          <StickyHeader />
          <Container
            sx={{
              margin: { xs: '0px auto 20px', md: '0px auto 40px' },
            }}
          >
            <Box sx={{ marginTop: '40px' }}>
              <Box sx={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                <TextFieldElement
                  sx={{ flex: { xs: '1 0 100%', md: '1 0 45%' } }}
                  name="topic"
                  required
                  placeholder={t('cardsCreate.form.name.placeholder')}
                />
                <SelectElement
                  sx={{ flex: { xs: '1 0 100%', md: '1 0 45%' } }}
                  name="level"
                  options={LEVEL_ENGLISH}
                />
              </Box>
              <TextFieldElement
                fullWidth
                sx={{ marginTop: '20px' }}
                name="description"
                rows={4}
                multiline
                required
                placeholder={t('cardsCreate.form.description.placeholder')}
              />
            </Box>
            <Fields typeTest={TYPE_TEST_ENM.CARDS} />
          </Container>
        </FormProvider>
      </Box>
    </Box>
  );
};
export default CardCreate;

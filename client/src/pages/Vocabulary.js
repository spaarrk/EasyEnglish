import React from 'react';
import { observer } from 'mobx-react-lite';
import VocabularyCap from '../components/VocabularyComp/VocabularyCap';
import VocabularyList from '../components/VocabularyComp/VocabularyList';
import { Box } from '@mui/material';
const Vocabulary = () => {
  return (
    <Box sx={{ marginTop: { xs: '25px', md: '50px' } }}>
      <VocabularyCap />
      <VocabularyList />
    </Box>
  );
};

export default Vocabulary;

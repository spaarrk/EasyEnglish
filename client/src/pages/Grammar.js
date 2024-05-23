import React from 'react';
import GrammarCap from '../components/GrammarComp/GrammarCap';
import GrammarList from '../components/GrammarComp/GrammarList';
import { Box } from '@mui/material';

const Grammar = () => {
  return (
    <Box sx={{ marginTop: { xs: '25px', md: '50px' } }}>
      <GrammarCap />
      <GrammarList />
    </Box>
  );
};

export default Grammar;

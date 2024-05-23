import { Box, Button, Container, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import OneAnswer from './OneAnswer';
const OneQuestion = (props) => {
  const { item, onAnswered } = props;
  return (
    <Container
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '32px', md: '44px' },
          fontWeight: '600',
        }}
      >
        {item?.question}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'space-between' },
          flexWrap: 'wrap',
          columnGap: { xs: '50px', md: '98px' },
          rowGap: { xs: '20px', md: '40px' },
          marginTop: '50px',
          maxWidth: '484px',
        }}
      >
        {item.answers.map((oneAns) => (
          <OneAnswer
            key={`question-${item.id}-answear-${oneAns.id}`}
            item={oneAns}
            onAnswered={onAnswered}
          />
        ))}
      </Box>
    </Container>
  );
};
export default OneQuestion;

import { Box, Button } from '@mui/material';
import { useState } from 'react';

const OneAnswer = (props) => {
  const { item, onAnswered } = props;
  const [backgroundColor, setBackgroundColor] = useState('blue');
  return (
    <Box
      sx={{
        maxWidth: { xs: '150px', md: '193px' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        onClick={() => {
          console.log('item = ', item);
          setBackgroundColor(item.isRight ? '#7CCA6F' : '#FE5050');
          setTimeout(() => {
            onAnswered(item);
          }, 1000);
        }}
        color="inherit"
        sx={{
          height: { xs: '40px', md: '50px' },
          backgroundColor: backgroundColor,
          color: 'white',
          border: `1px solid ${backgroundColor}`,
          ':hover': {
            opacity: '0.8',
            color: 'white',
            backgroundColor: backgroundColor,
            border: `1px solid ${backgroundColor}`,
          },
        }}
        variant={'contained'}
      >
        {item.content}
      </Button>
    </Box>
  );
};
export default OneAnswer;

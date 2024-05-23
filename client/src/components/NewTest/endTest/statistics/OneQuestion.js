import { Box, Typography } from '@mui/material';
import OneAnswer from './OneAnswer';
import { motion } from 'framer-motion';

const OneQuestion = (props) => {
  const { item, i } = props;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i / 10 }}>
      <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
        {i}. {item.question}
      </Typography>
      <Box sx={{ padding: '0px 0px 0px 20px' }}>
        {item?.answers.map((oneItem) => (
          <OneAnswer
            key={`statistics-answer-${oneItem.id}`}
            item={oneItem}
            attemptAnswerId={item.answerId}
          />
        ))}
      </Box>
    </motion.div>
  );
};
export default OneQuestion;

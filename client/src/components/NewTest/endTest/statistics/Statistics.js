import { useContext } from 'react';
import { Context } from '../../../..';
import { Box } from '@mui/material';
import OneQuestion from './OneQuestion';
import { motion } from 'framer-motion';

const Statistics = () => {
  const { testStore } = useContext(Context);
  const { activeTest, resultTest } = testStore;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '30px 0px 50px' }}
    >
      {activeTest.questions.map((oneItem, i) => (
        <OneQuestion key={`statistics-question-${oneItem.id}`} i={i + 1} item={oneItem} />
      ))}
    </motion.div>
  );
};
export default Statistics;

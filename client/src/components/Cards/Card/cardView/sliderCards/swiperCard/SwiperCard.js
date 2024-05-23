import { Box, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import SpeechButton from './SpeeachButton';
const SwiperCard = (props) => {
  const { item, isNext } = props;
  const { t } = useTranslation();
  const [isHintShow, setIsHintShow] = useState(false);
  const variants = isNext
    ? {
        hidden: { x: '10%' },
        visible: { x: 0 },
      }
    : {
        hidden: { x: '-10%' },
        visible: { x: 0 },
      };
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      // transition={{ duration: 1 }}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        onClick={handleClick}
        sx={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          backgroundColor: '#2E3856',
          cursor: 'pointer',
          transition: 'transform 1s',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
          cursor: 'pointer',
          perspective: '500px',
          ...(isFlipped
            ? {
                transform: 'rotateX(180deg)',
              }
            : {}),
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              display: 'flex',
              gap: '5px',
              alignItems: 'center',
              padding: '2px 12px 2px 4px',
              boxSizing: 'border-box',
              minWidth: '115px',
              ...(isHintShow
                ? {
                    backgroundColor: '#282e3e',
                    borderRadius: '10px',
                    color: 'white',
                  }
                : {}),
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsHintShow((prev) => !prev);
            }}
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
            {!isHintShow ? (
              <Typography>{t('card.hint')}</Typography>
            ) : (
              <Typography>{item.answers[0].content[0]}...</Typography>
            )}
          </Box>
          <SpeechButton word={item.question} />
          {item.question}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            transform: 'rotateX(180deg)',
          }}
        >
          <SpeechButton word={item.answers[0].content} />
          {item.answers[0].content}
        </Box>
      </Box>
    </motion.div>
  );
};
export default SwiperCard;

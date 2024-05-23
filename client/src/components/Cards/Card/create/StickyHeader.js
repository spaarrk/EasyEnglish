import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createTest } from '../../../../http/testAPI';
import { useNavigate } from 'react-router-dom';
import { CARDS_ROUTE } from '../../../../utils/consts';
import { Context } from '../../../..';
import { LEVEL_ENGLISH_ENUM, LEVEL_ENGLISH_ENUM_NUMBER } from '../../../../utils/testConstants';

const StickyHeader = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [stuck, setStuck] = useState(false);
  const { handleSubmit } = useFormContext();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { userStore } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      setStuck(e.intersectionRatio < 1);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);
  const submit = () => {
    handleSubmit((data) => {
      const payload = {
        ...data,
        userId: userStore.user.id,
        level: LEVEL_ENGLISH_ENUM_NUMBER[data.level],
      };
      createTest(payload)
        .then((test) => {
          navigate(`${CARDS_ROUTE}/${test.id}`);
        })
        .finally(() => setLoadingSubmit(false));
    })();
  };
  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          padding: '10px 0px',
          backgroundColor: 'white',
          top: '0px',
          zIndex: '1',
          ...(stuck ? { borderBottom: '1px solid black' } : {}),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: '0.5s',
          }}
        >
          <Typography sx={{ fontSize: '28px' }}>{t('cardsCreate.title')}</Typography>
          <Button
            onClick={submit}
            sx={{ width: '156px', ':hover svg': { color: 'blue' } }}
            variant="contained"
          >
            {loadingSubmit ? (
              <CircularProgress sx={{ '& svg': { color: '#AEE9A4' } }} size={20} />
            ) : (
              t('cardsCreate.button')
            )}
          </Button>
        </Container>
      </Box>
      <div ref={ref}></div>
    </>
  );
};
export default StickyHeader;

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AddButton = (props) => {
  const { onClick } = props;
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '10px',
        height: '90px',
        backgroundColor: 'rgb(46, 56, 86)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: '0.5s',
        marginTop: '40px',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        },
        ':hover p': {
          borderColor: 'orange',
          color: 'orange',
        },
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: '22px',
          borderBottom: '3px solid transparent',
          color: 'white',
        }}
      >
        {t('cardsCreate.form.add_button')}
      </Typography>
    </Box>
  );
};
export default AddButton;

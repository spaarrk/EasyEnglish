import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { Context } from '../..';
import { CheckboxElement, SelectElement, useFormContext } from 'react-hook-form-mui';
import { LEVEL_ENGLISH } from '../../utils/testConstants';
import { Link, useNavigate } from 'react-router-dom';
import { CARD_NEW_ROUTE } from '../../utils/consts';
import { useTranslation } from 'react-i18next';
import { usePopover } from '../../Hooks/usePopover';
import debounce from 'lodash/debounce';
import CustomPopoverShell from '../UI/CustomPopoverShell';

const CardsHeader = () => {
  const { testStore } = useContext(Context);
  const { cards } = testStore;
  const { setValue, watch } = useFormContext();
  const navigate = useNavigate();
  const currentValue = watch('topic');
  const [topValue, setTopValue] = useState(currentValue);
  const popoverFilters = usePopover('filter-popover');
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:800px)');
  const handleSet = useCallback(
    debounce((value) => {
      setValue('topic', value);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setTopValue(value);
    handleSet(value);
  };
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '20px',
        justifyContent: { xs: 'space-between', md: 'unset' },
        marginTop: '20px',
        flexWrap: 'wrap',
      }}
    >
      {isMobile && (
        <Button
          onClick={popoverFilters.handleClick}
          sx={{ width: '125px', fontSize: '12px' }}
          variant="outlined"
        >
          {t('cards.buttons.filters')}
        </Button>
      )}
      <CustomPopoverShell
        sx={{ '& .MuiPaper-root ': { borderRadius: '10px' } }}
        popoverProps={popoverFilters}
        onlyMobile={true}
      >
        <Box
          sx={{
            padding: {
              xs: '10px',
              md: '0px',
            },
            display: 'flex',
            flex: '1 0 auto',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            sx={{ flex: { xs: '1 1 100%', md: '1 1 20%' } }}
            label="name card"
            value={topValue}
            onChange={handleChange}
          />
          <SelectElement
            sx={{ flex: { xs: '1 1 100%', md: '1 1 20%' } }}
            label="english level"
            name="level"
            options={[{ id: 0, label: t('filters.all') }, ...LEVEL_ENGLISH]}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckboxElement name="onlyMe" label="only my cards" />
          </Box>
        </Box>
      </CustomPopoverShell>

      <Button
        variant="contained"
        sx={{ width: { xs: '145px', md: '180px' }, fontSize: { xs: '12px', md: '16px' } }}
        onClick={() => {
          navigate(CARD_NEW_ROUTE);
        }}
      >
        {t('cards.buttons.create')}
      </Button>
    </Box>
  );
};
export default CardsHeader;

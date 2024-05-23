import React, { useContext } from 'react';
import { Context } from '../..';
import '../../Styles/sliderMenu.css';
import {
  ADMIN_ROUTE,
  CARDS_ROUTE,
  EXERCISES_ROUTE,
  GRAMMAR_ROUTE,
  MAIN_ROUTE,
  PROFILE_ROUTE,
  VOCABULARY_ROUTE,
} from '../../utils/consts';
import { Link } from 'react-router-dom';
import { ClickAwayListener, Popover, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const SliderMenu = observer(({ anchorEl, handleClose }) => {
  const logOut = () => {
    userStore.setUser({});
    userStore.setIsAuth(false);
    localStorage.removeItem('token');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { userStore } = useContext(Context);
  const { img, name, email } = userStore.user;
  const { t, i18n } = useTranslation();

  const handleChange = (event, selectsLanguage) => {
    i18n.changeLanguage(selectsLanguage);
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handleClose}
      sx={{
        zIndex: 998,
        overflowY: 'auto',
        maxHeight: 'calc(100% - 50px)',
      }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <div className="slider-menu">
          <div className="slider-menu-cap">
            {/* <div className="slider-menu-user"> */}
            <Link onClick={handleClose} className="slider-menu-user" to={PROFILE_ROUTE}>
              <img
                style={{ borderRadius: '20px' }}
                width="64px"
                height="64px"
                src={`${img ? `${process.env.REACT_APP_API_URL}${img}` : '/img/header/empty.png'}`}
              />
              {/* <img src="/img/header/empty.png" /> */}
              <p>{name ? name : email}</p>
            </Link>
            {/* </div> */}
            <div onClick={handleClose} className="link">
              <Link to={MAIN_ROUTE} onClick={() => logOut()}>
                {t('slider.logout')}
              </Link>
            </div>
          </div>
          {userStore.role === 'ADMIN' && (
            <div onClick={handleClose} className="slider-item">
              <Link to={ADMIN_ROUTE}> {t('slider.admin')}</Link>
            </div>
          )}
          <div onClick={handleClose} className="slider-item">
            <Link to={VOCABULARY_ROUTE}> {t('slider.vocabulary')}</Link>
          </div>
          <div onClick={handleClose} className="slider-item">
            <Link to={GRAMMAR_ROUTE}> {t('slider.grammar')}</Link>
          </div>
          <div onClick={handleClose} className="slider-item ">
            <Link to={EXERCISES_ROUTE}> {t('slider.exercises')}</Link>
          </div>
          <div onClick={handleClose} className="slider-item ">
            <Link to={CARDS_ROUTE}> {t('slider.cards')}</Link>
          </div>
          <ToggleButtonGroup
            sx={{
              marginTop: 3,
              backgroundColor: 'inherit',
              border: 'none',
              '&button': {
                border: 'none',
                color: 'black',
                backgroundColor: 'purple',
              },
            }}
            color="primary"
            value={i18n.language}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton
              sx={{
                border: 'none',
                backgroundColor: 'inherit',
                fontWeight: '600',
                fontFamily: 'Montserrat',
                '.Mui-selected': {
                  backgroundColor: 'black',
                },
              }}
              value="en"
            >
              En
            </ToggleButton>
            <ToggleButton
              sx={{
                border: 'none',
                // color: 'white',
                backgroundColor: 'inherit',
                fontWeight: '600',
                fontFamily: 'Montserrat',
              }}
              value="ru"
            >
              Ru
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </ClickAwayListener>
    </Popover>
  );
});
export default SliderMenu;

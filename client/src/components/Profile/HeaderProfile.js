import { updateUserImg, updateUserInfo } from '../../http/userAPI';
import CustomButton from '../Form/CustomButton';
import { Context } from '../..';
import { useContext, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PROFILE_STATISCTICS_ROUTE } from '../../utils/consts';
import dayjs from 'dayjs';
import { ProfileConstants } from './Constants';

const HeaderProfile = observer(() => {
  const { userStore } = useContext(Context);
  const { handleSubmit } = useFormContext();
  const { user, isEditMode } = userStore;
  const navigate = useNavigate();
  const { id, img, name, lastName, email, englishLevel } = user;
  const onSubmit = async (data) => {
    const currentEnglish = data?.englishLevel ? { englishLevel: data.englishLevel.value } : {};
    const currentBirthDay =
      data?.hb && !dayjs(data.hb).isSame(dayjs(), 'day')
        ? { birthday: new Date(data.hb).toISOString() }
        : {};
    const payload = {
      ...data,
      ...currentBirthDay,
      languages: data.languages.map((oneL) => oneL.label).join(),
      ...currentEnglish,
      userId: id,
    };
    await updateUserInfo(payload).then((res) => {
      if (res) {
        const { id, userId, ...newData } = res;
        userStore.setUser({ ...user, ...newData });
      }
    });
    userStore.setIsEditMode(false);
  };
  const selectImg = async (e) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('img', e.target.files[0]);
      formData.append('userId', id);
      await updateUserImg(formData).then((response) => {
        userStore.setUser({ ...user, img: response.img });
      });
    }
  };

  const refImg = useRef();
  return (
    <div className="header-profile">
      <div className="personal-data">
        <div
          onClick={() => {
            refImg.current.click();
          }}
          className="avatar-block"
        >
          <img
            style={{ borderRadius: '20px' }}
            width="64px"
            height="64px"
            src={`${img ? `${process.env.REACT_APP_API_URL}${img}` : '/img/header/empty.png'}`}
          />
          <input onChange={selectImg} style={{ display: 'none' }} ref={refImg} type="file" />
        </div>
        <div className="fio-level">
          <h5>{user && name && lastName ? `${name} ${lastName}` : email}</h5>
          <p>
            {englishLevel
              ? ProfileConstants.ENGLISH_LEVEL.find((oneItem) => oneItem.value === englishLevel)
                  ?.label
              : '-'}
          </p>
        </div>
      </div>
      {isEditMode ? (
        <div className="header-profile-block-button">
          <CustomButton
            isOutline={true}
            isSmall={true}
            title="Cancel"
            onClick={() => userStore.setIsEditMode(false)}
          />
          <CustomButton
            isOutline={false}
            isSmall={true}
            title="Save"
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          />
        </div>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Button
            onClick={() => {
              navigate(PROFILE_STATISCTICS_ROUTE);
            }}
            sx={{
              maxWidth: '155px',
              width: '100%',
              height: '50px',
              margin: '20px 0px 0px',
              textTransform: 'unset',
            }}
            variant="outlined"
          >
            Statistics
          </Button>
          <CustomButton
            className="edit-button"
            isOutline={false}
            isSmall={true}
            title="Edit"
            onClick={() => {
              userStore.setIsEditMode(true);
            }}
          />
        </Box>
      )}
    </div>
  );
});
export default HeaderProfile;

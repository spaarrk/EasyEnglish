import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import About from '../components/Profile/About/About';
import Bio from '../components/Profile/Bio';
import HeaderProfile from '../components/Profile/HeaderProfile';
import '../Styles/profile.css';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileConstants } from '../components/Profile/Constants';
import Loader from '../components/UI/Loader/Loade';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Profile = observer(() => {
  const { userStore } = useContext(Context);
  const { user } = userStore;
  const form = useForm({
    defaultValues: {},
    mode: 'onChange',
  });
  useEffect(() => {
    setLoading(true);
    const languages =
      user?.languages
        ?.split(',')
        .filter((oneItem) => oneItem !== '')
        ?.map((oneItem) => {
          const lang = ProfileConstants.LANGUAGES.find((oneEn) => oneEn.value === oneItem);
          if (!!lang) return lang;
        }) ?? [];
    const values = {
      about: user?.about || '',
      englishLevel: ProfileConstants.ENGLISH_LEVEL.find((one) => one.value === user?.englishLevel),
      funFacts: user?.funFacts || '',
      phone: user?.phone || '',
      // hb: user?.birthday || new Date(),
      languages,
      location: user?.location || '',
    };
    form.reset(values);
    setLoading(false);
  }, [user]);
  const [loading, setLoading] = useState(false);
  return (
    <div className="profile">
      {loading ? (
        <Loader />
      ) : (
        <FormProvider {...form}>
          <div className="_container">
            <HeaderProfile />
            <div className="profile-information">
              <Bio />
              <About />
            </div>
          </div>
        </FormProvider>
      )}
    </div>
  );
});
export default Profile;

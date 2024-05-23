import { useFormContext } from 'react-hook-form';
import CustomAutoComplete from '../../Form/CustomAutoComplete';
import TextInput from '../../Form/TextInput';
import { ProfileConstants } from '../Constants';
import { useTranslation } from 'react-i18next';

const ChangeInfrormation = () => {
  const { t } = useTranslation();
  const form = useFormContext();
  return (
    <div className="about-change-information">
      <div className="item">
        <div className="item-label">{t('profile.about.english_level')}</div>
        <CustomAutoComplete
          form={form}
          placeholder="B1-Intermediate"
          name="englishLevel"
          isMultiple={false}
          data={ProfileConstants.ENGLISH_LEVEL}
        />
      </div>
      <div className="item">
        <div className="item-label">{t('profile.about.languages')}</div>
        <CustomAutoComplete
          isMultiple={true}
          data={ProfileConstants.LANGUAGES}
          placeholder="English"
          name="languages"
          form={form}
        />
      </div>
      <div className="item mb-20">
        <div className="item-label">{t('profile.about.fun_facts')}</div>
        <TextInput
          rows={7}
          placeholder="Write a couple of fun facts about yourself"
          name="funFacts"
          form={form}
        />
      </div>
      <div className="item mb-20">
        <div className="item-label">{t('profile.about.about_me')}</div>
        <TextInput rows={7} placeholder="Write a little about yourself" name="about" form={form} />
      </div>
    </div>
  );
};
export default ChangeInfrormation;

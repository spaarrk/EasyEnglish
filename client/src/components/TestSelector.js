import React, { useContext, useEffect, useRef, useState } from 'react';
import '../Styles/testSelector.css';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import CustomAutoComplete from './Form/CustomAutoComplete';
import { ProfileConstants } from './Profile/Constants';
import { useTranslation } from 'react-i18next';
import { findAll } from '../http/sTopicAPI';
const TestSelector = observer(({ form }) => {
  const [sTopics, setSTopics] = useState();
  const [t] = useTranslation();
  useEffect(() => {
    const fetch = async () => {
      await findAll().then((data) => {
        setSTopics(data);
      });
    };
    fetch();
  }, []);
  return (
    <div className="block_select_level">
      <div className="select_level-container _container">
        <div className="block_drop-down_menu">
          <div className="drop-down_english-level drop-down_menu margin-safety">
            <CustomAutoComplete
              form={form}
              placeholder="B1-Intermediate"
              name="currLevel"
              isMultiple={false}
              nameField={t('test.level')}
              data={ProfileConstants.ENGLISH_LEVEL}
            />
          </div>
          <div className="drop-down_english-level drop-down_menu">
            <CustomAutoComplete
              form={form}
              placeholder="B1-Intermediate"
              name="currTopic"
              isMultiple={false}
              nameField={t('test.topic')}
              data={sTopics}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestSelector;

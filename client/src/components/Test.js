import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import '../Styles/test.css';
import { observer } from 'mobx-react-lite';
import { fetchTest, testList } from '../http/testAPI';
import TestOne from './TestOne';
import { useFormContext } from 'react-hook-form-mui';
import { LEVEL_ENGLISH, LEVEL_ENGLISH_ENUM, TYPE_TEST_NAME_ENUM } from '../utils/testConstants';

const Test = observer(() => {
  const { watch } = useFormContext();
  const level = watch('currLevel');
  const topic = watch('currTopic');
  const [test, setTest] = useState([]);
  useEffect(() => {
    const filters = {
      testType: TYPE_TEST_NAME_ENUM.DEFAULT,
      ...(level ? { level: level.value } : {}),
      ...(topic ? { sTopicId: topic.id } : {}),
    };
    testList(filters).then((data) => {
      setTest(data.rows);
    });
  }, [level, topic]);

  return (
    <div className="choice_test">
      <div className="choice_test-container _container">
        <div className="test-row-card">
          {test.map((testOne, i) => (
            <TestOne key={testOne.id} test={testOne} i={i} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default Test;

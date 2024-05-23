import React, { useState, useContext, useCallback, useEffect } from 'react';
import TestSelector from '../components/TestSelector';
import Test from '../components/Test';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { FormProvider, useForm } from 'react-hook-form';
import { ProfileConstants } from '../components/Profile/Constants';
import '../Styles/exercises.css';
const Exercises = observer(() => {
  const form = useForm({
    defaultValues: {
      currLevel: null,
      currTopic: null,
    },
    mode: 'onChange',
  });
  return (
    <div className="exersises-container">
      <FormProvider {...form}>
        <TestSelector form={form} />
        <Test />
      </FormProvider>
    </div>
  );
});

export default Exercises;

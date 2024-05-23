import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { createTest } from '../../http/testAPI';
import { Context } from '../..';
import { findAll } from '../../http/sTopicAPI.js';
import { FormProvider, SelectElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { findAllTestType } from '../../http/testTypeAPI.js';
import { Box } from '@mui/material';
import { DIFFICULTE, LEVEL_ENGLISH, TYPE_TEST_ENM } from '../../utils/testConstants.js';
import Fields from '../Cards/Card/create/Fields.js';

const CreateTest = ({ show, onHide }) => {
  const { userStore } = useContext(Context);
  const [sTopics, setSTopics] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const answersDefault = [
    {
      content: '',
      isRight: false,
    },
    {
      content: '',
      isRight: false,
    },
    {
      content: '',
      isRight: false,
    },
    {
      content: '',
      isRight: false,
    },
  ];
  const defaultValues = {
    difficulte: '',
    level: '',
    topic: '',
    sTopicId: null,
    description: '',
    testTypeId: null,
    questions: [{ question: '', answers: answersDefault }],
  };
  const form = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
  });
  const dif = form.watch('level');
  useEffect(() => {
    const fetch = async () => {
      await findAll().then((data) => {
        setSTopics(data);
      });
      await findAllTestType().then((data) => {
        setTestTypes(data);
      });
    };
    fetch();
  }, []);
  const addTest = () => {
    form.handleSubmit((data) => {
      setLoadingSubmit(true);
      // topic, difficulte, level, sTopic, testTypeId: 1, userId: userStore.user.id
      const payload = {
        ...data,
        level: LEVEL_ENGLISH.find((item) => item.id === data.level)?.label,
        difficulte: DIFFICULTE.find((item) => item.id === data.difficulte)?.label,
        userId: userStore.user.id,
      };
      console.log('payload = ', payload);
      createTest(payload).finally(() => setLoadingSubmit(false));
    })();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add new test</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider {...form}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '20px' }}>
            <TextFieldElement required fullWidth name="topic" placeholder={'input topic'} />
            <TextFieldElement
              required
              fullWidth
              name="description"
              multiline
              rows={4}
              placeholder={'input description'}
            />
            <SelectElement required label="sTopic" fullWidth name="sTopicId" options={sTopics} />
            <SelectElement required label="Type" fullWidth name="testTypeId" options={testTypes} />
            <SelectElement required label="Level" fullWidth name="level" options={LEVEL_ENGLISH} />
            <SelectElement
              required
              label="Difficulte"
              fullWidth
              name="difficulte"
              options={DIFFICULTE}
            />
            <Fields typeTest={TYPE_TEST_ENM.DEFAULT} />
          </Box>
        </FormProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addTest}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTest;

import React, { useContext, useEffect, useMemo, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Context } from '../..';
import {
  createGrammar,
  fetchGrammar,
  fetchOneGrammar,
  updateGrammarApi,
} from '../../http/grammarAPI';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { FormProvider, SelectElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { fetchOneRule, fetchRule, updateRuleApi } from '../../http/ruleAPI';

const UpdateRule = ({ show, onHide }) => {
  const [step, setStep] = useState(0);

  const form = useForm({
    defaultValues: {
      itemId: null,
      topic: '',
      content: '',
      grammarId: null,
    },
    mode: 'onChange',
  });
  const itemId = form.watch('itemId');
  const [loading, setLoading] = useState(false);
  const [loadingItem, setLoadingItem] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [data, setData] = useState([]);
  const [grammars, setGrammars] = useState([]);
  useEffect(() => {
    if (!show) return;
    const fetch = async () => {
      setLoading(true);
      await fetchRule()
        .then((res) => {
          setData(res);
          fetchGrammar().then((data) => setGrammars(data));
        })
        .finally(() => setLoading(false));
    };
    fetch();
    return () => {
      setStep(0);
    };
  }, [show]);

  useEffect(() => {
    if (!itemId || !show) return;
    setStep(1);
    const fetch = async () => {
      setLoadingItem(true);
      await fetchOneRule(itemId)
        .then((data) => {
          if (!data) return;
          form.setValue('topic', data.topic);
        })
        .finally(() => setLoadingItem(false));
    };
    fetch();
  }, [itemId]);
  const options = useMemo(() => {
    return data.map((oneItem) => ({ id: oneItem.id, label: oneItem.topic }));
  }, [data]);
  const updateGrammar = async () => {
    form.handleSubmit(async (formData) => {
      setLoadingSubmit(true);
      await updateRuleApi(itemId, {
        topic: formData.topic,
        grammarId: formData.grammarId,
        content: formData.content,
      })
        .then(() => {
          setData((prev) =>
            prev.map((it) => {
              if (it.id == itemId) {
                it.topic = formData.topic;
                it.content = formData.content;
              }

              return it;
            })
          );
        })
        .finally(() => setLoadingSubmit(false));
    })();
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update Rule</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormProvider {...form}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={1}>
              <Stack spacing={0.5}>
                <Typography>Select item for update:</Typography>
                <SelectElement name="itemId" options={options} />
              </Stack>

              {step === 1 && (
                <>
                  {loadingItem ? (
                    <CircularProgress />
                  ) : (
                    <Stack spacing={1}>
                      <Stack spacing={0.5}>
                        <Typography>Select grammar </Typography>
                        <SelectElement
                          name="grammarId"
                          options={grammars.map((oneItem) => ({
                            id: oneItem.id,
                            label: oneItem.topic,
                          }))}
                        />
                      </Stack>
                      <Stack spacing={0.5}>
                        <Typography>Enter new topic</Typography>
                        <TextFieldElement required placeholder="topic" name="topic" />
                      </Stack>
                      <Stack spacing={0.5}>
                        <Typography>Enter new content</Typography>
                        <TextFieldElement required placeholder="content" name="content" />
                      </Stack>
                    </Stack>
                  )}
                </>
              )}
            </Stack>
          )}
        </FormProvider>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button
          disabled={step === 0 || loading || loadingItem || loadingSubmit}
          variant="outline-success"
          onClick={updateGrammar}
        >
          {loading || loadingItem || loadingSubmit ? <CircularProgress size={20} /> : 'Update'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRule;

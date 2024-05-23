import React, { useState } from 'react';
import '../Styles/admin.css';
import CreateVocabulary from '../components/modals/CreateVocabulary';
import CreateGrammar from '../components/modals/CreateGrammar';
import CreateTest from '../components/modals/CreateTest';
import '../Styles/bootstrap.min.css';
import CreateRule from '../components/modals/CreateRule';
import CreateQuestion from '../components/modals/CreateQuestion';
import CreateAnswer from '../components/modals/CreateAnswer';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteGrammar from '../components/modals/DeleteGrammar';
import UpdateGrammar from '../components/modals/UpdateGrammar';
import UpdateRule from '../components/modals/UpdateRule';
import DeleteRule from '../components/modals/DeleteRule';

export const Admin = () => {
  const [show, setShow] = useState(false);
  const [grammarVisible, setGrammarVisible] = useState(false);
  const [grammarDeleteVisible, setGrammarDeleteVisible] = useState(false);
  const [grammarUpdateVisible, setGrammarUpdateVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [vocabularyVisible, setVocabularyVisible] = useState(false);
  const [ruleVisible, setRuleVisible] = useState(false);
  const [ruleVisibleUpdate, setRuleVisibleUpdate] = useState(false);
  const [ruleVisibleDelete, setRuleVisibleDelete] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="main_admin">
      <div className="main_container _container">
        <div className="admin_row">
          <Accordion expanded={expanded === '1'} onChange={handleChange('1')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="1-content"
              id="1-header"
            >
              Grammar
            </AccordionSummary>
            <AccordionDetails>
              <div className="admin_item_container">
                <div className="admin_item-name">Add grammar item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setGrammarVisible(true)} className="blue_button-little">
                    Add
                  </div>
                </a>
              </div>
              <div className="admin_item_container">
                <div className="admin_item-name">Update grammar item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setGrammarUpdateVisible(true)} className="blue_button-little">
                    Update
                  </div>
                </a>
              </div>
              <div className="admin_item_container">
                <div className="admin_item-name">Delete grammar item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setGrammarDeleteVisible(true)} className="blue_button-little">
                    Delete
                  </div>
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '2'} onChange={handleChange('2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="2-content"
              id="2-header"
            >
              Rule
            </AccordionSummary>
            <AccordionDetails>
              <div className="admin_item_container">
                <div className="admin_item-name">Add rule item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setRuleVisible(true)} className="blue_button-little">
                    Add
                  </div>
                </a>
              </div>
              <div className="admin_item_container">
                <div className="admin_item-name">Update rule item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setRuleVisibleUpdate(true)} className="blue_button-little">
                    Update
                  </div>
                </a>
              </div>
              <div className="admin_item_container">
                <div className="admin_item-name">Delete rule item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setRuleVisibleDelete(true)} className="blue_button-little">
                    Delete
                  </div>
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '3'} onChange={handleChange('3')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="3-content"
              id="3-header"
            >
              Vocabulary
            </AccordionSummary>
            <AccordionDetails>
              <div className="admin_item_container">
                <div className="admin_item-name">Add vocabulary item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setVocabularyVisible(true)} className="blue_button-little">
                    Add
                  </div>
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '4'} onChange={handleChange('4')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="4-content"
              id="4-header"
            >
              Test
            </AccordionSummary>
            <AccordionDetails>
              <div className="admin_item_container">
                <div className="admin_item-name">Add test item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setTestVisible(true)} className="blue_button-little">
                    Add
                  </div>
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '5'} onChange={handleChange('5')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="5-content"
              id="5-header"
            >
              Question
            </AccordionSummary>
            <AccordionDetails>
              <div className="admin_item_container">
                <div className="admin_item-name">Add question item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setQuestionVisible(true)} className="blue_button-little">
                    Add
                  </div>
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === '6'} onChange={handleChange('6')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="6-content"
              id="6-header"
            >
              Answer
            </AccordionSummary>
            <AccordionDetails>
              <div className="admin_item_container">
                <div className="admin_item-name">Add answer item</div>
                <a className="block_admin-item_button">
                  <div onClick={() => setAnswerVisible(true)} className="blue_button-little">
                    Add
                  </div>
                </a>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <CreateGrammar show={grammarVisible} onHide={() => setGrammarVisible(false)} />
        <DeleteGrammar show={grammarDeleteVisible} onHide={() => setGrammarDeleteVisible(false)} />
        <UpdateGrammar show={grammarUpdateVisible} onHide={() => setGrammarUpdateVisible(false)} />
        <CreateVocabulary show={vocabularyVisible} onHide={() => setVocabularyVisible(false)} />
        <CreateTest show={testVisible} onHide={() => setTestVisible(false)} />
        <CreateRule show={ruleVisible} onHide={() => setRuleVisible(false)} />
        <UpdateRule show={ruleVisibleUpdate} onHide={() => setRuleVisibleUpdate(false)} />
        <DeleteRule show={ruleVisibleDelete} onHide={() => setRuleVisibleDelete(false)} />
        <CreateQuestion show={questionVisible} onHide={() => setQuestionVisible(false)} />
        <CreateAnswer show={answerVisible} onHide={() => setAnswerVisible(false)} />
      </div>
    </div>
  );
};

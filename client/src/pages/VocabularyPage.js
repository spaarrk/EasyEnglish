import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneVocabulary } from '../http/vocabularyAPI';
import '../Styles/vocabularyPage.css';
import { Context } from '..';
import { createProgress } from '../http/userProgresAPI';
const VocabularyPage = observer(() => {
  const [vocabulary, setVocabulary] = useState({ vocabulary: [] });
  const params = useParams();
  const { userStore } = useContext(Context);
  const { id } = userStore.user;
  useEffect(() => {
    fetchOneVocabulary(params.id).then((data) => {
      setVocabulary(data);
      id && createProgress({ userId: id, vocabularyId: data.id });
    });
  }, [id]);
  return (
    <div>
      <div className="vocabularyPage_container _container">
        <div className="vocabularyPage_container-block_title">
          <div className="vocabularyPage_container-img">
            <img src={process.env.REACT_APP_API_URL + vocabulary.img}></img>
          </div>
          <div className="vocabularyPage_container-title">{vocabulary.topic + ' - Topics'}</div>
        </div>
        <div className="vocabularyPage_container-content">{vocabulary.content}</div>
      </div>
    </div>
  );
});

export default VocabularyPage;

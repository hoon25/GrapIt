import React from 'react';
import { StylesManager, Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import axios from 'axios';

import { data1 } from './data1';

StylesManager.applyTheme('defaultV2');

function SurveyComponent() {
  const survey = new Model(data1);
  // survey.onComplete.add((sender, options) => {
  //   console.log(JSON.stringify(sender.data1, null, 3));
  survey.onComplete.add(result => {
    console.log(result.data);
    axios.get('/api/tutorfind', result.data).then(res => {
      console.log(res);
    });
  });
  return <Survey model={survey} />;
}

export default SurveyComponent;

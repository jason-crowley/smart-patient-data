import React from 'react';
import SurveyListItem from './SurveyListItem';
import './SurveyList.css';

export default function SurveyList(props) {
  return (
    <ul className="list">
      <SurveyListItem
        title="Daily Activity Survey"
        description="This survey asks about your daily activity and how you feel about exercise."
        date="01/15/17"
        publisher="Dr. Brown"
      />
      <SurveyListItem
        title="AF Quality of Life Survey"
        description="Measures the effect of atrial fibrillation on quality of life."
        date="05/26/12"
        publisher="St. Jude Medical"
      />
      <SurveyListItem
        title="Test Survey 1"
        description="Testing testing 123..."
        date="11/01/18"
        publisher="Dr. Jones"
        experimental
      />
    </ul>
  );
};

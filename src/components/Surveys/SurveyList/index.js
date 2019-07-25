import React from 'react';
import './SurveyList.css';

export default function SurveyList(props) {
  return (
    <div className="list">
      <div className="list__item">
        <h2>Daily Activity Survey</h2>
        <p>This survey asks about your daily activity and how you feel about exercise.</p>
        <p>Created: 01/15/17</p>
        <p>Publisher: Dr. Brown</p>
      </div>
      <div className="list__item">
        <h2>AF Quality of Life Survey</h2>
        <p>Measures the effect of atrial fibrillation on quality of life.</p>
        <p>Created: 05/26/12</p>
        <p>Publisher: St. Jude Medical</p>
      </div>
      <div className="list__item">
        <h2>Test Survey 1</h2>
        <p>Testing testing 123...</p>
        <p>Created: 11/01/18</p>
        <p>Publisher: Dr. Jones</p>
      </div>
    </div>
  );
};

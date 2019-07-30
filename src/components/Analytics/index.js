import React from 'react';
import './Analytics.css';

export default function Analytics(props) {
  return (
    <div className="Analytics">
      <h1>Analytics</h1>
      <div className="Analytics__pghd">
        <h2>PGHD</h2>
        <div>
          <h3>Surveys Chart</h3>
        </div>
        <div>
          <h3>Activity Chart</h3>
        </div>
        <div>
          <h3>Sleep Chart</h3>
        </div>
        <div>
          <h3>Blood Pressure Chart</h3>
        </div>
      </div>
      <div className="Analytics__ehr">
        <h2>EHR</h2>
        <div>
          <h3>Blood Pressure</h3>
        </div>
        <div>
          <h3>Conditions</h3>
        </div>
        <div>
          <h3>Lab Test (Glucose)</h3>
        </div>
        <div>
          <h3>Body Weight</h3>
        </div>
      </div>
    </div>
  );
};

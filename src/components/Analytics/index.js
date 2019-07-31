import React from 'react';
import ResponseItem from 'models/ResponseItem';
import AnalyticsChart from './AnalyticsChart';
import './Analytics.css';

const data = [
  new ResponseItem({ id: 'id1', date: '2019-01-20', value: 503, code: '' }),
  new ResponseItem({ id: 'id2', date: '2019-01-21', value: 291, code: '' }),
  new ResponseItem({ id: 'id3', date: '2019-01-22', value: 817, code: '' }),
  new ResponseItem({ id: 'id4', date: '2019-01-23', value: 582, code: '' }),
];

export default function Analytics(props) {
  return (
    <div className="Analytics">
      <header className="Analytics__header">
        <h1>Analytics</h1>
      </header>
      <div className="Analytics__pghd">
        <h2>PGHD</h2>
        <div className="Analytics__pghd-charts">
          <AnalyticsChart title="Surveys Chart" data={data} />
          <AnalyticsChart title="Activity Chart" data={data} />
          <AnalyticsChart title="Sleep Chart" data={data} />
          <AnalyticsChart title="Blood Pressure Chart" data={data} />
        </div>
      </div>
      <div className="Analytics__ehr">
        <h2>EHR</h2>
        <form>
          <ul className="Analytics__ehr-checkboxes">
            <li>
              <label>
                <input type="checkbox" />
                {' '} Surveys
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                {' '} Activity
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                {' '} Sleep
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                {' '} Blood Pressure
              </label>
            </li>
          </ul>
        </form>
        <h3>Blood Pressure</h3>
        <h3>Conditions</h3>
        <h3>Lab Test (Glucose)</h3>
        <h3>Body Weight</h3>
      </div>
    </div>
  );
};

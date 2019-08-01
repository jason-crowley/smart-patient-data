import React from 'react';
import useObservationData from 'hooks/useObservationData';
import ResponseItem from 'models/ResponseItem';
import AnalyticsChart from './AnalyticsChart';
import AnalyticsEvents from './AnalyticsEvents';
import './Analytics.css';

export default function Analytics(props) {
  const { isLoading, isError, observations } =
    useObservationData('030b3765-844c-4cc1-a36f-974c37895eee');

  return (
    <div className="Analytics">
      <h1 className="Analytics__header">Analytics</h1>
      <div className="Analytics__pghd">
        <h2>PGHD</h2>
        {
          (isLoading && <h2>Loading...</h2>) ||
          (isError && <h2>There was an error processing your request.</h2>) ||
          <div className="Analytics__pghd-charts">
            {Object.entries(observations).map(([key, obs]) => {
              const data = obs.map(ResponseItem.from);
              return <AnalyticsChart key={key} data={data} />;
            })}
          </div>
        }
      </div>
      <div className="Analytics__ehr">
        <h2>EHR Events</h2>
        <AnalyticsEvents>
          {['Blood Pressure', 'Conditions', 'Lab Test (Glucose)', 'Body Weight']}
        </AnalyticsEvents>
      </div>
    </div>
  );
};

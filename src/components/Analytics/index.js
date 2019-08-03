import React from 'react';
// import useObservationData from 'hooks/useObservationData';
import usePatientData from 'hooks/usePatientData';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import AnalyticsChart from './AnalyticsChart';
import AnalyticsEvents from './AnalyticsEvents';
import './Analytics.css';

const events = [
  {
    category: 'MedicationRequest',
    events: [
      new Event({
        category: 'MedicationRequest',
        code: {
          coding: [
            {
              system: 'http://loinc.org',
              code: '34921-33',
              display: 'Diabetes',
            },
          ],
        },
        startDate: '2019-05-10',
      }),
    ],
  },
  {
    category: 'Condition',
    events: [],
  },
  {
    category: 'Encounter',
    events: [],
  },
  {
    category: 'Observation',
    events: [],
  },
];

const PATIENT_ID = '030b3765-844c-4cc1-a36f-974c37895eee';
const RESOURCE_TYPES = [
  'Observation',
  'MedicationRequest',
  'Condition',
  'Encounter',
];

export default function Analytics(props) {
  const { isLoading, isError, data } =
    usePatientData(PATIENT_ID, RESOURCE_TYPES);

  return (
    <div className="Analytics">
      <h1 className="Analytics__header">Analytics</h1>
      <main className="Analytics__pghd">
        <h2>PGHD</h2>
        {
          (isLoading && <h2>Loading...</h2>) ||
          (isError && <h2>There was an error processing your request.</h2>) ||
          console.log(data)
          // <div className="Analytics__pghd-charts">
          //   {Object.entries(observations).map(([key, obs]) => {
          //     const data = obs.map(ResponseItem.from);
          //     return <AnalyticsChart key={key} data={data} />;
          //   })}
          // </div>
        }
      </main>
      <aside className="Analytics__ehr">
        <h2>EHR Events</h2>
        <AnalyticsEvents>
          {events}
        </AnalyticsEvents>
      </aside>
    </div>
  );
};

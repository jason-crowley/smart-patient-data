import React from 'react';
import usePatientData from 'hooks/usePatientData';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import AnalyticsChart from './AnalyticsChart';
import AnalyticsEvents from './AnalyticsEvents';
import { find, propEq, filter, has, pipe, path, groupBy, compose, not, map } from 'ramda';
import './Analytics.css';

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
  let grouped;
  let events;
  if (!isLoading && !isError) {
    const { resources } = find(propEq('resourceType', 'Observation'), data);
    const filtered = filter(has('valueQuantity'), resources);
    const getKey = pipe(
      path(['code', 'coding']),
      codings => codings[0],
      coding => coding.system + '|' + coding.code,
    );
    grouped = groupBy(getKey, filtered);
    const filterNotObs = filter(compose(not, propEq('resourceType', 'Observation')));
    const mapToEvents = map(({ resourceType: category, resources }) => {
      const events = map(Event.from, resources);
      return { category, events };
    });
    events = pipe(filterNotObs, mapToEvents)(data);
  }

  return (
    <div className="Analytics">
      <h1 className="Analytics__header">Analytics</h1>
      <main className="Analytics__pghd">
        <h2>PGHD</h2>
        {
          (isLoading && <h2>Loading...</h2>) ||
          (isError && <h2>There was an error processing your request.</h2>) ||
          <div className="Analytics__pghd-charts">
            {Object.entries(grouped).map(([key, obs]) => {
              const data = obs.map(ResponseItem.from);
              return <AnalyticsChart key={key} data={data} />;
            })}
          </div>
        }
      </main>
      <aside className="Analytics__ehr">
        <h2>EHR Events</h2>
        <AnalyticsEvents>
          {events || []}
        </AnalyticsEvents>
      </aside>
    </div>
  );
};

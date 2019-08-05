import React from 'react';
import usePatientData from 'hooks/usePatientData';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import AnalyticsChart from './AnalyticsChart';
import AnalyticsEvents from './AnalyticsEvents';
import { find, propEq, filter, has, pipe, compose, not, map } from 'ramda';
import groupByCodeKey from 'utils/groupByCodeKey';
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

  // Display loading and error messages
  if (isLoading)
    return <h2>Loading...</h2>;
  if (isError)
    return <h2>There was an error processing your request.</h2>;

  // PGHD
  const { resources } = find(propEq('resourceType', 'Observation'), data);
  const filtered = filter(has('valueQuantity'), resources);
  const grouped = groupByCodeKey(filtered);

  // EHR
  const filterNotObs = filter(compose(not, propEq('resourceType', 'Observation')));
  const mapToGroupedEvents = map(({ resourceType: category, resources }) => {
    const events = map(Event.from, resources);
    const groupedEvents = groupByCodeKey(events);
    return { category, groupedEvents };
  });
  const events = pipe(filterNotObs, mapToGroupedEvents)(data);

  return (
    <div className="Analytics">
      <h1 className="Analytics__header">Analytics</h1>
      <main className="Analytics__pghd">
        <h2>PGHD</h2>
        <div className="Analytics__pghd-charts">
          {Object.entries(grouped).map(([key, obs]) => {
            const data = obs.map(ResponseItem.from);
            return <AnalyticsChart key={key} data={data} />;
          })}
        </div>
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

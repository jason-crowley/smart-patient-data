import React, { useState, useReducer } from 'react';
import usePatientData from 'hooks/usePatientData';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import AnalyticsContext from './AnalyticsContext';
import AnalyticsVictoryChart from './AnalyticsVictoryChart';
import AnalyticsEvents from './AnalyticsEvents';
import eventReducer from 'reducers/eventReducer';
import { propEq, has, compose, not, flatten, values, pick } from 'ramda';
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

  const [eventKeys, dispatch] = useReducer(eventReducer, new Set());
  const [active, setActive] = useState(null);

  // Display loading and error messages
  if (isLoading)
    return <h2>Loading...</h2>;
  if (isError)
    return <h2>There was an error processing your request.</h2>;

  // PGHD
  const { resources: responseResources } =
    data.find(propEq('resourceType', 'Observation'));
  const filtered = responseResources.filter(has('valueQuantity'));
  const responseItems = filtered.map(ResponseItem.from);
  const responseItemsByKey = groupByCodeKey(responseItems);

  // EHR
  const eventData = [];
  const eventBundles =
    data.filter(compose(not, propEq('resourceType', 'Observation')));
  const eventsByCategory =
    eventBundles.map(({ resourceType: category, resources }) => {
      const events = resources.map(Event.from);
      const eventsByKey = groupByCodeKey(events);
      eventsByKey.forEach(({ key, grouping }) => {
        if (eventKeys.has(key)) {
          eventData.push(...grouping);
        }
      });
      return { category, eventsByKey };
    });

  return (
    <div className="Analytics">
      <h1 className="Analytics__header">Analytics</h1>
      <main className="Analytics__pghd">
        <h2>PGHD</h2>
        {
          (active)
            ? (
              <h3 onClick={() => setActive(null)}>
                Click here to return
              </h3>
            ) : (
              <div className="Analytics__pghd-charts">
                {responseItemsByKey.map(({ key, grouping: data }) => {
                  return (
                    <AnalyticsVictoryChart
                      key={key}
                      data={{
                        responseItems: data,
                        events: eventData,
                      }}
                      onClick={() => setActive(key)}
                    />
                  );
                })}
              </div>
            )
        }
      </main>
      <aside className="Analytics__ehr">
        <h2>EHR Events</h2>
        <AnalyticsContext.Provider value={dispatch}>
          <AnalyticsEvents eventsByCategory={eventsByCategory} />
        </AnalyticsContext.Provider>
      </aside>
    </div>
  );
};

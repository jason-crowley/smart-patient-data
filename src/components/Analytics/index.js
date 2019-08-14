import React, { useState, useReducer } from 'react';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import AnalyticsContext from './AnalyticsContext';
import AnalyticsFocusVictoryChart from './AnalyticsFocusVictoryChart';
import AnalyticsVictoryChart from './AnalyticsVictoryChart';
import AnalyticsEvents from './AnalyticsEvents';
import eventReducer from 'reducers/eventReducer';
import { propEq, has, compose, not } from 'ramda';
import groupByCodeKey from 'utils/groupByCodeKey';
import './Analytics.css';

export default function Analytics({ data }) {
  const [eventKeys, dispatch] = useReducer(eventReducer, new Set());
  const [focus, setFocus] = useState(null);

  // PGHD
  const { resources: responseResources } =
    data.find(propEq('resourceType', 'Observation'));
  const filtered = responseResources.filter(has('valueQuantity'));
  const responseItems = filtered.map(ResponseItem.from);
  const responseItemsByKey = groupByCodeKey(responseItems);
  const responseItemsByFocusKey =
    responseItemsByKey.find(({ key }) => key === focus);
  const responseItemsForFocus =
    responseItemsByFocusKey && responseItemsByFocusKey.grouping;

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
          eventData.push(grouping);
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
          (focus)
            ? (
              <AnalyticsFocusVictoryChart
                data={{
                  responseItems: responseItemsForFocus,
                  eventData,
                }}
                onClick={() => setFocus(null)}
              />
            ) : (
              <div className="Analytics__pghd-charts">
                {responseItemsByKey.map(({ key, grouping }) => {
                  return (
                    <AnalyticsVictoryChart
                      key={key}
                      animate={{ duration: 1500 }}
                      data={{
                        responseItems: grouping,
                        eventData,
                      }}
                      onClick={() => setFocus(key)}
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

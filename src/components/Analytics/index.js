import React, { useState, useReducer } from 'react';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import AnalyticsFocusVictoryChart from './AnalyticsFocusVictoryChart';
import AnalyticsVictoryChart from './AnalyticsVictoryChart';
import AnalyticsEvents from './AnalyticsEvents';
import eventReducer from 'reducers/eventReducer';
import { propEq, has, compose, not } from 'ramda';
import groupByCodeKey from 'utils/groupByCodeKey';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './Analytics.css';

const useStyles = makeStyles(theme => ({
  eventsHeader: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export default function Analytics({ data }) {
  const [eventKeys, dispatch] = useReducer(eventReducer, new Set());
  const [focus, setFocus] = useState(null);
  const classes = useStyles();

  // PGHD
  const { resources: responseResources = [] } =
    data.find(propEq('resourceType', 'Observation')) || {};
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
      <main className="Analytics__pghd">
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
      <Paper className="Analytics__ehr" component="aside">
        <Typography
          className={classes.eventsHeader}
          variant="h5"
          component="h2"
        >
          EHR Events
        </Typography>
        <AnalyticsContext.Provider value={dispatch}>
          <AnalyticsEvents eventsByCategory={eventsByCategory} />
        </AnalyticsContext.Provider>
      </Paper>
    </div>
  );
};

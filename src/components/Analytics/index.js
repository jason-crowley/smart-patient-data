import React, { useState, useReducer } from 'react';
import ResponseItem from 'models/ResponseItem';
import Event from 'models/Event';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import AnalyticsFocusVictoryChart from './AnalyticsFocusVictoryChart';
import AnalyticsChartCard from './AnalyticsChartCard';
import AnalyticsEvents from './AnalyticsEvents';
import eventReducer from 'reducers/eventReducer';
import { propEq, has, compose, not } from 'ramda';
import groupByCodeKey from 'utils/groupByCodeKey';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

function makeMaxHeight(theme, top = 0) {
  const spacing = theme.spacing(3) - top;
  return {
    position: 'relative',
    top,
    maxHeight: `calc(100vh - 56px + ${spacing}px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      maxHeight: `calc(100vh - 48px + ${spacing}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight:  `calc(100vh - 64px + ${spacing}px)`,
    },
    overflow: 'scroll',
  };
}

const useStyles = makeStyles(theme => ({
  analytics: {
    padding: theme.spacing(0, 3),
  },
  focusChart: {
    marginTop: theme.spacing(3),
  },
  chartsContainer: {
    ...makeMaxHeight(theme, theme.spacing(1.5)),
  },
  eventsList: {
    ...makeMaxHeight(theme),
    margin: theme.spacing(3, 0),
    padding: theme.spacing(2),
  },
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
    <div className={classes.analytics}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <main className="Analytics__pghd">
            {
              (focus)
                ? (
                  <div className={classes.focusChart}>
                    <AnalyticsFocusVictoryChart
                      data={{
                        responseItems: responseItemsForFocus,
                        eventData,
                      }}
                      onClick={() => setFocus(null)}
                    />
                  </div>
                ) : (
                  <div className="Analytics__pghd-charts">
                    <Grid
                      className={classes.chartsContainer}
                      container
                      spacing={3}
                    >
                      {responseItemsByKey.map(({ key, grouping }) => {
                        return (
                          <Grid item xs={6}>
                            <AnalyticsChartCard
                              key={key}
                              animate={{ duration: 1500 }}
                              data={{
                                responseItems: grouping,
                                eventData,
                              }}
                              onClick={() => setFocus(key)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                )
            }
          </main>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.eventsList} component="aside">
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
        </Grid>
      </Grid>
    </div>
  );
};

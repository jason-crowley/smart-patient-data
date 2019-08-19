import React from 'react';
import AnalyticsEventsList from '../AnalyticsEventsList';
import Typography from '@material-ui/core/Typography';

export default function AnalyticsEventsCategory({ category, eventsByKey }) {
  const { length } = eventsByKey;
  return (
    <div>
      <Typography variant="h6" component="h3">
        {category} {length > 1 && ' (' + length + ')'}
      </Typography>
      <AnalyticsEventsList eventsByKey={eventsByKey} />
    </div>
  );
};

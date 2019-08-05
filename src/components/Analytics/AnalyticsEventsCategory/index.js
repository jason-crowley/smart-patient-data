import React from 'react';
import AnalyticsEventsList from '../AnalyticsEventsList';

export default function AnalyticsEventsCategory({ category, eventsByKey }) {
  const { length } = eventsByKey;
  return (
    <div>
      <h3>{category} {length > 1 && ' (' + length + ')'}</h3>
      <AnalyticsEventsList eventsByKey={eventsByKey} />
    </div>
  );
};

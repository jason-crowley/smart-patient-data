import React from 'react';
import AnalyticsEventsCategory from '../AnalyticsEventsCategory';
import './AnalyticsEvents.css';

export default function AnalyticsEvents({ eventsByCategory }) {
  return (
    <form>
      {eventsByCategory.map(eventsCategory => {
        const { category } = eventsCategory;
        return (
          <AnalyticsEventsCategory
            key={category}
            {...eventsCategory}
          />
        );
      })}
    </form>
  );
};

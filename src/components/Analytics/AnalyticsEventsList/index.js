import React from 'react';
import './AnalyticsEventsList.css';

export default function AnalyticsEventsList({ eventsByKey }) {
  return (
    <ol className="AnalyticsEventsList__checkboxes">
      {
        // The first event of each group serves as a "representative"
        // containing that group's shared display text
        eventsByKey.map(({ key, grouping: events }) => {
          const { 0: firstEvent, length } = events;
          const { display } = firstEvent.code.coding[0];
          return (
            <li key={key}>
              <label>
                <input
                  type="checkbox"
                  onClick={() => console.log(events)}
                />
                {' ' + display} {length > 1 && ' (' + length + ')'}
              </label>
            </li>
          );
        })
      }
    </ol>
  );
};

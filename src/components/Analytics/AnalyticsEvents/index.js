import React, { Fragment } from 'react';
import './AnalyticsEvents.css';

export default function AnalyticsEvents({ children }) {
  return (
    <form>
      {children.map(({ category, groupedEvents }) => (
        <Fragment key={category}>
          <h3 key={category + '-header'}>
            {`${category} (${Object.keys(groupedEvents).length})`}
          </h3>
          <ul
            className="AnalyticsEvents__checkbox-list"
            key={category + '-list'}
          >
            {
              // The first event of each group serves as a "representative"
              // containing that group's shared display text
              Object.entries(groupedEvents).map(([key, events]) => {
                const firstEvent = events[0];
                const { display } = firstEvent.code.coding[0];
                return (
                  <li key={key}>
                    <label>
                      <input
                        type="checkbox"
                        onClick={() => console.log(events)}
                      />
                      {' ' + display}
                    </label>
                  </li>
                );
              })
            }
          </ul>
        </Fragment>
      ))}
    </form>
  );
};

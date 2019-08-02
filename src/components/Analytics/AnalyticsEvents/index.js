import React, { Fragment } from 'react';
import './AnalyticsEvents.css';

export default function AnalyticsEvents({ children }) {
  return (
    <form>
      {children.map(({ category, events }) => (
        <Fragment key={category}>
          <h3 key={category + '-header'}>
            {`${category} (${events.length})`}
          </h3>
          <ul
            className="AnalyticsEvents__checkbox-list"
            key={category + '-list'}
          >
            {events.map(({ code: { coding: [{ system, code, display }] } }) => (
              <li key={system + '|' + code}>
                <label>
                  <input type="checkbox" />
                  {' ' + display}
                </label>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </form>
  );
};

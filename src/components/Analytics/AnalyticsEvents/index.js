import React from 'react';
import './AnalyticsEvents.css';

export default function AnalyticsEvents({ children }) {
  return (
    <form>
      <ul className="AnalyticsEvents__checkbox-list">
        {children.map(child => (
          <li key={child}>
            <label>
              <input type="checkbox" />
              {' ' + child}
            </label>
          </li>
        ))}
      </ul>
    </form>
  );
};

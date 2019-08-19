import React, { useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './AnalyticsEventsList.css';

export default function AnalyticsEventsList({ eventsByKey }) {
  const dispatch = useContext(AnalyticsContext);
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
              <FormControlLabel
                control={<Checkbox onChange={() => dispatch({ key })} />}
                label={display + (length > 1 ? ' (' + length + ')' : '')}
              />
            </li>
          );
        })
      }
    </ol>
  );
};

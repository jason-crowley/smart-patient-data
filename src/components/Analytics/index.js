import React, { useState, useEffect } from 'react';
import ResponseItem from 'models/ResponseItem';
import AnalyticsChart from './AnalyticsChart';
import FHIR from 'fhirclient';
import { pipe, map, prop, filter, has, path, groupBy } from 'ramda';
import './Analytics.css';

const client = FHIR.client('https://r4.smarthealthit.org');

export default function Analytics(props) {
  const [observations, setObservations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchObservations = async () => {
      setIsError(false);
      setIsLoading(true);
      let url = 'Observation?patient=Patient/030b3765-844c-4cc1-a36f-974c37895eee';
      const entries = [];

      // Try to fetch all observations for a given patient
      try {
        while (url) {
          const { entry, link } = await client.request(url);
          entries.push(...entry);
          // Assign 'url' to the url of the link with relation 'next',
          // if there is one. Otherwise, 'url' will be assigned to undefined
          ({ url } = link.find(({ relation }) => relation === 'next') || {});
        }
        const observations = pipe(
          map(prop('resource')),
          filter(has('valueQuantity')),
        )(entries);
        const getKey = pipe(
          path(['code', 'coding']),
          codings => codings[0],
          coding => coding.system + '|' + coding.code,
        );
        const grouped = groupBy(getKey, observations);
        console.log(grouped);
        setObservations(grouped);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchObservations();
  }, []);

  return (
    (isLoading && <h2>Loading...</h2>) ||
    (isError && <h2>There was an error processing your request.</h2>) ||
    <div className="Analytics">
      <header className="Analytics__header">
        <h1>Analytics</h1>
      </header>
      <div className="Analytics__pghd">
        <h2>PGHD</h2>
        <div className="Analytics__pghd-charts">
          {Object.entries(observations).map(([key, obs]) => {
            const data = map(ResponseItem.from, obs);
            return <AnalyticsChart key={key} data={data} />;
          })}
        </div>
      </div>
      <div className="Analytics__ehr">
        <h2>EHR Events</h2>
        <form>
          <ul className="Analytics__ehr-checkboxes">
            <li>
              <label>
                <input type="checkbox" />
                {' '} Surveys
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                {' '} Activity
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                {' '} Sleep
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" />
                {' '} Blood Pressure
              </label>
            </li>
          </ul>
        </form>
        <h3>Blood Pressure</h3>
        <h3>Conditions</h3>
        <h3>Lab Test (Glucose)</h3>
        <h3>Body Weight</h3>
      </div>
    </div>
  );
};

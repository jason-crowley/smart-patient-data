import { useState, useEffect } from 'react';
import FHIR from 'fhirclient';
import { pipe, map, prop, filter, has, path, groupBy } from 'ramda';

const useObservationData = patientId => {
  const [observations, setObservations] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const client = FHIR.client('https://r4.smarthealthit.org');

    const fetchObservations = async () => {
      setIsError(false);
      setIsLoading(true);
      let url = `Observation?patient=Patient/${patientId}`;
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
  }, [patientId]);

  return { isLoading, isError, observations };
};

export default useObservationData;

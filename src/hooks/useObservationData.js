import { useEffect, useReducer } from 'react';
import fetchReducer from 'reducers/fetchReducer';
import FHIR from 'fhirclient';
import { pipe, map, prop, filter, has, path, groupBy } from 'ramda';

const useObservationData = patientId => {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    observations: {},
  });

  useEffect(() => {
    const client = FHIR.client('https://r4.smarthealthit.org');

    const fetchObservations = async () => {
      let url = `Observation?patient=Patient/${patientId}`;
      const entries = [];

      // Try to fetch all observations for a given patient
      dispatch({ type: 'FETCH_INIT' });
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
        dispatch({ type: 'FETCH_SUCCESS', payload: groupBy(getKey, observations) });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', reason: err });
      }
    };

    fetchObservations();
  }, [patientId]);

  return state;
};

export default useObservationData;

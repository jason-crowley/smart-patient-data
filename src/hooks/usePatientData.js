import { useEffect, useReducer } from 'react';
import fetchReducer from 'reducers/fetchReducer';
import FHIR from 'fhirclient';
import { map, prop } from 'ramda';

const useFhirBundle = (patientId, resourceTypes) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const client = FHIR.client('https://r4.smarthealthit.org');

    const fetchData = async resourceType => {
      let url = `${resourceType}?patient=Patient/${patientId}`;
      const entries = [];

      // Try to fetch all FHIR resources of type 'resourceType' for a given patient
      dispatch({ type: 'FETCH_INIT' });
      try {
        while (url) {
          const { entry, link } = await client.request(url);
          entries.push(...entry);
          // Assign 'url' to the url of the link with relation 'next',
          // if there is one. Otherwise, 'url' will be assigned to undefined
          ({ url } = link.find(({ relation }) => relation === 'next') || {});
        }
        const resources = map(prop('resource'), entries);
        const bundle = { type: resourceType, data: resources };
        dispatch({ type: 'FETCH_ACCUMULATE', payload: bundle });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', reason: err });
      }
    };

    Promise.all(map(fetchData, resourceTypes))
      .then(() => dispatch({ type: 'FETCH_SUCCESS' }))
      .catch(() => dispatch({ type: 'FETCH_FAILURE' }));
  }, [patientId, resourceTypes]);

  return state;
};

export default useFhirBundle;

import { useEffect, useReducer } from 'react';
import fetchReducer from 'reducers/fetchReducer';
import { oauth2 as SMART } from 'fhirclient';
import { prop, propEq } from 'ramda';

const usePatientData = resourceTypes => {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const fetchData = async resourceType => {
      // Try to fetch all resources of type 'resourceType' for patient
      dispatch({ type: 'FETCH_INIT' });
      try {
        const client = await SMART.ready();
        const { id } = client.patient;
        let url = `${resourceType}?_count=250&patient=Patient/${id}`;
        const entries = [];
        while (url) {
          const { entry, link } = await client.request(url);
          entries.push(...entry);
          // Assign 'url' to the url of the link with relation 'next',
          // if there is one. Otherwise, 'url' will be undefined
          ({ url } = link.find(propEq('relation', 'next')) || {});
        }
        const resources = entries.map(prop('resource'));
        const bundle = { resourceType, resources };
        dispatch({ type: 'FETCH_ACCUMULATE', payload: bundle });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', reason: err });
      }
    };

    Promise.all(resourceTypes.map(fetchData))
      .then(() => dispatch({ type: 'FETCH_SUCCESS' }))
      .catch(err => dispatch({ type: 'FETCH_FAILURE', reason: err }));
  }, [resourceTypes]);

  return state;
};

export default usePatientData;

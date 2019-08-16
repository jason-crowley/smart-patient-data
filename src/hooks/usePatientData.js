import { useEffect, useReducer } from 'react';
import fetchReducer from 'reducers/fetchReducer';
import { oauth2 as SMART } from 'fhirclient';
import { curry, map } from 'ramda';

const usePatientData = resourceTypes => {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const fetchTypeWith = async (client, resourceType) => {
      const { id } = client.patient;
      const resourceUri = `${resourceType}?patient=Patient/${id}`;
      const resources = await client.request(resourceUri, {
        pageLimit: 0,
        flat: true,
      });
      return { resourceType, resources };
    };

    dispatch({ type: 'FETCH_INIT' });
    SMART.ready()
      .then(client => curry(fetchTypeWith)(client))
      .then(fetchType => Promise.all(map(fetchType, resourceTypes)))
      .then(payload => dispatch({ type: 'FETCH_SUCCESS', payload }))
      .catch(err => dispatch({ type: 'FETCH_FAILURE', reason: err }));
  }, [resourceTypes]);

  return state;
};

export default usePatientData;

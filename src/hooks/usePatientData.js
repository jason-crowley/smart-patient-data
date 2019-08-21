import { useEffect, useReducer } from 'react';
import fetchReducer from 'reducers/fetchReducer';

const usePatientData = (client, resourceTypes) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    isLoading: true,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const fetchType = async resourceType => {
      const { id } = client.patient;
      const resourceUri = `${resourceType}?patient=Patient/${id}`;
      const resources = await client.request(resourceUri, {
        pageLimit: 0,
        flat: true,
      });
      return { resourceType, resources };
    };

    dispatch({ type: 'FETCH_INIT' });
    Promise.all(resourceTypes.map(fetchType))
      .then(payload => dispatch({ type: 'FETCH_SUCCESS', payload }))
      .catch(err => dispatch({ type: 'FETCH_FAILURE', reason: err }));
  }, [client, resourceTypes]);

  return state;
};

export default usePatientData;

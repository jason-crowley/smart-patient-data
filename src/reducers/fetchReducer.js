const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      console.error(action.reason);
      return {
        isLoading: false,
        isError: true,
        data: [],
      };
    default:
      throw new Error(`Action of type '${action.type}' is not recognized.`);
  }
};

export default fetchReducer;

import reduxString from '../reduxString';
const initialState = {
  loading: false,
  data: null,
  error: null,
};
const sim_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case reduxString.GET_FILTER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case reduxString.GET_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case reduxString.REMOVE_FILTER_ERROR:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case reduxString.REMOVE_FILTER_DATA:
      return state;
    default:
      return state;
  }
};
export default sim_reducer;

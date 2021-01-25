import reduxString from '../reduxString';
const initialState = {
  loading_state: false,
  error_state: '',
  data_state: [],
};
const get_state_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_STATE_LOADING:
      return {
        ...state,
        loading_state: true,
      };
    case reduxString.GET_STATE_SUCCESS:
      return {
        loading_state: false,
        error_state: '',
        data_state: action.data,
      };
    case reduxString.GET_STATE_FAILED:
      return {
        ...state,
        loading_state: false,
        error_state: action.error,
      };
    case reduxString.GET_STATE_RESET:
      return state;
    default:
      return state;
  }
};
export default get_state_reducer;

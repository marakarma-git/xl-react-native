import reduxString from '../reduxString';

const initialState = {
  loading_state_lock: false,
  error_state_lock: '',
  data_state_lock: [],
};
const get_state_lock_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_STATE_LOADING:
      return {
        ...state,
        loading_state_lock: true,
      };
    case reduxString.GET_STATE_LOCK_SUCCESS:
      return {
        loading_state_lock: false,
        error_state_lock: '',
        data_state_lock: action.data,
      };
    case reduxString.GET_STATE_LOCK_FAILED:
      return {
        ...state,
        loading_state_lock: false,
        error_state_lock: action.error,
      };
    case reduxString.GET_STATE_LOCK_RESET:
      return state;
    default:
      return state;
  }
};
export default get_state_lock_reducer;

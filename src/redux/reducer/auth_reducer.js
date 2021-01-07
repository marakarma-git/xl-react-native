import reduxString from '../reduxString';
const initialState = {
  loading: false,
  error: '',
  data: {},
};
const auth_reducers = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case reduxString.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case reduxString.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case reduxString.AUTH_LOGOUT:
      return {
        ...state,
        data: {}
      };
    default:
      return state;
  }
};
export default auth_reducers;

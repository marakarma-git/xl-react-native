import reduxString from '../reduxString';
const initialState = {
  loading: false,
  error: '',
  data: {},
  titleVersion: null,
  alreadyRequest: false
};
const auth_reducers = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        alreadyRequest: true
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
        error: '',
        alreadyRequest: false,
      };
    case reduxString.AUTH_LOGOUT:
      return {
        ...state,
        data: {},
      };
    case reduxString.GET_TITLE_VERSION:
      return {
        ...state,
        titleVersion: action.payload,
      };
    case reduxString.GET_TITLE_VERSION_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default auth_reducers;

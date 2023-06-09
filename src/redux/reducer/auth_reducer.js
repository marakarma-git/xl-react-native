import reduxString from '../reduxString';
const initialState = {
  loading: false,
  error: '',
  data: {},
  titleVersion: null,
  alreadyRequest: false,
  isLoggedIn: false,
  afterLogin: false,
  homeLogin: false,
  multiSessionMsg: "",
  isMultiSessionDetected: false,
  isErricson: false,
  isSessionExpired: false,
};

const auth_reducers = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        alreadyRequest: true,
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
        isLoggedIn: true,
        afterLogin: true,
        isMultiSessionDetected: false,
        multiSessionMsg: ""
      };
    case reduxString.SET_FALSE_AFTER_LOGIN: 
      return {
        ...state,
        afterLogin: false
      }
    case reduxString.AUTH_LOGOUT:
      return {
        ...state,
        data: {},
        alreadyRequest: false,
        isLoggedIn: false,
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
    case reduxString.UPDATE_CUSTOMER_CONSENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case reduxString.UPDATE_CUSTOMER_CONSENT:
      return {
        ...state,
        data: payload,
      };
    case reduxString.HOME_LOGIN:
      return{
        ...state,
        homeLogin: true
      }
    case reduxString.SET_MULTI_SESSION_DETECTED: 
      return{
        ...state,
        isMultiSessionDetected: true,
        multiSessionMsg: action.payload,
        loading: false
      }
    case reduxString.RESET_MULTI_SESSION_DETECTED: 
      return{
        ...state,
        isMultiSessionDetected: false,
        multiSessionMsg: "",
        loading: false
      }
    case reduxString.SET_IS_ERRICSON: 
      return{
        ...state,
        isErricson: action.payload
      }
    case reduxString.SET_SESSION_EXPIRED:
      return{
        ...state,
        isSessionExpired: true,
      }
    case reduxString.CLEAR_SESSION_EXPIRED_FLAG:
      return{
        ...state,
        isSessionExpired: false,
      }
    default:
      return state;
  }
};
export default auth_reducers;

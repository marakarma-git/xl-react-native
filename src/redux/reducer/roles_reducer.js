import reduxString from '../reduxString';

const initialState = {
  loading: false,
  error: '',
  data_active_roles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case reduxString.ROLES_REQUEST_DATA:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case reduxString.ROLES_GET_ACTIVE_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        data_active_roles: action.payload,
      };
    case reduxString.ROLES_GET_ACTIVE_ROLES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data_active_roles: [],
      };
    case reduxString.RESET_ROLES_DATA:
      return {
        ...state,
        data_active_roles: [],
      };

    default:
      return state;
  }
};

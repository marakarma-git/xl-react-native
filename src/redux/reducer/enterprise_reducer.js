import reduxString from '../reduxString';

const initialState = {
  loading: false,
  error: '',
  imageBase64: null,
  statusCode: null,
};
const enterprise_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_ENTERPRISE_LOGO:
      return {
        ...state,
        loading: true,
      };
    case reduxString.GET_ENTERPRISE_LOGO_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case reduxString.GET_ENTERPRISE_LOGO_SUCCESS:
      return {
        ...state,
        loading: false,
        imageBase64: `data:image/jpeg;base64,${action.imageBase64}`,
        statusCode: 0,
      };
    default:
      return state;
  }
};
export default enterprise_reducer;

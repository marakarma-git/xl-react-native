import reduxString from '../reduxString';

const initialState = {
  loading_custom_label: false,
  error_custom_label: '',
  data_custom_label: [],
};
const get_custom_label_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GET_CUSTOM_LABEL_LOADING:
      return {
        ...state,
        loading_custom_label: true,
      };
    case reduxString.GET_CUSTOM_LABEL_SUCCESS:
      return {
        loading_custom_label: false,
        error_custom_label: '',
        data_custom_label: action.data,
      };
    case reduxString.GET_CUSTOM_LABEL_FAILED:
      return {
        ...state,
        loading_custom_label: false,
        error_custom_label: action.error,
      };
    case reduxString.GET_CUSTOM_LABEL_RESET:
      return state;
    default:
      return state;
  }
};
export default get_custom_label_reducer;

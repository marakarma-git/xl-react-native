import reduxString from '../reduxString';

const initialState = {
  loading: false,
  errorText: '',
  data_banner: [],
  data_banner_generated: [],
};
const banner_management_get_banner_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.BANNER_MANAGEMENT_GET_BANNER_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: initialState.errorText,
      };
    }
    case reduxString.BANNER_MANAGEMENT_GET_BANNER_SUCCESS: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: initialState.errorText,
        data_banner: action.dataBanner,
        data_banner_generated: action.dataBannerGenerated,
      };
    }
    case reduxString.BANNER_MANAGEMENT_GET_BANNER_FAILED: {
      return {
        ...state,
        loading: initialState.loading,
        errorText: action.errorText,
      };
    }
    case reduxString.BANNER_MANAGEMENT_SET_DATA_BANNER_GENERATED: {
      return {
        ...state,
        data_banner_generated: action.dataBannerGenerated,
      };
    }
    default: {
      return state;
    }
  }
};
export default banner_management_get_banner_reducer;

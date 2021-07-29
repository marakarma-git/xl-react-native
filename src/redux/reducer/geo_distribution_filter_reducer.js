import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';

const dataGeoDistribution = [
  {
    formId: 'geo-distribution-enterprise-hard-code',
    formIdTo: 'enterprise-hard-code',
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '&enterpriseName=',
    config: {
      label: 'Enterprise',
    },
    sort_by_filter: 0,
  },
];
const initialState = {
  dataHeader: dataGeoDistribution,
  generatedParams: '',
  appliedFilter: [],
  appliedFilterForParams: '',
  loading: false,
  errorText: '',
  dataGeoMarker: [],
  dataGeoMarkerApi: [],
};
const geo_distribution_filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.GEO_DISTRIBUTION_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = action.dropDown;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.GEO_DISTRIBUTION_DYNAMIC_SUCCESS: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].disabled = false;
      state.dataHeader[index].loading = false;
      state.dataHeader[index].errorText = '';
      state.dataHeader[index].data = action.data;
      state.dataHeader[index].value = {};
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.GEO_DISTRIBUTION_DYNAMIC_FAILED: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].disabled = true;
      state.dataHeader[index].loading = false;
      state.dataHeader[index].errorText = action.errorText;
      state.dataHeader[index].dataGeoMarker = [];
      state.dataHeader[index].dataGeoMarkerApi = [];
      state.dataHeader[index].value = {};
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.GEO_DISTRIBUTION_DYNAMIC_LOADING: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].disabled = true;
      state.dataHeader[index].loading = true;
      state.dataHeader[index].errorText = '';
      state.dataHeader[index].dataGeoMarker = [];
      state.dataHeader[index].dataGeoMarkerApi = [];
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.GEO_DISTRIBUTION_DYNAMIC_RESET_SELECTED_VALUE: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = {};
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.GEO_DISTRIBUTION_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(state.dataHeader);
      return {
        ...state,
        dataHeader: resetValue,
        generatedParams: '',
        appliedFilter: [],
      };
    }
    case reduxString.GEO_DISTRIBUTION_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(state.dataHeader);
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilter: containerData || [],
      };
    }
    case reduxString.GEO_DISTRIBUTION_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.GEO_DISTRIBUTION_FAILED: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case reduxString.GEO_DISTRIBUTION_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: '',
        dataGeoMarker: action.geoMaker,
        dataGeoMarkerApi: action.geoMakerApi,
      };
    }
    case reduxString.GEO_DISTRIBUTION_SET_DATA_GEO_MARKER: {
      return {
        ...state,
        dataGeoMarker: action.dataGeoMarker,
      };
    }
    default: {
      return state;
    }
  }
};
export default geo_distribution_filter_reducer;

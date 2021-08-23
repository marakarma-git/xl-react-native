import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';

const dataUsageAnalytics = [
  {
    formId: 'usage-analytics-enterprise-hard-code',
    formIdTo: 'enterprise-hard-code',
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '',
    config: {
      label: 'Enterprise',
    },
    sort_by_filter: 0,
  },
  {
    formId: 'usage-analytics-package-name-hard-code',
    formIdTo: 'subscription-package-name-hard-code',
    disabled: true,
    defaultDisabled: true,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: ',',
    config: {
      label: 'Package Name',
    },
    sort_by_filter: 1,
  },
];
const initialState = {
  dataHeader: dataUsageAnalytics,
  generatedParams: '',
  appliedFilter: [],
  appliedFilterForParams: '',
  loading: true,
  errorText: '',
  dataChartSim: [],
  dataChartColor: [],
};
const usage_analytics_filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.USAGE_ANALYTICS_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = action.dropDown;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USAGE_ANALYTICS_DYNAMIC_SUCCESS: {
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
    case reduxString.USAGE_ANALYTICS_DYNAMIC_FAILED: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].disabled = true;
      state.dataHeader[index].loading = false;
      state.dataHeader[index].errorText = action.errorText;
      state.dataHeader[index].data = [];
      state.dataHeader[index].value = {};
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USAGE_ANALYTICS_DYNAMIC_LOADING: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].disabled = true;
      state.dataHeader[index].loading = true;
      state.dataHeader[index].errorText = '';
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USAGE_ANALYTICS_DYNAMIC_RESET_SELECTED_VALUE: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = {};
      if (
        state.dataHeader[index].formId ===
        'usage-analytics-package-name-hard-code'
      ) {
        state.dataHeader[index].disabled = true;
      }
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USAGE_ANALYTICS_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(state.dataHeader);
      return {
        ...state,
        dataHeader: resetValue,
        generatedParams: '',
        appliedFilter: [],
      };
    }
    case reduxString.USAGE_ANALYTICS_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(state.dataHeader);
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilter: containerData || [],
      };
    }
    case reduxString.USAGE_ANALYTICS_RESET_GENERATE_PARAMS: {
      return {
        ...state,
        generatedParams: initialState.generatedParams,
        appliedFilter: initialState.appliedFilter,
      };
    }
    case reduxString.USAGE_ANALYTICS_SET_PARAMS_NAVIGATION: {
      return {
        ...state,
        appliedFilterForParams: action.appliedFilterParams,
      };
    }
    case reduxString.USAGE_ANALYTICS_RESET_PARAMS_NAVIGATION: {
      return {
        ...state,
        appliedFilterForParams: initialState.appliedFilterForParams,
      };
    }
    default: {
      return state;
    }
  }
};
export default usage_analytics_filter_reducer;

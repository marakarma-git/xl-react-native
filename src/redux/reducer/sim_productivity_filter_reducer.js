import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';

const dataSimProductivity = [
  {
    formId: 'sim-productivity-enterprise-hard-code',
    formIdSubscription: 'enterprise-hard-code',
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
  {
    formId: 'sim-productivity-package-name-hard-code',
    formIdSubscription: 'subscription-package-name-hard-code',
    disabled: true,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '&subscriptionPackageDesc=',
    config: {
      label: 'Package Name',
    },
    sort_by_filter: 1,
  },
];
const initialState = {
  dataHeader: dataSimProductivity,
  generatedParams: '',
  appliedFilter: [],
  appliedFilterForParams: '',
  loading: true,
  errorText: '',
  dataChartSim: [],
};
const sim_productivity_filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SIM_PRODUCTIVITY_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = action.dropDown;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_DYNAMIC_SUCCESS: {
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
    case reduxString.SIM_PRODUCTIVITY_DYNAMIC_FAILED: {
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
    case reduxString.SIM_PRODUCTIVITY_DYNAMIC_LOADING: {
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
    case reduxString.SIM_PRODUCTIVITY_DYNAMIC_RESET_SELECTED_VALUE: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = {};
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(state.dataHeader);
      return {
        ...state,
        dataHeader: resetValue,
        generatedParams: '',
        appliedFilter: [],
      };
    }
    case reduxString.SIM_PRODUCTIVITY_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(state.dataHeader);
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilter: containerData || [],
      };
    }
    case reduxString.SIM_PRODUCTIVITY_RESET_GENERATE_PARAMS: {
      return {
        ...state,
        generatedParams: initialState.generatedParams,
        appliedFilter: initialState.appliedFilter,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_SET_PARAMS_NAVIGATION: {
      return {
        ...state,
        appliedFilterForParams: action.appliedFilterParams,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_RESET_PARAMS_NAVIGATION: {
      return {
        ...state,
        appliedFilterForParams: initialState.appliedFilterForParams,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_CHART_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_CHART_FAILED: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case reduxString.SIM_PRODUCTIVITY_CHART_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: initialState.errorText,
        dataChartSim: action.dataChart,
      };
    }
    default: {
      return state;
    }
  }
};
export default sim_productivity_filter_reducer;

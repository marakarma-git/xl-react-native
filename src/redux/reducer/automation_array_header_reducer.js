import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';

const dataAutomationHeader = [
  {
    formId: 'enterprise-button-panel-hard-code',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellEditDelete',
    config: {
      label: 'Config',
      width: 75,
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'enterprise-name-hard-code',
    api_id: 'enterpriseName',
    data: [],
    value: {},
    typeInput: 'DropDown',
    params: '&enterpriseName=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Enterprise Name',
      doNotShowOnFilter: true,
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 0,
  },
  {
    formId: 'rule-category-hard-code',
    api_id: 'ruleCategory',
    data: [],
    value: {},
    typeInput: 'DropDown',
    params: '&ruleCategory=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Rule Category',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 0,
  },
  {
    formId: 'created-date-hard-code',
    api_id: 'createdTime',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Created Date',
      superType: 'DATE',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 0,
  },
];
const initialState = {
  dataAutomationHeader: dataAutomationHeader,
  searchText: '',
  generatedParams: '',
  appliedFilterAutomation: [],
};
const automation_array_header_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTOMATION_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const getIndex =
        state.dataAutomationHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataAutomationHeader[getIndex].value = action.dropDown;
      return {
        ...state,
        dataAutomationHeader: state.dataAutomationHeader,
      };
    }
    case reduxString.AUTOMATION_CHANGE_CHECK_HEADER: {
      state.dataAutomationHeader[0].valueCheck = !state.dataAutomationHeader[0]
        .valueCheck;
      return {
        ...state,
        dataAutomationHeader: state.dataAutomationHeader,
      };
    }
    case reduxString.AUTOMATION_DYNAMIC_SUCCESS: {
      const getIndex =
        state.dataAutomationHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataAutomationHeader[getIndex].loading = false;
      state.dataAutomationHeader[getIndex].data = action.data;
      state.dataAutomationHeader[getIndex].value = {};
      state.dataAutomationHeader[getIndex].disabled = false;
      return {
        ...state,
        dataAutomationHeader: state.dataAutomationHeader,
      };
    }
    case reduxString.AUTOMATION_DYNAMIC_FAILED: {
      const getIndex =
        state.dataAutomationHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataAutomationHeader[getIndex].loading = false;
      state.dataAutomationHeader[getIndex].errorText = action.errorText;
      state.dataAutomationHeader[getIndex].disabled = true;
      return {
        ...state,
        dataAutomationHeader: state.dataAutomationHeader,
      };
    }
    case reduxString.AUTOMATION_DYNAMIC_LOADING: {
      const getIndex =
        state.dataAutomationHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataAutomationHeader[getIndex].loading = true;
      state.dataAutomationHeader[getIndex].errorText = '';
      state.dataAutomationHeader[getIndex].disabled = true;
      state.dataAutomationHeader[getIndex].data = [];
      return {
        ...state,
        dataAutomationHeader: state.dataAutomationHeader,
      };
    }
    case reduxString.AUTOMATION_DYNAMIC_RESET: {
      const getIndex =
        state.dataAutomationHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataAutomationHeader[getIndex] = Helper.dynamicResetForm(
        state.dataAutomationHeader[getIndex],
      );
      return {
        ...state,
        dataAutomationHeader: state.dataAutomationHeader,
      };
    }
    case reduxString.AUTOMATION_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(initialState.dataAutomationHeader);
      return {
        ...state,
        dataAutomationHeader: resetValue,
        generatedParams: '',
        appliedFilterRole: [],
      };
    }
    case reduxString.AUTOMATION_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataAutomationHeader: action.data,
      };
    }
    case reduxString.AUTOMATION_SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case reduxString.AUTOMATION_RESET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: initialState.searchText,
      };
    }
    case reduxString.AUTOMATION_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(
        state.dataAutomationHeader,
      );
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilterRole: containerData || [],
      };
    }
    case reduxString.AUTOMATION_RESET_PARAMS: {
      return {
        ...state,
        generatedParams: initialState.generatedParams,
        appliedFilterRole: initialState.appliedFilterRole,
      };
    }
    default: {
      return state;
    }
  }
};
export default automation_array_header_reducer;

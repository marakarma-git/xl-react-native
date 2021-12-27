import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';
import dayjs from 'dayjs';

const dataHeaderEnterprise = [
  {
    formId: 'name-hard-code',
    api_id: 'enterpriseName',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellCheckBoxTreeView',
    params: '&enterpriseName=',
    typeInput: 'TextInput',
    value: '',
    config: {
      label: 'Name',
      doNotShowOnFilter: true,
      flexStart: true,
      showIcon: true,
      isTouchable: true,
      isTreeView: true,
      isNavigate: true,
    },
    shown: true,
  },
  {
    formId: 'status-hard-code',
    api_id: 'activeStatus',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&activeStatus=',
    typeInput: 'DropDown',
    value: {},
    data: [
      {
        value: 'true',
        label: 'ready for use',
      },
      {
        value: 'false',
        label: 'absolete',
      },
    ],
    config: {
      label: 'Status',
      isTouchable: true,
      doNotShowOnFilter: true,
      condition: {
        true: 'Ready For Use',
        false: 'Not Ready',
      },
    },
    shown: true,
  },
  {
    formId: 'customer-type-hard-code',
    api_id: 'customerType',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&customerType=',
    typeInput: 'DropDown',
    data: [],
    value: {},
    errorText: '',
    loading: false,
    disabled: true,
    config: {
      label: 'Customer Type',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'group-hard-code',
    api_id: '',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    params: '',
    typeInput: 'TextInput',
    value: '',
    disabled: true,
    config: {
      label: 'Group',
    },
    shown: true,
  },
  {
    formId: 'custom-id-hard-code',
    api_id: '',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    typeInput: 'TextInput',
    value: '',
    disabled: true,
    config: {
      label: 'Custom ID',
    },
    shown: true,
  },
  {
    formId: 'operator-hard-code',
    api_id: 'operator',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Operator',
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'onboarded-hard-code',
    api_id: 'onboarded',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&onboarded=',
    value: dayjs().toDate(),
    isSelectedDate: false,
    typeInput: 'DateTimePicker',
    config: {
      label: 'Onboarded',
      isTouchable: true,
      superType: 'DATE',
    },
    shown: true,
  },
  {
    formId: 'reseller-resource-group-hard-code',
    api_id: '',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    params: '',
    typeInput: 'TextInput',
    value: '',
    disabled: true,
    config: {
      label: 'Reseller resource Group',
      width: 230,
    },
    shown: true,
  },
];
const initialState = {
  dataHeaderEnterprise: dataHeaderEnterprise,
  searchText: '',
  generatedParams: '',
  appliedFilterEnterprise: [],
};
const enterprise_management_header_array_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_TEXT_INPUT: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex].value = action.textInput;
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex].value = action.dropDown;
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_DATE_TIME_PICKER: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex].value = action.dateTimePicker;
      state.dataHeaderEnterprise[getIndex].isSelected =
        !state.dataHeaderEnterprise[getIndex].isSelected;
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_CHANGE_CHECK_HEADER: {
      state.dataHeaderEnterprise[0].valueCheck =
        !state.dataHeaderEnterprise[0].valueCheck;
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_SUCCESS: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex].loading = false;
      state.dataHeaderEnterprise[getIndex].data = action.data;
      state.dataHeaderEnterprise[getIndex].value = {};
      state.dataHeaderEnterprise[getIndex].disabled = false;
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_FAILED: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex].loading = false;
      state.dataHeaderEnterprise[getIndex].errorText = action.errorText;
      state.dataHeaderEnterprise[getIndex].disabled = true;
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_LOADING: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex].loading = true;
      state.dataHeaderEnterprise[getIndex].errorText = '';
      state.dataHeaderEnterprise[getIndex].disabled = true;
      state.dataHeaderEnterprise[getIndex].data = [];
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_RESET: {
      const getIndex =
        state.dataHeaderEnterprise.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataHeaderEnterprise[getIndex] = Helper.dynamicResetForm(
        state.dataHeaderEnterprise[getIndex],
      );
      return {
        ...state,
        dataHeaderEnterprise: state.dataHeaderEnterprise,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(initialState.dataHeaderEnterprise);
      return {
        ...state,
        dataHeaderEnterprise: resetValue,
        generatedParams: '',
        appliedFilterEnterprise: [],
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataHeaderEnterprise: action.data,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_RESET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: initialState.searchText,
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(
        state.dataHeaderEnterprise,
      );
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilterEnterprise: containerData || [],
      };
    }
    case reduxString.ENTERPRISE_MANAGEMENT_RESET_PARAMS: {
      return {
        ...state,
        generatedParams: initialState.generatedParams,
        appliedFilterEnterprise: initialState.appliedFilterEnterprise,
      };
    }
    default: {
      return state;
    }
  }
};
export default enterprise_management_header_array_reducer;

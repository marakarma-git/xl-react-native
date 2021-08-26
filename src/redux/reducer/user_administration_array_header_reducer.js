import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';
const dataHeaderFilter = [
  {
    formId: 'user-id-hard-code',
    api_id: 'username',
    value: '',
    typeInput: 'TextInput',
    params: '&userId=',
    cellType: 'TableCellHeaderCheckBox',
    cellRowType: 'TableCellCheckBox',
    config: {
      label: 'User ID',
      doNotShowOnFilter: true,
      isTouchable: true,
    },
    valueCheck: false,
    shown: true,
    sort_by_filter: 0,
  },
  {
    formId: 'user-name-hard-coded',
    api_id: 'firstName',
    child_api_id: 'lastName',
    value: '',
    typeInput: 'TextInput',
    params: '&userName=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Name',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 1,
  },
  {
    formId: 'active-status-hard-code',
    api_id: 'activeStatus',
    value: {},
    typeInput: 'DropDown',
    data: [
      {
        value: true,
        label: 'Verified',
      },
      {
        value: false,
        label: 'Not Verified',
      },
    ],
    params: '&activeStatus=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Email Verify',
      isTouchable: true,
      superType: 'BOOL',
      labelBool: {
        true: 'Verified',
        false: 'Not Verified',
      },
    },
    shown: true,
    sort_by_filter: 5,
  },
  {
    formId: 'lock-status-hard-code',
    api_id: 'lockStatus',
    value: {},
    typeInput: 'DropDown',
    data: [
      {
        value: true,
        label: 'Locked',
      },
      {
        value: false,
        label: 'Active',
      },
    ],
    params: '&lockStatus=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Status',
      isTouchable: true,
      superType: 'BOOL',
      labelBool: {
        true: 'Locked',
        false: 'Active',
      },
    },
    shown: true,
    sort_by_filter: 5,
  },
  {
    formId: 'role-hard-code',
    api_id: 'roleName',
    value: {},
    typeInput: 'DropDown',
    data: [],
    params: '&roleName=',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Role',
      isTouchable: true,
    },
    shown: true,
    errorText: '',
    sort_by_filter: 2,
  },
  {
    formId: 'organizations-hard-code',
    api_id: 'enterpriseName',
    value: {},
    typeInput: 'DropDown',
    data: [],
    params: '&enterpriseName=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Organizations',
      isTouchable: true,
    },
    errorText: '',
    shown: true,
    sort_by_filter: 4,
  },
  {
    formId: 'email-hard-code',
    api_id: 'email',
    value: '',
    typeInput: 'TextInput',
    params: '&email=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Email',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 3,
  },
];
const initialState = {
  dataHeader: dataHeaderFilter,
  searchText: '',
  generatedParams: '',
  appliedFilter: [],
};
const user_administration_array_header_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.USER_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = action.textInput;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_CHANGE_CHECK_HEADER: {
      state.dataHeader[0].valueCheck = !state.dataHeader[0].valueCheck;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].value = action.dropDown;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_DYNAMIC_SUCCESS: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].loading = false;
      state.dataHeader[index].data = action.data;
      state.dataHeader[index].value = {};
      state.dataHeader[index].disabled = false;
      state.dataHeader[index].errorText = '';
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_DYNAMIC_FAILED: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].loading = false;
      state.dataHeader[index].errorText = action.error;
      state.dataHeader[index].disabled = true;
      state.dataHeader[index].errorText = action.errorText;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_DYNAMIC_LOADING: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataHeader[index].loading = true;
      state.dataHeader[index].errorText = '';
      state.dataHeader[index].disabled = true;
      state.dataHeader[index].data = [];
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_DYNAMIC_RESET: {
      const index =
        state.dataHeader.findIndex((f) => f.formId === action.formId) || 0;
      const resetSomeData = Helper.dynamicResetForm(state.dataHeader[index]);
      state.dataHeader[index] = resetSomeData;
      return {
        ...state,
        dataHeader: state.dataHeader,
      };
    }
    case reduxString.USER_ADMINISTRATION_RESET_ALL_VALUE:
      const resetValue = Helper.resetAllForm(initialState.dataHeader);
      return {
        ...state,
        dataHeader: resetValue,
        generatedParams: '',
        appliedFilter: [],
      };
    case reduxString.USER_ADMINISTRATION_UPDATE_BUNDLE_ARRAY:
      return {
        ...state,
        dataHeader: action.data,
      };
    case reduxString.USER_ADMINISTRATION_SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };
    case reduxString.USER_ADMINISTRATION_RESET_SEARCH_TEXT:
      return {
        ...state,
        searchText: '',
      };
    case reduxString.USER_ADMINISTRATION_GENERATE_PARAMS:
      const {linkParams, containerData} = generateLink(state.dataHeader);
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilter: containerData || [],
      };
    case reduxString.USER_ADMINISTRATION_RESET_PARAMS:
      return {
        ...state,
        generatedParams: '',
        appliedFilter: [],
      };
    default:
      return state;
  }
};
export default user_administration_array_header_reducer;

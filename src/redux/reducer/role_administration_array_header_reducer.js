import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';

const dataRoleHeader = [
  {
    formId: 'role-role-hard-code',
    api_id: 'roleName',
    value: '',
    loading: false,
    params: '&roleName=',
    typeInput: 'TextInput',
    cellType: 'TableCellHeaderCheckBox',
    cellRowType: 'TableCellCheckBox',
    valueCheck: false,
    config: {
      label: 'Role',
      doNotShowOnFilter: true,
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 0,
  },
  {
    formId: 'role-organizations-hard-code',
    api_id: 'organizations',
    value: {},
    loading: false,
    errorText: '',
    typeInput: 'DropDown',
    data: [],
    params: '&organizations=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Organizations',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 2,
  },
  {
    formId: 'role-users-hard-code',
    api_id: 'users',
    value: '',
    params: '&users=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Users',
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'role-status-hard-code',
    api_id: 'activeStatus',
    value: {},
    typeInput: 'DropDown',
    data: [
      {value: true, label: 'Ready'},
      {value: false, label: 'View Only'},
    ],
    params: '&activeStatus=',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Status',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 1,
  },
  {
    formId: 'role-description-hard-code',
    api_id: 'description',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Role Description',
      isTouchable: true,
    },
    shown: true,
  },
];
const initialState = {
  dataRoleHeader: dataRoleHeader,
  searchText: '',
  generatedParams: '',
  appliedFilterRole: [],
};
const role_administration_array_header_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT: {
      const getIndex =
        state.dataRoleHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataRoleHeader[getIndex].value = action.textInput;
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const getIndex =
        state.dataRoleHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataRoleHeader[getIndex].value = action.dropDown;
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_CHANGE_CHECK_HEADER: {
      state.dataRoleHeader[0].valueCheck = !state.dataRoleHeader[0].valueCheck;
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_SUCCESS: {
      const getIndex =
        state.dataRoleHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataRoleHeader[getIndex].loading = false;
      state.dataRoleHeader[getIndex].data = action.data;
      state.dataRoleHeader[getIndex].value = {};
      state.dataRoleHeader[getIndex].disabled = false;
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_FAILED: {
      const getIndex =
        state.dataRoleHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataRoleHeader[getIndex].loading = false;
      state.dataRoleHeader[getIndex].errorText = action.errorText;
      state.dataRoleHeader[getIndex].disabled = true;
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_LOADING: {
      const getIndex =
        state.dataRoleHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataRoleHeader[getIndex].loading = true;
      state.dataRoleHeader[getIndex].errorText = '';
      state.dataRoleHeader[getIndex].disabled = true;
      state.dataRoleHeader[getIndex].data = [];
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_DYNAMIC_RESET: {
      const getIndex =
        state.dataRoleHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataRoleHeader[getIndex] = Helper.dynamicResetForm(
        state.dataRoleHeader[getIndex],
      );
      return {
        ...state,
        dataRoleHeader: state.dataRoleHeader,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(initialState.dataRoleHeader);
      return {
        ...state,
        dataRoleHeader: resetValue,
        generatedParams: '',
        appliedFilterRole: [],
      };
    }
    case reduxString.ROLE_ADMINISTRATION_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataRoleHeader: action.data,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_RESET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: initialState.searchText,
      };
    }
    case reduxString.ROLE_ADMINISTRATION_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(state.dataRoleHeader);
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilterRole: containerData || [],
      };
    }
    case reduxString.ROLE_ADMINISTRATION_RESET_PARAMS: {
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
export default role_administration_array_header_reducer;

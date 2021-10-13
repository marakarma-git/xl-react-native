import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';
import dayjs from 'dayjs';

const dataSmsHeader = [
  {
    formId: 'sms-a2p-dummy-action',
    api_id: '',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellEditDelete',
    config: {
      label: 'Action',
      doNotShowOnFilter: true,
      width: 75,
    },
    shown: true,
  },
  {
    formId: 'sms-enterprise-name-hard-code',
    api_id: 'enterpriseName',
    value: {},
    data: [],
    loading: false,
    params: '&enterpriseName=',
    typeInput: 'DropDown',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Enterprise Name',
      doNotShowOnFilter: true,
      isTouchable: true,
      width: 180,
    },
    shown: true,
  },
  {
    formId: 'sender-address-hard-code',
    api_id: 'senderAddress',
    value: '',
    params: '&senderAddress=',
    typeInput: 'TextInput',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Sender Address (A.Number)',
      isTouchable: true,
      width: 280,
    },
    shown: true,
  },
  {
    formId: 'user-name-hard-code',
    api_id: 'username',
    value: '',
    params: '&username=',
    typeInput: 'TextInput',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'User Name',
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'registration-id-hard-code',
    api_id: 'registrationId',
    value: '',
    params: '&registrationId=',
    typeInput: 'TextInput',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Registration ID',
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'date-time-hard-code',
    api_id: 'createdTime',
    value: dayjs().toDate(),
    params: '&createdTime=',
    typeInput: 'DateTimePicker',
    isSelected: false,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Date Time',
      isTouchable: true,
      superType: 'DATE',
    },
    shown: true,
  },
];
const initialState = {
  dataSmsHeader: dataSmsHeader,
  searchText: '',
  generatedParams: '',
  appliedFilterSms: [],
};
const sms_a2p_array_header_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SMS_A2P_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex].value = action.dropDown;
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_DYNAMIC_ONCHANGE_TEXT_INPUT: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex].value = action.textInput;
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_DYNAMIC_ONCHANGE_DATE_TIME: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex].value = action.dateTime;
      state.dataSmsHeader[getIndex].isSelected = true;
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_CHANGE_CHECK_HEADER: {
      state.dataSmsHeader[0].valueCheck = !state.dataSmsHeader[0].valueCheck;
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_DYNAMIC_SUCCESS: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex].loading = false;
      state.dataSmsHeader[getIndex].data = action.data;
      state.dataSmsHeader[getIndex].value = {};
      state.dataSmsHeader[getIndex].disabled = false;
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_DYNAMIC_FAILED: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex].loading = false;
      state.dataSmsHeader[getIndex].errorText = action.errorText;
      state.dataSmsHeader[getIndex].disabled = true;
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_DYNAMIC_LOADING: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex].loading = true;
      state.dataSmsHeader[getIndex].errorText = '';
      state.dataSmsHeader[getIndex].disabled = true;
      state.dataSmsHeader[getIndex].data = [];
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_DYNAMIC_RESET: {
      const getIndex =
        state.dataSmsHeader.findIndex((f) => f.formId === action.formId) || 0;
      state.dataSmsHeader[getIndex] = Helper.dynamicResetForm(
        state.dataSmsHeader[getIndex],
      );
      return {
        ...state,
        dataSmsHeader: state.dataSmsHeader,
      };
    }
    case reduxString.SMS_A2P_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(initialState.dataSmsHeader);
      return {
        ...state,
        dataSmsHeader: resetValue,
        generatedParams: '',
        appliedFilterSms: [],
      };
    }
    case reduxString.SMS_A2P_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataSmsHeader: action.data,
      };
    }
    case reduxString.SMS_A2P_SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case reduxString.SMS_A2P_RESET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: initialState.searchText,
      };
    }
    case reduxString.SMS_A2P_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(state.dataSmsHeader);
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilterSms: containerData || [],
      };
    }
    case reduxString.SMS_A2P_RESET_PARAMS: {
      return {
        ...state,
        generatedParams: initialState.generatedParams,
        appliedFilterSms: initialState.appliedFilterSms,
      };
    }
    default: {
      return state;
    }
  }
};
export default sms_a2p_array_header_reducer;

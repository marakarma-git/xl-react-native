import reduxString from '../reduxString';
import dayjs from 'dayjs';
//default form
// {
//   formId: 'in-session-hard-code',
//     label: 'In Session',
//   disabled: true,
//   loading: false,
//   errorText: '',
//   value: {},
//   data: [],
//     type: 'DropDown',
//   params: '&inSession=',
// },
const dynamicFilter = [
  {
    formId: 'imsi-hard-code',
    label: 'IMSI',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&imsi=',
    hard_code: true,
  },
  {
    formId: 'iccid-hard-code',
    label: 'ICCID',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&iccid=',
    hard_code: true,
  },
  {
    formId: 'detected-imei-hard-code',
    label: 'Detected IMEI',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&imei=',
    hard_code: true,
  },
  {
    formId: 'enterprise-hard-code',
    label: 'Enterprise',
    disabled: false,
    loading: false,
    errorText: '',
    error: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&enterprise=',
    hard_code: true,
  },
  {
    formId: 'fixed-ip-hard-code',
    label: 'Fixed IP',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&fixedIP=',
    hard_code: true,
  },
  {
    formId: 'label-hard-code',
    label: 'Label',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&label=',
    hard_code: true,
  },
  {
    formId: 'state-hard-code',
    label: 'State',
    disabled: false,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&state=',
    hard_code: true,
  },
  {
    formId: 'apn-hard-code',
    label: 'APN',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&apn=',
    hard_code: true,
  },
  {
    formId: 'state-lock-hard-code',
    label: 'State Lock',
    disabled: false,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&stateLock=',
    hard_code: true,
  },
  {
    formId: 'subscription-package-name-hard-code',
    label: 'Subscription Package Name',
    disabled: true,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&subscriptionPackageName=',
    hard_code: true,
  },
  {
    formId: 'specification-id-hard-code',
    label: 'Specification ID',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&specificationId=',
    hard_code: true,
  },
  {
    formId: 'first-activation-date-hard-code',
    label: 'First Activation Date',
    disabled: false,
    value: dayjs().toDate(),
    type: 'DateTimePicker',
    isSelected: false,
    params: '&firstActivationDate=',
    hard_code: true,
  },
  {
    formId: 'pbr-exit-date-hard-code',
    label: 'PBR exit date',
    disabled: false,
    value: dayjs().toDate(),
    isSelected: false,
    type: 'DateTimePicker',
    params: '&pbrExitDate=',
    hard_code: true,
  },
  {
    formId: 'monthly-data-hard-code',
    label: 'Monthly Data',
    disabled: false,
    value: '',
    type: 'DropDownType2',
    params: '&monthlyData=',
    data: [
      {
        value: 'KB',
        label: 'KB',
      },
      {
        value: 'MB',
        label: 'MB',
      },
      {
        value: 'GB',
        label: 'GB',
      },
      {
        value: 'TB',
        label: 'TB',
      },
      {
        value: 'KiB',
        label: 'KiB',
      },
      {
        value: 'MIB',
        label: 'MIB',
      },
      {
        value: 'GIB',
        label: 'GIB',
      },
      {
        value: 'TIB',
        label: 'TIB',
      },
    ],
    selectedValue: {},
    hard_code: true,
  },
  {
    formId: 'monthly-sms-hard-code',
    label: 'Monthly SMS',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&monthlySms=',
    hard_code: true,
  },
];
const initialState = {
  searchText: '',
  generatedParams: '',
  array_filter: dynamicFilter,
  loading_array_filter: false,
};
const dynamic_array_filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.UPDATE_DATA_FILTER:
      return {
        ...state,
        loading_array_filter: false,
        array_filter: action.payload,
      };
    case reduxString.UPDATE_DATA_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.searchText,
      };
    case reduxString.RESET_DATA_SEARCH_TEXT:
      return {
        ...state,
        searchText: '',
      };
    case reduxString.UPDATE_GENERATED_PARAMS:
      return {
        ...state,
        generatedParams: action.generatedParams,
      };
    case reduxString.SET_LOADING_FILTER_TRUE:
      return {
        ...state,
        loading_array_filter: true,
      };
    case reduxString.SET_LOADING_FILTER_FALSE:
      return {
        ...state,
        loading_array_filter: false,
      };
    case reduxString.MERGE_DATA_FILTER:
      return {
        ...state,
        loading_array_filter: false,
        array_filter: [...state.array_filter, ...action.data],
      };
    case reduxString.RESET_GENERATED_PARAMS:
      return {
        ...state,
        generatedParams: '',
      };
    default:
      return state;
  }
};
export default dynamic_array_filter_reducer;

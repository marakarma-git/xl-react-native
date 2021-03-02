import reduxString from '../reduxString';
import dayjs from 'dayjs';
import Helper from '../../helpers/helper';
const dynamicFilter = [
  {
    formId: 'imsi-hard-code',
    api_id: 'imsi',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&imsi=',
    hard_code: true,
    cellType: 'TableCellHeaderOptionCheckBox',
    cellRowType: 'TableCellCheckBox',
    config: {
      label: 'IMSI',
      width: 180,
      isTouchable: true,
      doNotShowOnFilter: true,
    },
    dataOption: [
      {
        label: 'Select All',
        value: 'select_all',
      },
      {
        label: 'Deselect All',
        value: 'deselect_all',
      },
      {
        label: 'Select All Local',
        value: 'select_all_local',
      },
      {
        label: 'DeSelect All Local',
        value: 'deselect_all_local',
      },
    ],
    shown: true,
    valueCheck: false,
    valueOption: null,
  },
  {
    formId: 'in-session-hard-code',
    api_id: 'inSession',
    disabled: false,
    loading: false,
    errorText: '',
    error: '',
    value: {},
    data: [
      {
        label: 'Yes',
        value: 'true',
      },
      {
        label: 'No',
        value: 'false',
      },
    ],
    typeInput: 'DropDown',
    params: '&inSession=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellStatus',
    config: {
      label: 'In Session',
      width: 130,
      isTouchable: true,
    },
    shown: true,
  },

  {
    formId: 'iccid-hard-code',
    api_id: 'icc',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&iccid=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'ICCID',
      width: 200,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'detected-imei-hard-code',
    api_id: 'imei',
    label: 'Detected IMEI',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&imei=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Detected IMEI',
      width: 200,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'enterprise-hard-code',
    api_id: 'customerName',
    disabled: false,
    loading: false,
    errorText: '',
    error: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '&enterprise=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Enterprise',
      width: 280,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'fixed-ip-hard-code',
    api_id: 'ipAddress',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&fixedIP=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'IP Address',
      width: 120,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'label-hard-code',
    api_id: 'customerLabel',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&label=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Label',
      width: 120,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'state-hard-code',
    api_id: 'simSubscriptionStatus',
    disabled: false,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '&state=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellStatus',
    config: {
      label: 'State',
      width: 170,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'apn-hard-code',
    api_id: '',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&apn=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'APN',
      width: 150,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'state-lock-hard-code',
    api_id: 'stateLock',
    disabled: false,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '&stateLock=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellStatus',
    config: {
      label: 'State Lock',
      width: 170,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'subscription-package-name-hard-code',
    api_id: 'subscriptionPackageDesc',
    disabled: true,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    typeInput: 'DropDown',
    params: '&subscriptionPackageName=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Subscription Package Name',
      width: 280,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'specification-id-hard-code',
    api_id: 'simSpecification',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&specificationId=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Specification ID',
      width: 200,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'first-activation-date-hard-code',
    api_id: 'firstActivationDate',
    disabled: false,
    value: dayjs().toDate(),
    isSelectedDate: false,
    typeInput: 'DateTimePicker',
    isSelected: false,
    params: '&firstActivationDate=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'First Activation Date',
      width: 200,
      isTouchable: true,
      superType: 'DATE',
    },
    shown: true,
  },
  {
    formId: 'pbr-exit-date-hard-code',
    api_id: 'pbrExitDate',
    disabled: false,
    value: dayjs().toDate(),
    isSelected: false,
    typeInput: 'DateTimePicker',
    isSelectedDate: false,
    params: '&pbrExitDate=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'PBR Exit Date',
      width: 190,
      isTouchable: true,
      superType: 'DATE',
    },
    shown: true,
  },
  {
    formId: 'monthly-data-hard-code',
    api_id: 'monthlyData',
    label: 'Monthly Data',
    disabled: false,
    value: '',
    typeInput: 'DropDownType2',
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
        value: 'MiB',
        label: 'MiB',
      },
      {
        value: 'GiB',
        label: 'GiB',
      },
      {
        value: 'TiB',
        label: 'TiB',
      },
    ],
    selectedValue: {},
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Monthly Data',
      width: 170,
      isTouchable: true,
      superType: 'BYTE',
    },
    shown: true,
  },
  {
    formId: 'monthly-sms-hard-code',
    api_id: 'monthlySms',
    disabled: false,
    value: '',
    typeInput: 'TextInput',
    params: '&monthlySms=',
    hard_code: true,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Monthly SMS',
      width: 190,
      isTouchable: true,
    },
    shown: true,
  },
  {
    formId: 'dummy-map-hard-code',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellViewMap',
    hard_code: true,
    config: {
      label: 'MAP',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
];
const initialState = {
  searchText: '',
  generatedParams: '',
  totalFiltered: 0,
  array_filter: dynamicFilter,
  applied_filter: [],
  loading_array_filter: false,
  regenerateParams: false,
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
        regenerateParams: false,
      };
    case reduxString.RESET_DATA_SEARCH_TEXT:
      return {
        ...state,
        searchText: '',
      };
    case reduxString.UPDATE_GENERATED_PARAMS:
      return {
        ...state,
        totalFiltered: action.totalFiltered,
        applied_filter: action.appliedFilter,
        generatedParams: action.generatedParams,
        regenerateParams: true,
      };
    case reduxString.RESET_GENERATED_PARAMS:
      return {
        ...state,
        totalFiltered: 0,
        applied_filter: [],
        generatedParams: '',
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
    case reduxString.MERGE_SPECIFIC_DATA_FILTER_INDEX:
      return {
        ...state,
        loading_array_filter: false,
        array_filter: Helper.mergeToSpecificIndex(
          state.array_filter,
          action.data,
          state.array_filter.length - 1,
        ),
      };
    default:
      return state;
  }
};
export default dynamic_array_filter_reducer;

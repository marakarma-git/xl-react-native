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
  },
  {
    formId: 'iccid-hard-code',
    label: 'ICCID',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&iccid=',
  },
  {
    formId: 'detected-imei-hard-code',
    label: 'Detected IMEI',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&imei=',
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
  },
  {
    formId: 'fixed-ip-hard-code',
    label: 'Fixed IP',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&fixedIP=',
  },
  {
    formId: 'label-hard-code',
    label: 'Label',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&label=',
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
    params: '&label=',
  },
  {
    formId: 'apn-hard-code',
    label: 'APN',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&apn=',
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
    params: '&state=',
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
  },
  {
    formId: 'specification-id-hard-code',
    label: 'Specification ID',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&specificationId=',
  },
  {
    formId: 'first-activation-date-hard-code',
    label: 'First Activation Date',
    disabled: false,
    value: dayjs().toDate(),
    type: 'DateTimePicker',
    params: '&firstActivationDate=',
  },
  {
    formId: 'pbr-exit-date-hard-code',
    label: 'PBR exit date',
    disabled: false,
    value: dayjs().toDate(),
    type: 'DateTimePicker',
    params: '&pbrExitDate=',
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
  },
  {
    formId: 'monthly-sms-hard-code',
    label: 'Monthly SMS',
    disabled: false,
    value: '',
    type: 'TextInput',
    params: '&monthlySms=',
  },
];
const initialState = {
  array_filter: dynamicFilter,
};
const dynamic_array_filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.UPDATE_DATA_FILTER:
      return {
        array_filter: action.payload,
      };
    default:
      return state;
  }
};
export default dynamic_array_filter_reducer;

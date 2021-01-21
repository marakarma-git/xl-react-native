import dayjs from 'dayjs';
import moment from 'moment';
import randomId from '../../helpers/randomId';
import reduxString from '../reduxString';
//default form

const dynamicFilter = [
  {
    formId: 'imsi-hard-code',
    label: 'IMSI',
    value: '',
    type: 'TextInput',
    params: '&imsi=',
  },
  {
    formId: 'in-session-hard-code',
    label: 'In Session',
    disabled: false,
    loading: false,
    errorText: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&inSession=',
  },
  {
    formId: 'iccid-hard-code',
    label: 'ICCID',
    value: '',
    type: 'TextInput',
    params: '&iccid=',
  },
  {
    formId: 'detected-imei-hard-code',
    label: 'Detected IMEI',
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
    value: '',
    type: 'TextInput',
    params: '&fixedIP=',
  },
  {
    formId: 'label-hard-code',
    label: 'Label',
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
    error: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&label=',
  },
  {
    formId: 'apn-hard-code',
    label: 'APN',
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
    error: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&state=',
  },
  {
    formId: 'subscription-package-name',
    label: 'Subscription Package Name',
    disabled: false,
    loading: false,
    errorText: '',
    error: '',
    value: {},
    data: [],
    type: 'DropDown',
    params: '&subscriptionPackageName=',
  },
  {
    formId: 'specification-id-hard-code',
    label: 'Specification ID',
    value: '',
    type: 'TextInput',
    params: '&specificationId=',
  },
  {
    formId: 'first-activation-date-hard-code',
    label: 'First Activation Date',
    value: moment().format('DD-MM-YYYY'),
    type: 'DateTimePicker',
    params: '&firstActivationDate=',
  },
  {
    formId: 'pbr-exit-date-hard-code',
    label: 'PBR exit date',
    value: moment().format('DD-MM-YYYY'),
    type: 'DateTimePicker',
    params: '&pbrExitDate=',
  },
  {
    formId: 'monthly-data-hard-code',
    label: 'Monthly Data',
    value: '',
    type: 'DropDownType2',
    params: '&monthlyData=',
    data: [],
    selectedValue: {},
  },
  {
    formId: 'monthly-sms-hard-code',
    label: 'Monthly SMS',
    value: '',
    type: 'TextInput',
    params: '&monthlySms=',
    data: [],
    selectedValue: {},
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

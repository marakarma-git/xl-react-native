import dayjs from 'dayjs';
import randomId from '../../helpers/randomId';
import reduxString from '../reduxString';
//default form

const dynamicFilter = [
  {
    formId: randomId(),
    label: 'IMSI',
    value: 'Testing ada value',
    type: 'TextInput',
    params: '&imsi=',
  },
  {
    formId: randomId(),
    label: 'In Session',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&inSession=',
  },
  {
    formId: randomId(),
    label: 'ICCID',
    value: 'Iccid ada isinya gan',
    type: 'TextInput',
    params: '&iccid=',
  },
  {
    formId: randomId(),
    label: 'Detected IMEI',
    value: '',
    type: 'TextInput',
    params: '&imei=',
  },
  {
    formId: randomId(),
    label: 'Enterprise',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&enterprise=',
  },
  {
    formId: randomId(),
    label: 'Fixed IP',
    value: '',
    type: 'TextInput',
    params: '&fixedIP=',
  },
  {
    formId: randomId(),
    label: 'Label',
    value: '',
    type: 'TextInput',
    params: '&label=',
  },
  {
    formId: randomId(),
    label: 'State',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&label=',
  },
  {
    formId: randomId(),
    label: 'APN',
    value: '',
    type: 'TextInput',
    params: '&apn=',
  },
  {
    formId: randomId(),
    label: 'State Lock',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&state=',
  },
  {
    formId: randomId(),
    label: 'Subscription Package Name',
    loading: false,
    value: {},
    data: [],
    type: 'DropDown',
    params: '&subscriptionPackageName=',
  },
  {
    formId: randomId(),
    label: 'Specification ID',
    value: '',
    type: 'TextInput',
    params: '&specificationId=',
  },
  {
    formId: randomId(),
    label: 'First Activation Date',
    value: dayjs(),
    type: 'DateTimePicker',
    params: '&firstActivationDate=',
  },
  {
    formId: randomId(),
    label: 'PBR exit date',
    value: dayjs(),
    type: 'DateTimePicker',
    params: '&pbrExitDate=',
  },
  {
    formId: randomId(),
    label: 'Monthly Data',
    value: '',
    type: 'DropDownType2',
    params: '&monthlyData=',
    data: [],
    selectedValue: {},
  },
  {
    formId: randomId(),
    label: 'Monthly SMS',
    value: '',
    type: 'DropDownType2',
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

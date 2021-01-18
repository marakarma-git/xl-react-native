import lod from 'lodash';
const dummyFilter = [
  {
    title: 'IMSI',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&imsi=',
  },
  {
    title: 'Enterprise',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
    params: '&enterprise=',
  },
  {
    title: 'Fixed Ip',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&fixedIp=',
  },
  {
    title: 'MSISDN',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&msisdn',
  },
  {
    title: 'Label',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&label=',
  },
  {
    title: 'ICCID',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&iccid=',
  },
  {
    title: 'State',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
    params: '&state=',
  },
  {
    title: 'Detected IMEI',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&imei=',
  },
  {
    title: 'APN',
    type: 'TextInput',
    value: '',
    onChange: '&apn=',
  },
  {
    title: 'State Lock',
    type: 'Dropdown',
    value: {},
    data: [],
    loading: false,
    params: '&state=',
  },
  {
    title: 'IMSI',
    type: 'Monthly Data',
    onChange: '',
    value: '',
    data: [],
    params: '&imsi=',
  },
  {
    title: 'Subscription Package Name',
    type: 'Dropdown',
    data: [],
    loading: false,
    value: {},
    params: '&subscriptionPackageName=',
  },
  {
    title: 'Monthly SMS',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&monthlySms=',
  },
  {
    title: 'Specification ID',
    type: 'TextInput',
    value: '',
    onChange: '',
    params: '&specificationId=',
  },
  {
    title: 'First Activation Date',
    type: 'DateTimePicker',
    data: [],
    value: {},
    loading: false,
    params: '&firstActivationDate=',
  },
  {
    title: 'PBR Exit Date',
    type: 'DateTimePicker',
    data: [],
    value: {},
    loading: false,
    params: '&pbrExitDate=',
  },
];
//to use this function generateLink please follow the rules
// example object that required in array object like this
// {
//   value: '' || {},
//   params: '',
//   type: 'TextInput' || 'DateTimePicker' || 'DropDown',
// };
const generateLink = (array = dummyFilter) => {
  let paramsLink = '';
  array.map((v) => {
    const {value, params, type} = v;
    if (!lod.isEmpty(value) || !lod.isEmpty(value.value)) {
      switch (type) {
        case 'TextInput':
          return (paramsLink = paramsLink + params + value);
        case 'Dropdown' || 'DateTimePicker':
          return (paramsLink = paramsLink + params + value.value);
        default:
          return null;
      }
    }
  });
  return paramsLink;
};
export default generateLink();

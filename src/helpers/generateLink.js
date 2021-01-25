import lod from 'lodash';
//to use this function generateLink please follow the rules
// example object that required in array object like this
// {
//   value: '' || {},
//   params: '',
//   type: 'TextInput' || 'DateTimePicker' || 'DropDown',
// };
const generateLink = (array = []) => {
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

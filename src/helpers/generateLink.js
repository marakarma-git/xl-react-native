import lod from 'lodash';
import dayjs from 'dayjs';
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
    const {value, params, type, isSelected} = v;
    if (type === 'DateTimePicker' && isSelected) {
      paramsLink = paramsLink + params + dayjs(value).format('YYYY-MM-DD');
    }
    if (!lod.isEmpty(value)) {
      switch (type) {
        case 'TextInput':
          return (paramsLink = paramsLink + params + value);
        case 'DropDown':
          return (paramsLink = paramsLink + params + value.value);
        case 'DropDownType2':
          return (paramsLink = paramsLink + params + value);
        default:
          return null;
      }
    }
  });
  return paramsLink;
};
export default generateLink;

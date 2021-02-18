import lod from 'lodash';
import dayjs from 'dayjs';
import Helper from './helper';
//to use this function generateLink please follow the rules
// example object that required in array object like this
// {
//   value: '' || {},
//   params: '',
//   type: 'TextInput' || 'DateTimePicker' || 'DropDown',
// };
const generateLink = (array = []) => {
  let paramsLink = '';
  let count = 0;
  array.map((v) => {
    const {value, params, typeInput: type, isSelected, selectedValue} = v;
    if (type === 'DateTimePicker' && isSelected) {
      paramsLink = paramsLink + params + dayjs(value).format('YYYY-MM-DD');
      count = count + 1;
    }
    if (!lod.isEmpty(value)) {
      switch (type) {
        case 'TextInput':
          count = count + 1;
          return (paramsLink = paramsLink + params + value);
        case 'DropDown':
          count = count + 1;
          return (paramsLink = paramsLink + params + value.value);
        case 'DropDownType2':
          count = count + 1;
          if (lod.isEmpty(selectedValue)) {
            return (paramsLink = paramsLink + params + value);
          } else {
            const {value: valueSelected} = selectedValue || {};
            const getConverted = Helper.convertToByte(value, valueSelected);
            return (paramsLink = paramsLink + params + getConverted);
          }
        default:
          return null;
      }
    }
  });
  return {
    linkParams: paramsLink,
    count: count,
  };
};
export default generateLink;

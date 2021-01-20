import dayjs from 'dayjs';
import reduxString from '../reduxString';

const updateDataFilter = (data) => {
  return {
    type: reduxString.UPDATE_DATA_FILTER,
    payload: data,
  };
};
const resetDataFilter = (data = []) => {
  return (dispatch) => {
    console.log(JSON.stringify(data, null, 2));
    const resetedArray = data.map(({type, ...value}) => {
      switch (type) {
        case 'DropDown':
          return {
            ...value,
            value: {},
          };
        case 'DropDownType2':
          return {
            ...value,
            value: '',
            selectedValue: {},
          };
        case 'TextInput':
          return {
            ...value,
            value: '',
          };
        case 'DateTimePicker':
          return {
            ...value,
            value: dayjs(),
          };
        default:
          return null;
      }
    });
    alert(JSON.stringify(resetedArray, null, 2));
    dispatch(updateDataFilter(resetedArray));
  };
};
const setLoadingFilter = () => {};
const setErrorFilter = () => {};
export {updateDataFilter, resetDataFilter, setLoadingFilter, setErrorFilter};

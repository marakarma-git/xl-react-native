import dayjs from 'dayjs';
import lod from 'lodash';
import reduxString from '../reduxString';
const updateDataFilter = (data = []) => {
  return {
    type: reduxString.UPDATE_DATA_FILTER,
    payload: data,
  };
};
const resetDataFilter = () => {
  return (dispatch, getState) => {
    const {dynamic_array_filter_reducer} = getState();
    const {array_filter} = dynamic_array_filter_reducer;
    const resetedArray = array_filter.map(({type, ...value}) => {
      switch (type) {
        case 'DropDown':
          return {
            ...value,
            type: 'DropDown',
            value: {},
          };
        case 'DropDownType2':
          return {
            ...value,
            type: 'DropDownType2',
            value: '',
            selectedValue: {},
          };
        case 'TextInput':
          return {
            ...value,
            type: 'TextInput',
            value: '',
          };
        case 'DateTimePicker':
          return {
            ...value,
            type: 'DateTimePicker',
            value: dayjs(),
          };
        default:
          return null;
      }
    });
    dispatch(updateDataFilter(resetedArray));
  };
};
const setLoadingFilter = () => {};
const setErrorFilter = () => {};
export {updateDataFilter, resetDataFilter, setLoadingFilter, setErrorFilter};

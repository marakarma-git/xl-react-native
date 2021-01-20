import dayjs from 'dayjs';
import reduxString from '../reduxString';
const updateDataFilter = (data) => {
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
    dispatch(updateDataFilter(resetedArray));
  };
};
const setLoadingFilter = () => {};
const setErrorFilter = () => {};
export {updateDataFilter, resetDataFilter, setLoadingFilter, setErrorFilter};

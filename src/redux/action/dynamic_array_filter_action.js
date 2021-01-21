import dayjs from 'dayjs';
import lod from 'lodash';
import reduxString from '../reduxString';
const updateDataFilter = (data = []) => {
  return {
    type: reduxString.UPDATE_DATA_FILTER,
    payload: data,
  };
};
const setSomethingToFilter = (dataObject = []) => {
  //the data must be look like this
  // {
  //   formId: "" -> is_required,
  //   needs: please refer to switch case in down bellow -> is_required,
  //   errorText: just for sending array
  //   data: for array purpose only, -> is not require for loading
  // }
  return (dispatch, getState) => {
    const {dynamic_array_filter_reducer} = getState();
    const {array_filter} = dynamic_array_filter_reducer;
    dataObject.map((e) => {
      const {formId, needs, errorText, data, value, selectedValue} = e;
      const getIndex = array_filter.findIndex((j) => j.formId === formId);
      let newArr = lod.cloneDeep(array_filter);
      switch (needs) {
        case 'FilterLoadingTrue':
          newArr[getIndex].loading = true;
          return dispatch(updateDataFilter(newArr));
        case 'FilterLoadingFalse':
          newArr[getIndex].loading = false;
          return dispatch(updateDataFilter(newArr));
        case 'SetFilterErrorText':
          newArr[getIndex].errorText = errorText;
          return dispatch(updateDataFilter(newArr));
        case 'RemoveFilterErrorText':
          newArr[getIndex].errorText = '';
          return dispatch(updateDataFilter(newArr));
        case 'AddFilterData':
          newArr[getIndex].data = data;
          return dispatch(updateDataFilter(newArr));
        case 'RemoveFilterData':
          newArr[getIndex].data = [];
          return dispatch(updateDataFilter(newArr));
        case 'OnChangeTextInput' || 'OnChangeDateTimePicker':
          newArr[getIndex].value = value;
          return dispatch(updateDataFilter(newArr));
        case 'OnChangeDropDown':
          newArr[getIndex].value = {...value};
          return dispatch(updateDataFilter(newArr));
        case 'OnChangeDropDownType2':
          newArr[getIndex].value = value;
          newArr[getIndex].selectedValue = selectedValue;
          return dispatch(updateDataFilter(newArr));
        default:
          return null;
      }
    });
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
export {updateDataFilter, resetDataFilter, setSomethingToFilter};
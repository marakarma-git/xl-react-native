import dayjs from 'dayjs';
import lod from 'lodash';
import reduxString from '../reduxString';
const updateDataFilter = (data = []) => {
  return {
    type: reduxString.UPDATE_DATA_FILTER,
    payload: data,
  };
};
const updateDataSearchText = (searchText = '') => {
  return {
    type: reduxString.UPDATE_DATA_SEARCH_TEXT,
    searchText: searchText,
  };
};
const resetDataSearchText = () => {
  return {
    type: reduxString.RESET_DATA_SEARCH_TEXT,
  };
};
const updateGeneratedParams = (generatedParams = '') => {
  return {
    type: reduxString.UPDATE_GENERATED_PARAMS,
    generatedParams: generatedParams,
  };
};
const resetGeneratedParams = () => {
  return {
    type: reduxString.RESET_GENERATED_PARAMS,
  };
};
const setSomethingToFilter = (dataObject = []) => {
  //the data must be look like this
  // {
  //   formId: "" -> is_required,
  //   needs: please refer to switch case in down bellow -> is_required,
  //   value: just for sending selectedValue only
  //   data: for array purpose only, -> is not require for loading
  //   errorText: for error only
  //   selectedValue: for selectedValue dropDown type 2
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
        case 'DisabledInput':
          newArr[getIndex].disabled = true;
          return dispatch(updateDataFilter(newArr));
        case 'ResetSubscriptionPackageName':
          newArr[getIndex].disabled = true;
          newArr[getIndex].loading = false;
          newArr[getIndex].errorText = '';
          newArr[getIndex].value = {};
          newArr[getIndex].data = [];
          return dispatch(updateDataFilter(newArr));
        case 'SetFilterErrorText':
          newArr[getIndex].errorText = errorText;
          return dispatch(updateDataFilter(newArr));
        case 'RemoveFilterErrorText':
          newArr[getIndex].errorText = '';
          return dispatch(updateDataFilter(newArr));
        case 'AddFilterData':
          newArr[getIndex].data = data;
          newArr[getIndex].loading = false;
          newArr[getIndex].disabled = false;
          return dispatch(updateDataFilter(newArr));
        case 'RemoveFilterData':
          newArr[getIndex].data = [];
          return dispatch(updateDataFilter(newArr));
        case 'OnChangeTextInput':
          newArr[getIndex].value = value;
          return dispatch(updateDataFilter(newArr));
        case 'OnChangeDateTimePicker':
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
    const resetArray = array_filter.map(({type, ...value}) => {
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
    dispatch(updateDataFilter(resetArray));
  };
};
export {updateDataFilter, resetDataFilter, setSomethingToFilter};

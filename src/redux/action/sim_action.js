import Axios from 'axios';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';
const getFilterRequest = () => {
  return {
    type: reduxString.GET_FILTER_REQUEST,
  };
};
const getFilterFailed = (error) => {
  return {
    type: reduxString.GET_FILTER_FAILED,
    error: error,
  };
};
const getFilterSuccess = (data) => {
  return {
    type: reduxString.GET_FILTER_SUCCESS,
    payload: data,
  };
};
const removeFilterData = () => {
  return {
    type: reduxString.REMOVE_FILTER_DATA,
  };
};
const removeFilterError = () => {
  return {
    type: reduxString.REMOVE_FILTER_ERROR,
  };
};
const getSimInventory = (parameter) => {
  return async (dispatch) => {
    Axios.get(`${base_url}`)
      .then((value) => dispatch(value))
      .catch((error) => dispatch(getFilterFailed(error.response.data)));
  };
};
export default getSimInventory;
export {
  getFilterRequest,
  getFilterSuccess,
  getFilterFailed,
  removeFilterData,
  removeFilterError,
};

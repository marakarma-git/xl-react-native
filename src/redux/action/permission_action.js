// API Permission http://18.141.55.24/api/user/priv/getListPermission
import axios from 'axios';
import reduxString from '../reduxString';
import {callApi} from '../../constant/connection';

const setListPermission = (data) => ({
  type: reduxString.GET_LIST_PERMISSION,
  payload: data
});

const requestListPermission = () => ({
  type: reduxString.REQUEST_LIST_PERMISSION
});

const setErrorPermission = (error) => ({
  type: reduxString.SET_ERROR_PERMISSION,
  payload: error
});

const getListPermission = () => {
  return async (dispatch, getState) => {
    const {access_token} = getState().auth_reducer.data;
    dispatch(requestListPermission());

    try {
      const { data } = await callApi.get("/user/priv/getListPermission", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if(data){
        dispatch(setListPermission(data.result));
      }

    } catch (error) {
      dispatch(setErrorPermission(error.response.data));
    }
  }
}

export {
  getListPermission
}
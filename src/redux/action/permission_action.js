// API Permission http://18.141.55.24/api/user/priv/getListPermission
import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';

const setListPermission = (data) => ({
  type: reduxString.GET_LIST_PERMISSION,
  payload: data,
});

const requestListPermission = () => ({
  type: reduxString.REQUEST_LIST_PERMISSION,
});

const setErrorPermission = (error) => ({
  type: reduxString.SET_ERROR_PERMISSION,
  payload: error,
});

const getListPermission = () => {
  return async (dispatch) => {
    dispatch(requestListPermission());

    try {
      const {data} = await httpRequest.get('/user/priv/getListPermission');
      if (data) {
        dispatch(setListPermission(data.result));
      }
    } catch (error) {
      dispatch(setErrorPermission(error.response.data));
    }
  };
};

export {getListPermission};

import Axios from 'axios';
import subDomain from '../../constant/requestSubPath';
import reduxString from '../reduxString';

const authRequest = () => {
  return {
    type: reduxString.AUTH_REQUEST,
  };
};
const authFailed = (error) => {
  return {
    type: reduxString.AUTH_FAILED,
    payload: error,
  };
};
const authSuccess = (data) => {
  return {
    type: reduxString.AUTH_SUCCESS,
    payload: data,
  };
};
const authLogout = () => {
  return {
    type: reduxString.AUTH_LOGOUT,
  };
};
const authLogin = (username, password) => {
  return function (dispatch) {
    dispatch(authRequest());
    Axios.post(
      `${'http://172.30.251.160/api'}${subDomain.fetchLogin}`,
      {
        grant_type: 'password',
        username: username,
        password: password,
      },
      {
        headers: {
          headerAuth:
            'Basic eGwtZGNwLXNlY3VyaXR5OnhsLWRjcC1zZWN1cml0eS1zZWNyZXQ=',
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then((e) => dispatch(authSuccess(e)))
      .catch((e) => dispatch(authFailed(e)));
  };
};
export {authRequest, authFailed, authSuccess, authLogout, authLogin};

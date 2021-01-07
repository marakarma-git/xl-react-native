import Api, {headerAuth} from '../../constant/connection';
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
  const formData = new FormData();

  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);

  return async (dispatch) => {
    dispatch(authRequest());
    try {
      const {data} = await Api.post(
        `http://172.30.251.160/api${subDomain.fetchLogin}`,
        formData,
        {
          headers: {
            Authorization: headerAuth,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (data) {
        dispatch(authSuccess(data));
      }
    } catch (error) {
      dispatch(authFailed(error));
    }
  };
};

export {authLogin, authLogout};

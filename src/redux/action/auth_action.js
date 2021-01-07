import Axios from 'axios';
import Api from '../../constant/connection';
import subDomain from '../../constant/requestSubPath';
import reduxString from '../reduxString';

const authRequest = () => {
  return {
    type: reduxString.AUTH_REQUEST,
  };
};
const authFailed = (error) => {
  console.log(error, " <<<  ")
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

  formData.append("grant_type", "password");
  formData.append("username", username);
  formData.append("password", password);

  return async (dispatch) => {
    dispatch(authRequest());
    try {
      const { data } = await Api.post("/oauth/login", formData, {
        headers: {
          "Authorization" : "Basic eGwtZGNwLXNlY3VyaXR5OnhsLWRjcC1zZWN1cml0eS1zZWNyZXQ=",
          "Content-Type": "multipart/form-data"
        }
      });
      
      if (data){
        dispatch(authSuccess(data));
      }

    } catch (error) {
      dispatch(authFailed(error))
    }
  };
};

export {
  authLogin,
  authLogout
};

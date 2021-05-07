import Axios from 'axios';
import reduxString from '../reduxString';
import subDomain from '../../constant/requestSubPath';
import {base_url, headerAuth} from '../../constant/connection';
import {removeEnterPriseLogo} from './enterprise_action';

const authRequest = () => {
  return {
    type: reduxString.AUTH_REQUEST,
  };
};

const setHomeLogin = () => {
  return{
    type: reduxString.HOME_LOGIN
  }
}

const authFailed = (error) => {
  return {
    type: reduxString.AUTH_FAILED,
    payload: error,
  };
};

const authSuccess = (data, params) => {
  return {
    type: reduxString.AUTH_SUCCESS,
    payload: data,
    params,
    privId: data?.authority || []
  };
};

const removeAuth = (username) => {
  return {
    type: reduxString.AUTH_LOGOUT,
    params: {username},
  };
};

const changePassword = (username) => ({
  type: reduxString.CHANGE_PASSWORD,
  params: {username},
});

const authLogout = () => {
  return async (dispatch, getState) => {
    dispatch(removeEnterPriseLogo());
    dispatch(removeAuth(getState().auth_reducer.data.principal.username));
  };
};

const setFalseAfterLogin = () => ({
  type: reduxString.SET_FALSE_AFTER_LOGIN
});

const authLogin = (username, password) => {
  const formData = new FormData();

  formData.append('grant_type', 'password');
  formData.append('username', username);
  formData.append('password', password);

  return async (dispatch) => {
    dispatch(authRequest());
    try {
      const {data} = await Axios.post(
        `${base_url}${subDomain.fetchLogin}`,
        formData,
        {
          headers: {
            Authorization: headerAuth,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (data) {
        const authority = await getUserPriviledges(data?.access_token);
        data.authority = authority;
        dispatch(authSuccess(data, {username, password}));
      }
    } catch (error) {
      dispatch(authFailed(error.response.data));
    }
  };
};

const getUserPriviledges = async (access_token) => {
  let userPriviledges = new Array();

  try {
    const { data } = await Axios.get(`${base_url}/user/usr/getUserPrivileges`, {
      headers: {
        Authorization: "Bearer " + access_token
      }
    });

    if(data){
      if(data.statusCode === 0){
        userPriviledges = data.result;
      }
    }
  } catch (error) {
    dispatch(authFailed(error.response.data));
  }

  return userPriviledges;
}

const setTitleVersion = (data) => ({
  type: reduxString.GET_TITLE_VERSION,
  payload: data,
});

const getTitleVersionFail = (error) => ({
  type: reduxString.GET_TITLE_VERSION_FAILED,
  payload: error,
});

const updateCustomerConsentSuccess = (data) => ({
  type: reduxString.UPDATE_CUSTOMER_CONSENT,
  payload: data
});

const updateCustomerConsentFail = (error) => ({
  type: reduxString.UPDATE_CUSTOMER_CONSENT_FAIL,
  payload: error
});

const getTitleVersion = () => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get(`${base_url}/user/usr/getUserAppVersion`, {
        headers: {
          Authorization: headerAuth,
        },
      });

      if (data) {
        dispatch(
          setTitleVersion(data.result.appsTitle + ' ' + data.result.version),
        );
      }
    } catch (error) {
      dispatch(getTitleVersionFail(error.response.data));
    }
  };
};

const updateCustomerConsent = (userData) => {
  
  return async (dispatch) => {
    try {
      const { data } = await Axios.post(`${base_url}/user/usr/updateCustomerConsent?userId=${userData.principal.userId}`, {}, {
        headers: {
          Authorization: 'Bearer ' + userData.access_token
        }
      });

      if(data){
          userData['principal'] = data.result;

          dispatch(updateCustomerConsentSuccess(userData));
      }

    } catch (error) {
      dispatch(updateCustomerConsentFail(error.response.data));
    }
  }
}

export {authLogin, authFailed, authLogout, getTitleVersion, changePassword, setFalseAfterLogin, updateCustomerConsent, setHomeLogin};

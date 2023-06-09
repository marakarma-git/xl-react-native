import Axios from 'axios';
import reduxString from '../reduxString';
import subDomain from '../../constant/requestSubPath';
import {clientId} from '../../constant/connection';
import {removeEnterPriseLogo} from './enterprise_action';
import httpRequest from '../../constant/axiosInstance';

const authRequest = () => {
  return {
    type: reduxString.AUTH_REQUEST,
  };
};

const setHomeLogin = () => {
  return {
    type: reduxString.HOME_LOGIN,
  };
};

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
    privId: data.authority,
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

const setSessionExpired = () => ({
  type: reduxString.SET_SESSION_EXPIRED,
});

const clearSessionExpiredFlag = () => ({
  type: reduxString.CLEAR_SESSION_EXPIRED_FLAG,
});

const tokenInvalid = () => {
  return async (dispatch, getState) => {
    dispatch(removeEnterPriseLogo());
    dispatch(removeAuth(getState().auth_reducer.data.principal.username));
  };
};

const authLogout = () => {
  return async (dispatch, getState) => {
    const {principal} = getState().auth_reducer.data;
    const customHeaders = {
      headers: {
        activityId: 'LLP-2',
        descSuffix: ` as ${principal?.username}`,
        isStatic: true,
      },
    };
    try {
      const {data} = await httpRequest.post(
        `${subDomain.logout}`,
        {},
        customHeaders,
      );

      if (data) {
        dispatch(removeEnterPriseLogo());
        dispatch(removeAuth(principal?.username));
      }
    } catch (error) {
      dispatch(authFailed(error.response.data));
    }
  };
};

const setFalseAfterLogin = () => ({
  type: reduxString.SET_FALSE_AFTER_LOGIN,
});

const setMultiSessionDetected = (text) => ({
  type: reduxString.SET_MULTI_SESSION_DETECTED,
  payload: text,
});

const resetMultiSessionDetected = () => ({
  type: reduxString.RESET_MULTI_SESSION_DETECTED,
});

const checkLogin = (username, password, loginDropDown) => {
  return async (dispatch) => {
    dispatch(authRequest());
    const dataObj = {username, password, clientId: clientId};

    try {
      const {data} = await httpRequest.post(
        `${subDomain?.checkLogin}`,
        dataObj,
      );

      if (data) {
        dispatch(
          setMultiSessionDetected(
            `${username} is open in another session. Click 'Use Here' to close previous session and login`,
          ),
        );
      } else {
        dispatch(authLogin(username, password, loginDropDown));
      }
    } catch (error) {
      console.log('leeeerrrrr', error);
      dispatch(authFailed(error?.response?.data));
    }
  };
};

const setIsErricson = (isErricson) => ({
  type: reduxString.SET_IS_ERRICSON,
  payload: isErricson,
});

const authLogin = (username, password, loginDropDown) => {
  const formData = new FormData();
  const customHeaders = {
    headers: {
      'Content-Type': 'multipart/form-data',
      // activityId: 'LLP-1',
      //descSuffix: ` as ${username}`,
      //isStatic: true,
    },
  };

  if (loginDropDown === 0) {
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', '');
    formData.append('password_ericsson', password);
    formData.append('client_id', clientId);
  } else {
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);
    formData.append('client_id', clientId);
  }

  return async (dispatch) => {
    dispatch(authRequest());

    try {
      const {data} = await httpRequest.post(
        `${subDomain.fetchLogin}`,
        formData,
        customHeaders,
      );

      if (data) {
        const authority = await getUserPriviledges(data?.access_token);
        data.authority = authority;
        dispatch(authSuccess(data, {username, password, client_id: clientId}));
      }
    } catch (error) {
      dispatch(authFailed(error.response.data));
    }
  };
};

const getUserPriviledges = async (access_token) => {
  let userPriviledges = new Array();

  try {
    const {data} = await httpRequest.get(`/user/usr/getUserPrivileges`, {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    });

    if (data) {
      if (data.statusCode === 0) {
        userPriviledges = data.result;
        // Temporary home promotion hard coded priv id
        checkHomePromotion = userPriviledges.find(
          (promotion) => promotion == 'ee1a4a4a-6439-11eb-ae93-0242ac130002',
        );
        if (!checkHomePromotion)
          userPriviledges.push(
            'ee1a4a4a-6439-11eb-ae93-0242ac130002',
            '711111aa-643a-11ea-bc55-0242ac130003',
            'b1aef948-7d5c-11eb-9439-0242ac130002',
          );
      }
    }
  } catch (error) {
    dispatch(authFailed(error.response.data));
  }

  return userPriviledges;
};

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
  payload: data,
});

const updateCustomerConsentFail = (error) => ({
  type: reduxString.UPDATE_CUSTOMER_CONSENT_FAIL,
  payload: error,
});

const getTitleVersion = () => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.get(`/user/usr/getUserAppVersion`);

      if (data) {
        const version = {
          appsTitle: data?.result?.appsTitle,
          versionNumber: data?.result?.version,
        };
        dispatch(setTitleVersion(version));
      }
    } catch (error) {
      dispatch(getTitleVersionFail(error.response.data));
    }
  };
};

const updateCustomerConsent = (userData) => {
  const customHeaders = {
    headers: {
      activityId: 'CCP-1',
      descSuffix: `${
        userData?.principal?.username || ''
      } Agreed to Costumer Consent`,
    },
  };
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.post(
        `/user/usr/updateCustomerConsent?userId=${userData.principal.userId}`,
        {},
        customHeaders,
      );

      if (data) {
        userData['principal'] = data.result;
        dispatch(updateCustomerConsentSuccess(userData));
      }
    } catch (error) {
      dispatch(updateCustomerConsentFail(error.response.data));
    }
  };
};

export {
  tokenInvalid,
  authLogin,
  authFailed,
  authLogout,
  getTitleVersion,
  changePassword,
  setFalseAfterLogin,
  updateCustomerConsent,
  setHomeLogin,
  checkLogin,
  resetMultiSessionDetected,
  setIsErricson,
  setSessionExpired,
  clearSessionExpiredFlag,
};

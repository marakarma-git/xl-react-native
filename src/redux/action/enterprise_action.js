import subDomain from '../../constant/requestSubPath';
import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';

const getEnterpriseLogo = () => {
  return {
    type: reduxString.GET_ENTERPRISE_LOGO,
  };
};
const getEnterpriseLogoFailed = (error) => {
  return {
    type: reduxString.GET_ENTERPRISE_LOGO_FAILED,
    error: error,
  };
};
const getEnterpriseLogoSuccess = (data) => {
  return {
    type: reduxString.GET_ENTERPRISE_LOGO_SUCCESS,
    imageBase64: data,
  };
};
const removeEnterPriseLogo = () => {
  return {
    type: reduxString.REMOVE_ENTERPRISE_LOGO,
  };
};
const callEnterpriseLogo = (enterpriseId, token) => {
  return async (dispatch) => {
    dispatch(getEnterpriseLogo());
    httpRequest
      .get(`${subDomain.enterpriseLogo}${enterpriseId}`)
      .then((response) => {
        const {data} = response;
        const {result} = data || {};
        if (data) {
          dispatch(getEnterpriseLogoSuccess(result));
        } else {
          dispatch(getEnterpriseLogoFailed(response));
        }
      })
      .catch((error) => dispatch(getEnterpriseLogoFailed(error.response.data)));
  };
};

export {removeEnterPriseLogo, callEnterpriseLogo};

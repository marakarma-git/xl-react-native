import Axios from 'axios';
import subDomain from '../../constant/requestSubPath';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';

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
    Axios.get(`${base_url}${subDomain.enterpriseLogo}${enterpriseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const {data} = response;
        const {result} = data || {};
        if (data) {
          dispatch(getEnterpriseLogoSuccess(result));
        } else {
          dispatch(getEnterpriseLogoFailed(response));
        }
      })
      .catch((e) => dispatch(getEnterpriseLogoFailed(e)));
  };
};
export default callEnterpriseLogo;
export {removeEnterPriseLogo};

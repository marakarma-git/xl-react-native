import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const getActiveEnterpriseLoading = () => {
  return {
    type: reduxString.AUTOMATION_GET_ACTIVE_ENTERPRISE_LOADING,
  };
};
const getActiveEnterpriseSuccess = (data) => {
  return {
    type: reduxString.AUTOMATION_GET_ACTIVE_ENTERPRISE_SUCCESS,
    ...data,
  };
};
const getActiveEnterpriseFailed = (error) => {
  return {
    type: reduxString.AUTOMATION_GET_ACTIVE_ENTERPRISE_FAILED,
    ...error,
  };
};
const automationSetActiveEnterprise = (value) => {
  return {
    type: reduxString.AUTOMATION_SET_ACTIVE_ENTERPRISE,
    valueEnterprise: value,
  };
};
const callAutomationEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(getActiveEnterpriseLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get(`${base_url}/user/corp/getActiveEnterprise`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const remap = result.map(
            ({enterpriseId, enterpriseName, ...rest}) => ({
              value: enterpriseId,
              label: enterpriseName,
              ...rest,
            }),
          );
          dispatch(
            getActiveEnterpriseSuccess({
              dataActiveEnterprise: remap,
            }),
          );
        } else {
          dispatch(
            getActiveEnterpriseFailed({
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          getActiveEnterpriseFailed({
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
export default callAutomationEnterprise;
export {automationSetActiveEnterprise};

import reduxString from '../reduxString';
import lod from 'lodash';
import httpRequest from '../../constant/axiosInstance';

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
const automationActiveEnterpriseReset = () => {
  return {
    type: reduxString.AUTOMATION_ACTIVE_ENTERPRISE_RESET,
  };
};
const callAutomationEnterprise = (parameter) => {
  return async (dispatch) => {
    const {result: resultParameter} = parameter || {};
    const {enterpriseId: enterpriseIdParameter} = resultParameter || {};
    dispatch(getActiveEnterpriseLoading());
    httpRequest
      .get('/user/corp/getActiveEnterprise')
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          let autoInputEnterpriseValue;
          const remap = result.map(
            ({enterpriseId, enterpriseName, ...rest}) => ({
              value: enterpriseId,
              label: enterpriseName,
              ...rest,
            }),
          );
          if (!lod.isEmpty(resultParameter)) {
            autoInputEnterpriseValue = lod.find(remap, (item) => {
              return item.value === enterpriseIdParameter;
            });
          }
          dispatch(
            getActiveEnterpriseSuccess({
              dataActiveEnterprise: remap,
              dataAutoInput: autoInputEnterpriseValue,
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
export {automationSetActiveEnterprise, automationActiveEnterpriseReset};

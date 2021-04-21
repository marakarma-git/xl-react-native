import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const automationDynamicOnchangeDropDown = (value) => {
  const {formId, dropDown} = value || {};
  return {
    type: reduxString.AUTOMATION_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId: formId,
    dropDown: dropDown,
  };
};
const automationDynamicSuccess = (value) => {
  const {formId, data} = value || {};
  return {
    type: reduxString.AUTOMATION_DYNAMIC_SUCCESS,
    formId: formId,
    data: data,
  };
};
const automationDynamicFailed = (value) => {
  const {formId, errorText} = value || {};
  return {
    type: reduxString.AUTOMATION_DYNAMIC_FAILED,
    formId: formId,
    errorText: errorText,
  };
};
const automationDynamicLoading = (value) => {
  const {formId} = value || {};
  return {
    type: reduxString.AUTOMATION_DYNAMIC_LOADING,
    formId: formId,
  };
};
const automationDynamicReset = (value) => {
  const {formId} = value || {};
  return {
    type: reduxString.AUTOMATION_DYNAMIC_RESET,
    formId: formId,
  };
};
const automationResetAllValue = () => {
  return {
    type: reduxString.AUTOMATION_RESET_ALL_VALUE,
  };
};
const automationUpdateBundleArray = (value) => {
  const {data} = value || [];
  return {
    type: reduxString.AUTOMATION_UPDATE_BUNDLE_ARRAY,
    data: data,
  };
};
const automationSetSearchText = (value) => {
  const {searchText} = value || '';
  console.log(searchText);
  return {
    type: reduxString.AUTOMATION_SET_SEARCH_TEXT,
    searchText: searchText,
  };
};
const automationResetSearchText = () => {
  return {
    type: reduxString.AUTOMATION_RESET_SEARCH_TEXT,
  };
};
const automationGenerateParams = () => {
  return {
    type: reduxString.AUTOMATION_GENERATE_PARAMS,
  };
};
const automationResetParams = () => {
  return {
    type: reduxString.AUTOMATION_RESET_PARAMS,
  };
};
const getListRuleCategory = () => {
  return async (dispatch, getState) => {
    dispatch(
      automationDynamicLoading({
        formId: 'rule-category-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get(`${base_url}/dcp/automation/getListRuleCategory`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map((value) => ({
            value: value,
            label: value,
          }));
          dispatch(
            automationDynamicSuccess({
              formId: 'rule-category-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            automationDynamicFailed({
              formId: 'rule-category-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          automationDynamicFailed({
            formId: 'rule-category-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
const getEnterpriseAutomation = () => {
  return async (dispatch, getState) => {
    dispatch(
      automationDynamicLoading({
        formId: 'enterprise-name-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise({access_token})
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({enterpriseId: thisEnterprise, enterpriseName}) => ({
              value: thisEnterprise,
              label: enterpriseName,
            }),
          );
          dispatch(
            automationDynamicSuccess({
              formId: 'enterprise-name-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            automationDynamicFailed({
              formId: 'enterprise-name-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        console.error(JSON.stringify(error, null, 2));
        automationDynamicFailed({
          formId: 'enterprise-name-hard-code',
          errorText: 'Failed, to get list',
          ...error.response.data,
        });
      });
  };
};
export default getEnterpriseAutomation;
export {
  getListRuleCategory,
  automationDynamicOnchangeDropDown,
  automationResetAllValue,
  automationGenerateParams,
  automationSetSearchText,
  automationResetSearchText,
  automationUpdateBundleArray,
  automationDynamicReset,
};

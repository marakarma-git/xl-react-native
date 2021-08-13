import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';

const smsA2pDynamicOnChangeTextInput = ({formId, textInput}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_ONCHANGE_TEXT_INPUT,
    formId,
    textInput,
  };
};
const smsA2pDynamicOnChangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const smsA2pDynamicOnchangeDateTime = ({formId, dateTime}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_ONCHANGE_DATE_TIME,
    formId,
    dateTime,
  };
};
const smsA2pChangeCheckHeader = () => {
  return {
    type: reduxString.SMS_A2P_CHANGE_CHECK_HEADER,
  };
};
const smsA2pDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const smsA2pDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const smsA2pDynamicLoading = ({formId}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_LOADING,
    formId,
  };
};
const smsA2pDynamicReset = ({formId}) => {
  return {
    type: reduxString.SMS_A2P_DYNAMIC_RESET,
    formId,
  };
};
const smsA2pResetAllValue = () => {
  return {
    type: reduxString.SMS_A2P_RESET_ALL_VALUE,
  };
};
const smsA2pUpdateBundleArray = ({data}) => {
  return {
    type: reduxString.SMS_A2P_UPDATE_BUNDLE_ARRAY,
    data,
  };
};
const smsA2pSetSearchText = ({searchText}) => {
  return {
    type: reduxString.SMS_A2P_SET_SEARCH_TEXT,
    searchText,
  };
};
const smsA2pResetSearchText = ({searchText}) => {
  return {
    type: reduxString.SMS_A2P_RESET_SEARCH_TEXT,
    searchText,
  };
};
const smsA2pGenerateParams = () => {
  return {
    type: reduxString.SMS_A2P_GENERATE_PARAMS,
  };
};
const smsA2pResetParams = () => {
  return {
    type: reduxString.SMS_A2P_RESET_PARAMS,
  };
};
const smsA2pGetActiveEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(smsA2pDynamicLoading({formId: 'sms-enterprise-name-hard-code'}));
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
            smsA2pDynamicSuccess({
              formId: 'sms-enterprise-name-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            smsA2pDynamicFailed({
              formId: 'sms-enterprise-name-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          smsA2pDynamicFailed({
            formId: 'sms-enterprise-name-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default smsA2pGetActiveEnterprise;
export {
  smsA2pDynamicOnChangeTextInput,
  smsA2pDynamicOnChangeDropDown,
  smsA2pDynamicOnchangeDateTime,
  smsA2pChangeCheckHeader,
  smsA2pResetAllValue,
  smsA2pGenerateParams,
  smsA2pSetSearchText,
  smsA2pUpdateBundleArray,
  smsA2pDynamicReset,
};

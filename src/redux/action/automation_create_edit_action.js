import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const automationCreateEditSetValue = ({cardId, inputValue}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_SET_VALUE,
    cardId,
    inputValue,
  };
};
const automationCreateEditSetErrorText = ({cardId, errorText}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_SET_ERROR_TEXT,
    cardId,
    errorText,
  };
};
const automationCreateEditSetSubValue = ({cardId, inputValue}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_SET_SUB_VALUE,
    cardId,
    inputValue,
  };
};
const automationCreateEditSetSubErrorText = ({cardId, errorText}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_SET_SUB_ERROR_TEXT,
    cardId,
    errorText,
  };
};
const automationCreateEditCheck = ({cardId}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_CHECK,
    cardId,
  };
};
const automationCreateEditLoading = () => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_LOADING,
  };
};
const automationCreateEditFailed = ({errorText}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_FAILED,
    errorText,
  };
};
const automationCreateEditSuccess = ({dataAutomationCreate, reMap}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_SUCCESS,
    dataAutomationCreate,
    reMap,
  };
};
const getAutomationCustomerNumber = (value) => {
  return async (dispatch, getState) => {
    dispatch(automationCreateEditLoading());
    const {access_token} = (await getState().auth_reducer.data) || {};
    const {dataRuleCategory} =
      (await getState().automation_create_edit_reducer) || {};
    const {customerNumber} = value || {};
    axios
      .get(
        `${base_url}/dcp/automation/getAutomationEnterprise?customerNumber=${customerNumber}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const reMap = dataRuleCategory.map(
            ({card_disabled, disabled_api, ...rest}) => ({
              ...rest,
              disabled_api,
              card_disabled: disabled_api
                ? !result[`${disabled_api}`]
                : card_disabled,
            }),
          );
          dispatch(
            automationCreateEditSuccess({
              dataAutomationCreate: result,
              reMap,
            }),
          );
        } else {
          dispatch(
            automationCreateEditFailed({
              errorText: 'Failed to get automation data',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          automationCreateEditFailed({
            errorText: 'Failed to get automation data',
            ...error.response.data,
          }),
        );
      });
  };
};
export default getAutomationCustomerNumber;
export {
  automationCreateEditSetValue,
  automationCreateEditSetErrorText,
  automationCreateEditSetSubValue,
  automationCreateEditSetSubErrorText,
  automationCreateEditCheck,
};

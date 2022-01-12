import reduxString from '../reduxString';
import lod from 'lodash';
import httpRequest from '../../constant/axiosInstance';
const automationSetDataRuleCategoryBulk = ({dataRuleCategory}) => {
  return {
    type: reduxString.AUTOMATION_SET_DATA_RULE_CATEGORY_BULK,
    dataRuleCategory,
  };
};
const automationCreateEditSetValue = ({cardId, inputValue, valueErrorText}) => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_SET_VALUE,
    cardId,
    inputValue,
    valueErrorText,
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
const automationCreateEditReset = () => {
  return {
    type: reduxString.AUTOMATION_CREATE_EDIT_RESET,
  };
};
const getAutomationCustomerNumber = (value) => {
  return async (dispatch, getState) => {
    dispatch(automationCreateEditLoading());
    const {dataRuleCategory} =
      (await getState().automation_create_edit_reducer) || {};
    const {customerNumber, result: resultParams} = value || {};
    httpRequest
      .get(
        `/dcp/automation/getAutomationEnterprise?customerNumber=${customerNumber}`,
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          let reMap = [];
          if (lod.isEmpty(resultParams)) {
            reMap = dataRuleCategory.map(
              ({card_disabled, disabled_api, ...rest}) => ({
                ...rest,
                disabled_api,
                card_disabled: disabled_api
                  ? !result[`${disabled_api}`]
                  : card_disabled,
              }),
            );
          } else {
            dataRuleCategory.map((itemRuleCategory) => {
              const {
                params_disabled_api,
                params_value_api,
                params_value_api_to,
                select_api,
              } = itemRuleCategory || {};
              const getAutoFrom = lod.find(
                result[`${select_api}`],
                (dataAutoFrom) => {
                  return (
                    dataAutoFrom.packageId ===
                    resultParams[`${params_value_api}`]
                  );
                },
              );
              const getAutoTo = lod.find(
                result[`${select_api}`],
                (dataAutoTo) => {
                  return (
                    dataAutoTo.packageId ===
                    resultParams[`${params_value_api_to}`]
                  );
                },
              );
              const createObject = {
                ...itemRuleCategory,
                card_is_checked: resultParams[`${params_disabled_api}`],
                card_disabled: !resultParams[`${params_disabled_api}`],
                value: getAutoFrom
                  ? {
                      value: getAutoFrom.packageId,
                      label: getAutoFrom.packageDesc,
                    }
                  : resultParams[`${params_value_api}`],
                sub_value: getAutoTo && {
                  value: getAutoTo.packageId,
                  label: getAutoTo.packageDesc,
                },
              };
              reMap.push(createObject);
            });
          }
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
// export default getAutomationCustomerNumber;
// export {
//   automationSetDataRuleCategoryBulk,
//   automationCreateEditSetValue,
//   automationCreateEditSetErrorText,
//   automationCreateEditSetSubValue,
//   automationCreateEditSetSubErrorText,
//   automationCreateEditCheck,
//   automationCreateEditReset,
// };

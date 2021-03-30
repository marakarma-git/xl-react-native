import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';

const roleAdministrationDynamicOnChangeTextInput = ({formId, textInput}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT,
    formId,
    textInput,
  };
};
const roleAdministrationDynamicOnChangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const roleAdministrationChangeCheckHeader = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_CHANGE_CHECK_HEADER,
  };
};
const roleAdministrationDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const roleAdministrationDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const roleAdministrationDynamicLoading = ({formId}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_LOADING,
    formId,
  };
};
const roleAdministrationDynamicReset = ({formId}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_RESET,
    formId,
  };
};
const roleAdministrationResetAllValue = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_RESET_ALL_VALUE,
  };
};
const roleAdministrationUpdateBundleArray = ({data}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_UPDATE_BUNDLE_ARRAY,
    data,
  };
};
const roleAdministrationSetSearchText = ({searchText}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_SET_SEARCH_TEXT,
    searchText,
  };
};
const roleAdministrationResetSearchText = ({searchText}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_RESET_SEARCH_TEXT,
    searchText,
  };
};
const roleAdministrationGenerateParams = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_GENERATE_PARAMS,
  };
};
const roleAdministrationResetParams = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_RESET_PARAMS,
  };
};
const roleAdministrationGetActiveEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(
      roleAdministrationDynamicLoading({
        formId: 'role-organizations-hard-code',
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
            roleAdministrationDynamicSuccess({
              formId: 'role-organizations-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            roleAdministrationDynamicFailed({
              formId: 'role-organizations-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          roleAdministrationDynamicFailed({
            formId: 'role-organizations-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default roleAdministrationGetActiveEnterprise;
export {
  roleAdministrationDynamicOnChangeTextInput,
  roleAdministrationDynamicOnChangeDropDown,
  roleAdministrationChangeCheckHeader,
  roleAdministrationResetAllValue,
  roleAdministrationGenerateParams,
  roleAdministrationSetSearchText,
  roleAdministrationUpdateBundleArray,
  roleAdministrationDynamicReset,
};

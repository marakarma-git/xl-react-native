import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
const userAdministrationDynamicOnchangeTextInput = (value) => {
  const {formId, textInput} = value || {};
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT,
    formId: formId,
    textInput: textInput,
  };
};
const userAdministrationDynamicOnchangeDropDown = (value) => {
  const {formId, dropDown} = value || {};
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId: formId,
    dropDown: dropDown,
  };
};
const userAdministrationDynamicSuccess = (value) => {
  const {formId, data} = value || {};
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_SUCCESS,
    formId: formId,
    data: data,
  };
};
const userAdministrationDynamicFailed = (value) => {
  const {formId, errorText} = value || {};
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_FAILED,
    formId: formId,
    errorText: errorText,
  };
};
const userAdministrationDynamicLoading = (value) => {
  const {formId} = value || {};
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_LOADING,
    formId: formId,
  };
};
const userAdministrationDynamicReset = (value) => {
  const {formId} = value || {};
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_RESET,
    formId: formId,
  };
};
const userAdministrationResetAllValue = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_RESET_ALL_VALUE,
  };
};
const userAdministrationUpdateBundleArray = (value) => {
  const {data} = value || [];
  return {
    type: reduxString.USER_ADMINISTRATION_UPDATE_BUNDLE_ARRAY,
    data: data,
  };
};
const userAdministrationSetSearchText = (value) => {
  const {searchText} = value || '';
  console.log(searchText);
  return {
    type: reduxString.USER_ADMINISTRATION_SET_SEARCH_TEXT,
    searchText: searchText,
  };
};
const userAdministrationResetSearchText = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_RESET_SEARCH_TEXT,
  };
};
const userAdministrationGenerateParams = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_GENERATE_PARAMS,
  };
};
const userAdministrationResetParams = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_RESET_PARAMS,
  };
};
const getActiveRole = (data) => {
  return async (dispatch, getState) => {
    dispatch(
      userAdministrationDynamicLoading({
        formId: 'role-hard-code',
      }),
    );
    const {thisEnterprise} = data || {};
    const {principal, access_token} =
      (await getState().auth_reducer.data) || {};
    const {enterpriseId} = principal || {};
    const getEnterprise = thisEnterprise || enterpriseId;
    await axios
      .get(
        `${base_url}/user/role/getActiveRole?enterpriseId=${getEnterprise}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({enterpriseId: thisEnterprise, roleName}) => ({
              value: thisEnterprise,
              label: roleName,
            }),
          );
          dispatch(
            userAdministrationDynamicSuccess({
              formId: 'role-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            userAdministrationDynamicFailed({
              formId: 'role-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          userAdministrationDynamicFailed({
            formId: 'role-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
const getActiveEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(
      userAdministrationDynamicLoading({
        formId: 'organizations-hard-code',
      }),
    );
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
          const changeArray = result.map(
            ({enterpriseId: thisEnterprise, enterpriseName}) => ({
              value: thisEnterprise,
              label: enterpriseName,
            }),
          );
          dispatch(
            userAdministrationDynamicSuccess({
              formId: 'organizations-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            userAdministrationDynamicFailed({
              formId: 'organizations-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          userAdministrationDynamicFailed({
            formId: 'organizations-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
export {
  userAdministrationDynamicOnchangeTextInput,
  userAdministrationDynamicOnchangeDropDown,
  userAdministrationResetAllValue,
  userAdministrationGenerateParams,
  userAdministrationSetSearchText,
  userAdministrationResetSearchText,
  userAdministrationUpdateBundleArray,
  userAdministrationDynamicReset,
  getActiveRole,
  getActiveEnterprise,
};

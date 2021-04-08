import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
const enterpriseManagementDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const enterpriseManagementDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const enterpriseManagementDynamicLoading = ({formId}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_LOADING,
    formId,
  };
};
const enterpriseManagementDynamicOnChangeTextInput = ({formId, textInput}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_TEXT_INPUT,
    formId,
    textInput,
  };
};
const enterpriseManagementDynamicOnChangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const enterpriseManagementChangeCheckHeader = () => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_CHANGE_CHECK_HEADER,
  };
};
const enterpriseManagementDynamicReset = ({formId}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_RESET,
    formId,
  };
};
const enterpriseManagementResetAllValue = () => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_RESET_ALL_VALUE,
  };
};
const enterpriseManagementUpdateBundleArray = ({data}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_UPDATE_BUNDLE_ARRAY,
    data,
  };
};
const enterpriseManagementSetSearchText = ({searchText}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_SET_SEARCH_TEXT,
    searchText,
  };
};
const enterpriseManagementResetSearchText = ({searchText}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_RESET_SEARCH_TEXT,
    searchText,
  };
};
const enterpriseManagementGenerateParams = () => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_GENERATE_PARAMS,
  };
};
const enterpriseManagementResetParams = () => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_RESET_PARAMS,
  };
};
const getCustomerType = () => {
  return async (dispatch, getState) => {
    dispatch(
      enterpriseManagementDynamicLoading({
        formId: 'customer-type-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get(`${base_url}/user/corp/getCustType`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(({value, code}) => ({
            value: code,
            label: value,
          }));
          dispatch(
            enterpriseManagementDynamicSuccess({
              formId: 'customer-type-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            enterpriseManagementDynamicFailed({
              formId: 'customer-type-hard-code',
              errorText: 'Failed, to get customer type',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          enterpriseManagementDynamicFailed({
            formId: 'customer-type-hard-code',
            errorText: 'Failed, to get customer type',
            ...error.response.data,
          }),
        );
      });
  };
};
export default getCustomerType;
export {
  enterpriseManagementDynamicOnChangeTextInput,
  enterpriseManagementDynamicOnChangeDropDown,
  enterpriseManagementChangeCheckHeader,
  enterpriseManagementResetAllValue,
  enterpriseManagementGenerateParams,
  enterpriseManagementSetSearchText,
  enterpriseManagementUpdateBundleArray,
  enterpriseManagementDynamicReset,
};

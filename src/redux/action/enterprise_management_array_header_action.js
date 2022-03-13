import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';
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
const enterpriseManagementDynamicOnChangeDateTimePicker = ({
  formId,
  dateTimePicker,
}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_DATE_TIME_PICKER,
    formId,
    dateTimePicker,
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
const setEnterpriseManagementEditPermission = (data) => ({
  type: reduxString.SET_ENTERPRISE_MANAGEMENT_EDIT_PERMISSION,
  payload: data,
});
const enterpriseManagementEditPermission = (isHasPermission) => {
  return async (dispatch, getState) => {
    const {dataHeaderEnterprise} = await getState()
      .enterprise_management_header_array_reducer;
    const dataHeaderUpdate = [...dataHeaderEnterprise];
    dataHeaderUpdate[0].config.isNavigate = isHasPermission;
    dispatch(setEnterpriseManagementEditPermission(dataHeaderUpdate));
  };
};
const getCustomerType = () => {
  return async (dispatch) => {
    dispatch(
      enterpriseManagementDynamicLoading({
        formId: 'customer-type-hard-code',
      }),
    );
    httpRequest
      .get('/user/corp/getCustType')
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(({value, code}) => ({
            value: value,
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
  enterpriseManagementDynamicOnChangeDateTimePicker,
  enterpriseManagementChangeCheckHeader,
  enterpriseManagementResetAllValue,
  enterpriseManagementGenerateParams,
  enterpriseManagementSetSearchText,
  enterpriseManagementUpdateBundleArray,
  enterpriseManagementDynamicReset,
  enterpriseManagementEditPermission,
};

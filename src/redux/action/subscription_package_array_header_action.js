import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const subscriptionPackageDynamicOnChangeTextInput = ({formId, textInput}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_TEXT_INPUT,
    formId,
    textInput,
  };
};
const subscriptionPackageDynamicOnChangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const subscriptionPackageChangeCheckHeader = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_CHANGE_CHECK_HEADER,
  };
};
const subscriptionPackageDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const subscriptionPackageDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const subscriptionPackageDynamicLoading = ({formId}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_LOADING,
    formId,
  };
};
const subscriptionPackageDynamicReset = ({formId}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_RESET,
    formId,
  };
};
const subscriptionPackageResetAllValue = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_RESET_ALL_VALUE,
  };
};
const subscriptionPackageUpdateBundleArray = ({data}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_UPDATE_BUNDLE_ARRAY,
    data,
  };
};
const subscriptionPackageSetSearchText = ({searchText}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_SET_SEARCH_TEXT,
    searchText,
  };
};
const subscriptionPackageResetSearchText = ({searchText}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_RESET_SEARCH_TEXT,
    searchText,
  };
};
const subscriptionPackageGenerateParams = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_GENERATE_PARAMS,
  };
};
const subscriptionPackageResetParams = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_RESET_PARAMS,
  };
};
const getSubscriptionDescription = (description) => {
  return async (dispatch, getState) => {
    dispatch(
      subscriptionPackageDynamicLoading({
        formId: 'subscription-description-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get(
        `${base_url}/dcp/analytics/getListSubscriptionPackageName?enterpriseName=${description}`
          .split(' ')
          .join('+'),
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
            ({packageId, packageDesc}) =>
              ({
                value: packageId,
                label: packageDesc,
              } || []),
          );
          dispatch(
            subscriptionPackageDynamicSuccess({
              formId: 'subscription-description-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            subscriptionPackageDynamicFailed({
              formId: 'subscription-description-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          subscriptionPackageDynamicFailed({
            formId: 'subscription-description-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
const getActiveEnterpriseSubscription = () => {
  return async (dispatch, getState) => {
    dispatch(
      subscriptionPackageDynamicLoading({
        formId: 'subscription-enterprise-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise(access_token)
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
            subscriptionPackageDynamicSuccess({
              formId: 'subscription-enterprise-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            subscriptionPackageDynamicFailed({
              formId: 'subscription-enterprise-hard-code',
              errorText: 'Failed, to get list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          subscriptionPackageDynamicFailed({
            formId: 'subscription-enterprise-hard-code',
            errorText: 'Failed, to get list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default getActiveEnterpriseSubscription;
export {
  getSubscriptionDescription,
  subscriptionPackageDynamicOnChangeTextInput,
  subscriptionPackageDynamicOnChangeDropDown,
  subscriptionPackageChangeCheckHeader,
  subscriptionPackageResetAllValue,
  subscriptionPackageGenerateParams,
  subscriptionPackageSetSearchText,
  subscriptionPackageUpdateBundleArray,
  subscriptionPackageDynamicReset,
};

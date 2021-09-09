import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const usageSubscribersAnalyticsDynamicOnchangeDropDown = ({
  formId,
  dropDown,
}) => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const usageSubscribersAnalyticsDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const usageSubscribersAnalyticsDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const usageSubscribersAnalyticsDynamicLoading = ({formId}) => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_DYNAMIC_LOADING,
    formId,
  };
};
const usageSubscribersAnalyticsDynamicResetSelectedValue = ({formId}) => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_DYNAMIC_RESET_SELECTED_VALUE,
    formId,
  };
};
const usageSubscribersAnalyticsResetAllValue = () => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_RESET_ALL_VALUE,
  };
};
const usageSubscribersAnalyticsGenerateParams = () => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_GENERATE_PARAMS,
  };
};
const usageSubscribersAnalyticsResetGenerateParams = () => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_RESET_GENERATE_PARAMS,
  };
};
const usageSubscribersAnalyticsSetParamsNavigation = ({
  appliedFilterParams,
}) => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_SET_PARAMS_NAVIGATION,
    appliedFilterParams,
  };
};
const usageSubscribersAnalyticsResetParamsNavigation = () => {
  return {
    type: reduxString.USAGE_SUBSCRIBERS_ANALYTICS_RESET_PARAMS_NAVIGATION,
  };
};

const simGetEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(
      usageSubscribersAnalyticsDynamicLoading({
        formId: 'usage-subscribers-analytics-enterprise-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    callActiveEnterprise({access_token})
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({
              enterpriseId: thisEnterprise,
              enterpriseName,
              customerNumber,
            }) => ({
              value: customerNumber,
              label: enterpriseName,
            }),
          );
          dispatch(
            usageSubscribersAnalyticsDynamicSuccess({
              formId: 'usage-subscribers-analytics-enterprise-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            usageSubscribersAnalyticsDynamicFailed({
              formId: 'usage-subscribers-analytics-enterprise-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          usageSubscribersAnalyticsDynamicFailed({
            formId: 'usage-subscribers-analytics-enterprise-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
const simGetEnterprisePackage = ({enterpriseName}) => {
  return async (dispatch, getState) => {
    dispatch(
      usageSubscribersAnalyticsDynamicLoading({
        formId: 'usage-subscribers-analytics-package-name-hard-code',
      }),
    );
    const {access_token} = (await getState().auth_reducer.data) || {};
    axios
      .get(
        `${base_url}/dcp/analytics/getListSubscriptionPackageName?enterpriseName=${enterpriseName}`
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
          const changeArray = result.map(({packageId, packageDesc}) => ({
            value: packageId,
            label: packageDesc,
          }));
          dispatch(
            usageSubscribersAnalyticsDynamicSuccess({
              formId: 'usage-subscribers-analytics-package-name-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            usageSubscribersAnalyticsDynamicFailed({
              formId: 'usage-subscribers-analytics-package-name-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        alert(JSON.stringify(error, null, 2));
        dispatch(
          usageSubscribersAnalyticsDynamicFailed({
            formId: 'usage-subscribers-analytics-package-name-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
export {
  simGetEnterprise,
  simGetEnterprisePackage,
  usageSubscribersAnalyticsDynamicOnchangeDropDown,
  usageSubscribersAnalyticsDynamicResetSelectedValue,
  usageSubscribersAnalyticsResetAllValue,
  usageSubscribersAnalyticsGenerateParams,
  usageSubscribersAnalyticsResetGenerateParams,
  usageSubscribersAnalyticsSetParamsNavigation,
  usageSubscribersAnalyticsResetParamsNavigation,
};

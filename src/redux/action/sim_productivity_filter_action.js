import reduxString from '../reduxString';
import {callActiveEnterprise} from './user_administration_array_header_action';
import httpRequest from '../../constant/axiosInstance';

const simProductivityDynamicOnchangeDropDown = ({formId, dropDown}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_ONCHANGE_DROP_DOWN,
    formId,
    dropDown,
  };
};
const simProductivityDynamicSuccess = ({formId, data}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_SUCCESS,
    formId,
    data,
  };
};
const simProductivityDynamicFailed = ({formId, errorText}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_FAILED,
    formId,
    errorText,
  };
};
const simProductivityDynamicLoading = ({formId}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_LOADING,
    formId,
  };
};
const simProductivityDynamicResetSelectedValue = ({formId}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_DYNAMIC_RESET_SELECTED_VALUE,
    formId,
  };
};
const simProductivityResetAllValue = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_RESET_ALL_VALUE,
  };
};
const simProductivityGenerateParams = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_GENERATE_PARAMS,
  };
};
const simProductivityResetGenerateParams = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_RESET_GENERATE_PARAMS,
  };
};
const simProductivitySetParamsNavigation = ({appliedFilterParams}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_SET_PARAMS_NAVIGATION,
    appliedFilterParams,
  };
};
const simProductivityResetParamsNavigation = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_RESET_PARAMS_NAVIGATION,
  };
};
const simProductivityChartLoading = () => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_CHART_LOADING,
  };
};
const simProductivityChartFailed = ({errorText}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_CHART_FAILED,
    errorText,
  };
};
const simProductivityChartSuccess = ({dataChart, dataColor}) => {
  return {
    type: reduxString.SIM_PRODUCTIVITY_CHART_SUCCESS,
    dataChart,
    dataColor,
  };
};

const simGetEnterprise = () => {
  return async (dispatch, getState) => {
    dispatch(
      simProductivityDynamicLoading({
        formId: 'sim-productivity-enterprise-hard-code',
      }),
    );
    callActiveEnterprise()
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(
            ({enterpriseId: thisEnterprise, enterpriseName, enterpriseId}) => ({
              value: enterpriseName,
              label: enterpriseName,
              toPackage: enterpriseId,
            }),
          );
          dispatch(
            simProductivityDynamicSuccess({
              formId: 'sim-productivity-enterprise-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            simProductivityDynamicFailed({
              formId: 'sim-productivity-enterprise-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          simProductivityDynamicFailed({
            formId: 'sim-productivity-enterprise-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
const simGetEnterprisePackage = ({enterpriseId}) => {
  return async (dispatch) => {
    dispatch(
      simProductivityDynamicLoading({
        formId: 'sim-productivity-package-name-hard-code',
      }),
    );
    httpRequest
      .get(
        `/dcp/analytics/getListSubscriptionPackageName?enterpriseId=${enterpriseId}`
          .split(' ')
          .join('+'),
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const changeArray = result.map(({packageId, packageDesc}) => ({
            value: packageDesc,
            label: packageDesc,
          }));
          dispatch(
            simProductivityDynamicSuccess({
              formId: 'sim-productivity-package-name-hard-code',
              data: changeArray,
            }),
          );
        } else {
          dispatch(
            simProductivityDynamicFailed({
              formId: 'sim-productivity-package-name-hard-code',
              errorText: 'Failed, to get enterprise',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          simProductivityDynamicFailed({
            formId: 'sim-productivity-package-name-hard-code',
            errorText: 'Failed, to get enterprise',
            ...error.response.data,
          }),
        );
      });
  };
};
const simGetChart = () => {
  return async (dispatch, getState) => {
    dispatch(simProductivityChartLoading());
    const {generatedParams} =
      (await getState().sim_productivity_filter_reducer) || {};
    const customHeaders = {
      headers: {
        activityId: generatedParams ? 'ANP-2' : 'ANP-1',
        showParams: !!generatedParams,
        excludeParamsKey: 'page|size',
      },
    };
    httpRequest
      .get(
        `/dcp/analytics/getSimProductivityStatistics${
          generatedParams && generatedParams.replace('&', '?')
        }`
          .split(' ')
          .join('+'),
        customHeaders,
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          let colors = [];
          result.map(({color}) => {
            colors.push(color);
            return null;
          });
          const changeArray = result.map(
            ({label, percentageValue, percentage, color, ...rest}) => ({
              label: label,
              value: percentage,
              y: percentageValue,
              percentage: percentageValue,
              color: color,
              rest: rest,
            }),
          );
          dispatch(
            simProductivityChartSuccess({
              dataChart: changeArray,
              dataColor: colors,
            }),
          );
        } else {
          dispatch(
            simProductivityChartFailed({
              errorText: 'Failed, to fetch chart',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          simProductivityChartFailed({
            errorText: 'Failed, to fetch chart',
            ...error.response.data,
          }),
        );
      });
  };
};
export {
  simGetEnterprise,
  simGetEnterprisePackage,
  simGetChart,
  simProductivityDynamicOnchangeDropDown,
  simProductivityDynamicResetSelectedValue,
  simProductivityResetAllValue,
  simProductivityGenerateParams,
  simProductivityResetGenerateParams,
  simProductivitySetParamsNavigation,
  simProductivityResetParamsNavigation,
};

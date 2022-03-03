import {
  iconIpConnectionDefault,
  iconIpConnectionError,
  iconIpConnectionGood,
  iconIpConnectionQuestion,
  iconNetworkConnectionDefault,
  iconNetworkConnectionError,
  iconNetworkConnectionGood,
  iconNetworkConnectionQuestion,
  iconProvisioningDefault,
  iconProvisioningError,
  iconProvisioningGood,
  iconProvisioningQuestion,
  iconSimDeviceDefault,
  iconSimDeviceError,
  iconSimDeviceGood,
  iconSimDeviceQuestion,
} from '../../assets/images';
import {setRequestError} from './dashboard_action';
import httpRequest from '../../constant/axiosInstance';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';
import wordingJson from '../../wording/diagnosticWizardWording.json';

const realtimeDiagnosticGetSimData = (simData, trafficUsage) => ({
  type: reduxString.REALTIME_DIAGNOSTIC_GET_SIM_DATA,
  payload: {
    simData,
    trafficUsage,
  },
});

const realtimeDiagnosticRequestSimData = () => ({
  type: reduxString.REALTIME_DIAGNOSTIC_REQUEST_SIM_DATA,
});

const realtimeDiagnosticResetSimData = () => ({
  type: reduxString.REALTIME_DIAGNOSTIC_RESET_SIM_DATA,
});

const realtimeDiagnosticGetSimStatus = (data) => ({
  type: reduxString.REALTIME_DIAGNOSTIC_GET_SIM_STATUS,
  payload: data,
});

const realtimeDiagnosticRequestSimStatus = () => ({
  type: reduxString.REALTIME_DIAGNOSTIC_REQUEST_SIM_STATUS,
});

const realtimeDiagnosticResetSimStatus = () => ({
  type: reduxString.REALTIME_DIAGNOSTIC_RESET_SIM_STATUS,
});

const realtimeDiagnosticSetError = (data) => ({
  type: reduxString.REALTIME_DIAGNOSTIC_SET_ERROR,
  payload: data,
});

const realtimeDiagnosticSetSuccess = (data) => ({
  type: reduxString.REALTIME_DIAGNOSTIC_SET_SUCCESS,
  payload: data,
});

const realtimeDiagnosticFixStatusLoading = (data) => ({
  type: reduxString.REALTIME_DIAGNOSTIC_FIX_STATUS_LOADING,
  payload: data,
});

const getRealtimeDiagnosticSimData = (keyword) => {
  return async (dispatch) => {
    // dispatch(realtimeDiagnosticSetSuccess(null));
    const customHeaders = {
      headers: {
        activityId: 'DW-1',
        showParams: true,
      },
    };
    try {
      dispatch(realtimeDiagnosticRequestSimData());
      const {data} = await httpRequest.get(
        `/dcp/diagnostic/getSimData?sim=${keyword}`,
        customHeaders,
      );
      if (data) {
        const {result, statusCode, statusDescription} = data;
        if (statusCode === 0) {
          result.totalUsage = Helper.formatBytes(result.totalUsage);
          dispatch(getRealtimeDiagnosticSimStatus(keyword, result));
        } else {
          dispatch(realtimeDiagnosticResetSimData());
          dispatch(realtimeDiagnosticResetSimStatus());
          dispatch(realtimeDiagnosticSetError(statusDescription));
        }
      }
    } catch (error) {
      dispatch(realtimeDiagnosticResetSimData());
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getRealtimeDiagnosticSimStatus = (keyword, resultData) => {
  return async (dispatch, getState) => {
    try {
      const {simStatus} = getState().realtime_diagnostic_reducer;
      dispatch(realtimeDiagnosticRequestSimStatus());
      const {data} = await httpRequest.get(
        `/dcp/diagnostic/getSimStatus?sim=${keyword}`,
      );
      if (data) {
        const {result, statusCode} = data;
        if (statusCode === 0) {
          const backupSimStatus = [...simStatus];
          backupSimStatus.map((data) => {
            const tempData = findWordingAndIcon(
              data?.field,
              result[data.field],
            );
            const {icon, value, isActionEnable, statusDesc} = tempData;
            const {iccid, imsi, msisdn} = result;
            data.icon = icon;
            data.value = value;
            data.isActionEnable = isActionEnable;
            data.statusDesc = statusDesc;
            data.iccid = iccid;
            data.imsi = imsi;
            data.msisdn = msisdn;
          });
          const trafficUsage = setTrafficUsage(resultData?.trafficUsage);
          dispatch(realtimeDiagnosticGetSimStatus(backupSimStatus));
          dispatch(realtimeDiagnosticGetSimData(resultData, trafficUsage));
        }
      }
    } catch (error) {
      dispatch(realtimeDiagnosticResetSimStatus());
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setTrafficUsage = (data) => {
  const monthUsage = [];
  const cumulativeUsage = [];
  data.map((datas) => {
    let splitDate = datas.date.split('-');
    let tooltipValue = [
      `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}`,
      `Cumulative Month Values: ${Helper.formatBytes(datas.cumulative || 0)}`,
      `Day Volumes: ${Helper.formatBytes(datas.volume || 0)}`,
    ];
    monthUsage.push({
      y: datas.volume || 0,
      x: datas.date || '',
      tooltipValue,
      symbol: 'round',
      size: 4,
    });
    cumulativeUsage.push({
      y: datas.cumulative || 0,
      x: datas.date || '',
      tooltipValue,
      symbol: 'round',
      size: 4,
    });
  });
  return {
    monthUsage,
    cumulativeUsage,
  };
};

const realtimeDiagnosticeHideUnhideMenu = (field) => {
  return (dispatch, getState) => {
    const {simStatus} = getState().realtime_diagnostic_reducer;
    const backUpData = [...simStatus].map((data) => {
      if (data.field === field) {
        data.buttonArrow =
          data.buttonArrow === 'caretdown' ? 'caretup' : 'caretdown';
        data.isCollapse = !data.isCollapse;
      }
      return data;
    });
    dispatch(realtimeDiagnosticGetSimStatus(backUpData));
  };
};

const realtimeDiagnosticFixStatus = ({fixType, msisdn}) => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        activityId: 'DW-2',
        descSuffix: `${msisdn} from ${fixType} status`,
      },
    };
    try {
      const {data} = await httpRequest.post(
        '/dcp/diagnostic/fixSimStatus',
        {fixType, msisdn},
        customHeaders,
      );

      if (data) {
        const {result, statusCode} = data;
        const {msisdn} = result;
        if (statusCode === 0) {
          await dispatch(realtimeDiagnosticFixLoading(fixType));
          await dispatch(getRealtimeDiagnosticSimData(msisdn));
          await dispatch(
            realtimeDiagnosticSetSuccess(
              `A device reconnect request has been sent successfully, please wait about 2 minutes for the SIM card requests for a new location update and check again on the Diagnostic Wizard`,
            ),
          );
        } else {
          dispatch(
            realtimeDiagnosticSetError(
              `SIM Activation can’t be done, please contact your system support`,
            ),
          );
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const realtimeDiagnosticFixLoading = (key) => {
  return (dispatch, getState) => {
    const {fixLoading} = getState().realtime_diagnostic_reducer;
    const newFixLoading = {...fixLoading};
    newFixLoading[key] = !newFixLoading[key];
    dispatch(realtimeDiagnosticFixStatusLoading(newFixLoading));
  };
};

const findWordingAndIcon = (key, value) => {
  const flagList = ['', false, true, null];
  const iconList = {
    provisioning: [
      iconProvisioningDefault,
      iconProvisioningError,
      iconProvisioningGood,
      iconProvisioningQuestion,
    ],
    simDevice: [
      iconSimDeviceDefault,
      iconSimDeviceError,
      iconSimDeviceGood,
      iconSimDeviceQuestion,
    ],
    networkConnection: [
      iconNetworkConnectionDefault,
      iconNetworkConnectionError,
      iconNetworkConnectionGood,
      iconNetworkConnectionQuestion,
    ],
    ipConnection: [
      iconIpConnectionDefault,
      iconIpConnectionError,
      iconIpConnectionGood,
      iconIpConnectionQuestion,
    ],
  };
  const indexValue = flagList.indexOf(value);
  const keysIndex = indexValue > 0 ? indexValue : 3;
  return {
    icon: iconList[key][keysIndex],
    value: wordingJson[key]?.statusInfo[keysIndex],
    isActionEnable: value === false,
    statusDesc: wordingJson[key]?.statusDesc[keysIndex],
  };
};

export {
  getRealtimeDiagnosticSimData,
  realtimeDiagnosticResetSimData,
  realtimeDiagnosticSetError,
  realtimeDiagnosticSetSuccess,
  realtimeDiagnosticResetSimStatus,
  realtimeDiagnosticeHideUnhideMenu,
  realtimeDiagnosticGetSimStatus,
  realtimeDiagnosticFixStatus,
  realtimeDiagnosticFixLoading,
};

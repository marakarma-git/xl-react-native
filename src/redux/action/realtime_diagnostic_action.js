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

const realtimeDiagnosticGetSimData = (data) => ({
  type: reduxString.REALTIME_DIAGNOSTIC_GET_SIM_DATA,
  payload: data,
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

const getRealtimeDiagnosticSimData = (keyword) => {
  return async (dispatch) => {
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
          dispatch(realtimeDiagnosticGetSimStatus(backupSimStatus));
          dispatch(realtimeDiagnosticGetSimData(resultData));
        }
      }
    } catch (error) {
      dispatch(realtimeDiagnosticResetSimStatus());
      dispatch(setRequestError(error.response.data));
    }
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
  realtimeDiagnosticResetSimStatus,
  realtimeDiagnosticeHideUnhideMenu,
  realtimeDiagnosticGetSimStatus,
};

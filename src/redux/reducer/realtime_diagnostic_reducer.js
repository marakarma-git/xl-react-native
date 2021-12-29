import {
  iconIpConnectionDefault,
  iconNetworkConnectionDefault,
  iconProvisioningDefault,
  iconSimDeviceDefault,
} from '../../assets/images';
import reduxString from '../reduxString';
const initialState = {
  simData: null,
  simStatus: [
    {
      title: 'SIM / Billing State',
      icon: iconProvisioningDefault,
      value: ' - ',
      isActionEnable: false,
      field: 'provisioning',
      statusDesc: ' - ',
      buttonText: 'Change state to active',
      buttonArrow: 'caretdown',
      isCollapse: false,
    },
    {
      title: 'Device Status',
      icon: iconSimDeviceDefault,
      value: ' - ',
      isActionEnable: false,
      field: 'simDevice',
      statusDesc: ' - ',
      buttonText: 'Check detail SIM history',
      buttonArrow: 'caretdown',
      isCollapse: false,
    },
    {
      title: 'Network Connection',
      icon: iconNetworkConnectionDefault,
      value: ' - ',
      isActionEnable: false,
      field: 'networkConnection',
      statusDesc: ' - ',
      buttonText: 'Reconnect Device',
      buttonArrow: 'caretdown',
      isCollapse: false,
    },
    {
      title: 'Terminal IP Allocation',
      icon: iconIpConnectionDefault,
      value: ' - ',
      isActionEnable: false,
      field: 'ipConnection',
      statusDesc: ' - ',
      buttonText: 'Reconnect Device',
      buttonArrow: 'caretdown',
      isCollapse: false,
    },
  ],
  trafficUsage: {
    monthUsage: [],
    cumulativeUsage: [],
  },
  loadSimData: false,
  loadSimStatus: false,
  errorText: null,
  successText: null,
  fixLoading: {
    provisioning: false,
    simDevice: false,
    networkConnection: false,
    ipConnection: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case reduxString.REALTIME_DIAGNOSTIC_GET_SIM_DATA:
      return {
        ...state,
        simData: action.payload.simData,
        trafficUsage: action.payload.trafficUsage,
        loadSimData: false,
      };
    case reduxString.REALTIME_DIAGNOSTIC_RESET_SIM_DATA:
      return {
        ...state,
        simData: null,
        trafficUsage: {
          monthUsage: [],
          cumulativeUsage: [],
        },
        loadSimData: false,
      };
    case reduxString.REALTIME_DIAGNOSTIC_REQUEST_SIM_DATA:
      return {
        ...state,
        loadSimData: true,
      };
    case reduxString.REALTIME_DIAGNOSTIC_GET_SIM_STATUS:
      return {
        ...state,
        simStatus: action.payload,
        loadSimStatus: false,
      };
    case reduxString.REALTIME_DIAGNOSTIC_RESET_SIM_STATUS:
      return {
        ...state,
        simStatus: [
          {
            title: 'SIM / Billing State',
            icon: iconProvisioningDefault,
            value: ' - ',
            isActionEnable: false,
            field: 'provisioning',
            statusDesc: ' - ',
            buttonText: 'Change state to active',
            buttonArrow: 'caretdown',
            isCollapse: false,
          },
          {
            title: 'Device Status',
            icon: iconSimDeviceDefault,
            value: ' - ',
            isActionEnable: false,
            field: 'simDevice',
            statusDesc: ' - ',
            buttonText: 'Check detail SIM history',
            buttonArrow: 'caretdown',
            isCollapse: false,
          },
          {
            title: 'Network Connection',
            icon: iconNetworkConnectionDefault,
            value: ' - ',
            isActionEnable: false,
            field: 'networkConnection',
            statusDesc: ' - ',
            buttonText: 'Reconnect Device',
            buttonArrow: 'caretdown',
            isCollapse: false,
          },
          {
            title: 'Terminal IP Allocation',
            icon: iconIpConnectionDefault,
            value: ' - ',
            isActionEnable: false,
            field: 'ipConnection',
            statusDesc: ' - ',
            buttonText: 'Reconnect Device',
            buttonArrow: 'caretdown',
            isCollapse: false,
          },
        ],
        loadSimStatus: false,
      };
    case reduxString.REALTIME_DIAGNOSTIC_REQUEST_SIM_STATUS:
      return {
        ...state,
        loadSimStatus: true,
      };
    case reduxString.REALTIME_DIAGNOSTIC_SET_ERROR:
      return {
        ...state,
        errorText: action.payload,
        loadSimStatus: false,
        loadSimData: false,
      };
    case reduxString.REALTIME_DIAGNOSTIC_SET_SUCCESS:
      return {
        ...state,
        successText: action.payload,
        loadSimStatus: false,
        loadSimData: false,
      };
    case reduxString.REALTIME_DIAGNOSTIC_FIX_STATUS_LOADING:
      return {
        ...state,
        fixLoading: action.payload,
      };

    default:
      return state;
  }
};

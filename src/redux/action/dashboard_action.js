import Axios from 'axios';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';
import {dashboardHeaderAuth} from '../../constant/headers';
import {saveActivityLog} from './save_activity_log_action';
import {
  DASHBOARD_PRIVILEDGE_ID,
  LOGIN_LOGOUT_PRIVILEDGE_ID,
} from '../../constant/actionPriv';

const setDashboardSummary = (data) => ({
  type: reduxString.SET_DASHBOARD_SUMMARY,
  payload: data,
});

const requestDashboardData = () => ({
  type: reduxString.REQUEST_DASHBOARD_DATA,
});

const requestTopTraffic = () => ({
  type: reduxString.REQUEST_TOP_TRAFFIC,
});

const request12MonthUsage = () => ({
  type: reduxString.REQUEST_12_MONTH_USAGE,
});

const requestMonthUsage = () => ({
  type: reduxString.REQUEST_MONTH_USAGE,
});

const requestAggregatedTraffic = () => ({
  type: reduxString.REQUEST_AGGREGATED_TRAFFIC,
});

const requestSubsAnalytics = () => ({
  type: reduxString.REQUEST_SUBS_ANALYTICS,
});

export const setRequestError = (error) => ({
  type: reduxString.REQUEST_ERROR,
  payload: error,
});

export const getDashboardSummary = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch(requestDashboardData());
      // dispatch(
      //   saveActivityLog('Dashboard', 'Summary', DASHBOARD_PRIVILEDGE_ID, ''),
      // );
      const {data} = await Axios.get(
        `${base_url}/dcp/dashboard/getSummaryDashboard`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );
      if (data) {
        if (data.statusCode === 0) {
          const summaryData = [
            {title: 'Total SIM Card', resultId: 'totalsimcard'},
            {title: 'Total Active Session', resultId: 'totalactivesession'},
            {title: 'Total Active SIM Card', resultId: 'totalactivesim'},
            {
              title: 'Total Aggregated Traffic',
              resultId: 'totalaggregatedtraffic',
            },
          ];
          Object.keys(data.result).map((keys) => {
            summaryData.map((sumData, index) => {
              if (keys === sumData.resultId) {
                summaryData[index].value = data.result[keys];
              }
            });
          });

          dispatch(setDashboardSummary(summaryData));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setWidgetList = (data) => ({
  type: reduxString.SET_WIDGET_LIST,
  payload: data,
});

export const getWidgetList = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch(requestDashboardData());
      const {data} = await Axios.get(
        `${base_url}/dcp/dashboard/getWidgetList`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(setWidgetList(data.result.reverse()));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setCarousel = (data) => ({
  type: reduxString.SET_CAROUSEL,
  payload: data,
});

export const getCarousel = (accessToken) => {
  return async (dispatch) => {
    dispatch(requestDashboardData());
    // dispatch(saveActivityLog('Home', 'Home', LOGIN_LOGOUT_PRIVILEDGE_ID));
    try {
      const {data} = await Axios.get(`${base_url}/dcp/banner/getListBanner`, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      if (data) {
        if (data.statusCode === 0) {
          data.result.map((banner) => {
            banner.bannerImage = `data:image/jpeg;base64,${banner.bannerImage}`;
          });
          dispatch(setCarousel(data.result));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setSimStatistics = (data, params) => {
  const newDataSet = [];
  const pieChartColor = ['#2ECFD3', '#124EAB', '#0064FB', '#22385A'];

  data.map((datas, i) => {
    newDataSet.push({
      y: +datas.total,
      percentage: +datas.percentage,
      status: datas.status,
      color: pieChartColor[i],
      total: +datas.total,
    });
  });

  Helper.sortDescending(newDataSet, 'total');

  return {
    type: 'SET_SIM_STATISTICS',
    payload: newDataSet,
    params,
  };
};

const setTopTrafficStatistics = (data, params) => {
  const newDataSet = [];

  data.map((datas) => {
    newDataSet.push({
      x: datas.msisdn,
      y: +datas.datausage,
      label: [
        `MSISDN: `,
        `${datas.msisdn}`,
        `Data usage: `,
        `${Helper.formatBytes(+datas.datausage)}`,
      ],
    });
  });

  Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_TOP_TRAFFIC_STATISTICS',
    payload: newDataSet,
    params,
  };
};

export const resetTopTrafficStatistics = () => ({
  type: reduxString.RESET_TOP_TRAFFIC_STATISTICS,
});

const setAggregatedTraffic = (data, params) => {
  const summaryData = [
    {
      title: 'From start of month, Total Volume',
      dataId: 'firstmonthvolume',
      smsId: 'firstmonthsms',
    },
    {
      title: 'Previous 30 days, Total Volume',
      dataId: 'last30dayvolume',
      smsId: 'last30daysms',
    },
    {
      title: 'From start of month, Average per subscription',
      dataId: 'firstmonthavgpersubs',
      smsId: 'firstmonthavgpersubssms',
    },
    {
      title: 'Previous 30 days, Average per subscription',
      dataId: 'last30dayavgpersubs',
      smsId: 'last30dayavgpersubssms',
    },
  ];

  data.map((datas) => {
    Object.keys(datas).map((keys) => {
      summaryData.map((sumData, index) => {
        if (keys === sumData.dataId)
          summaryData[index].data = Helper.formatBytes(+datas[keys]);
        else if (keys === sumData.smsId)
          summaryData[index].sms = Helper.formatBytes(+datas[keys]);
      });
    });
  });

  return {
    type: reduxString.SET_AGGREGATED_TRAFFIC,
    payload: summaryData,
    params,
  };
};

const set12MonthUsage = (data, params) => {
  const monthUsage = new Array();

  data.map((datas) => {
    monthUsage.push({x: datas.monthperiod, y: +datas.traffic || 0});
  });

  return {
    type: reduxString.SET_12_MONTH_USAGE,
    payload: monthUsage,
    params,
  };
};

const setMonthUsage = (data, params) => {
  const monthUsage = new Array();
  const cummulative = new Array();

  data.map((datas) => {
    monthUsage.push({
      y: datas.volume || 0,
      x: datas.date || '',
      symbol: 'round',
      size: 4,
    });
    cummulative.push({
      y: datas.cumulative || 0,
      x: datas.date || '',
      symbol: 'round',
      size: 4,
    });
  });

  return {
    type: reduxString.SET_MONTH_USAGE,
    payload: {
      day: monthUsage,
      cummulative: cummulative,
    },
    params,
  };
};

const setSubsAnalytics = (data, params) => {
  const subsData = [...data].map((datas) => {
    return {x: datas.monthperiod, y: datas.totalactive || 0};
  });
  const usageData = [...data].map((datas) => {
    return {x: datas.monthperiod, y: datas.traffic || 0};
  });

  return {
    type: reduxString.SET_SUBS_ANALYTICS,
    payload: [[...usageData], [...subsData]],
  };
};

export const requestWidgetData = (
  accessToken,
  item,
  filterParams,
  type = 'sim',
) => {
  return async (dispatch) => {
    if (type === 'sim') dispatch(requestDashboardData());
    if (type === 'top') dispatch(requestTopTraffic());
    // dispatch(
    //   saveActivityLog(
    //     'Dashboard',
    //     type === 'sim' ? 'Dashboard' : 'TopTraffic',
    //     DASHBOARD_PRIVILEDGE_ID,
    //     '',
    //   ),
    // );

    try {
      const {data} = await Axios.post(
        `${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        {
          headers: dashboardHeaderAuth(accessToken),
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          if (type === 'sim') {
            dispatch(setSimStatistics(data.result.dataset, filterParams));
          } else if (type === 'top') {
            dispatch(
              setTopTrafficStatistics(data.result.dataset, filterParams),
            );
          }
        } else {
          dispatch(setRequestError(data.statusDescription));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getAggregatedTraffic = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth_reducer.data?.access_token;

    try {
      dispatch(requestAggregatedTraffic());
      const {data} = await Axios.post(
        `${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        {
          headers: dashboardHeaderAuth(accessToken),
        },
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setAggregatedTraffic(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const get12MonthUsage = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth_reducer.data?.access_token;

    try {
      dispatch(request12MonthUsage());
      const {data} = await Axios.post(
        `${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        {
          headers: dashboardHeaderAuth(accessToken),
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(set12MonthUsage(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getMonthUsage = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth_reducer.data?.access_token;

    try {
      dispatch(requestMonthUsage());
      const {data} = await Axios.post(
        `${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        {
          headers: dashboardHeaderAuth(accessToken),
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(setMonthUsage(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      console.log('Error' + error.response.data);
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getSubsAnalytics = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    const accessToken = getState().auth_reducer.data?.access_token;

    try {
      dispatch(requestSubsAnalytics());
      console.log(item, ' <<< item ya');
      const {data} = await Axios.post(
        `${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        {
          headers: dashboardHeaderAuth(accessToken),
        },
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(setSubsAnalytics(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      console.log('Error' + error);
      dispatch(setRequestError(error.response.data));
    }
  };
};

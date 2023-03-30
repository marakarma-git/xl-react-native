import Axios from 'axios';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';

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

export const getDashboardSummary = () => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        activityId: 'DP-2',
      },
    };
    try {
      dispatch(requestDashboardData());
      const {data} = await httpRequest.get(
        `/dcp/dashboard/getSummaryDashboard`,
        customHeaders,
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
      const {data} = await httpRequest.get(`/dcp/dashboard/getWidgetList`);

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

export const getCarousel = () => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        activityId: 'LLP-3',
        isStatic: true,
      },
    };
    dispatch(requestDashboardData());
    try {
      const {data} = await httpRequest.get(
        `/dcp/banner/getListBanner`,
        customHeaders,
      );

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
      console.log(error.response.data, 'ERROR');
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

export const resetSubsAnalytics = () => ({
  type: reduxString.RESET_SUBS_ANALYTIC,
});

export const resetTopTrafficStatistics = () => ({
  type: reduxString.RESET_TOP_TRAFFIC_STATISTICS,
});

const setAggregatedTraffic = (data, params) => {
  const summaryData = [
    {
      title: 'From start of month, Total Volume',
      dataId: 'firstmonthvolume',
      smsId: 'firstmonthsms',
      data: '-',
      sms: '-',
    },
    {
      title: 'Previous 30 days, Total Volume',
      dataId: 'last30dayvolume',
      smsId: 'last30daysms',
      data: '-',
      sms: '-',
    },
    {
      title: 'From start of month, Average per subscription',
      dataId: 'firstmonthavgpersubs',
      smsId: 'firstmonthavgpersubssms',
      data: '-',
      sms: '-',
    },
    {
      title: 'Previous 30 days, Average per subscription',
      dataId: 'last30dayavgpersubs',
      smsId: 'last30dayavgpersubssms',
      data: '-',
      sms: '-',
    },
  ];

  if (data.length > 0) {
    data.map((datas) => {
      Object.keys(datas).map((keys) => {
        summaryData.map((sumData, index) => {
          if (keys === sumData.dataId)
            summaryData[index].data = Helper.formatBytes(+datas[keys]);
          else if (keys === sumData.smsId)
            summaryData[index].sms = Helper.numberFormat(+datas[keys], '.');
        });
      });
    });
  }

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
    cummulative.push({
      y: datas.cumulative || 0,
      x: datas.date || '',
      tooltipValue,
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
  let minSubsValue = 0;
  let minUsageValue = 0;
  const subsData = [...data].map((datas) => {
    if (datas.totalactive !== null && datas.totalactive > 0) {
      if (datas.totalactive <= minSubsValue || minSubsValue === 0) {
        minSubsValue = datas.totalactive;
      }
    }
    return {x: datas.monthperiod, y: datas.totalactive || 0};
  });
  const usageData = [...data].map((datas) => {
    if (datas.traffic !== null && datas.traffic > 0) {
      if (datas.traffic <= minSubsValue || minUsageValue === 0) {
        minUsageValue = datas.traffic;
      }
    }
    return {x: datas.monthperiod, y: datas.traffic || 0};
  });

  return {
    type: reduxString.SET_SUBS_ANALYTICS,
    payload: {
      minValue: {minSubsValue, minUsageValue},
      data: [[...usageData], [...subsData]],
    },
  };
};

export const requestWidgetData = (
  accessToken,
  item,
  filterParams = {},
  type = 'sim',
) => {
  return async (dispatch) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    console.log(filterParams, ' FILTER PARAMS', type);
    if (type === 'sim') dispatch(requestDashboardData());
    if (type === 'top') dispatch(requestTopTraffic());
    let activityId;
    if (type === 'sim') activityId = isHasParams ? 'DP-4' : 'DP-1';
    else if (type === 'top') activityId = isHasParams ? 'DP-5' : 'DP-3';
    const customHeaders = {
      headers: {
        activityId,
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    try {
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );
      // console.log(JSON.stringify(data, null, 2));
      console.log(filterParams, customHeaders)
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
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-8' : 'ANP-7',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    try {
      dispatch(requestAggregatedTraffic());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setAggregatedTraffic(data.result.dataset, filterParams));
        } else {
          dispatch(setAggregatedTraffic([], filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const get12MonthUsage = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-10' : 'ANP-9',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    try {
      dispatch(request12MonthUsage());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
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
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-12' : 'ANP-11',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription: 'param3:Data in Month',
      },
    };
    console.log(filterParams);
    try {
      dispatch(requestMonthUsage());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setMonthUsage(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export const getSubsAnalytics = (item, filterParams = {}) => {
  return async (dispatch, getState) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    const customHeaders = {
      headers: {
        activityId: isHasParams ? 'ANP-13' : 'ANP-14',
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Date',
      },
    };
    try {
      dispatch(requestSubsAnalytics());
      dispatch(resetSubsAnalytics());
      const {data} = await httpRequest.post(
        `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
        filterParams,
        customHeaders,
      );

      if (data) {
        if (data.statusCode === 0) {
          dispatch(setSubsAnalytics(data.result.dataset, filterParams));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

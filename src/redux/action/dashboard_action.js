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

const requestTopDevice = () => ({
  type: reduxString.REQUEST_TOP_DEVICE_BRAND,
});

const requestDevicePopulation = () => ({
  type: reduxString.REQUEST_DEVICE_POPULATION,
});

const requestCustomStatistics = () => ({
  type: reduxString.REQUEST_CUSTOM_STATISTICS,
});

const requestFinanceReport = () => ({
  type: reduxString.REQUEST_FINANCE_REPORT,
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

export const getDashboardSummary = (access_token, params) => {
  return async (dispatch) => {
    // const customHeaders = {
    //   headers: {
    //     activityId: 'DP-2',
    //   },
    // };
    // let keys = Object.keys(params)[0];
    let value = Object.values(params)[0];
    // let fullurl = `?${keys}=${value}`
    // try {
    //   dispatch(requestDashboardData());
    //   const {data} = await httpRequest.get(
    //     `/dcp/dashboard/getSummaryDashboard${fullurl}`,
    //     Object.assign({}, {param1: value}),
    //     customHeaders,
    //   );
    //   if (data) {
    //     if (data.statusCode === 0) {
    //       const summaryData = [
    //         {title: 'Total SIM Card', resultId: 'totalsimcard'},
    //         {title: 'Total Active Session', resultId: 'totalactivesession'},
    //         {title: 'Total Active SIM Card', resultId: 'totalactivesim'},
    //         {
    //           title: 'Total Aggregated Traffic',
    //           resultId: 'totalaggregatedtraffic',
    //         },
    //       ];
    //       Object.keys(data.result).map((keys) => {
    //         summaryData.map((sumData, index) => {
    //           if (keys === sumData.resultId) {
    //             summaryData[index].value = data.result[keys];
    //           }
    //         });
    //       });

    //       dispatch(setDashboardSummary(summaryData));
    //     } else {
    //       throw new Error(data);
    //     }
    //   }
    // } catch (error) {
    //   dispatch(setRequestError(error.response.data));
    // }
    let data = JSON.stringify({
      "param1": value ? value : "07000001",
      "param2": "",
      "param3": "",
      "param4": ""
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://dcp4.adlsandbox.com/api/dcp/dashboard/v2/getSummaryDashboard',
      headers: { 
        'authorization': 'Bearer ' + access_token, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    await Axios.request(config)
      .then((response) => {
        var datares = response.data
        if (datares) {
          if (datares.statusCode === 0) {
            const summaryData = [
              {title: 'Total SIM Card', resultId: 'totalsimcard'},
              {title: 'Total Active Session', resultId: 'totalactivesession'},
              {title: 'Total Active SIM Card', resultId: 'totalactivesim'},
              {
                title: 'Total Aggregated Traffic',
                resultId: 'totalaggregatedtraffic',
              },
            ];
            Object.keys(datares.result).map((keys) => {
              summaryData.map((sumData, index) => {
                if (keys === sumData.resultId) {
                  summaryData[index].value = datares.result[keys];
                }
              });
            });

            dispatch(setDashboardSummary(summaryData));
          } else {
            throw new Error(datares);
          }
        }
      })
      .catch((error) => {
        dispatch(setRequestError(error.response.data));
      });
  };
};

const setWidgetList = (data) => ({
  type: reduxString.SET_WIDGET_LIST,
  payload: data,
});

const setEnterpriseList = (data) => {
  const newDataSet = [];

  data.map((datas, i) => {
    newDataSet.push({
      label: datas.enterpriseName,
      value: datas.customerNumber + ' - ' + datas.enterpriseId + ' - ' + datas.enterpriseName,
    });
  });
  return {
    type: "SET_ENTERPRISE_LIST",
    payload: newDataSet,
  };
};

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

export const getEnterpriseList = (accessToken) => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };
    try {
      const {data} = await httpRequest.get(
        `/user/corp/getActiveEnterprise`,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
            dispatch(setEnterpriseList(data.result));
        } else {
          dispatch(setRequestError(data.statusDescription));
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

const setCustomStatistics = (data, params) => {
  const newDataSet = [];
  const pieChartColor = ['#2ECFD3', '#124EAB', '#0064FB', '#22385A'];

  data.map((datas, i) => {
    newDataSet.push({
      y: +datas.total,
      percentage: +datas.percentage,
      status: datas.businesscat,
      color: pieChartColor[i],
      total: +datas.total,
    });
  });
  Helper.sortDescending(newDataSet, 'total');

  return {
    type: 'SET_CUSTOM_STATISTICS',
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

const setTopDevice = (data, params) => {
  const newDataSet = [];
  data.map((datas) => {
    newDataSet.push({
      x: datas.brand +" ("+datas.type+")",
      y: datas.totalcount,
      label: [
        `Brand: `,
        `${datas.brand} (${datas.type})`,
        `Total: `,
        `${datas.totalcount}`,
      ],
    });
  });

  Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_TOP_DEVICE_BRAND',
    payload: newDataSet,
    params,
  };
};

const setDevicePopulation = (data, params) => {
  const newDataSet = [];

  const pieChartColor = ['#2ECFD3', '#124EAB', '#0064FB', '#22385A'];
  var getobj = Object.keys(data[0]);
  var data2g3g = data[0][getobj[0]]
  var data4g = data[0][getobj[1]]
  var data5g = data[0][getobj[2]]
  var datatotal = data[0][getobj[3]]

  newDataSet.push({
    y: data2g3g,
    percentage: (parseFloat(data2g3g/datatotal).toFixed(2))*10,
    status: "5g",
    color: pieChartColor[2],
    total: data2g3g,
  },{
    y: data4g,
    percentage: (parseFloat(data4g/datatotal).toFixed(2))*10,
    status: "4g",
    color: pieChartColor[1],
    total: data4g,
  },{
    y: data5g,
    percentage: (parseFloat(data5g/datatotal).toFixed(2))*10,
    status: "2g/3g",
    color: pieChartColor[0],
    total: data5g,
  });

  // Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_DEVICE_POPULATION',
    payload: newDataSet,
    params,
  };
};

const setFinanceReport = (data, params) => {
  const newDataSet = [];
  data.map((datas) => {
    newDataSet.push({
      x: datas.datePeriod,
      y: datas.totalInvoice,
      label: [
        `Period: `,
        `${datas.datePeriod}`,
        `Invoice: `,
        `${datas.totalInvoice}`,
      ],
    });
  });

  // Helper.sortAscending(newDataSet, 'y');

  return {
    type: 'SET_FINANCIAL_REPORT',
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
  typereq,
) => {
  return async (dispatch) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    let params1 = filterParams.param1 ? filterParams.param1 : 'Enterprise Number'
    if (typereq == 'sim') dispatch(requestDashboardData());
    if (typereq == 'top') dispatch(requestTopTraffic());
    if (typereq == 'custom') dispatch(requestCustomStatistics());
    if (typereq == 'topdevice') dispatch(requestTopDevice());
    if (typereq == 'devicepopulation') dispatch(requestDevicePopulation());
    let activityId;
    if (typereq == 'sim') activityId = isHasParams ? 'DP-4' : 'DP-1';
    else if (typereq == 'top') activityId = isHasParams ? 'DP-5' : 'DP-3';
    else if (typereq == 'custom') activityId = isHasParams ? 'DP-8' : 'DP-9';
    else if (typereq == 'topdevice') activityId = isHasParams ? 'DP-10' : 'DP-11';
    else if (typereq == 'devicepopulation') activityId = isHasParams ? 'DP-12' : 'DP-13';
    // const customHeaders = {
    //   headers: {
    //     activityId,
    //     showParams: isHasParams ? true : false,
    //     excludeParamsKey: '',
    //     paramKeyDescription:
    //       `param1:${params1}|param2:Package Name|param3:Period (days)|param4:Count By`,
    //   },
    // };
    // try {
    //   const {data} = await httpRequest.post(
    //     `/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
    //     filterParams,
    //     customHeaders,
    //   );
    //   // console.log(JSON.stringify(data));
    //   if (data) {
    //     if (data.statusCode == 0) {
    //       if (typereq == 'sim') {
    //         dispatch(setSimStatistics(data.result.dataset, filterParams));
    //       } else if (typereq == 'top') {
    //         dispatch(
    //           setTopTrafficStatistics(data.result.dataset, filterParams),
    //         );
    //       } else if (typereq == 'custom') {
    //         dispatch(setCustomStatistics(data.result.dataset, filterParams));
    //       } else if (typereq == 'topdevice') {
    //         dispatch(setTopDevice(data.result.dataset, filterParams));
    //       } else if (typereq == 'devicepopulation') {
    //         dispatch(setDevicePopulation(data.result.dataset, filterParams));
    //       }
    //     } else {
    //       dispatch(setRequestError(data.statusDescription));
    //     }
    //   }
    // } catch (error) {
    //   dispatch(setRequestError(error.response.data));
    // }

    let data = JSON.stringify(filterParams);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://dcp4.adlsandbox.com/api/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`,
      headers: { 
        'authorization': 'Bearer ' + accessToken, 
        'Content-type': 'application/json'
      },
      data : data
    };

    await Axios.request(config)
    .then((response) => {
      var datares = response.data
      if (datares) {
        if (datares.statusCode == 0) {
          if (typereq == 'sim') {
            dispatch(setSimStatistics(datares.result.dataset, filterParams));
          } else if (typereq == 'top') {
            dispatch(
              setTopTrafficStatistics(datares.result.dataset, filterParams),
            );
          } else if (typereq == 'custom') {
            dispatch(setCustomStatistics(datares.result.dataset, filterParams));
          } else if (typereq == 'devicepopulation') {
            dispatch(setDevicePopulation(datares.result.dataset, filterParams));
          } else if (typereq == 'topdevice') {
            dispatch(setTopDevice(datares.result.dataset, filterParams));
          }
        } else {
          dispatch(setRequestError(datares.statusDescription));
        }
      }
    })
    .catch((error) => {
      dispatch(setRequestError(error.response.data));
    });
  };
};

export const requestWidgetDataFinance = (
  accessToken,
  item,
  filterParams = {},
  type,
  access_token
) => {
  return async (dispatch) => {
    let isHasParams = Object.keys(filterParams).length > 0;
    if (type == 'finance') dispatch(requestFinanceReport());
    let activityId;
    if (type == 'finance') activityId = isHasParams ? 'DP-6' : 'DP-7';
    const customHeaders = {
      headers: {
        activityId,
        showParams: isHasParams ? true : false,
        excludeParamsKey: '',
        Authorization: 'Bearer ' + accessToken,
        paramKeyDescription:
          'param1:Enterprise Number|param2:Package Name|param3:Period (days)|param4:Count By',
      },
    };
    let value = Object.values(filterParams)[0]
    let fullurl = value ? value :'a06e38ea-d871-4945-8126-44fab717180a'
    try {
      const {data} = await httpRequest.get(
        `/dcp/financial/getInvoiceSummary?enterpriseId=${fullurl}`,
        filterParams,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setFinanceReport(data.result, filterParams));
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

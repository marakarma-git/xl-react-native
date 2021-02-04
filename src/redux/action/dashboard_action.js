import Axios from 'axios';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';
import { base_url } from '../../constant/connection';
import { dashboardHeaderAuth } from '../../constant/headers';
import { filter } from '../../assets/images';

const setDashboardSummary = (data) => ({
  type: reduxString.SET_DASHBOARD_SUMMARY,
  payload: data,
});

const requestDashboardData = () => ({
  type: reduxString.REQUEST_DASHBOARD_DATA,
});

export const setRequestError = (error) => ({
  type: reduxString.REQUEST_ERROR,
  payload: error,
});


export const getDashboardSummary = (accessToken) => {
  return async (dispatch) => {
    try {
      dispatch(requestDashboardData());
      const { data } = await Axios.get(
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
            { title: 'Total SIM Card', resultId: 'totalsimcard' },
            { title: 'Total Active SIM Card', resultId: 'totalactivesim' },
            { title: 'Total Active Session', resultId: 'totalactivesession' },
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
      const { data } = await Axios.get(
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
  payload: data
});

export const getCarousel = (accessToken) => {
  return async (dispatch) => {
    dispatch(requestDashboardData());
    try {
      const { data } = await Axios.get(`${base_url}/dcp/banner/getListBanner`, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      if (data) {
        if (data.statusCode === 0) {

          data.result.map((banner) => {
            banner.bannerImage = `data:image/jpeg;base64,${banner.bannerImage}`;
          });

          dispatch(setCarousel(data.result.slice(0, 4)));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  }
}

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
    })
  });

  Helper.sortDescending(newDataSet, 'total');

  return {
    type: "SET_SIM_STATISTICS",
    payload: newDataSet,
    params
  }
}

const setTopTrafficStatistics = (data, params) => {
  const newDataSet = [];

  data.map((datas) => {
    newDataSet.push({x: datas.msisdn, y: +datas.datausage});
  });

  Helper.sortAscending(newDataSet, 'y');

  return {
    type: "SET_TOP_TRAFFIC_STATISTICS",
    payload: newDataSet,
    params
  }
}

export const requestWidgetData = (accessToken, item, filterParams, type = 'sim') => {
  console.log("REQUEST WIDGET DATA NEW ========================= > ")
  return async (dispatch) => {
    dispatch(requestDashboardData());
    try {
      const { data } = await Axios.post(`${base_url}/dcp/dashboard/v2/getDataSet?datasetId=${item.datasetId}`, 
        filterParams, 
      {
        headers: dashboardHeaderAuth(accessToken)
      });

      if(data){
        if(data.statusCode === 0){
          if(type === 'sim'){
              dispatch(setSimStatistics(data.result.dataset, filterParams));
            }else{
              dispatch(setTopTrafficStatistics(data.result.dataset, filterParams));
          }
        }else{
          dispatch(setRequestError(data.statusDescription));
        }
      }

    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  }
}
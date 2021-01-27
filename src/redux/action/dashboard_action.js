import Axios from 'axios';
import reduxString from '../reduxString';
import { base_url } from '../../constant/connection';
import Helper from '../../helpers/helper';

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
            { title: 'Total Active Session', resultId: 'totalactivesim' },
            { title: 'Total Active SIM Card', resultId: 'totalactivesession' },
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

          dispatch(setCarousel(data.result));
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  }
}
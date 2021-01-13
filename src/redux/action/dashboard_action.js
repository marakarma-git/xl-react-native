import Axios from 'axios';
import reduxString from '../reduxString';
import { dashboard_base_url } from '../../constant/connection';

const setDashboardSummary = (data) => ({
  type: reduxString.SET_DASHBOARD_SUMMARY,
  payload: data
});

const setRequestError = (error) => ({
  type: reduxString.REQUEST_ERROR,
  payload: error
});

const requestDashboardData = () => ({
  type: reduxString.REQUEST_DASHBOARD_DATA
});

export const getDashboardSummary = (accessToken) => {

  return async (dispatch) => {
    try {
      dispatch(requestDashboardData())
      const { data } = await Axios.get(`${dashboard_base_url}/getSummaryDashboard`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      });
      if (data) {
        if (data.statusCode == 0) {
          const summaryData = [
            { title: "Total SIM Card", resultId: 'totalsimcard' },
            { title: "Total Active Session", resultId: 'totalactivesim' },
            { title: "Total Active SIM Card", resultId: 'totalactivesession' },
            { title: "Total Aggregated Traffic", resultId: 'totalaggregatedtraffic' },
          ];

          console.log(data.result, " << ")

          Object.keys(data.result).map((keys) => {
            summaryData.map((sumData, index) => {
              if (keys == sumData.resultId) {
                summaryData[index].value = data.result[keys]
              }
            });
          });

          dispatch(setDashboardSummary(summaryData));
        }
      }

    } catch (error) {
      dispatch(setRequestError(error));
    }
  }

}
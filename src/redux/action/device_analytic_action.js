import Axios from 'axios';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';
export const setRequestError = (error) => ({
  type: reduxString.REQUEST_ERROR,
  payload: error,
});

const setEnterpriseList = (data) => {
  const newDataSet = [];

  data.map((datas, i) => {
    newDataSet.push({
      label: datas.enterpriseName,
      value: datas.enterpriseId + " - " + datas.customerNumber,
    });
  });
  return {
    type: 'SET_ENTERPRISE_LIST',
    payload: newDataSet,
  };
};

const setPackageNameList = (data) => {
  const newDataSet = [];

  data.map((datas, i) => {
    newDataSet.push({
      label: datas.packageDesc,
      value: datas.packageId,
    });
  });
  return {
    type: 'SET_PACKAGE_NAME_LIST',
    payload: newDataSet,
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
        '/user/corp/getActiveEnterprise',
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

export const getPackageNameList = (accessToken, value) => {
  return async (dispatch) => {
    const customHeaders = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    };
    try {
      const {data} = await httpRequest.get(
        `/dcp/analytics/getListSubscriptionPackageName?enterpriseId=${value}`,
        customHeaders,
      );
      if (data) {
        if (data.statusCode === 0) {
          dispatch(setPackageNameList(data.result));
        } else {
          dispatch(setRequestError(data.statusDescription));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const setDeviceAnalytic = (data, params) => {
  const newDataSet = [];
    let bearer2g3g = []
    let bearer4g = []
    let bearer5g = []
    let bearerundetect = []
    let period = []

  data.map((datas, index) => {
    bearer2g3g.push({x: index+1, y: datas.bearer2_3g})
    bearer4g.push({x: index+1, y: datas.bearer4g})
    bearer5g.push({x: index+1, y: datas.bearer5g})
    bearerundetect.push({x: index+1, y: datas.undetected})
    period.push(datas.period)
  });

  newDataSet.push(bearer2g3g, bearer4g, bearer5g, bearerundetect)
  return {
    type: 'SET_DEVICE_ANALYTIC',
    payload: {"period": period, "data": [bearer2g3g, bearer4g, bearer5g, bearerundetect]},
    params,
  };
};

export const getDeviceAnalytic = (
    accessToken,
    filterParams = {},
  ) => {
    return async (dispatch) => {
      let data = JSON.stringify(filterParams);
  
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://dcp4.adlsandbox.com/api/dcp/dashboard/v2/getDataSet?datasetId=03c4254d-b661-4395-9178-392822e5af54`,
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
            dispatch(setDeviceAnalytic(datares.result.dataset, filterParams));
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

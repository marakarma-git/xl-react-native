import axios from 'axios';
import {API_URL, BASIC_TOKEN} from '../../env.json';
import {store} from '../app';
import {
  ADMINISTRATION_PRIVILEDGE_ID,
  ANALYTICS_PRIVILEDGE_ID,
  AUTOMATION_PRIVILEDGE_ID,
  CHANGE_PASSWORD_PRIVILEDGE_ID,
  CUSTOMER_CONSENT_PRIVILEDGE_ID,
  DASHBOARD_PRIVILEDGE_ID,
  LOGIN_LOGOUT_PRIVILEDGE_ID,
  SUBSCRIPTION_PRIVILEDGE_ID,
} from './actionPriv';

const httpRequest = axios.create({
  baseURL: `${API_URL}/apim`,
  timeout: 30000,
  headers: {
    Authorization: BASIC_TOKEN,
    'Content-Type': 'application/json',
  },
});

const requestHandler = async (request) => {
  const {
    activityId,
    descSuffix,
    isStatic,
    showParams,
    excludeParamsKey,
  } = request.headers;
  let paramsUrl = '';
  const accessToken = await store.getState().auth_reducer.data?.access_token;
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;

  if (activityId) {
    const privData = activityLogHandler.getPriviledgeData(activityId);
    const privDetail = activityLogHandler.getPriviledgeDetail(
      activityId,
      privData,
      isStatic || false,
    );
    if (showParams) {
      paramsUrl = activityLogHandler.splitFirstUrl(request.url)[1];
    }
    // ADD HEADERS
    request.headers['X-CHANNEL'] = 'Web Portal';
    request.headers['X-DESCRIPTION'] = activityLogHandler.showDescription(
      privDetail.activityLog,
      descSuffix,
      paramsUrl,
      excludeParamsKey || '',
    );
    request.headers['X-Privilege-ID'] = privDetail.privId;
    // DELETE HEADERS
    delete request.headers.activityId;
    delete request.headers.filterParams;
    delete request.headers.isStatic;
    delete request.headers.descSuffix;
    delete request.headers.showParams;
  }
  console.log(request);
  return request;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

httpRequest.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error),
);

const activityLogHandler = {
  getPriviledgeData: (activity) => {
    let activityCode = activity.split('-')[0];
    switch (activityCode) {
      case 'DP':
        return DASHBOARD_PRIVILEDGE_ID;
      case 'SP':
        return SUBSCRIPTION_PRIVILEDGE_ID;
      case 'AP':
        return ADMINISTRATION_PRIVILEDGE_ID;
      case 'AUP':
        return AUTOMATION_PRIVILEDGE_ID;
      case 'ANP':
        return ANALYTICS_PRIVILEDGE_ID;
      case 'LLP':
        return LOGIN_LOGOUT_PRIVILEDGE_ID;
      case 'CP':
        return CHANGE_PASSWORD_PRIVILEDGE_ID;
      case 'CCP':
        return CUSTOMER_CONSENT_PRIVILEDGE_ID;
      default:
        return;
    }
  },
  getPriviledgeDetail: (activityCode, priviledgeData, isStatic) => {
    let isHasPriviledge;
    const authorityData =
      store.getState().auth_reducer?.data?.authority || null;
    const dataPriviledge = [...priviledgeData].find(
      (data) => data.activityId == activityCode,
    );
    if (authorityData)
      isHasPriviledge = [...authorityData].find(
        (authority) => authority == dataPriviledge.privId,
      );
    if (isStatic) isHasPriviledge = true;
    return isHasPriviledge ? dataPriviledge : null;
  },
  showDescription: (
    activityLog,
    descSuffix,
    filterParams,
    excludeParamsKey,
  ) => {
    let params =
      filterParams.length > 0
        ? activityLogHandler.serializeParams(filterParams, excludeParamsKey)
        : '';
    return `${activityLog}${params}${descSuffix || ''}`;
  },
  serializeParams: (filterParams, excludeParamsKey) => {
    let filterData = {};
    let splitExcludeParams = excludeParamsKey.split('|');
    let splitFilterParams = filterParams.split('&');
    splitFilterParams.map((filter) => {
      let splitFilter = filter.split('=');
      filterData[splitFilter[0]] = splitFilter[1];
    });
    let filterLabel = [];
    Object.keys(filterData).map((filterKey) => {
      let isUsed = true;
      splitExcludeParams.map((paramsKey) => {
        if (filterKey == paramsKey) isUsed = false;
      });
      if (isUsed) filterLabel.push(`${filterKey} : ${filterData[filterKey]}`);
    });
    return filterLabel.join(', ');
  },
  splitFirstUrl: (url) => {
    let splitUrl = url.split('');
    let returnData = [];
    let isSplit = 0;
    splitUrl.map((data) => {
      if (returnData[isSplit] === undefined) returnData.push(data);
      else returnData[isSplit] += data;
      if (data === '?') isSplit = 1;
    });
    return returnData;
  },
};

export default httpRequest;

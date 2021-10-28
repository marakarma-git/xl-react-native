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
  const {activityId, descSuffix, isStatic, showParams} = request.headers;
  const accessToken = await store.getState().auth_reducer.data?.access_token;
  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
  if (activityId) {
    const privData = activityLogHandler.getPriviledgeData(activityId);
    const privDetail = activityLogHandler.getPriviledgeDetail(
      activityId,
      privData,
      isStatic || false,
    );
    // ADD HEADERS
    request.headers['X-CHANNEL'] = 'Web Portal';
    request.headers['X-DESCRIPTION'] = activityLogHandler.showDescription(
      privDetail.activityLog,
      descSuffix,
      showParams || '',
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
  showDescription: (activityLog, descSuffix, filterParams) => {
    let params = activityLogHandler.serializeParams(filterParams);
    return `${activityLog}${params}${descSuffix || ''}`;
  },
  serializeParams: (filterParams) => {
    return '';
  },
};

export default httpRequest;

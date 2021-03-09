import Axios from 'axios';
import Helper from '../../helpers/helper';
import activityMatrix from '../../constant/activity_matrix';
import {base_url} from '../../constant/connection';

const activityLogMiddleware = (store) => (next) => (action) => {
  let isHitApi = false;
  const authReducer = store.getState().auth_reducer;
  const dataRaw = {channel: 'Web Portal'};

  for (let i = 0; i < activityMatrix.length; i++) {
    if (activityMatrix[i].actionType === action.type) {
      isHitApi = true;
      dataRaw.privId = Helper.findAndReturnPriviledge(activityMatrix[i].priviledgeId, authReducer.data.authority || action.privId);
      dataRaw.description = descriptionParser(
        action.type,
        activityMatrix[i].initDescription,
        action.params || {},
      );
      break;
    }
  }

  // if (isHitApi) {
  //   if (authReducer.isLoggedIn) {
  //     saveActivity(dataRaw, authReducer.data.access_token);
  //   } else {
  //     if (action.payload.access_token) {
  //       saveActivity(dataRaw, action.payload.access_token);
  //     }
  //   }
  // }

  next(action);
};

const descriptionParser = (actionType, initDescription, queryParams) => {
  let missingParams = '';

  if (!missingParams && !actionType) {
    missingParams = 'actionType';
  }
  if (!missingParams && !initDescription) {
    missingParams = 'initDescription';
  }

  if (missingParams) {
    return `Missing ${missingParams} parameter`;
  }

  switch (actionType) {
    case 'AUTH_SUCCESS':
      return `${initDescription} ${queryParams.username}`;
    case 'AUTH_LOGOUT':
      return `${initDescription} ${queryParams.username}`;
    case 'CHANGE_PASSWORD':
      return `User ${queryParams.username} ${initDescription}`;
    case 'SET_WIDGET_LIST':
      return initDescription;
    case 'SET_DASHBOARD_SUMMARY':
      return initDescription;
    case 'SET_CAROUSEL':
      return initDescription;
    case 'SET_SIM_STATISTICS':
      return Object.keys(queryParams).length > 0
        ? `${initDescription} with params ${Helper.objectToString(
            queryParams,
          )} `
        : initDescription;
    case 'SET_TOP_TRAFFIC_STATISTICS':
      return Object.keys(queryParams).length > 0
        ? `${initDescription} with params ${Helper.objectToString(
            queryParams,
          )} `
        : initDescription;
    default:
      return initDescription;
  }
};

const saveActivity = async (dataRaw, accessToken) => {
  try {
    const {data} = await Axios.post(
      `${base_url}/user/log/saveActivity`,
      dataRaw,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (data) {
      if (data.statusCode === 0) {
        // console.log("Success save activity");
      }
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
  }
};

export default activityLogMiddleware;

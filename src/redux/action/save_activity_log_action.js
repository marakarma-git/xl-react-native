import axios from 'axios';
import {callApi} from '../../constant/connection';
import Helper from '../../helpers/helper';

const setActivityError = (payload) => ({
  type: 'SAVE_ACTIVITY_ERROR',
  payload,
});

const setActivitySuccess = (payload) => ({
  type: 'SAVE_ACTIVITY_SUCCESS',
  payload,
});

const saveActivityLog = (
  menuName,
  actionName,
  priviledgeData,
  params = '',
  userAuth = [],
  isStaticPriv = false,
) => {
  return (dispatch, getState) => {
    const userAuthority =
      userAuth.length > 0 ? userAuth : getState().auth_reducer.data?.authority;

    const activityLogData = !isStaticPriv
      ? Helper.findAndReturnActivityLogData(
          menuName,
          actionName,
          userAuthority,
          priviledgeData,
        )
      : Helper.findAndReturnActivityLogDataStaticPriv(
          menuName,
          actionName,
          priviledgeData,
        );

    if (activityLogData.length > 0) {
      axios.interceptors.request.use((config) => {
        config.headers['X-Channel'] = 'Web Portal';
        config.headers[
          'X-Description'
        ] = `${activityLogData[0].activityLog} ${params}`;
        config.headers['X-Privilege-ID'] = activityLogData[0].privId;

        return config;
      });
    } else {
      console.log('Not found');
      dispatch(setActivityError('Priviledge Id Not Found'));
    }
  };
};

// const saveAction = (dataRaw) => {
//   return async (dispatch, getState) => {
//     const accessToken = getState().auth_reducer.data?.access_token || '';
//     try {
//       const {data} = await callApi.post('/user/log/saveActivity', dataRaw, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (data) {
//         if (data.statusCode === 0) {
//           console.log('Success save activity');
//           dispatch(setActivitySuccess('Success save activity'));
//         }
//       }
//     } catch (error) {
//       // console.log(error);
//       dispatch(setActivityError(JSON.stringify(error.response.data)));
//       console.log(JSON.stringify(error));
//     }
//   };
// };

export {saveActivityLog};

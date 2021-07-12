import { callApi } from "../../constant/connection";
import Helper from "../../helpers/helper";


const setActivityError = (payload) => ({
  type: "SAVE_ACTIVITY_ERROR",
  payload
});

const setActivitySuccess = (payload) => ({
  type: "SAVE_ACTIVITY_SUCCESS",
  payload
});

const saveActivityLog = (menuName, actionName, priviledgeData, params = "", userAuth = []) => {
  return (dispatch, getState) => {
    const dataRaw         = {};
    const userAuthority   = userAuth.length > 0 ? userAuth : getState().auth_reducer.data?.authority;
    const activityLogData = Helper.findAndReturnActivityLogData(menuName, actionName, userAuthority, priviledgeData);

    if(activityLogData.length > 0) {
      dataRaw.channel     = "Web Portal";
      dataRaw.description = `${activityLogData[0].activityLog} ${params}`;
      dataRaw.privId      = activityLogData[0].privId;

      dispatch(saveAction(dataRaw));
    }else{
      console.log("Not found")
      dispatch(setActivityError("Priviledge Id Not Found"));
    }

  }
}

const saveAction = (dataRaw) => {
  return async(dispatch, getState) => {
    const accessToken     = getState().auth_reducer.data?.access_token || "";
    try {
      const {data} = await callApi.post(
        "/user/log/saveActivity",
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
          console.log("Success save activity");
          dispatch(setActivitySuccess("Success save activity"));
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(setActivityError(JSON.stringify(error.response.data)));
      console.log(JSON.stringify(error));
    }
  }
}

export {
  saveActivityLog
}
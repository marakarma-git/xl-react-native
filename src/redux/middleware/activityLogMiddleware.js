import Axios from 'axios';
import activityMatrix from '../../constant/activity_matrix';
import { base_url } from '../../constant/connection';

const activityLogMiddleware = (store) => (next) => (action) => {
    let isHitApi        = false;
    const authReducer   = store.getState().auth_reducer;
    const dataRaw       = { channel: "Mobile" }

    for (let i = 0; i < activityMatrix.length; i++){
        if(activityMatrix[i].actionType === action.type){
            isHitApi                = true;
            dataRaw.moduleName      = activityMatrix[i].moduleName;
            dataRaw.activityType    = activityMatrix[i].activityType;
            dataRaw.description     = descriptionParser(action.type, activityMatrix[i].initDescription, action.params || []);
            break;
        }
    }

    if(isHitApi) {
        if(authReducer.isLoggedIn){
            saveActivity(dataRaw, authReducer.data.access_token);
        }
    }

    next(action);
}

const descriptionParser = (actionType, initDescription, queryParams = []) => {
    let missingParams = '';

    if(!missingParams && !actionType) missingParams = 'actionType';
    if(!missingParams && !initDescription) missingParams = 'initDescription';

    if(missingParams) return `Missing ${missingParams} parameter`

    switch (actionType) {
        case 'AUTH_SUCCESS':
            return initDescription + queryParams.username;
        case 'AUTH_LOGOUT':
            return initDescription;
        case 'SET_WIDGET_LIST':  
            return initDescription;
        case 'SET_DASHBOARD_SUMMARY':
            return initDescription;
        case 'SET_CAROUSEL':
            return initDescription;
        default:
            return initDescription;
    }
}

const saveActivity = async (dataRaw, accessToken) => {

    try {
        const {data} = await Axios.post(`${base_url}/user/log/saveActivity`, dataRaw, 
        {    
            headers: {
                    'Authorization': `Bearer ${accessToken}` ,
                    'Content-Type': 'application/json'
                }
        });

        if(data){
            console.log(data, " << ")
            if(data.statusCode === 0){
                console.log("Success save activity");
            }
        }
    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
    }
}

export default activityLogMiddleware;
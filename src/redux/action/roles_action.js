import axios from 'axios';
import {base_url} from '../../constant/connection';
import Helper from '../../helpers/helper';
import reduxString from '../reduxString';

const rolesRequestData = () => ({
  type: reduxString.ROLES_REQUEST_DATA,
}); 

const rolesGetActiveRolesFail = (error) => ({
  type: reduxString.ROLES_GET_ACTIVE_ROLES_FAIL,
  payload: error
});

const rolesGetActiveRolesSuccess = (data) => ({
  type: reduxString.ROLES_GET_ACTIVE_ROLES_SUCCESS,
  payload: data
});

const getActiveRoles = () => {
  return async (dispatch, getState) => {
    const {access_token} = getState().auth_reducer.data || '';
    const dummyEnterpriseId = "a8108751-38e8-4b03-8662-5ab0838be63d";

    try {
      dispatch(rolesRequestData())
      const { data } = await axios.get(`${base_url}/user/role/getActiveRole?enterpriseId=${dummyEnterpriseId}`, {
        headers: {
          Authorization: "Bearer " + access_token
        }
      });

      if(data){
        if(data.statusCode === 0){
          dispatch(rolesGetActiveRolesSuccess(data.result));
        }
      }

    } catch (error) {
      dispatch(rolesGetActiveRolesFail(error.response.data));
    }
  }
} 

export {
  getActiveRoles
}
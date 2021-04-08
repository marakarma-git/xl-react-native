import axios from 'axios';
import {base_url} from '../../constant/connection';
import Helper from '../../helpers/helper';
import {dataMatcherArray2D} from './get_sim_inventory_action';

const enterpriseManagementRequestData = (payload) => ({
  type: 'ENTERPRISE_MANAGEMENT_REQUEST_DATA',
});

const enterpriseManagementGetDataSuccess = (
  dataEnterprise,
  dataEnterpriseGenerated,
) => ({
  type: 'ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS',
  dataEnterprise,
  dataEnterpriseGenerated,
});

const updateEnterpriseData = (dataEnterprise, dataEnterpriseGenerated) => ({
  type: 'ENTERPRISE_UPDATE_DATA',
  dataEnterprise,
  dataEnterpriseGenerated,
});

const enterpriseManagementGetDataFail = (payload) => ({
  type: 'ENTERPRISE_MANAGEMENT_GET_DATA_FAIL',
  payload,
});

const enterpriseManagementHideShow = (enterpriseId) => {
  return async (dispatch, getState) => {
    const {data_enterprise} =
      getState().enterprise_management_get_enterprise_reducer || {};
    const {dataHeaderEnterprise} =
      getState().enterprise_management_header_array_reducer || {};

    let rootTree = false;

    await data_enterprise.map((data) => {
      if (data.enterpriseId == enterpriseId) {
        if (data.icon) {
          data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
        }
        if (!data.enterpriseParentId) {
          rootTree = true;
        }
      }

      if (rootTree) {
        if (data.enterpriseId != enterpriseId) {
          data.visibility = !data.visibility;
        }
      } else if (data.enterpriseParentId == enterpriseId) {
        data.visibility = !data.visibility;
      }
    });

    const generateDataTable = dataMatcherArray2D(
      data_enterprise,
      dataHeaderEnterprise,
    );

    dispatch(
      enterpriseManagementGetDataSuccess(data_enterprise, generateDataTable),
    );
  };
};

const getEnterpriseList = () => {
  return async (dispatch, getState) => {
    dispatch(enterpriseManagementRequestData());

    const {access_token} = getState().auth_reducer.data || '';
    const {dataHeaderEnterprise} =
      getState().enterprise_management_header_array_reducer || {};
    try {
      const {data} = await axios.get(
        `${base_url}/user/corp/v2/getEnterpriseList`,
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      if (data) {
        if (data.statusCode == 0) {
          const generateDataTable = dataMatcherArray2D(
            Helper.makeMultiDimensionalArrayTo2DArray(data.result.content),
            dataHeaderEnterprise,
          );
          dispatch(
            enterpriseManagementGetDataSuccess(
              Helper.makeMultiDimensionalArrayTo2DArray(data.result.content),
              generateDataTable,
            ),
          );
        } else {
          dispatch(
            enterpriseManagementGetDataFail({
              errorText: 'Failed, to get enterprise list',
            }),
          );
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(
        enterpriseManagementGetDataFail({
          errorText: 'Failed, to get enterprise list',
          ...error.response.data,
        }),
      );
    }
  };
};

export {getEnterpriseList, enterpriseManagementHideShow};

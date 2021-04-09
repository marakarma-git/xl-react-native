import axios from 'axios';
import {base_url} from '../../constant/connection';
import Helper from '../../helpers/helper';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import reduxString from '../reduxString';

const enterpriseManagementRequestData = (payload) => ({
  type: 'ENTERPRISE_MANAGEMENT_REQUEST_DATA',
});

const enterpriseManagementGetDataSuccess = (data) => ({
  type: 'ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS',
  ...data,
});
const enterpriseManagementSetDataGenerated = ({dataEnterpriseGenerated}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_SET_DATA_GENERATED,
    dataEnterpriseGenerated,
  };
};
const updateEnterpriseData = (dataEnterprise, dataEnterpriseGenerated) => ({
  type: 'ENTERPRISE_UPDATE_DATA',
  dataEnterprise,
  dataEnterpriseGenerated,
});

const enterpriseManagementGetDataFail = (payload) => ({
  type: 'ENTERPRISE_MANAGEMENT_GET_DATA_FAIL',
  payload,
});

const treeViewToggle = (
  enterpriseId,
  data_enterprise,
  parentVisibility = null,
) => {
  data_enterprise.map((data) => {
    if (data.enterpriseParentId == enterpriseId) {
      if (parentVisibility == null) {
        data.visibility = !data.visibility;
      } else {
        data.visibility = parentVisibility;
      }

      treeViewToggle(data.enterpriseId, data_enterprise, data.visibility);
    }
  });
};

const enterpriseManagementHideShow = (enterpriseId) => {
  return async (dispatch, getState) => {
    const {data_enterprise} =
      getState().enterprise_management_get_enterprise_reducer || {};
    const {dataHeaderEnterprise} =
      getState().enterprise_management_header_array_reducer || {};

    await data_enterprise.map((data) => {
      if (data.enterpriseId == enterpriseId) {
        if (data.icon) {
          data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
        }
      }
    });

    treeViewToggle(enterpriseId, data_enterprise);

    const generateDataTable = dataMatcherArray2D(
      data_enterprise,
      dataHeaderEnterprise,
    );

    dispatch(updateEnterpriseData(data_enterprise, generateDataTable));
  };
};

const getEnterpriseList = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(enterpriseManagementRequestData());
    const {page_params, size_params, header_sort_params} = paginate || {};
    const {orderBy: order_by_params, sortBy: sort_by_params} =
      header_sort_params || {};
    const {access_token} = getState().auth_reducer.data || '';
    const {dataHeaderEnterprise, searchText, generatedParams} =
      getState().enterprise_management_header_array_reducer || {};
    const {
      enterprise_page,
      enterprise_total_size,
      enterprise_applied_header_sort,
    } = (await getState().enterprise_management_get_enterprise_reducer) || {};
    const {orderBy, sortBy} = enterprise_applied_header_sort || {};

    const getPage = page_params ?? enterprise_page;
    const getSize = size_params || enterprise_total_size;

    const getOrderBy = () => {
      if (order_by_params === 'RESET' || orderBy === 'RESET') {
        return '';
      } else {
        if (order_by_params) {
          return order_by_params;
        } else {
          return orderBy;
        }
      }
    };
    const getSortBy = () => {
      if (sort_by_params === 'RESET' || sortBy === 'RESET') {
        return '';
      } else {
        if (sort_by_params) {
          return sort_by_params;
        } else {
          return sortBy;
        }
      }
    };

    console.log(
      `${base_url}/user/corp/v2/getEnterpriseList?page${getPage}&size=${getSize}&keyword=${searchText}${
        getSortBy() ? `&order=${getSortBy()}` : ''
      }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    try {
      const {data} = await axios.get(
        `${base_url}/user/corp/v2/getEnterpriseList?page${getPage}&size=${getSize}&keyword=${searchText}${
          getSortBy() ? `&order=${getSortBy()}` : ''
        }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
          .split(' ')
          .join('+'),
        {
          headers: {
            Authorization: 'Bearer ' + access_token,
          },
        },
      );

      if (data) {
        const {result, statusCode} = data || {};
        const {content, totalPages, totalElements} = result || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generateDataTable = dataMatcherArray2D(
            Helper.makeMultiDimensionalArrayTo2DArray(content),
            dataHeaderEnterprise,
          );
          dispatch(
            enterpriseManagementGetDataSuccess({
              dataEnterprise: Helper.makeMultiDimensionalArrayTo2DArray(
                content,
              ),
              dataEnterpriseGenerated: generateDataTable,
              enterprisePage: getPage,
              enterpriseTotalPage: totalPages,
              enterpriseTotalSize: getSize,
              enterpriseElements: totalElements,
              enterpriseAppliedFilter: isAppliedFilter(),
              enterpriseAppliedHeaderSort: header_sort_params
                ? header_sort_params
                : enterprise_applied_header_sort,
              enterpriseParamsAppliedActivityLog: generatedParams,
            }),
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

export {
  getEnterpriseList,
  enterpriseManagementHideShow,
  enterpriseManagementSetDataGenerated,
};

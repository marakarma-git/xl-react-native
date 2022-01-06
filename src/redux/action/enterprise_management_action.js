import axios from 'axios';
import {base_url} from '../../constant/connection';
import Helper from '../../helpers/helper';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import reduxString from '../reduxString';
import {setRequestError} from './dashboard_action';
import httpRequest from '../../constant/axiosInstance';

const enterpriseManagementClearActiveEnterpriseData = () => ({
  type: 'ENTERPRISE_MANAGEMENT_CLEAR_ACTIVE_ENTERPRISE_DATA',
});

const enterpriseManagementRequestData = () => ({
  type: 'ENTERPRISE_MANAGEMENT_REQUEST_DATA',
});

const enterpriseManagementRequestDataEnd = () => ({
  type: 'ENTERPRISE_MANAGEMENT_REQUEST_DATA_END',
});

const enterpriseManagementGetDataSuccess = (data) => ({
  type: 'ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS',
  ...data,
});

const activeEnterpriseManagementGetDataSucces = (data) => ({
  type: 'ACTIVE_ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS',
  payload: data,
});

const saveBusinessCategoryData = (data) => ({
  type: reduxString.SAVE_BUSINESS_CATEGORY,
  payload: data,
});

const saveBusinessCategoryFieldType = (data) => ({
  type: reduxString.SAVE_BUSINESS_CATEGORY_FIELD_TYPE,
  payload: data,
});

const saveCustomLabel = (data) => ({
  type: reduxString.SAVE_CUSTOM_LABEL,
  payload: data,
});

const resetCustomLabel = () => ({
  type: reduxString.RESET_CUSTOM_LABEL,
});

const saveEnterpriseDetail = (data) => ({
  type: reduxString.SAVE_ENTERPRISE_DETAIL,
  payload: data,
});

const resetEnterpriseDetail = () => ({
  type: reduxString.RESET_ENTERPRISE_DETAIL,
});

const enterpriseManagementSetDetailParams = (params) => ({
  type: reduxString.ENTERPRISE_MANAGEMENT_SET_DETAIL_PARAMS,
  payload: params,
});

const enterpriseManagementSetDataGenerated = ({dataEnterpriseGenerated}) => {
  return {
    type: reduxString.ENTERPRISE_MANAGEMENT_SET_DATA_GENERATED,
    dataEnterpriseGenerated,
  };
};
const updateEnterpriseData = (
  dataEnterpriseCreate,
  dataEnterpriseGenerated,
) => ({
  type: 'ENTERPRISE_UPDATE_DATA',
  dataEnterpriseCreate,
  dataEnterpriseGenerated,
});

const enterpriseManagementGetDataFail = (payload) => ({
  type: 'ENTERPRISE_MANAGEMENT_GET_DATA_FAIL',
  payload,
});

const treeViewToggle = (
  enterpriseId,
  data_enterprise_create,
  parentCondition = null,
  key = 'visibility',
) => {
  data_enterprise_create.map((data) => {
    if (data.enterpriseParentId == enterpriseId) {
      if (parentCondition == null) {
        data[key] = !data[key];
      } else {
        data[key] = parentCondition;
      }

      treeViewToggle(data.enterpriseId, data_enterprise_create, data[key], key);
    }
  });
};

const enterpriseManagementCheckBoxToggle = (enterpriseId) => {
  return async (dispatch, getState) => {
    const {data_enterprise_create} =
      getState().enterprise_management_get_enterprise_reducer || {};
    const {dataHeaderEnterprise} =
      getState().enterprise_management_header_array_reducer || {};

    data_enterprise_create.map((data) => {
      if (data.enterpriseId == enterpriseId) {
        data.treeCheck = !data.treeCheck;
      }
    });

    treeViewToggle(enterpriseId, data_enterprise_create, null, 'treeCheck');

    const generateDataTable = dataMatcherArray2D(
      data_enterprise_create,
      dataHeaderEnterprise,
    );

    dispatch(updateEnterpriseData(data_enterprise_create, generateDataTable));
  };
};

const enterpriseManagementHideShow = (enterpriseId) => {
  return async (dispatch, getState) => {
    const {data_enterprise_create} =
      getState().enterprise_management_get_enterprise_reducer || {};
    const {dataHeaderEnterprise} =
      getState().enterprise_management_header_array_reducer || {};

    await data_enterprise_create.map((data) => {
      if (data.enterpriseId == enterpriseId) {
        if (data.icon) {
          data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
        }
      }
    });

    treeViewToggle(enterpriseId, data_enterprise_create, null, 'visibility');

    const generateDataTable = dataMatcherArray2D(
      data_enterprise_create,
      dataHeaderEnterprise,
    );

    dispatch(updateEnterpriseData(data_enterprise_create, generateDataTable));
  };
};

const getActiveEnterpriseList = (paginate) => {
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

    try {
      const {data} = await axios.get(
        `${base_url}/user/corp/v2/getActiveEnterprise`,
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
          dispatch(
            activeEnterpriseManagementGetDataSucces(
              Helper.makeMultiDimensionalArrayTo2DArray(result),
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
      dispatch(
        enterpriseManagementGetDataFail({
          errorText: 'Failed, to get enterprise list',
          ...error.response.data,
        }),
      );
    }
  };
};

// const resetTreeCheckGetActiveEnterpriseList = (dataActiveEnterprise) => {
//   return (dispatch) => {
//     const newData = new Array();

//     dataActiveEnterprise.map(enterprise => {
//       enterprise.treeCheck = false;

//       newData.push(enterprise);
//     });

//     dispatch(activeEnterpriseManagementGetDataSucces(newData));
//   }
// }

const getEnterpriseList = (paginate) => {
  return async (dispatch, getState) => {
    let isFilter = false;
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
    if (searchText.length > 0 || generatedParams.length > 0) isFilter = true;

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

    const customHeaders = {
      headers: {
        activityId: searchText || generatedParams ? 'AP-29' : 'AP-16',
        showParams: searchText || generatedParams ? true : false,
        excludeParamsKey: 'page|size',
      },
    };

    console.log(
      `${base_url}/user/corp/v2/getEnterpriseList?page${getPage}&size=${getSize}&keyword=${searchText}${
        getSortBy() ? `&order=${getSortBy()}` : ''
      }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    try {
      const {data} = await httpRequest.get(
        `${base_url}/user/corp/v2/getEnterpriseList?page=${getPage}&size=${getSize}&keyword=${searchText}${
          getSortBy() ? `&order=${getSortBy()}` : ''
        }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
          .split(' ')
          .join('+'),
        customHeaders,
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
          const oneLevelArray = Helper.makeMultiDimensionalArrayTo2DArray(
            content,
          );
          dispatch(
            enterpriseManagementGetDataSuccess({
              dataEnterprise: content,
              dataEnterpriseCreate: oneLevelArray,
              dataEnterpriseGenerated: generateDataTable,
              enterpriseTotalChildren: oneLevelArray.length,
              enterprisePage: getPage,
              enterpriseTotalPage: totalPages,
              enterpriseTotalSize: getSize,
              enterpriseElements: totalElements,
              enterpriseAppliedFilter: isAppliedFilter(),
              enterpriseAppliedHeaderSort: header_sort_params
                ? header_sort_params
                : enterprise_applied_header_sort,
              enterpriseParamsAppliedActivityLog: generatedParams,
              isFilter,
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
      dispatch(
        enterpriseManagementGetDataFail({
          errorText: 'Failed, to get enterprise list',
          ...error.response.data,
        }),
      );
    }
  };
};

const getBusinessCategory = () => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.get('/user/corp/getBusinessCat');
      if (data) {
        const {result, statusCode} = data;
        if (statusCode === 0) {
          const dropDownData = [...result].map((data) => {
            return {value: data.code, label: data.value};
          });
          dropDownData.unshift({value: '', label: 'Choose Business Category'});
          dispatch(saveBusinessCategoryData(dropDownData));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getBusinessFieldType = () => {
  return async (dispatch) => {
    try {
      const {data} = await httpRequest.get(
        '/user/corp/getCustomLabelFieldType',
      );
      if (data) {
        const {result, statusCode} = data;
        if (statusCode === 0) {
          dispatch(saveBusinessCategoryFieldType(result));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getCustomLabel = (params, key = 'business_cat') => {
  return async (dispatch, getState) => {
    let url = `/user/corp/getCustomLabelSuggestions?${key}=${params}`;
    if (key === 'enterpriseId') {
      url = `/user/corp/getCustLabelEnterprise?${key}=${params}`;
    }
    console.log(url);
    const {business_category_field_type} = await getState()
      .enterprise_management_get_enterprise_reducer;
    try {
      const {data} = await httpRequest.get(url);
      if (data) {
        const {result, statusCode} = data;
        if (statusCode === 0) {
          const customLabel = result.map((data) => {
            data.switchActive = data.activeStatus;
            data.defaultLabel = `Custom ${data.labelNumber}`;
            data.fieldTypeArray = business_category_field_type.map((field) => {
              return {value: field, label: field};
            });
            return data;
          });
          dispatch(saveCustomLabel(customLabel));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

const getEnterpriseDetail = () => {
  return async (dispatch, getState) => {
    const {detail_params} = await getState()
      .enterprise_management_get_enterprise_reducer;
    try {
      const {data} = await httpRequest(
        `/user/corp/getEnterpriseDetail?enterpriseId=${detail_params}`,
      );
      if (data) {
        const {result, statusCode} = data;
        if (statusCode === 0) {
          dispatch(saveEnterpriseDetail(result));
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
    }
  };
};

export {
  getEnterpriseList,
  getBusinessCategory,
  getBusinessFieldType,
  getCustomLabel,
  getEnterpriseDetail,
  resetEnterpriseDetail,
  resetCustomLabel,
  getActiveEnterpriseList,
  enterpriseManagementHideShow,
  enterpriseManagementSetDataGenerated,
  enterpriseManagementCheckBoxToggle,
  enterpriseManagementRequestData,
  enterpriseManagementRequestDataEnd,
  enterpriseManagementClearActiveEnterpriseData,
  enterpriseManagementSetDetailParams,
};

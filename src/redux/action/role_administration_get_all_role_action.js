import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import httpRequest from '../../constant/axiosInstance';
const roleAdministrationGetRoleLoading = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_GET_ROLE_LOADING,
  };
};
const roleAdministrationGetRoleSuccess = (data) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_GET_ROLE_SUCCESS,
    ...data,
  };
};
const roleAdministrationGetRoleFailed = ({errorText}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_GET_ROLE_FAILED,
    errorText,
  };
};
const roleAdministrationGetRoleReset = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_GET_ROLE_RESET,
  };
};
const roleAdministrationSetDataRoleGenerated = ({dataRoleGenerated}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_SET_DATA_ROLE_GENERATED,
    dataRoleGenerated,
  };
};
const roleAdministrationDynamicCheckDataRole = ({index}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_DYNAMIC_CHECK_DATA_ROLE,
    index,
  };
};
const roleAdministrationCheckAlDataRole = ({valueCheck}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_CHECK_ALL_DATA_ROLE,
    valueCheck,
  };
};
const roleAdministrationSetAppliedHeaderSort = ({roleAppliedHeaderSort}) => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_SET_APPLIED_HEADER_SORT,
    roleAppliedHeaderSort,
  };
};
const roleAdministrationResetAppliedHeaderSort = () => {
  return {
    type: reduxString.ROLE_ADMINISTRATION_RESET_APPLIED_HEADER_SORT,
  };
};
const roleAdministrationUpdateRoleList = (
  dataRole,
  dataRoleGenerated,
  removeRole,
) => ({
  type: reduxString.ROLE_ADMINISTRSTION_UPDATE_ROLE_LIST,
  dataRole,
  dataRoleGenerated,
  removeRole,
});

const roleAdministrationCopyRoleList = () => ({
  type: reduxString.ROLE_ADMINISTRATION_COPY_ROLE_LIST,
});

const roleAdministrationCrudActiveMenu = (menu) => ({
  type: reduxString.ROLE_ADMINISTRATION_CRUD_ACTIVE_MENU,
  payload: menu,
});

const callRoleAction = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(roleAdministrationGetRoleLoading());
    const {page_params, size_params, header_sort_params} = paginate || {};
    const {orderBy: order_by_params, sortBy: sort_by_params} =
      header_sort_params || {};
    const {dataRoleHeader, searchText, generatedParams} =
      (await getState().role_administration_array_header_reducer) || {};
    const {role_page, role_total_size, role_applied_header_sort} =
      (await getState().role_administration_get_all_role_reducer) || {};
    const {orderBy, sortBy} = role_applied_header_sort || {};

    const getPage = page_params ?? role_page;
    const getSize = size_params || role_total_size;
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
        activityId: searchText || generatedParams ? 'AP-7' : 'AP-4',
        showParams: searchText || generatedParams ? true : false,
        excludeParamsKey: 'page|size',
      },
    };
    httpRequest
      .get(
        `/user/role/getAllrole?page=${getPage}&size=${getSize}&keyword=${searchText}${
          getSortBy() ? `&order=${getSortBy()}` : ''
        }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
          .split(' ')
          .join('+'),
        customHeaders,
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        const {content, totalPages, totalElements} = result || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generatedDataTable = dataMatcherArray2D(
            content,
            dataRoleHeader,
          );
          dispatch(
            roleAdministrationGetRoleSuccess({
              dataRole: data,
              dataRoleGenerated: generatedDataTable,
              rolePage: getPage,
              roleTotalPage: totalPages,
              roleTotalSize: getSize,
              roleElements: totalElements,
              roleAppliedFilter: isAppliedFilter(),
              roleAppliedHeaderSort: header_sort_params
                ? header_sort_params
                : role_applied_header_sort,
              roleParamsAppliedActivityLog: generatedParams,
            }),
          );
        } else {
          dispatch(
            roleAdministrationGetRoleFailed({
              errorText: 'Failed, to get role list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          roleAdministrationGetRoleFailed({
            errorText: 'Failed, to get role list',
            ...error.response.data,
          }),
        );
      });
  };
};

const callRoleAdministrationDeleteRole = (roleId) => {
  return (dispatch, getState) => {
    const {data_role} = getState().role_administration_get_all_role_reducer;
    const {content} = data_role?.result;
    const {dataRoleHeader} =
      getState().role_administration_array_header_reducer || {};

    let contentLength = content.length;

    roleId.map((id) => {
      for (let i = 0; i < contentLength; i++) {
        if (id === content[i].roleId) {
          content.splice(i, 1);
          isDelete = true;
          break;
        }
      }
    });

    const generateTable = dataMatcherArray2D(content, dataRoleHeader);
    dispatch(
      roleAdministrationUpdateRoleList(data_role, generateTable, roleId.length),
    );
  };
};

export default callRoleAction;
export {
  roleAdministrationGetRoleReset,
  roleAdministrationCheckAlDataRole,
  roleAdministrationSetDataRoleGenerated,
  roleAdministrationResetAppliedHeaderSort,
  roleAdministrationDynamicCheckDataRole,
  roleAdministrationSetAppliedHeaderSort,
  callRoleAdministrationDeleteRole,
  roleAdministrationCrudActiveMenu,
  roleAdministrationCopyRoleList,
};

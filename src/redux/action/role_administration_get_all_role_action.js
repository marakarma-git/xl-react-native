import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';
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
const callRoleAction = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(roleAdministrationGetRoleLoading());
    const {page_params, size_params, header_sort_params} = paginate || {};
    const {orderBy: order_by_params, sortBy: sort_by_params} =
      header_sort_params || {};
    const {access_token} = (await getState().auth_reducer.data) || '';
    const {dataRoleHeader, searchText, generatedParams} =
      (await getState().role_administration_array_header_reducer) || {};
    const {role_page, role_total_size, role_applied_header_sort} =
      (await getState().role_administration_get_all_role_reducer) || {};
    const {orderBy, sortBy} = role_applied_header_sort || {};

    const getPage = page_params ?? role_page;
    const getSize = size_params || role_total_size;
    const getOrderBy = () => {
      if (order_by_params === 'RESET' || orderBy === 'RESEt') {
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
      `${base_url}/user/role/getAllrole?page=${getPage}&size=${getSize}&keyword=${searchText}${
        getSortBy() ? `&order=${getSortBy()}` : ''
      }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    axios
      .get(
        `${base_url}/user/role/getAllrole?page=${getPage}&size=${getSize}&keyword=${searchText}${
          getSortBy() ? `&order=${getSortBy()}` : ''
        }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
          .split(' ')
          .join('+'),
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
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
export default callRoleAction;
export {
  roleAdministrationGetRoleReset,
  roleAdministrationCheckAlDataRole,
  roleAdministrationSetDataRoleGenerated,
  roleAdministrationResetAppliedHeaderSort,
  roleAdministrationDynamicCheckDataRole,
  roleAdministrationSetAppliedHeaderSort,
};

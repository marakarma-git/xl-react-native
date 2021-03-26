import axios from 'axios';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const userAdministrationGetUserLoading = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_GET_USER_LOADING,
  };
};
const userAdministrationChangeCheckHeader = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_CHANGE_CHECK_HEADER,
  };
};
const userAdministrationGetUserSuccess = (data) => {
  return {
    type: reduxString.USER_ADMINISTRATION_GET_USER_SUCCESS,
    ...data,
  };
};
const userAdministrationGetUserFailed = (error) => {
  return {
    type: reduxString.USER_ADMINISTRATION_GET_USER_FAILED,
    errorText: error,
  };
};
const userAdministrationGetUserReset = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_GET_USER_RESET,
  };
};
const userAdministrationSetDataUserGenerated = (data) => {
  return {
    type: reduxString.USER_ADMINISTRATION_SET_DATA_USER_GENERATED,
    dataUserGenerated: data,
  };
};
const userAdministrationResetDataUserGenerated = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_RESET_DATA_USER_GENERATED,
  };
};
const userAdministrationDynamicCheckDataUser = (index) => {
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_CHECK_DATA_USER,
    index,
  };
};
const userAdministrationDynamicUnCheckDataUser = (index) => {
  return {
    type: reduxString.USER_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_USER,
    index,
  };
};
const userAdministrationCheckAllDataUser = (value) => {
  return {
    type: reduxString.USER_ADMINISTRATION_CHECK_ALL_DATA_USER,
    valueCheck: value,
  };
};
const userAdministrationUnCheckAllDataUser = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_UNCHECK_ALL_DATA_USER,
  };
};
const userAdministrationSetAppliedHeaderSort = (data) => {
  return {
    type: reduxString.USER_ADMINISTRATION_SET_APPLIED_HEADER_SORT,
    appliedHeaderSort: data,
  };
};
const userAdministrationResetAppliedHeaderSort = () => {
  return {
    type: reduxString.USER_ADMINISTRATION_RESET_APPLIED_HEADER_SORT,
  };
};
const callUserAdministrationGetUser = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(userAdministrationGetUserLoading());
    const {paginate_page, paginate_size, data_to_sort} = paginate || {}; // this is the additional params
    const {order_by, sort_by} = data_to_sort || {};
    const {access_token} = (await getState().auth_reducer.data) || '';
    const {
      page_pagination,
      total_size_pagination,
      applied_header_sort,
    } = await getState().user_administration_get_user_reducer;
    const {orderBy, sortBy} = applied_header_sort || {};
    const {dataHeader, searchText, generatedParams} =
      (await getState().user_administration_array_header_reducer) || {};
    const getPage = paginate_page ?? page_pagination;
    const getSize = paginate_size || total_size_pagination;
    const getOrderBy = () => {
      if (order_by === 'RESET') {
        return '';
      } else {
        if (order_by) {
          return order_by;
        } else {
          return orderBy;
        }
      }
    };
    const getSortBy = () => {
      if (sort_by === 'RESET') {
        return '';
      } else {
        if (sort_by) {
          return sort_by;
        } else {
          return sortBy;
        }
      }
    };
    console.log(
      `${base_url}/user/usr/getUserList?page=${getPage}&size=${getSize}&keyword=${searchText}${
        getSortBy() ? `&order=${getSortBy()}` : ''
      }${getSortBy() ? `&sort=${getOrderBy()}` : ''}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    axios
      .get(
        `${base_url}/user/usr/getUserList?page=${getPage}&size=${getSize}&keyword=${searchText}${
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
          const generateTable = dataMatcherArray2D(content, dataHeader);
          dispatch(
            userAdministrationGetUserSuccess({
              dataUser: data,
              dataUserGenerated: generateTable,
              pagePagination: getPage,
              totalSizePagination: getSize,
              totalPagePagination: totalPages,
              totalElementsPagination: totalElements,
              appliedFilter: isAppliedFilter(),
              appliedHeaderSort: data_to_sort
                ? {
                    formId: data_to_sort.formId,
                    sortBy: sort_by,
                    orderBy: order_by,
                  }
                : applied_header_sort,
              paramsAppliedActivityLog: generatedParams || null,
            }),
          );
        } else {
          dispatch(
            userAdministrationGetUserFailed({
              errorText: 'Failed, to get user list',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          userAdministrationGetUserFailed({
            errorText: 'Failed, to get user list',
            ...error.response.data,
          }),
        );
      });
  };
};
export default callUserAdministrationGetUser;
export {
  userAdministrationGetUserReset,
  userAdministrationChangeCheckHeader,
  userAdministrationSetDataUserGenerated,
  userAdministrationResetDataUserGenerated,
  userAdministrationDynamicCheckDataUser,
  userAdministrationDynamicUnCheckDataUser,
  userAdministrationCheckAllDataUser,
  userAdministrationUnCheckAllDataUser,
  userAdministrationSetAppliedHeaderSort,
  userAdministrationResetAppliedHeaderSort,
};

import axios from 'axios';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';
import httpRequest from '../../constant/axiosInstance';

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

const userAdministrationUpdateUser = (
  dataUser,
  dataUserGenerated,
  removeUser,
) => ({
  type: reduxString.USER_ADMINISTRATION_UPDATE_LOCK_UNLOCK_USER,
  dataUser,
  dataUserGenerated,
  removeUser,
});

const userAdministrationCreateUser = () => ({
  type: reduxString.USER_ADMINISTRATION_CREATE_USER,
});

const callUserAdministrationDeleteUser = (userId) => {
  return (dispatch, getState) => {
    const {data_user} = getState().user_administration_get_user_reducer;
    const {content} = data_user?.result;
    const {dataHeader} =
      getState().user_administration_array_header_reducer || {};

    let contentLength = content.length;

    userId.map((id) => {
      for (let i = 0; i < contentLength; i++) {
        if (id === content[i].userId) {
          content.splice(i, 1);
          isDelete = true;
          break;
        }
      }
    });

    const generateTable = dataMatcherArray2D(content, dataHeader);
    dispatch(
      userAdministrationUpdateUser(data_user, generateTable, userId.length),
    );
  };
};

const callUserAdministrationUpdateLockUnlockUser = (userId, lockStatus) => {
  return (dispatch, getState) => {
    let updateUserIndex = 0;
    const {data_user} = getState().user_administration_get_user_reducer;
    const {content} = data_user?.result;
    const {dataHeader} =
      getState().user_administration_array_header_reducer || {};

    content.map((data, index) => {
      if (data.userId === userId) {
        updateUserIndex = +index;
        data.lockStatus = lockStatus;
      }
    });

    const generateTable = dataMatcherArray2D(content, dataHeader);

    generateTable[updateUserIndex].is_checked_root = true;

    dispatch(userAdministrationUpdateUser(data_user, generateTable, 0));
  };
};

const callUserAdministrationGetUser = (paginate) => {
  return async (dispatch, getState) => {
    dispatch(userAdministrationGetUserLoading());
    const {paginate_page, paginate_size, data_to_sort} = paginate || {}; // this is the additional params
    const {order_by, sort_by} = data_to_sort || {};
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
      if (order_by === 'RESET' || orderBy === 'RESET') {
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
      if (sort_by === 'RESET' || sortBy === 'RESET') {
        return '';
      } else {
        if (sort_by) {
          return sort_by;
        } else {
          return sortBy;
        }
      }
    };
    const customHeaders = {
      headers: {
        activityId: searchText || generatedParams ? 'AP-8' : 'AP-2',
        showParams: searchText || generatedParams ? true : false,
        excludeParamsKey: 'page|size',
      },
    };
    httpRequest
      .get(
        `/user/usr/getUserList?page=${getPage}&size=${getSize}${
          searchText ? `&keyword=${searchText}` : ''
        }${getSortBy() ? `&order=${getSortBy()}` : ''}${
          getSortBy() ? `&sort=${getOrderBy()}` : ''
        }${generatedParams}`
          .split(' ')
          .join('+'),
        customHeaders,
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
  callUserAdministrationUpdateLockUnlockUser,
  callUserAdministrationDeleteUser,
  userAdministrationCreateUser,
};

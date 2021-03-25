import axios from 'axios';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';
import {dataMatcherArray2D} from './get_sim_inventory_action';

const userAdministrationGetUserLoading = () => {
  return {
    action: reduxString.USER_ADMINISTRATION_GET_USER_LOADING,
  };
};
const userAdministrationGetUserSuccess = (data) => {
  return {
    action: reduxString.USER_ADMINISTRATION_GET_USER_SUCCESS,
    ...data,
  };
};
const userAdministrationGetUserFailed = (error) => {
  return {
    action: reduxString.USER_ADMINISTRATION_GET_USER_FAILED,
    errorText: error,
  };
};
const userAdministrationGetUserReset = () => {
  return {
    action: reduxString.USER_ADMINISTRATION_GET_USER_RESET,
  };
};
const userAdministrationSetDataUserGenerated = (data) => {
  return {
    action: reduxString.USER_ADMINISTRATION_SET_DATA_USER_GENERATED,
    dataUserGenerated: data,
  };
};
const userAdministrationResetDataUserGenerated = () => {
  return {
    action: reduxString.USER_ADMINISTRATION_RESET_DATA_USER_GENERATED,
  };
};
const userAdministrationDynamicCheckDataUser = (index) => {
  return {
    action: reduxString.USER_ADMINISTRATION_DYNAMIC_CHECK_DATA_USER,
    index,
  };
};
const userAdministrationDynamicUnCheckDataUser = (index) => {
  return {
    action: reduxString.USER_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_USER,
    index,
  };
};
const userAdministrationCheckAllDataUser = () => {
  return {
    action: reduxString.USER_ADMINISTRATION_CHECK_ALL_DATA_USER,
  };
};
const userAdministrationUnCheckAllDataUser = () => {
  return {
    action: reduxString.USER_ADMINISTRATION_UNCHECK_ALL_DATA_USER,
  };
};
const userAdministrationSetAppliedHeaderSort = (data) => {
  return {
    action: reduxString.USER_ADMINISTRATION_SET_APPLIED_HEADER_SORT,
    appliedHeaderSort: data,
  };
};
const userAdministrationResetAppliedHeaderSort = () => {
  return {
    action: reduxString.USER_ADMINISTRATION_RESET_APPLIED_HEADER_SORT,
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
        return order_by ?? orderBy;
      }
    };
    const getSortBy = () => {
      if (sort_by === 'RESET') {
        return '';
      } else {
        return sort_by ?? sortBy;
      }
    };
    console.log(
      `${base_url}/user/usr/getUserList?=page${getPage}&size${getSize}&keyword=${searchText}&order=${getOrderBy()}&sort=${getSortBy()}${generatedParams}`
        .split(' ')
        .join('+'),
    );
    axios
      .get(
        `${base_url}/user/usr/getUserList?=page${getPage}&size${getSize}&keyword=${searchText}&order=${getOrderBy()}&sort=${getSortBy()}${generatedParams}`
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
        const {content, pageable, totalPages, totalElements, size} =
          result || {};
        const {pageNumber} = pageable || {};
        if (statusCode === 0) {
          const isAppliedFilter = () => !!(searchText || generatedParams);
          const generateTable = dataMatcherArray2D(content, dataHeader);
          dispatch(
            userAdministrationGetUserSuccess({
              dataUser: data,
              dataUserGenerated: generateTable,
              pagePagination: pageNumber,
              totalSizePagination: size,
              totalPagePagination: totalPages,
              totalElementsPagination: totalElements,
              appliedFilter: isAppliedFilter(),
              appliedHeaderSort: data_to_sort || applied_header_sort,
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
  userAdministrationSetDataUserGenerated,
  userAdministrationResetDataUserGenerated,
  userAdministrationDynamicCheckDataUser,
  userAdministrationDynamicUnCheckDataUser,
  userAdministrationCheckAllDataUser,
  userAdministrationUnCheckAllDataUser,
  userAdministrationSetAppliedHeaderSort,
  userAdministrationResetAppliedHeaderSort,
};

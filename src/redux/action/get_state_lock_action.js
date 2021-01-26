import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authLogout} from './auth_action';

const getStateLockLoading = () => {
  return {
    type: reduxString.GET_STATE_LOCK_LOADING,
  };
};
const getStateLockSuccess = (dataStateLock = []) => {
  return {
    type: reduxString.GET_STATE_LOCK_SUCCESS,
    data: dataStateLock,
  };
};
const getStateLockFailed = (error) => {
  return {
    type: reduxString.GET_STATE_LOCK_FAILED,
    error: error,
  };
};
const getStateLockReset = () => {
  return {
    type: reduxString.GET_STATE_LOCK_RESET,
  };
};
const getStateLock = (navigation) => {
  return async (dispatch, getState) => {
    dispatch(getStateLockLoading());
    dispatch(
      setSomethingToFilter([
        {
          formId: 'state-lock-hard-code',
          needs: 'FilterLoadingTrue',
        },
      ]),
    );
    const {auth_reducer} = getState();
    const {access_token} = auth_reducer.data || {};
    axios
      .get(`${base_url}/dcp/sim/getStateLockList`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        if (data.error === 'invalid_token') {
          dispatch(authLogout(navigation));
        }
        if (data.statusCode === 0) {
          dispatch(getStateLockSuccess(data.result));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'state-lock-hard-code',
                needs: 'AddFilterData',
                data: data.result.map((value) => ({
                  value: value,
                  label: value,
                })),
              },
            ]),
          );
        } else {
          dispatch(getStateLockFailed(JSON.stringify(data)));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'state-lock-hard-code',
                needs: 'FilterLoadingFalse',
              },
              {
                formId: 'state-lock-hard-code',
                needs: 'SetFilterErrorText',
                errorText: 'failed to load list',
              },
            ]),
          );
        }
      })
      .catch((e) => {
        dispatch(getStateLockFailed(e));
      });
  };
};
export {getStateLock, getStateLockLoading, getStateLockReset};

import reduxString from '../reduxString';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authFailed, authLogout} from './auth_action';
import {CommonActions} from '@react-navigation/native';
import httpRequest from '../../constant/axiosInstance';

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
  return async (dispatch) => {
    dispatch(getStateLockLoading());
    dispatch(
      setSomethingToFilter([
        {
          formId: 'state-lock-hard-code',
          needs: 'FilterLoadingTrue',
        },
      ]),
    );
    httpRequest
      .get('/dcp/sim/getStateLockList')
      .then(({data}) => {
        if (data.error === 'invalid_token') {
          dispatch(authLogout());
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Auth',
                },
              ],
            }),
          );
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
      .catch((error) => {
        dispatch(authFailed(error.response.data));
      });
  };
};
export {getStateLock, getStateLockLoading, getStateLockReset};

import reduxString from '../reduxString';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authFailed, authLogout} from './auth_action';
import {CommonActions} from '@react-navigation/native';
import httpRequest from '../../constant/axiosInstance';

const getStateLoading = () => {
  return {
    type: reduxString.GET_STATE_LOADING,
  };
};
const getStateFailed = (error) => {
  return {
    type: reduxString.GET_STATE_FAILED,
    error: error,
  };
};
const getStateSuccess = (dataState = []) => {
  return {
    type: reduxString.GET_STATE_SUCCESS,
    data: dataState,
  };
};
const getStateReset = () => {
  return {
    type: reduxString.GET_STATE_RESET,
  };
};

const getStateCorp = (navigation) => {
  return async (dispatch) => {
    dispatch(getStateLoading());
    dispatch(
      setSomethingToFilter([
        {
          formId: 'state-hard-code',
          needs: 'FilterLoadingTrue',
        },
      ]),
    );
    httpRequest
      .get('/dcp/sim/getStateList')
      .then(({data}) => {
        if (data.error === 'invalid_token') {
          dispatch(authLogout(navigation));
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
          dispatch(getStateSuccess(data.result));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'state-hard-code',
                needs: 'AddFilterData',
                data: data.result.map((value) => ({
                  value: value,
                  label: value,
                })),
              },
            ]),
          );
        } else {
          dispatch(getStateFailed(JSON.stringify(data)));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'state-hard-code',
                needs: 'FilterLoadingFalse',
              },
              {
                formId: 'state-hard-code',
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
export {getStateCorp, getStateLoading, getStateReset};

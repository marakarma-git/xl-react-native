import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authFailed, authLogout} from './auth_action';
import {CommonActions} from '@react-navigation/native';

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
  return async (dispatch, getState) => {
    dispatch(getStateLoading());
    dispatch(
      setSomethingToFilter([
        {
          formId: 'state-hard-code',
          needs: 'FilterLoadingTrue',
        },
      ]),
    );
    const {auth_reducer} = getState();
    const {access_token} = auth_reducer.data || {};
    axios
      .get(`${base_url}/dcp/sim/getStateList`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
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
        // if (e.response.data) {
        //   dispatch(authFailed(e.response.data));
        // } else {
        //   alert('Something went wrong went fetching data');
        //   console.log(
        //     'error_api_get_custom_label: ' + JSON.stringify(e, null, 2),
        //   );
        //   dispatch(
        //     setSomethingToFilter([
        //       {
        //         formId: 'enterprise-hard-code',
        //         needs: 'FilterLoadingFalse',
        //       },
        //       {
        //         formId: 'enterprise-hard-code',
        //         needs: 'SetFilterErrorText',
        //         errorText: 'failed to load list',
        //       },
        //     ]),
        //   );
        // }
      });
  };
};
export {getStateCorp, getStateLoading, getStateReset};

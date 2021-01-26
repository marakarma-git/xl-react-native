import reduxString from '../reduxString';
import axios from 'axios';
import {base_url} from '../../constant/connection';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authLogout} from './auth_action';

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
      .catch((e) => {
        dispatch(getStateFailed(e));
        dispatch(
          setSomethingToFilter([
            {
              formId: 'enterprise-hard-code',
              needs: 'FilterLoadingFalse',
            },
            {
              formId: 'enterprise-hard-code',
              needs: 'SetFilterErrorText',
              errorText: 'failed to load list',
            },
          ]),
        );
      });
  };
};
export {getStateCorp, getStateLoading, getStateReset};

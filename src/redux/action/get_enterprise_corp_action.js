import axios from 'axios';
import reduxString from '../reduxString';
import {base_url} from '../../constant/connection';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authLogout} from './auth_action';
const getEnterpriseCorpLoading = () => {
  return {
    type: reduxString.GET_ENTERPRISE_CORP_LOADING,
  };
};
const getEnterpriseCropFailed = (error) => {
  return {
    type: reduxString.GET_ENTERPRISE_CORP_FAILED,
    error: error,
  };
};
const getEnterpriseCorpSuccess = (dataEnterprise = []) => {
  return {
    type: reduxString.GET_ENTERPRISE_CORP_SUCCESS,
    data: dataEnterprise,
  };
};
const getEnterpriseCorpReset = () => {
  return {
    type: reduxString.GET_ENTERPRISE_CORP_RESET,
  };
};
const getEnterpriseCorp = (navigation) => {
  return async (dispatch, getState) => {
    dispatch(getEnterpriseCorpLoading());
    dispatch(
      setSomethingToFilter([
        {
          formId: 'enterprise-hard-code',
          needs: 'FilterLoadingTrue',
        },
      ]),
    );
    const {auth_reducer} = getState();
    const {access_token} = auth_reducer.data || {};
    axios
      .get(`${base_url}/user/corp/getActiveEnterprise`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(({data}) => {
        if (data.error === 'invalid_token') {
          dispatch(authLogout(navigation));
        }
        if (data.statusCode === 0) {
          dispatch(getEnterpriseCorpSuccess(data.result));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'enterprise-hard-code',
                needs: 'AddFilterData',
                data: data.result.map(({enterpriseName, ...rest}) => ({
                  value: enterpriseName,
                  label: enterpriseName,
                  ...rest,
                })),
              },
            ]),
          );
        } else {
          dispatch(getEnterpriseCropFailed(JSON.stringify(data)));
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
        }
      })
      .catch((e) => {
        dispatch(getEnterpriseCropFailed(e));
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
export {getEnterpriseCorp, getEnterpriseCorpLoading};
import reduxString from '../reduxString';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authLogout} from './auth_action';
import {CommonActions} from '@react-navigation/native';
import httpRequest from '../../constant/axiosInstance';
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
    httpRequest
      .get('/user/corp/getActiveEnterprise')
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
          dispatch(getEnterpriseCorpSuccess(data.result));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'enterprise-hard-code',
                needs: 'AddFilterData',
                data: data.result.map(
                  ({enterpriseName, enterpriseId, ...rest}) => ({
                    value: enterpriseName,
                    label: enterpriseName,
                    toPackage: enterpriseId,
                    ...rest,
                  }),
                ),
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
      .catch((error) => {
        dispatch(getEnterpriseCropFailed(error.response.data));
        // dispatch(
        //   setSomethingToFilter([
        //     {
        //       formId: 'enterprise-hard-code',
        //       needs: 'FilterLoadingFalse',
        //     },
        //     {
        //       formId: 'enterprise-hard-code',
        //       needs: 'SetFilterErrorText',
        //       errorText: 'failed to load list',
        //     },
        //   ]),
        // );
      });
  };
};
export {getEnterpriseCorp, getEnterpriseCorpLoading};

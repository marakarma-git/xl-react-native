import reduxString from '../reduxString';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import {authFailed, authLogout} from './auth_action';
import httpRequest from '../../constant/axiosInstance';

const getEnterprisePackageNameLoading = () => {
  return {
    type: reduxString.GET_ENTERPRISE_PACKAGE_NAME_LOADING,
  };
};
const getEnterprisePackageNameFailed = (error) => {
  return {
    type: reduxString.GET_ENTERPRISE_PACKAGE_NAME_FAILED,
    error: error,
  };
};
const getEnterprisePackageNameSuccess = (dataEnterprisePackage = []) => {
  return {
    type: reduxString.GET_ENTERPRISE_PACKAGE_NAME_SUCCESS,
    data: dataEnterprisePackage,
  };
};
const getEnterprisePackageNameReset = () => {
  return {
    type: reduxString.GET_ENTERPRISE_PACKAGE_NAME_RESET,
  };
};
const getEnterprisePackageName = (enterpriseName, navigation) => {
  return async (dispatch, getState) => {
    dispatch(getEnterprisePackageNameLoading());
    dispatch(
      setSomethingToFilter([
        {
          formId: 'subscription-package-name-hard-code',
          needs: 'FilterLoadingTrue',
        },
        {
          formId: 'subscription-package-name-hard-code',
          needs: 'ResetSubscriptionPackageName',
        },
      ]),
    );
    const {auth_reducer} = getState();
    httpRequest
      .get(
        `/dcp/analytics/getListSubscriptionPackageName?enterpriseName=${enterpriseName}`,
      )
      .then(({data}) => {
        if (data.error === 'invalid_token') {
          dispatch(authLogout(navigation));
        }
        if (data.statusCode === 0) {
          dispatch(getEnterprisePackageNameSuccess(data.result));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'subscription-package-name-hard-code',
                needs: 'AddFilterData',
                data: data.result.map(({packageId, packageDesc}) => ({
                  value: packageId,
                  label: packageDesc,
                })),
              },
            ]),
          );
        } else {
          dispatch(getEnterprisePackageNameFailed(JSON.stringify(data)));
          dispatch(
            setSomethingToFilter([
              {
                formId: 'subscription-package-name-hard-code',
                needs: 'FilterLoadingFalse',
              },
              {
                formId: 'subscription-package-name-hard-code',
                needs: 'SetFilterErrorText',
                errorText: 'else failed to load list',
              },
            ]),
          );
        }
      })
      .catch((error) => {
        dispatch(authFailed(error.response.data));
        // if (e.response.data) {
        //
        // } else {
        //   alert('Something went wrong went fetching data');
        //   console.log(
        //     'error_api_call_sim_inventory: ' + JSON.stringify(e, null, 2),
        //   );
        //   dispatch(
        //     setSomethingToFilter([
        //       {
        //         formId: 'subscription-package-name-hard-code',
        //         needs: 'FilterLoadingFalse',
        //       },
        //       {
        //         formId: 'subscription-package-name-hard-code',
        //         needs: 'SetFilterErrorText',
        //         errorText: 'catch failed to load list',
        //       },
        //     ]),
        //   );
        // }
      });
  };
};
export {getEnterprisePackageName};

import reduxString from '../reduxString';
import {setSomethingToFilter} from './dynamic_array_filter_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

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
const getEnterprisePackageName = (enterpriseName) => {
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
    const {access_token} = auth_reducer.data || {};
    axios
      .get(
        `${base_url}/dcp/analytics/getListSubscriptionPackageName?enterpriseName=${enterpriseName}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      )
      .then(({data}) => {
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
        } else if (data.error === 'invalid_token') {
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
                errorText: 'failed to load list',
              },
            ]),
          );
        }
      })
      .catch((e) => {
        alert(JSON.stringify(e));
        dispatch(getEnterprisePackageNameFailed(e));
        dispatch(
          setSomethingToFilter([
            {
              formId: 'subscription-package-name-hard-code',
              needs: 'FilterLoadingFalse',
            },
            {
              formId: 'subscription-package-name-hard-code',
              needs: 'SetFilterErrorText',
              errorText: 'failed to load list',
            },
          ]),
        );
      });
  };
};
export {getEnterprisePackageName};

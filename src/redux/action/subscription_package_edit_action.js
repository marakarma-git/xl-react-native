import reduxString from '../reduxString';
import httpRequest from '../../constant/axiosInstance';

const subscriptionPackageEditTextInputEdit = ({valueInput, editFormId}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_TEXT_INPUT_EDIT,
    valueInput,
    editFormId,
  };
};
const subscriptionPackageEditDropDownEdit = ({valueInput, editFormId}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_DROP_DOWN_EDIT,
    valueInput,
    editFormId,
  };
};
const subscriptionPackageEditDropDownType2Edit = ({
  valueInput2,
  editFormId,
}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_DROP_DOWN_TYPE_2_EDIT,
    valueInput2,
    editFormId,
  };
};
const subscriptionPackageEditLoading = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_LOADING,
  };
};
const subscriptionPackageEditSuccess = ({
  getPackageType,
  getPackagePeriod,
  getNetwork,
  rawDataSubscriptionGenerated,
}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_SUCCESS,
    getPackageType,
    getPackagePeriod,
    getNetwork,
    rawDataSubscriptionGenerated,
  };
};
const subscriptionPackageEditFailed = ({errorText}) => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_FAILED,
    errorText,
  };
};
const subscriptionPackageEditReset = () => {
  return {
    type: reduxString.SUBSCRIPTION_PACKAGE_EDIT_RESET,
  };
};
const callSubsPackagePredefinedValue = (localVariable) => {
  return async (dispatch, getState) => {
    dispatch(subscriptionPackageEditLoading());
    const {data_subscription_generated} =
      (await getState().subscription_package_get_subscription_reducer) || {};
    const {indexSelected} = localVariable || {};
    httpRequest
      .get('/dcp/package/getPackagePredefinedValue')
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const {packageType, packagePeriod, network, quotaPackageType} =
            result || [];
          const getPackageType =
            packageType.map((e) => ({value: e, label: e})) || [];
          const getPackagePeriod =
            packagePeriod.map((e) => ({value: e, label: e})) || [];
          const getNetwork = network.map((e) => ({value: e, label: e})) || [];
          const getQuotaPackageType =
            quotaPackageType.map((e) => ({value: e, label: e})) || [];
          dispatch(
            subscriptionPackageEditSuccess({
              getPackageType,
              getPackagePeriod,
              getNetwork,
              getQuotaPackageType,
              rawDataSubscriptionGenerated:
                data_subscription_generated[indexSelected] || {},
            }),
          );
        } else {
          dispatch(
            subscriptionPackageEditFailed({
              errorText: 'Failed, to get package value',
            }),
          );
        }
      })
      .catch((error) => {
        dispatch(
          subscriptionPackageEditFailed({
            errorText: 'Failed, to get package value',
            ...error.response.data,
          }),
        );
      });
  };
};

export default callSubsPackagePredefinedValue;
export {
  subscriptionPackageEditTextInputEdit,
  subscriptionPackageEditDropDownEdit,
  subscriptionPackageEditDropDownType2Edit,
  subscriptionPackageEditReset,
};

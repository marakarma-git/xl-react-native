import reduxString from '../reduxString';
import lod from 'lodash';
import {dataByteLabel} from '../../constant/arrayConstant';

const initialState = {
  dataSubscriptionEdit: [],
  dataSubscriptionSnapShot: {},
  loading: false,
  errorText: '',
};
const subscription_package_edit_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_TEXT_INPUT_EDIT: {
      const getIndex =
        state.dataSubscriptionEdit.findIndex(
          (f) => f.edit_form_id === action.editFormId,
        ) || 0;
      state.dataSubscriptionEdit[getIndex].for_layout_edit_only.edit_value =
        action.valueInput;
      return {
        ...state,
        dataSubscriptionEdit: state.dataSubscriptionEdit,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_DROP_DOWN_EDIT: {
      const getIndex =
        state.dataSubscriptionEdit.findIndex(
          (f) => f.edit_form_id === action.editFormId,
        ) || 0;
      state.dataSubscriptionEdit[getIndex].for_layout_edit_only.edit_value =
        action.valueInput;
      return {
        ...state,
        dataSubscriptionEdit: state.dataSubscriptionEdit,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_DROP_DOWN_TYPE_2_EDIT: {
      const getIndex =
        state.dataSubscriptionEdit.findIndex(
          (f) => f.edit_form_id === action.editFormId,
        ) || 0;
      state.dataSubscriptionEdit[getIndex].for_layout_edit_only.edit_value2 =
        action.valueInput2;
      return {
        ...state,
        dataSubscriptionEdit: state.dataSubscriptionEdit,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
        dataSubscriptionEdit: initialState.dataSubscriptionEdit,
        dataSubscriptionSnapShot: initialState.dataSubscriptionSnapShot,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_SUCCESS: {
      const {
        getPackageType,
        getPackagePeriod,
        getNetwork,
        rawDataSubscriptionGenerated,
      } = action || {};
      const {dataCell} = rawDataSubscriptionGenerated || [];

      let copyDataCell = lod.cloneDeep(dataCell);

      const getIndexQuotaInternet = dataCell.findIndex(
        (f) => f.edit_form_id === 'edit-subscription-quota-internet-hard-code',
      );
      const getIndexPackageType = dataCell.findIndex(
        (f) => f.edit_form_id === 'edit-subscription-package-type-hard-code',
      );
      const getIndexPackagePeriod = dataCell.findIndex(
        (f) => f.edit_form_id === 'edit-subscription-package-period-hard-code',
      );
      const getIndexNetwork = dataCell.findIndex(
        (f) => f.edit_form_id === 'edit-subscription-network-hard-code',
      );

      copyDataCell[
        getIndexQuotaInternet
      ].for_layout_edit_only.edit_data_array = dataByteLabel;
      copyDataCell[
        getIndexPackageType
      ].for_layout_edit_only.edit_data_array = getPackageType;
      copyDataCell[
        getIndexPackagePeriod
      ].for_layout_edit_only.edit_data_array = getPackagePeriod;
      copyDataCell[
        getIndexNetwork
      ].for_layout_edit_only.edit_data_array = getNetwork;

      return {
        ...state,
        loading: false,
        dataSubscriptionEdit: copyDataCell,
        dataSubscriptionSnapShot: dataCell,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_FAILED: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_EDIT_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
export default subscription_package_edit_reducer;

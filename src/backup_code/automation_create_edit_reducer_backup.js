import reduxString from '../reduxString';
import {Regex} from '../../helpers/helper';

const dataRuleCategory = [
  {
    card_id: 'auto-downgrade-package',
    card_type: 'CardFromTo',
    card_disabled: false,
    params_disabled_api: 'isDowngrade',
    params_value_api: 'downgradePackageFrom',
    params_value_api_to: 'downgradePackageTo',
    card_is_checked: false,
    card_title: 'Auto Downgrade Package',
    card_description:
      'In the case where a subscription upgrades from package A to higher package B, ' +
      'and you want to downgrade it back to package A on the next month billing, you may use this auto downgrade rule.',
    card_warning_description:
      'Please note that it will impact to change all SIMs subscription under selected enterprise.',
    card_type_title: 'Subscription Package',
    select_api: 'packageDowngradeList',
    value: {},
    value_error_text: '',
    sub_value: {},
    sub_value_error_text: '',
  },
  {
    card_id: 'auto-upgrade-individual-shared-package',
    card_type: 'CardFromTo',
    card_disabled: false,
    disabled_api: 'individualUpgrade',
    params_disabled_api: 'isUpgradeIndividual',
    params_value_api: 'upgradePackageIndividualFrom',
    params_value_api_to: 'upgradePackageIndividualTo',
    card_is_checked: false,
    card_title: 'Auto Upgrade Individual Shared Package',
    card_description: 'card_description',
    card_warning_description: 'card_warning_description',
    card_type_title: 'Subscription Package',
    select_api: 'packageDowngradeList',
    value: {},
    value_error_text: '',
    sub_value: {},
    sub_value_error_text: '',
  },
  {
    card_id: 'bulk-shared-notification',
    card_type: 'CardEmail',
    card_disabled: false,
    disabled_api: 'bulkNotification',
    params_disabled_api: 'isNotification',
    params_value_api: 'notificationEmail',
    card_is_checked: false,
    card_title: 'Bulk Shared Notification',
    card_warning_description:
      'System will send an email notification to targeted email address(es) ' +
      'in daily basis if the bulk shared package subscription usage reaches  75% of total bulk shared quota.',
    card_type_title: 'Target Email Address',
    value: '',
    value_error_text: '',
  },
  {
    card_id: 'bulk-shared-auto-upgrade',
    card_type: 'CardFromTo',
    card_disabled: false,
    disabled_api: 'bulkUpgrade',
    params_disabled_api: 'isUpgradeBulk',
    params_value_api: 'upgradePackageBulkFrom',
    params_value_api_to: 'upgradePackageBulkTo',
    card_is_checked: false,
    card_title: 'Bulk Shared Auto Upgrade',
    card_warning_description:
      'System will auto-upgrade the bulk shared package subscription to below ' +
      'targeted subscription package whenever the existing bulk shared subscription usage reaches  100GB.',
    card_type_title: 'Subscription Package',
    select_api: 'packageBulkUpgradeList',
    value: {},
    value_error_text: '',
    sub_value: {},
    sub_value_error_text: '',
  },
];
const initialState = {
  loading: false,
  errorText: '',
  data_automation_create: {},
  dataRuleCategory: dataRuleCategory,
};
const automation_create_edit_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTOMATION_SET_DATA_RULE_CATEGORY_BULK: {
      return {
        ...state,
        dataRuleCategory: action.dataRuleCategory,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_SET_VALUE: {
      const getIndex =
        state.dataRuleCategory.findIndex((c) => c.card_id === action.cardId) ||
        0;
      const getCardType = state.dataRuleCategory[getIndex].card_type;
      const checkError =
        getCardType === 'CardEmail' &&
        !Regex.multipleEmailSeparateComma.test(action.inputValue)
          ? 'Wrong email format'
          : '';
      state.dataRuleCategory[getIndex].value = action.inputValue;
      state.dataRuleCategory[getIndex].value_error_text =
        getCardType === 'CardEmail' ? checkError : '';
      return {
        ...state,
        dataRuleCategory: state.dataRuleCategory,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_SET_ERROR_TEXT: {
      const getIndex =
        state.dataRuleCategory.findIndex((c) => c.card_id === action.cardId) ||
        0;
      state.dataRuleCategory[getIndex].value_error_text = action.errorText;
      return {
        ...state,
        dataRuleCategory: state.dataRuleCategory,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_SET_SUB_VALUE: {
      const getIndex =
        state.dataRuleCategory.findIndex((c) => c.card_id === action.cardId) ||
        0;
      state.dataRuleCategory[getIndex].sub_value = action.inputValue;
      state.dataRuleCategory[getIndex].sub_value_error_text = '';
      return {
        ...state,
        dataRuleCategory: state.dataRuleCategory,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_SET_SUB_ERROR_TEXT: {
      const getIndex =
        state.dataRuleCategory.findIndex((c) => c.card_id === action.cardId) ||
        0;
      state.dataRuleCategory[getIndex].sub_value_error_text = action.errorText;
      return {
        ...state,
        dataRuleCategory: state.dataRuleCategory,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_CHECK: {
      const getIndex =
        state.dataRuleCategory.findIndex((c) => c.card_id === action.cardId) ||
        0;
      state.dataRuleCategory[getIndex].card_is_checked =
        !state.dataRuleCategory[getIndex].card_is_checked;
      state.dataRuleCategory[getIndex].value_error_text = '';
      state.dataRuleCategory[getIndex].sub_value_error_text = '';
      return {
        ...state,
        dataRuleCategory: state.dataRuleCategory,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_FAILED: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
        data_automation_create: {},
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: '',
        data_automation_create: action.dataAutomationCreate,
        dataRuleCategory: action.reMap,
      };
    }
    case reduxString.AUTOMATION_CREATE_EDIT_RESET: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
// export default automation_create_edit_reducer;

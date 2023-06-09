import reduxString from '../reduxString';
import {is} from 'babel-traverse/lib/path/introspection';

const automationDefaultFormData = [
  {
    stepperId: 'select-enterprise-stepper-hard-code',
    stepperTitle: 'Select Enterprise',
    stepperDescription: 'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
    currentState: 0,
    dataContainer: [
      {
        containerId: 'target-enterprise-container',
        containerType: 'WrapperOne',
        containerTitle: 'Target Enterprise',
        containerDescription:
          'It will affect all subscription packages and individual subscription within the selected enterprises.',
        isRemoveBottomLine: true,
        dataInput: [
          {
            inputId: 'enterprise-drop-down-the-only-one-have-id',
            inputType: 'DropDown',
            inputLoading: false,
            titleInput: 'Enterprise',
            paramsDefault: 'enterpriseId',
            config: {
              fullWidthInput: true,
              isTitleRequired: true,
            },
            validationConfig: {
              isRequired: true,
            },
          },
        ],
      },
    ],
  },
  {
    stepperId: 'rule-category-stepper-hard-code',
    stepperTitle: 'Rule Category',
    stepperDescription: 'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
    currentState: 1,
    dataContainer: [
      {
        containerId: 'rules-name-container',
        containerType: 'WrapperOne',
        containerTitle: 'Rules Name',
        containerDescription:
          'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Rules Name',
            paramsDefault: 'rulesName',
            config: {
              fullWidthInput: true,
              isTitleRequired: true,
            },
            validationConfig: {
              isRequired: true,
            },
          },
        ],
      },
      {
        containerId: 'select-rule-category-container',
        containerType: 'WrapperOne',
        containerTitle: 'Select Rule Category',
        containerDescription:
          'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
        isRemoveBottomLine: true,
        dataInput: [
          {
            inputType: 'RadioButton',
            paramsDefault: 'category',
            titleInput: 'Rule Category',
            config: {
              fullWidthInput: true,
              data: [
                {
                  value: 'businessAutomation',
                  label: 'Business Automation',
                },
                {
                  value: 'fraudPrevention',
                  label: 'Fraud Prevention',
                },
              ],
            },
            validationConfig: {
              isRequired: true,
            },
          },
        ],
      },
    ],
  },
  {
    stepperId: 'define-rules-stepper-hard-code',
    stepperTitle: 'Define Rules',
    stepperDescription: 'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
    currentState: 2,
    dataContainer: [
      {
        containerId: 'bulk-shared-auto-upgrade-container-hard-code',
        containerType: 'WrapperTwo',
        containerTitle: 'Bulk Shared Auto Upgrade',
        containerDescription:
          'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
        groupByContainer: 'businessAutomation',
        paramsContainerDefault: 'isUpgradeBulk',
        dataInput: [
          {
            inputType: 'AutomationLabel',
            titleInput: 'Subscription Package',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputType: 'DropDown',
            titleInput: 'From',
            paramsDefault: 'upgradePackageBulkFrom',
            paramsData: 'upgradePackageBulkData',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            validationConfig: {
              isRequired: true,
              overrideTitleInput: 'Upgrade Package Bulk From',
            },
            inputLoading: false,
          },
          {
            inputType: 'DropDown',
            titleInput: 'To',
            paramsDefault: 'upgradePackageBulkTo',
            paramsData: 'upgradePackageBulkData',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            validationConfig: {
              isRequired: true,
              overrideTitleInput: 'Upgrade Package Bulk To',
            },
            inputLoading: false,
          },
        ],
      },
      {
        containerId: 'auto-downgrade-package-container-hard-code',
        containerType: 'WrapperTwo',
        containerTitle: 'Auto Downgrade Upgrade',
        containerDescription:
          'In the case where a subscription upgrades from package A to higher package B, and you want to downgrade it back to package A on the next month billing, you may use this auto downgrade rule.\n' +
          '\n' +
          'Please note that it will impact to change all SIMs subscription under selected enterprise.',
        groupByContainer: 'businessAutomation',
        paramsContainerDefault: 'isDowngrade',
        dataInput: [
          {
            inputType: 'AutomationLabel',
            titleInput: 'Subscription Package',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputType: 'DropDown',
            titleInput: 'From',
            paramsDefault: 'downgradePackageFrom',
            paramsData: 'downgradePackageData',
            paramsLoading: 'subscriptionPackageLoading',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            validationConfig: {
              isRequired: true,
              overrideTitleInput: 'Subscription Package From',
            },
            inputLoading: false,
          },
          {
            inputType: 'DropDown',
            titleInput: 'To',
            paramsDefault: 'downgradePackageTo',
            paramsData: 'downgradePackageData',
            paramsLoading: 'subscriptionPackageLoading',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            validationConfig: {
              isRequired: true,
              overrideTitleInput: 'Subscription Package To',
            },
            inputLoading: false,
          },
        ],
      },
      {
        containerId:
          'auto-upgrade-individual-shared-package-container-hard-code',
        containerType: 'WrapperTwo',
        containerTitle: 'Individual Shared package Auto Upgrade',
        containerDescription:
          'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
        groupByContainer: 'businessAutomation',
        paramsContainerDefault: 'isUpgradeIndividual',
        dataInput: [
          {
            inputType: 'AutomationLabel',
            titleInput: 'Subscription Package',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputType: 'DropDown',
            titleInput: 'From',
            paramsDefault: 'upgradePackageIndividualFrom',
            paramsData: 'upgradePackageIndividualData',
            paramsLoading: 'subscriptionPackageLoading',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            validationConfig: {
              isRequired: true,
              overrideTitleInput: 'Upgrade Package Individual From',
            },
            inputLoading: false,
          },
          {
            inputType: 'DropDown',
            titleInput: 'To',
            paramsDefault: 'upgradePackageIndividualTo',
            paramsData: 'upgradePackageIndividualData',
            paramsLoading: 'subscriptionPackageLoading',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            validationConfig: {
              isRequired: true,
              overrideTitleInput: 'Upgrade Package Individual To',
            },
            inputLoading: false,
          },
          {
            inputType: 'ThresholdPad',
            titleInput: 'Threshold',
            paramsDefault: 'thresholdUpgradeIndividual',
            validationConfig: {
              forceSendValue: '0',
            },
          },
        ],
      },
      {
        containerId: 'bulk-shared-limit-notification-container-hard-code',
        containerType: 'WrapperTwo',
        containerTitle: 'Bulk Shared Limit Notification',
        containerDescription:
          'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
        groupByContainer: 'fraudPrevention',
        paramsContainerDefault: 'isBulkNotification',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Email Address(es)',
            paramsDefault: 'notificationBulkEmail',
            config: {
              fullWidthInput: true,
            },
            validationConfig: {
              isRequired: true,
              emailType: true,
            },
          },
          {
            inputType: 'ThresholdPad',
            titleInput: 'Threshold',
            paramsDefault: 'thresholdBulkNotification',
            validationConfig: {
              forceSendValue: '0',
            },
          },
        ],
      },
      {
        containerId: 'individual-shared-limit-container-hard-code',
        containerType: 'WrapperTwo',
        containerTitle: 'Individual Shared Limit',
        containerDescription:
          'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
        groupByContainer: 'fraudPrevention',
        paramsContainerDefault: 'isIndividualNotification',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Email Address(es)',
            paramsDefault: 'notificationIndividualEmail',
            config: {
              fullWidthInput: true,
            },
            validationConfig: {
              isRequired: true,
              emailType: true,
            },
          },
          {
            inputType: 'ThresholdPad',
            titleInput: 'Threshold',
            paramsDefault: 'thresholdIndividualNotification',
            validationConfig: {
              forceSendValue: '0',
            },
          },
        ],
      },
    ],
  },
  {
    stepperId: 'summary-stepper-hard-code',
    stepperTitle: 'Summary',
    stepperDescription: 'Lorem ipsum dolor sir amet, consectet adipiscing eltc',
    currentState: 3,
    dataContainer: [
      {
        containerTitle: 'Dummy Container',
        containerDescription:
          'This container for trigger the local variable dataSummary from automationCreateSummary',
      },
    ],
  },
];

const containerValue = {
  dataDummy: [
    {
      value: 'abc',
      label: 'abc',
    },
    {
      value: 'cba',
      label: 'cba',
    },
  ],
  dummyErrorBool: true,
  dummyErrorText: 'Testing Dummy Error Text',

  enterpriseId: {}, // Target Enterprise
  enterpriseIdData: [],
  enterpriseIdDisabled: false,
  enterpriseIdLoading: false,

  rulesName: '', // Rules Name
  category: {}, // Select Rule Category | String

  //Define Rules - Business Automation -  Bulk Shared Auto Upgrade
  isUpgradeBulk: false,
  isUpgradeBulkDisabled: false,
  isUpgradeBulkHide: false,
  upgradePackageBulkFrom: {}, //String
  upgradePackageBulkTo: {}, //String
  upgradePackageBulkData: [], // packageBulkUpgradeList

  //Define Rules - Business Automation - Auto Downgrade Upgrade
  isDowngrade: false,
  isDowngradeDisabled: false,
  isDowngradeHide: false,
  downgradePackageFrom: {}, //String
  downgradePackageTo: {}, //String
  downgradePackageData: [], //packageDowngradeList

  //Define Rules - Business Automation - Individual Shared Package Auto Upgrade
  isUpgradeIndividual: false,
  isUpgradeIndividualDisabled: false,
  isUpgradeIndividualHide: false,
  upgradePackageIndividualFrom: {}, //String
  upgradePackageIndividualTo: {}, //String
  thresholdUpgradeIndividual: '0', //String
  upgradePackageIndividualData: [], //packageIndividualUpgradeList

  //Define Rules - Fraud Prevention - Bulk Shared Limit Notification
  isBulkNotification: false,
  isBulkNotificationDisabled: false,
  isBulkNotificationHide: false,
  notificationBulkEmail: '',
  thresholdBulkNotification: '0',

  //Define Rules - Fraud Prevention - Individual Shared Limit
  isIndividualNotification: false,
  isIndividualNotificationDisabled: false,
  isIndividualNotificationHide: false,
  notificationIndividualEmail: '',
  thresholdIndividualNotification: '0',
};

const initialState = {
  loading: false,
  errorText: '',
  automationDefaultFormData: automationDefaultFormData,
  containerValue: containerValue,
};
const automation_create_edit_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.AUTOMATION_CONTAINER_SWITCH: {
      return {
        ...state,
        containerValue: {
          ...state.containerValue,
          [`${action.paramsToWhere}`]:
            !state.containerValue[`${action.paramsToWhere}`],
        },
      };
    }
    case reduxString.AUTOMATION_ADAPTIVE_ONCHANGE: {
      return {
        ...state,
        containerValue: {
          ...state.containerValue,
          [`${action.paramsToWhere}`]: action.realData,
        },
      };
    }
    case reduxString.AUTOMATION_RESET_FORM_CONTAINER_VALUE: {
      return {
        ...state,
        containerValue: {
          ...containerValue,
        },
      };
    }
    case reduxString.AUTOMATION_CREATE_REDUX_LOADING: {
      return {
        ...state,
        loading: true,
        errorText: '',
      };
    }
    case reduxString.AUTOMATION_CREATE_REDUX_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
        errorText: '',
      };
    }
    case reduxString.AUTOMATION_CREATE_REDUX_ERROR: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case reduxString.AUTOMATION_ENTERPRISE_SUCCESS: {
      const isReset = action.result?.isReset;
      return {
        ...state,
        loading: false,
        errorText: '',
        containerValue: {
          ...state.containerValue,
          ...action.result.forRulesValue,
          enterpriseId: isReset
            ? state.containerValue.enterpriseId
            : {
                value: action.result?.itemEdit?.enterpriseId,
                label: action.result?.itemEdit?.enterpriseName,
              },
          enterpriseIdDisabled: !isReset,
          rulesName: isReset ? '' : action.result?.result?.rulesName,
          category: isReset
            ? {}
            : {
                value: action.result?.result?.category,
                label:
                  action.result?.result?.category === 'businessAutomation'
                    ? 'Business Automation'
                    : action.result?.result?.category === 'fraudPrevention'
                    ? 'Fraud Prevention'
                    : '',
              },

          isUpgradeBulkDisabled: !action?.result?.bulkUpgrade,
          isUpgradeIndividualDisabled: !action?.result?.individualUpgrade,
          isBulkNotificationDisabled: !action?.result?.bulkNotification,
          isIndividualNotificationDisabled:
            !action?.result?.individualNotification,

          upgradePackageBulkData: action?.result?.packageBulkUpgradeList || [],
          downgradePackageData: action?.result?.packageDowngradeList || [],
          upgradePackageIndividualData:
            action?.result?.packageIndividualUpgradeList || [],
        },
      };
    }
    case reduxString.AUTOMATION_ACTIVE_ENTERPRISE_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: '',
        containerValue: {
          ...state.containerValue,
          enterpriseIdData: action.enterpriseData,
        },
      };
    }
    default: {
      return state;
    }
  }
};
// This is for autocomplete text when user press from edit
const forRulesValueParams = [
  //----------------------------------------------
  {
    typeParams: 'SingleValue',
    paramsDefault: 'isUpgradeBulk',
    paramsDefaultValue: false,
  },
  {
    typeParams: 'DualValue',
    paramsDefault: 'upgradePackageBulk',
    paramsData: 'packageBulkUpgradeList',
  },
  //----------------------------------------------
  {
    typeParams: 'SingleValue',
    paramsDefault: 'isDowngrade',
    paramsDefaultValue: false,
  },
  {
    typeParams: 'DualValue',
    paramsDefault: 'downgradePackage',
    paramsData: 'packageDowngradeList',
  },
  //----------------------------------------------
  {
    typeParams: 'SingleValue',
    paramsDefault: 'isUpgradeIndividual',
    paramsDefaultValue: false,
  },
  {
    typeParams: 'DualValue',
    paramsDefault: 'upgradePackageIndividual',
    paramsData: 'packageIndividualUpgradeList',
  },
  {
    typeParams: 'SingleValue',
    paramsDefault: 'thresholdUpgradeIndividual',
    paramsDefaultValue: '0',
  },
  //----------------------------------------------
  {
    typeParams: 'SingleValue',
    paramsDefault: 'isBulkNotification',
    paramsDefaultValue: false,
  },
  {
    typeParams: 'SingleValue',
    paramsDefault: 'notificationBulkEmail',
    paramsDefaultValue: '',
  },
  {
    typeParams: 'SingleValue',
    paramsDefault: 'thresholdBulkNotification',
    paramsDefaultValue: '0',
  },
  //----------------------------------------------
  {
    typeParams: 'SingleValue',
    paramsDefault: 'isIndividualNotification',
    paramsDefaultValue: false,
  },
  {
    typeParams: 'SingleValue',
    paramsDefault: 'notificationIndividualEmail',
    paramsDefaultValue: '',
  },
  {
    typeParams: 'SingleValue',
    paramsDefault: 'thresholdIndividualNotification',
    paramsDefaultValue: '0',
  },
  //----------------------------------------------
];
export default automation_create_edit_reducer;
export {automationDefaultFormData, forRulesValueParams};

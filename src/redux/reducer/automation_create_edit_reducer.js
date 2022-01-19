import reduxString from '../reduxString';

const automationDefaultFormData = [
  {
    stepperId: 'select-enterprise-stepper-hard-code',
    stepperTitle: 'Select Enterprise',
    stepperDescription: '',
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
            inputType: 'DropDown',
            inputLoading: false,
            titleInput: 'Enterprise',
            paramsDefault: 'enterpriseId',
            config: {
              fullWidthInput: true,
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
    stepperDescription: '',
    currentState: 1,
    dataContainer: [
      {
        containerId: 'rules-name-container',
        containerType: 'WrapperOne',
        containerTitle: 'Rules Name',
        containerDescription: '',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Rules Name',
            paramsDefault: 'rulesName',
            config: {
              fullWidthInput: true,
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
        containerDescription: '',
        isRemoveBottomLine: true,
        dataInput: [
          {
            inputType: 'RadioButton',
            paramsDefault: 'category',
            titleInput: 'Rule Category',
            config: {
              data: [
                {
                  value: 'Business Automation',
                  label: 'Business Automation',
                },
                {
                  value: 'Fraud Prevention',
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
    stepperDescription: '',
    currentState: 2,
    dataContainer: [
      {
        containerId: 'bulk-shared-auto-upgrade-container-hard-code',
        containerType: 'WrapperTwo',
        containerTitle: 'Bulk Shared Auto Upgrade',
        containerDescription: '',
        groupByContainer: 'Business Automation',
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
        containerTitle: 'Auto Downgrade Package',
        containerDescription:
          'In the case where a subscription upgrades from package A to higher package B, and you want to downgrade it back to package A on the next month billing, you may use this auto downgrade rule.\n' +
          '\n' +
          'Please note that it will impact to change all SIMs subscription under selected enterprise.',
        groupByContainer: 'Business Automation',
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
            paramsData: 'subscriptionPackageData',
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
            paramsData: 'subscriptionPackageData',
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
        containerDescription: '',
        groupByContainer: 'Business Automation',
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
            paramsData: 'subscriptionPackageData',
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
            paramsData: 'subscriptionPackageData',
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
        containerDescription: '',
        groupByContainer: 'Fraud Prevention',
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
        containerDescription: '',
        groupByContainer: 'Fraud Prevention',
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
    stepperDescription: '',
    currentState: 3,
    dataContainer: [],
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
  enterpriseIdLoading: false,

  rulesName: '', // Rules Name
  category: {}, // Select Rule Category | String

  //Sharing Array Data
  // Auto Downgrade Upgrade || Individual Shared Package Auto Upgrade
  subscriptionPackageData: [],
  subscriptionPackageLoading: false,

  //Define Rules - Business Automation -  Bulk Shared Auto Upgrade
  isUpgradeBulk: false,
  isUpgradeBulkDisabled: false,
  isUpgradeBulkHide: false,
  upgradePackageBulkFrom: {}, //String
  upgradePackageBulkTo: {}, //String

  //Define Rules - Business Automation - Bulk Shared Auto Downgrade Package
  isDowngrade: false,
  isDowngradeDisabled: false,
  isDowngradeHide: false,
  downgradePackageFrom: {}, //String
  downgradePackageTo: {}, //String

  //Define Rules - Business Automation - Individual Shared Package Auto Upgrade
  isUpgradeIndividual: false,
  isUpgradeIndividualDisabled: false,
  isUpgradeIndividualHide: false,
  upgradePackageIndividualFrom: {}, //String
  upgradePackageIndividualTo: {}, //String
  thresholdUpgradeIndividual: '0', //String

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
  thresholdIndividualNotification: '',
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
    default: {
      return state;
    }
  }
};
export default automation_create_edit_reducer;
export {automationDefaultFormData};

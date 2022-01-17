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
        showContainer: true,
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
            paramsValue: 'enterpriseId',
            paramsData: 'dataEnterprise',
            paramsError: 'dummyErrorText',
            paramsLoading: 'dummyErrorBool',
            config: {
              fullWidthInput: true,
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
        showContainer: true,
        containerTitle: 'Rules Name',
        containerDescription: '',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Rules Name',
            paramsValue: 'rulesName',
            config: {
              fullWidthInput: true,
            },
          },
        ],
      },
      {
        containerId: 'select-rule-category-container',
        containerType: 'WrapperOne',
        showContainer: true,
        containerTitle: 'Select Rule Category',
        containerDescription: '',
        isRemoveBottomLine: true,
        dataInput: [
          {
            inputType: 'RadioButton',
            paramsValue: 'category',
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
        showContainer: false,
        isSelected: false,
        containerTitle: 'Bulk Shared Auto Upgrade',
        containerDescription: '',
        groupByContainer: 'Business Automation',
        containerBoolParamsTo: 'isUpgradeBulk',
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
            paramsValue: 'upgradePackageBulkFrom',
            paramsData: 'dataDummy',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
          {
            inputType: 'DropDown',
            titleInput: 'To',
            paramsValue: 'upgradePackageBulkTo',
            paramsData: 'dataDummy',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
        ],
      },
      {
        containerId: 'auto-downgrade-package-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Auto Downgrade Package',
        containerDescription:
          'In the case where a subscription upgrades from package A to higher package B, and you want to downgrade it back to package A on the next month billing, you may use this auto downgrade rule.\n' +
          '\n' +
          'Please note that it will impact to change all SIMs subscription under selected enterprise.',
        groupByContainer: 'Business Automation',
        containerBoolParamsTo: 'isDowngrade',
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
            paramsValue: 'downgradePackageFrom',
            paramsData: 'dataDummy',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
          {
            inputType: 'DropDown',
            titleInput: 'To',
            paramsValue: 'downgradePackageTo',
            paramsData: 'dataDummy',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
        ],
      },
      {
        containerId:
          'auto-upgrade-individual-shared-package-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Individual Shared package Auto Upgrade',
        containerDescription: '',
        groupByContainer: 'Business Automation',
        containerBoolParamsTo: 'isUpgradeIndividual',
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
            paramsValue: 'upgradePackageIndividualFrom',
            paramsData: 'dataDummy',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
          {
            inputType: 'DropDown',
            titleInput: 'To',
            paramsValue: 'upgradePackageIndividualTo',
            paramsData: 'dataDummy',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
          {
            inputType: 'ThresholdPad',
            titleInput: 'Threshold',
            paramsValue: 'thresholdUpgradeIndividual',
          },
        ],
      },
      {
        containerId: 'bulk-shared-limit-notification-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Bulk Shared Limit Notification',
        containerDescription: '',
        groupByContainer: 'Fraud Prevention',
        containerBoolParamsTo: 'isBulkNotification',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Email Address(es)',
            paramsValue: 'notificationBulkEmail',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputType: 'ThresholdPad',
            titleInput: 'Threshold',
            paramsValue: 'thresholdBulkNotification',
          },
        ],
      },
      {
        containerId: 'individual-shared-limit-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Individual Shared Limit',
        containerDescription: '',
        groupByContainer: 'Fraud Prevention',
        containerBoolParamsTo: 'isIndividualNotification',
        dataInput: [
          {
            inputType: 'TextInput',
            titleInput: 'Email Address(es)',
            paramsValue: 'notificationIndividualEmail',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputType: 'ThresholdPad',
            titleInput: 'Threshold',
            paramsValue: 'thresholdIndividualNotification',
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
  rulesName: 'string', // Rules Name
  category: {}, // Select Rule Category | String

  //Define Rules - Business Automation -  Bulk Shared Auto Upgrade
  isUpgradeBulk: false,
  upgradePackageBulkFrom: {}, //String
  upgradePackageBulkTo: {}, //String

  //Define Rules - Business Automation - Bulk Shared Auto Downgrade Package
  isDowngrade: false,
  downgradePackageFrom: {}, //String
  downgradePackageTo: {}, //String

  //Define Rules - Business Automation - Individual Shared Package Auto Upgrade
  isUpgradeIndividual: false,
  upgradePackageIndividualFrom: {}, //String
  upgradePackageIndividualTo: {}, //String
  thresholdUpgradeIndividual: '0', //String

  //Define Rules - Fraud Prevention - Bulk Shared Limit Notification
  isBulkNotification: false,
  notificationBulkEmail: '',
  thresholdBulkNotification: '0',

  //Define Rules - Fraud Prevention - Individual Shared Limit
  isIndividualNotification: false,
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
    default: {
      return state;
    }
  }
};
export default automation_create_edit_reducer;
export {automationDefaultFormData};

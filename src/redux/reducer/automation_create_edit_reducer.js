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
        dataInput: [
          {
            inputId: '',
            inputType: 'TextInput',
            data: [],
            inputLoading: false,
            titleInput: 'Enterprise',
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
            inputId: '',
            inputType: 'TextInput',
            titleInput: 'Rules Name',
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
        containerDescription: 'WrapperOne',
        dataInput: [
          {
            inputId: '',
            inputType: 'RadioOnlyOne',
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
        containerId: 'auto-downgrade-package-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Auto Downgrade Package',
        containerDescription:
          'In the case where a subscription upgrades from package A to higher package B, and you want to downgrade it back to package A on the next month billing, you may use this auto downgrade rule.\n' +
          '\n' +
          'Please note that it will impact to change all SIMs subscription under selected enterprise.',
        dataInput: [
          {
            inputType: 'AutomationLabel',
            titleInput: 'Subscription Package',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputId: '',
            inputType: 'DropDown',
            titleInput: 'From',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
          {
            inputId: '',
            inputType: 'DropDown',
            titleInput: 'To',
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
        dataInput: [
          {
            inputId: '',
            inputType: 'TextInput',
            titleInput: 'Email Address(es)',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputId: '',
            inputType: 'NumberPad',
            titleInput: 'Threshold',
          },
        ],
      },
      {
        containerId: 'bulk-shared-notification-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Bulk Shared Notification',
        containerDescription: '',
        dataInput: [{}],
      },
      {
        containerId: 'bulk-shared-auto-upgrade-container-hard-code',
        containerType: 'WrapperTwo',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Bulk Shared Auto Upgrade',
        containerDescription: '',
        dataInput: [
          {
            inputType: 'AutomationLabel',
            titleInput: 'Subscription Package',
            config: {
              fullWidthInput: true,
            },
          },
          {
            inputId: '',
            inputType: 'DropDown',
            titleInput: 'From',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
          },
          {
            inputId: '',
            inputType: 'DropDown',
            titleInput: 'To',
            config: {
              fullWidthInput: true,
              labelLeft: true,
            },
            inputLoading: false,
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
        dataInput: [{}],
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
const initialState = {
  loading: false,
  errorText: '',
  automationDefaultFormData,
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

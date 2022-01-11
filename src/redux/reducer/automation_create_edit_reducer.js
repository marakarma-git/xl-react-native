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
        containerType: '',
        showContainer: true,
        containerTitle: 'Rules Name',
        containerDescription: '',
        dataInput: [
          {
            inputId: '',
            inputType: 'TextInput',
            titleInput: 'Rules Name',
          },
        ],
      },
      {
        containerId: 'select-rule-category-container',
        containerType: '',
        showContainer: true,
        containerTitle: 'Select Rule Category',
        containerDescription: '',
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
        containerType: '',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Auto Downgrade Package',
        containerDescription: '',
        dataInput: [
          {
            inputId: '',
            inputType: '',
            data: [],
            value: {},
            inputLoading: false,
          },
        ],
      },
      {
        containerId:
          'auto-upgrade-individual-shared-package-container-hard-code',
        containerType: '',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Auto Upgrade Individual Shared package',
        containerDescription: '',
        dataInput: [{}],
      },
      {
        containerId: 'bulk-shared-notification-container-hard-code',
        containerType: '',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Bulk Shared Notification',
        containerDescription: '',
        dataInput: [{}],
      },
      {
        containerId: 'bulk-shared-auto-upgrade-container-hard-code',
        containerType: '',
        showContainer: false,
        isSelected: false,
        containerTitle: 'Bulk Shared Auto Upgrade',
        containerDescription: '',
        dataInput: [{}],
      },
      {
        containerId: 'individual-shared-limit-container-hard-code',
        containerType: '',
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

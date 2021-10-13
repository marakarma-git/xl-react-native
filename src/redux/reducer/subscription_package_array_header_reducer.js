import reduxString from '../reduxString';
import Helper from '../../helpers/helper';
import generateLink from '../../helpers/generateLink';

const dataHeaderFilter = [
  {
    formId: 'subscription-dummy-edit-button',
    api_id: '',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellEditDelete',
    config: {
      label: 'Action',
      doNotShowOnFilter: true,
      width: 65,
      removeDelete: true, //this is just for tableCellEditDelete Only!
    },
    shown: true,
  },
  {
    formId: 'subscription-id-hard-code',
    api_id: 'packageId',
    value: '',
    typeInput: 'TextInput',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    params: '&packageId=',
    config: {
      label: 'ID',
      doNotShowOnFilter: true,
      // isTouchable: true,
      width: 160,
    },
    valueCheck: false,
    shown: true,
    sort_by_filter: 0,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'ID',
      disabled: true,
    },
  },
  {
    formId: 'subscription-description-hard-code',
    api_id: 'packageDescription',
    value: {},
    data: [],
    typeInput: 'DropDown',
    disabled: true,
    loading: false,
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&packageDescription=',
    config: {
      label: 'Description',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 3,
    on_edit_config: {
      type_input_edit: 'Description',
      edit_label: '',
      disabled: true,
    },
  },
  {
    formId: 'subscription-enterprise-hard-code',
    api_id: 'enterpriseName',
    value: {},
    data: [],
    typeInput: 'DropDown',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&enterpriseName=',
    config: {
      label: 'Enterprise',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 2,
    on_edit_config: {
      type_input_edit: 'Enterprise',
      edit_label: '',
      disabled: true,
    },
  },
  {
    formId: 'subscription-quota-internet-hard-code',
    api_id: 'quotaInternet',
    second_api_id: 'quotaInternetType',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Quota Internet',
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'DropDownType2',
      edit_label: 'Quota Internet',
      edit_text_type: 'Currency',
      noDefaultCurrency: true,
    },
  },
  {
    formId: 'subscription-quota-sms-hard-code',
    api_id: 'quotaSms',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Quota SMS',
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Quota SMS',
      edit_text_type: 'Currency',
      constantLabelRight: 'SMS',
    },
  },
  {
    formId: 'subscription-price-sim-card-hard-code',
    api_id: 'pricePerSim',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Price per SIM Card',
      isTouchable: true,
      width: 220,
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Price per SIM Card',
      edit_text_type: 'Currency',
      constantLabelLeft: 'IDR',
    },
  },
  {
    formId: 'subscription-price-bulk-shared-hard-code',
    api_id: 'priceBulkShared',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Price Bulk Shared',
      isTouchable: true,
      width: 220,
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Price Bulk Shared',
      edit_text_type: 'Currency',
      constantLabelLeft: 'IDR',
    },
  },
  {
    formId: 'subscription-package-type-hard-code',
    api_id: 'packageType',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Package Type',
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'DropDown',
      edit_label: 'Package Type',
      disabled: false,
    },
  },
  {
    formId: 'subscription-package-period-hard-code',
    api_id: 'packagePeriod',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Package Period',
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'DropDown',
      edit_label: 'Package Period',
    },
  },
  {
    formId: 'subscription-network-hard-code',
    api_id: 'network',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Network',
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'DropDown',
      edit_label: 'Network',
    },
  },
  {
    formId: 'subscription-price-plan-hard-code',
    api_id: 'pricePlan',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Price Plan',
      isTouchable: true,
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Price Plan',
    },
  },
  {
    formId: 'subscription-bearers-hard-code',
    api_id: 'bearers',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Bearers',
      isTouchable: true,
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Bearers',
      disabled: true,
    },
  },
  {
    formId: 'subscription-status-hard-code',
    api_id: 'packageStatus',
    value: {},
    data: [],
    typeInput: 'DropDown',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&packageStatus=',
    config: {
      label: 'Status',
      isTouchable: true,
    },
    shown: true,
    sort_by_filter: 4,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Status',
      disabled: true,
    },
  },
  {
    formId: 'subscription-trigger-management-hard-code',
    api_id: 'triggerPackage',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Trigger Management',
      isTouchable: true,
      width: 220,
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Trigger Management',
      disabled: true,
    },
  },
  {
    formId: 'subscription-contract-id-hard-code',
    api_id: 'serviceContractId',
    value: '',
    typeInput: 'TextInput',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    params: '&serviceContractId=',
    config: {
      label: 'Service Contract ID',
      isTouchable: true,
      width: 220,
    },
    shown: true,
    sort_by_filter: 1,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Service Contract ID',
      disabled: true,
    },
  },
  {
    formId: 'subscription-excess-fee-hard-code',
    api_id: 'excessFee',
    cellType: 'TableCellHeaderAscDesc',
    cellRowType: 'TableCellText',
    config: {
      label: 'Excess Fee (Cost per KB)',
      isTouchable: true,
      width: 260,
    },
    shown: true,
    on_edit_config: {
      type_input_edit: 'TextInput',
      edit_label: 'Excess Fee',
      edit_text_type: 'Currency',
      constantLabelLeft: 'IDR',
    },
  },
];
const initialState = {
  dataSubscriptionHeader: dataHeaderFilter,
  searchText: '',
  generatedParams: '',
  appliedFilterSubscription: [],
};
const subscription_package_array_header_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_TEXT_INPUT: {
      const getIndex =
        state.dataSubscriptionHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataSubscriptionHeader[getIndex].value = action.textInput;
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_DROP_DOWN: {
      const getIndex =
        state.dataSubscriptionHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataSubscriptionHeader[getIndex].value = action.dropDown;
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_CHANGE_CHECK_HEADER: {
      state.dataSubscriptionHeader[1].valueCheck = !state
        .dataSubscriptionHeader[1].valueCheck;
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_SUCCESS: {
      const getIndex =
        state.dataSubscriptionHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataSubscriptionHeader[getIndex].loading = false;
      state.dataSubscriptionHeader[getIndex].data = action.data;
      state.dataSubscriptionHeader[getIndex].value = {};
      state.dataSubscriptionHeader[getIndex].disabled = false;
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_FAILED: {
      const getIndex =
        state.dataSubscriptionHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataSubscriptionHeader[getIndex].loading = false;
      state.dataSubscriptionHeader[getIndex].errorText = action.errorText;
      state.dataSubscriptionHeader[getIndex].disabled = true;
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_LOADING: {
      const getIndex =
        state.dataSubscriptionHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataSubscriptionHeader[getIndex].loading = true;
      state.dataSubscriptionHeader[getIndex].errorText = '';
      state.dataSubscriptionHeader[getIndex].disabled = true;
      state.dataSubscriptionHeader[getIndex].data = [];
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_DYNAMIC_RESET: {
      const getIndex =
        state.dataSubscriptionHeader.findIndex(
          (f) => f.formId === action.formId,
        ) || 0;
      state.dataSubscriptionHeader[getIndex] = Helper.dynamicResetForm(
        state.dataSubscriptionHeader[getIndex],
      );
      return {
        ...state,
        dataSubscriptionHeader: state.dataSubscriptionHeader,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_RESET_ALL_VALUE: {
      const resetValue = Helper.resetAllForm(
        initialState.dataSubscriptionHeader,
      );
      return {
        ...state,
        dataSubscriptionHeader: resetValue,
        generatedParams: '',
        appliedFilterSubscription: [],
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataSubscriptionHeader: action.data,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_GENERATE_PARAMS: {
      const {linkParams, containerData} = generateLink(
        state.dataSubscriptionHeader,
      );
      return {
        ...state,
        generatedParams: linkParams || '',
        appliedFilterSubscription: containerData || [],
      };
    }
    case reduxString.SUBSCRIPTION_PACKAGE_RESET_PARAMS: {
      return {
        ...state,
        generatedParams: initialState.generatedParams,
        appliedFilterSubscription: initialState.appliedFilterSubscription,
      };
    }
    default: {
      return state;
    }
  }
};
export default subscription_package_array_header_reducer;

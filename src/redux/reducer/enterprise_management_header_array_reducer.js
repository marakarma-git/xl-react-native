import reduxString from '../reduxString';

const dataHeaderEnterprise = [
  {
    formId: 'name-hard-code',
    api_id: 'enterpriseName',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Name',
      doNotShowOnFilter: true,
      flexStart: true,
      showIcon: true,
      isTouchable: true,
      isTreeView: true,
    },
    shown: true,
  },
  {
    formId: 'status-hard-code',
    api_id: 'activeStatus',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Status',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
  {
    formId: 'customer-type-hard-code',
    api_id: 'customerType',
    cellType: 'TableCellHeader',
    cellRowType: 'TableCellText',
    config: {
      label: 'Customer Type',
      doNotShowOnFilter: true,
    },
    shown: true,
  },
];
const initialState = {
  dataHeaderEnterprise: dataHeaderEnterprise,
};
const enterprise_management_header_array_reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case reduxString.BANNER_MANAGEMENT_UPDATE_BUNDLE_ARRAY: {
      return {
        ...state,
        dataBannerHeader: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
export default enterprise_management_header_array_reducer;

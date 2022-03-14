const initialState = {
  menu: {
    dashboard: {
      view: false,
    },
    subscription: {
      searchFilter: false,
      pauseSIM: false,
      bulkUpdateLabel: false,
      deactivateSIM: false,
      terminateSIM: false,
      viewSIMInventory: false,
      activateSIM: false,
      seeSIMLocation: false,
    },
    userAdministration: {
      edit: false,
      create: false,
      filter: false,
      delete: false,
      lock: false,
      unlock: false,
      view: false,
    },
    roleAdministration: {
      edit: false,
      create: false,
      filter: false,
      delete: false,
      copy: false,
      view: false,
    },
    enterpriseManagement: {
      edit: false,
      create: false,
      filter: false,
      view: false,
    },
    subscriptionPackage: {
      filter: false,
      edit: false,
      view: false,
    },
    smsA2pConfiguration: {
      create: false,
      edit: false,
      delete: false,
      search: false,
      filter: false,
      view: false,
    },
    automation: {
      create: false,
      edit: false,
      delete: false,
      filter: false,
      view: false,
    },
    diagnosticWizard: {
      filter: false,
      fixStatus: false,
    },
    simProductivity: {
      filter: false,
    },
    usageAnalytics: {
      filter: false,
    },
    usageSubscribersAnalytics: {
      filter: false,
    },
    geoDistribution: {
      filter: false,
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU_USER_PERMISSION':
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};

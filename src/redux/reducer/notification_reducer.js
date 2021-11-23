const initialState = {
  token: null,
  showNotificationLimit: 10,
  limitedListNotification: [],
  listNotification: [],
  severityLevel: {
    high: 0,
    medium: 0,
    low: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        listNotification: action.payload,
      };
    case 'COUNT_SEVERITY_LEVEL':
      return {
        ...state,
        severityLevel: action.payload,
      };
    case 'INCREASE_NOTIFICATION_LIMIT':
      return {
        ...state,
        showNotificationLimit: state.showNotificationLimit + action.payload,
      };
    case 'RESET_NOTIFICATION_LIMIT':
      return {
        ...state,
        showNotificationLimit: 10,
      };
    case 'SET_LIMITED_NOTIFICATION':
      return {
        ...state,
        limitedListNotification: action.payload,
      };
    default:
      return state;
  }
};

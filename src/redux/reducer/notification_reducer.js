const initialState = {
  token: null,
  bellCountNotification: 0,
  showNotificationLimit: 10,
  limitedListNotification: [],
  limitedHighNotification: [],
  limitedMediumNotification: [],
  limitedLowNotification: [],
  listNotification: [],
  highNotification: [],
  mediumNotification: [],
  lowNotification: [],
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
        listNotification: action.payload.listAll,
        highNotification: action.payload.listHigh,
        mediumNotification: action.payload.listMedium,
        lowNotification: action.payload.listLow,
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
        limitedListNotification: action.payload.listAll,
        limitedHighNotification: action.payload.listHigh,
        limitedMediumNotification: action.payload.listMedium,
        limitedLowNotification: action.payload.listLow,
      };
    case 'COUNT_BELL_NOTIFICATION':
      return {
        ...state,
        bellCountNotification:
          state.bellCountNotification > 0
            ? state.bellCountNotification - action.payload
            : 0,
      };
    case 'SET_BELL_NOTIFICATION':
      console.log(action.payload, ' BELL');
      return {
        ...state,
        bellCountNotification: action.payload,
      };
    default:
      return state;
  }
};

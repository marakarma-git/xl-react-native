const initialState = {
  token: null,
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
    default:
      return state;
  }
};

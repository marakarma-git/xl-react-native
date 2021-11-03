const initialState = {
  token: null,
  listNotification: [],
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
        listNotification: [...state.listNotification, action.payload],
      };
    default:
      return state;
  }
};

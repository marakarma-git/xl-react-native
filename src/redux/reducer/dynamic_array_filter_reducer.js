import reduxString from '../reduxString';
const initialState = {
  default_array: [],
  dynamic_array: [],
};
const dynamic_array_filter_reducer = (state = initialState, action) => {
  switch (action.type) {
    case reduxString.ON_CHANGE_FILTER || reduxString.ADD_DATA_FILTER:
      return {
        ...state,
        default_array: action.updatedArray,
      };
    case reduxString.RESET_DATA_FILTER:
      return state;
    default:
      return state;
  }
};
export default dynamic_array_filter_reducer;

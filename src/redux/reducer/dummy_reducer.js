const dummy_reducer = (state = false, action) => {
  switch (action.type) {
    case 'DUMMY_REDUCER_ON':
      return true;
    case 'DUMMY_REDUCER_OFF':
      return false;
    default:
      return state;
  }
};
export default dummy_reducer;

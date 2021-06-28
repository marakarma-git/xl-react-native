import reduxString from '../reduxString';

const initialState = {
    listPermission: [],
    errorText: "",
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case reduxString.GET_LIST_PERMISSION:
          return {...state, listPermission: action.payload, loading: false}
        case reduxString.REQUEST_LIST_PERMISSION:
          return {...state, loading: true}
        case reduxString.SET_ERROR_PERMISSION:
          return {...state, errorText: action.payload, loading: false}
        default:
            return state;
    }
}

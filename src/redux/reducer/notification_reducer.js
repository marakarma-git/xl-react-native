const initialState = {
    pushNotification: []
};

export default (state = initialState, action) => {
    console.log(action, " <<< action")
    switch (action.type) {
        case "ADD_NOTIFICATION":
            return {...state, pushNotification: [...state.pushNotification, action.payload]};
        case "READ_NOTIFICATION":
            return {...state, pushNotification: action.payload}
        default:
            return state;
    }
}
const initialState = {
  saveError: "",
  saveSuccess: ""
};

export default (state = initialState, action) => {
 switch (action.type) {
   case "SAVE_ACTIVITY_ERROR":
     return{
       ...state,
       saveError: action.payload
     }
   case "SAVE_ACTIVITY_SUCCESS":
     return{
       ...state,
       saveSuccess: action.payload
     }
 
   default:
     return state;
 } 
}
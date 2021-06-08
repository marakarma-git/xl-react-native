import {tokenInvalid} from '../action/auth_action';
import {ToastAndroid} from 'react-native';

const validateTokenMiddleware = (store) => (next) => (action) => {

  try {
    if (action.payload) {
      if (action.payload.error) {
        console.log(action.payload.error, "error");
        if (action.payload.error === 'invalid_token') {
          ToastAndroid.show('Your session has expired or login in from another device', ToastAndroid.LONG);
          store.dispatch(tokenInvalid());
          throw new Error('Token Expired');
        }else if(action.payload.error === 'unauthorized'){
          ToastAndroid.show('Token Invalid', ToastAndroid.LONG);
          store.dispatch(tokenInvalid());
          throw new Error('Token Invalid');
        }
      }
    }
    next(action);
  } catch (error) {
    next({type: ''});
  }
};

export default validateTokenMiddleware;

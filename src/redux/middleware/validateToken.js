import {authLogout} from '../action/auth_action';
import {ToastAndroid} from 'react-native';

const validateTokenMiddleware = (store) => (next) => (action) => {

  try {
    console.log(action.payload)
    if (action.payload) {
      if (action.payload.error) {
        if (action.payload.error === 'invalid_token') {
          ToastAndroid.show('Token Expired', ToastAndroid.LONG);
          store.dispatch(authLogout());
          throw new Error('Token Expired');
        }else if(action.payload.error === 'unauthorized'){
          ToastAndroid.show('Token Invalid', ToastAndroid.LONG);
          store.dispatch(authLogout());
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

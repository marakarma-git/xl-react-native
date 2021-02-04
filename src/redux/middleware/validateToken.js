import {authLogout} from '../action/auth_action';
import {removeEnterPriseLogo} from '../action/enterprise_action';
import {ToastAndroid} from 'react-native';

const validateTokenMiddleware = (store) => (next) => (action) => {
  
  try {
    if (action.payload) {
      if (action.payload.error) {
        if (action.payload.error === 'invalid_token') {
          ToastAndroid.show('Token Expired', ToastAndroid.LONG);
          store.dispatch(authLogout());
          throw new Error('Token Expired');
        }
      }
    }
    next(action);
  } catch (error) {
    next({type: ''});
  }
};

export default validateTokenMiddleware;

import {setSessionExpired, tokenInvalid} from '../action/auth_action';

const validateTokenMiddleware = (store) => (next) => (action) => {

  try {
    if (action.payload) {
      if (action.payload.error) {
        if (action.payload.error === 'invalid_token') {
          store.dispatch(tokenInvalid());
          store.dispatch(setSessionExpired());
          throw new Error('Token Expired');
        }else if(action.payload.error === 'unauthorized'){
          store.dispatch(tokenInvalid());
          store.dispatch(setSessionExpired());
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

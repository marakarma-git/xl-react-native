import {combineReducers} from 'redux';
import dummy_reducer from './dummy_reducer';
import auth_reducer from './auth_reducer';
const RootReducers = combineReducers({
  dummy_reducer: dummy_reducer,
  auth_reducer: auth_reducer,
});
export default RootReducers;

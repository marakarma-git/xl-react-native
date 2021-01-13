import {combineReducers} from 'redux';
import dummy_reducer from './dummy_reducer';
import auth_reducer from './auth_reducer';
import enterprise_reducer from './enterprise_reducer';
import dashboard_reducer from './dashboard_reducer';
import sim_reducer from './sim_reducer';
const RootReducers = combineReducers({
  dummy_reducer,
  auth_reducer,
  enterprise_reducer,
  dashboard_reducer,
  sim_reducer,
});
export default RootReducers;

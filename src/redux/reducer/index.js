import {combineReducers} from 'redux';
import dummy_reducer from './dummy_reducer';
import auth_reducer from './auth_reducer';
import enterprise_reducer from './enterprise_reducer';
import dashboard_reducer from './dashboard_reducer';
import sim_reducer from './sim_reducer';
import dynamic_array_filter_reducer from './dynamic_array_filter_reducer';
import query_params_filter_reducer from './query_params_filter_reducer';
import get_enterprise_corp_reducer from './get_enterprise_corp_reducer';
import get_enterprise_package_name_reducer from './get_enterprise_package_name_reducer';
import get_state_reducer from './get_state_reducer';
import get_state_lock_reducer from './get_state_lock_reducer';
import get_custom_label_reducer from './get_custom_label_reducer';
const RootReducers = combineReducers({
  dummy_reducer,
  auth_reducer,
  enterprise_reducer,
  dashboard_reducer,
  sim_reducer,
  dynamic_array_filter_reducer,
  query_params_filter_reducer,
  get_enterprise_corp_reducer,
  get_enterprise_package_name_reducer,
  get_state_reducer,
  get_state_lock_reducer,
  get_custom_label_reducer,
});
export default RootReducers;

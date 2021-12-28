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
import get_sim_inventory_reducer from './get_sim_inventory_reducer';
import user_administration_array_header_reducer from './user_administration_array_header_reducer';
import user_administration_get_user_reducer from './user_administration_get_user_reducer';
import role_administration_array_header_reducer from './role_administration_array_header_reducer';
import role_administration_get_all_role_reducer from './role_administration_get_all_role_reducer';
import subscription_package_array_header_reducer from './subscription_package_array_header_reducer';
import subscription_package_get_subscription_reducer from './subscription_package_get_subcription_reducer';
import banner_management_array_header_reducer from './banner_management_array_header_reducer';
import banner_management_get_banner_reducer from './banner_management_get_banner_reducer';
import enterprise_management_header_array_reducer from './enterprise_management_header_array_reducer';
import enterprise_management_get_enterprise_reducer from './enterprise_management_get_enterprise_reducer';
import automation_array_header_reducer from './automation_array_header_reducer';
import automation_get_automation_reducer from './automation_get_automation_reducer';
import notification_reducer from './notification_reducer';
import roles_reducer from './roles_reducer';
import sms_a2p_array_header_reducer from './sms_a2p_array_header_reducer';
import sms_a2p_get_all_sms_reducer from './sms_a2p_get_all_sms_reducer';
import automation_create_edit_reducer from './automation_create_edit_reducer';
import automation_get_enterprise_reducer from './automation_get_enterprise_reducer';
import permission_reducer from './permission_reducer';
import sim_productivity_filter_reducer from './sim_productivity_filter_reducer';
import geo_distribution_filter_reducer from './geo_distribution_filter_reducer';
import usage_analytics_filter_reducer from './usage_analytics_filter_reducer';
import usage_subscribers_analytics_filter_reducer from './usage_subscribers_analytics_filter_reducer';
import subscription_package_edit_reducer from './subscription_package_edit_reducer';
import sms_a2p_edit_reducer from './sms_a2p_edit_reducer';
import realtime_diagnostic_reducer from './realtime_diagnostic_reducer';

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
  get_sim_inventory_reducer,
  user_administration_array_header_reducer,
  user_administration_get_user_reducer,
  role_administration_array_header_reducer,
  role_administration_get_all_role_reducer,
  subscription_package_array_header_reducer,
  subscription_package_get_subscription_reducer,
  banner_management_array_header_reducer,
  banner_management_get_banner_reducer,
  notification_reducer,
  enterprise_management_header_array_reducer,
  enterprise_management_get_enterprise_reducer,
  automation_array_header_reducer,
  automation_get_automation_reducer,
  roles_reducer,
  sms_a2p_array_header_reducer,
  sms_a2p_get_all_sms_reducer,
  automation_create_edit_reducer,
  automation_get_enterprise_reducer,
  permission_reducer,
  sim_productivity_filter_reducer,
  geo_distribution_filter_reducer,
  usage_analytics_filter_reducer,
  usage_subscribers_analytics_filter_reducer,
  subscription_package_edit_reducer,
  sms_a2p_edit_reducer,
  realtime_diagnostic_reducer,
});
export default RootReducers;

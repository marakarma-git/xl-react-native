const reduxString = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_FAILED: 'AUTH_FAILED',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_SIGNIN: 'AUTH_SIGNIN',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  SET_FALSE_AFTER_LOGIN: 'SET_FALSE_AFTER_LOGIN',
  UPDATE_CUSTOMER_CONSENT: 'UPDATE_CUSTOMER_CONSENT',
  UPDATE_CUSTOMER_CONSENT_FAIL: 'UPDATE_CUSTOMER_CONSENT_FAIL',
  HOME_LOGIN: "HOME_LOGIN",

  GET_TITLE_VERSION: 'GET_TITLE_VERSION',
  GET_TITLE_VERSION_FAILED: 'GET_TITLE_VERSION_FAILED',
  GET_ENTERPRISE_LOGO: 'GET_ENTERPRISE_LOGO',
  GET_ENTERPRISE_LOGO_FAILED: 'GET_ENTERPRISE_FAILED',
  GET_ENTERPRISE_LOGO_SUCCESS: 'GET_ENTERPRISE_SUCCESS',
  REMOVE_ENTERPRISE_LOGO: 'REMOVE_ENTERPRISE_LOGO',

  REQUEST_DASHBOARD_DATA: 'REQUEST_DASHBOARD_DATA',
  SET_DASHBOARD_SUMMARY: 'SET_DASHBOARD_SUMMARY',
  REQUEST_ERROR: 'REQUEST_ERROR',
  SET_WIDGET_LIST: 'SET_WIDGET_LIST',
  SET_CAROUSEL: 'SET_CAROUSEL',
  SET_SIM_STATISTICS: 'SET_SIM_STATISTICS',
  SET_TOP_TRAFFIC_STATISTICS: 'SET_TOP_TRAFFIC_STATISTICS',
  REQUEST_WIDGET_DATA: 'REQUEST_WIDGET_DATA',

  UPDATE_DATA_SEARCH_TEXT: 'UPDATE_DATA_SEARCH_TEXT',
  RESET_DATA_SEARCH_TEXT: 'RESET_DATA_SEARCH_TEXT',
  UPDATE_GENERATED_PARAMS: 'UPDATE_GENERATED_PARAMS',
  RESET_GENERATED_PARAMS: 'RESET_GENERATED_PARAMS',
  UPDATE_DATA_FILTER: 'UPDATE_DATA_FILTER',
  RESET_DATA_FILTER: 'RESET_DATA_FILTER',
  SET_LOADING_FILTER_TRUE: 'SET_LOADING_FILTER_TRUE',
  SET_LOADING_FILTER_FALSE: 'SET_LOADING_FILTER_FALSE',
  SET_ERROR_FILTER: 'SET_ERROR_FILTER',
  REMOVE_ALL_HARD_CODE_TRUE: 'REMOVE_ALL_HARD_CODE_TRUE',
  MERGE_DATA_FILTER: 'MERGE_DATA_FILTER',
  MERGE_SPECIFIC_DATA_FILTER_INDEX: 'MERGE_SPECIFIC_DATA_FILTER_INDEX',
  UPDATE_SORT_BY: 'UPDATE_SORT_BY',
  RESET_SORT_BY: 'RESET_SORT_BY',

  GENERATE_QUERY_PARAMS_FILTER_RUN: 'GENERATE_QUERY_PARAMS_FILTER_RUN',
  GENERATE_QUERY_PARAMS_FILTER: 'GENERATE_QUERY_PARAMS_FILTER',
  RESET_QUERY_PARAMS_FILTER: 'RESET_QUERY_PARAMS_FILTER',

  GET_ENTERPRISE_CORP_LOADING: 'GET_ENTERPRISE_CORP_LOADING',
  GET_ENTERPRISE_CORP_FAILED: 'GET_ENTERPRISE_CORP_FAILED',
  GET_ENTERPRISE_CORP_SUCCESS: 'GET_ENTERPRISE_SUCCESS',
  GET_ENTERPRISE_CORP_RESET: 'GET_ENTERPRISE_CORP_RESET',

  GET_ENTERPRISE_PACKAGE_NAME_LOADING: 'GET_ENTERPRISE_PACKAGE_NAME_LOADING',
  GET_ENTERPRISE_PACKAGE_NAME_FAILED: 'GET_ENTERPRISE_PACKAGE_NAME_FAILED',
  GET_ENTERPRISE_PACKAGE_NAME_SUCCESS: 'GET_ENTERPRISE_PACKAGE_NAME_SUCCESS',
  GET_ENTERPRISE_PACKAGE_NAME_RESET: 'GET_ENTERPRISE_PACKAGE_NAME_RESET',

  GET_STATE_LOADING: 'GET_STATE_LOADING',
  GET_STATE_FAILED: 'GET_STATE_FAILED',
  GET_STATE_SUCCESS: 'GET_STATE_SUCCESS',
  GET_STATE_RESET: 'GET_STATE_RESET',

  GET_STATE_LOCK_LOADING: 'GET_STATE_LOCK_LOADING',
  GET_STATE_LOCK_FAILED: 'GET_STATE_LOCK_FAILED',
  GET_STATE_LOCK_SUCCESS: 'GET_STATE_LOCK_SUCCESS',
  GET_STATE_LOCK_RESET: 'GET_STATE_LOCK_RESET',

  GET_CUSTOM_LABEL_LOADING: 'GET_CUSTOM_LABEL_LOADING',

  GET_SIM_INVENTORY_LOADING: 'GET_SIM_INVENTORY_LOADING',
  GET_SIM_INVENTORY_LOADING_FALSE: 'GET_SIM_INVENTORY_LOADING_FALSE',
  GET_SIM_INVENTORY_FAILED: 'GET_SIM_INVENTORY_FAILED',
  GET_SIM_INVENTORY_SUCCESS: 'GET_SIM_INVENTORY_SUCCESS',
  GET_SIM_INVENTORY_RESET: 'GET_SIM_INVENTORY_RESET',
  GET_SIM_INVENTORY_REMOVE_ERROR: 'GET_SIM_INVENTORY_REMOVE_ERROR',
  SET_SIM_INVENTORY_TABLE: 'SET_SIM_INVENTORY_TABLE',
  RESET_SIM_INVENTORY_TABLE: 'RESET_SIM_INVENTORY_TABLE',
  CHANGE_CHECK_SIM_INVENTORY: 'CHANGE_CHECK_SIM_INVENTORY',
  CHANGE_CHECK_SIM_INVENTORY_ALL_TRUE: 'CHANGE_CHECK_SIM_INVENTORY_ALL_TRUE',
  CHANGE_CHECK_SIM_INVENTORY_ALL_FALSE: 'CHANGE_CHECK_SIM_INVENTORY_ALL_FALSE',

  USER_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT:
    'USER_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT',
  USER_ADMINISTRATION_CHANGE_CHECK_HEADER:
    'USER_ADMINISTRATION_CHANGE_CHECK_HEADER',
  USER_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN:
    'USER_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN',
  USER_ADMINISTRATION_DYNAMIC_SUCCESS: 'USER_ADMINISTRATION_DYNAMIC_SUCCESS',
  USER_ADMINISTRATION_DYNAMIC_FAILED: 'USER_ADMINISTRATION_DYNAMIC_FAILED',
  USER_ADMINISTRATION_DYNAMIC_LOADING: 'USER_ADMINISTRATION_DYNAMIC_LOADING',
  USER_ADMINISTRATION_DYNAMIC_RESET: 'USER_ADMINISTRATION_DYNAMIC_RESET',
  USER_ADMINISTRATION_RESET_ALL_VALUE: 'USER_ADMINISTRATION_RESET_ALL_VALUE',
  USER_ADMINISTRATION_UPDATE_BUNDLE_ARRAY:
    'USER_ADMINISTRATION_UPDATE_BUNDLE_ARRAY',
  USER_ADMINISTRATION_SET_SEARCH_TEXT: 'USER_ADMINISTRATION_SET_SEARCH_TEXT',
  USER_ADMINISTRATION_RESET_SEARCH_TEXT:
    'USER_ADMINISTRATION_RESET_SEARCH_TEXT',
  USER_ADMINISTRATION_GENERATE_PARAMS: 'USER_ADMINISTRATION_SET_PARAMS',
  USER_ADMINISTRATION_RESET_PARAMS: 'USER_ADMINISTRATION_RESET_PARAMS',
  USER_ADMINISTRATION_GET_USER_LOADING: 'USER_ADMINISTRATION_GET_USER_LOADING',
  USER_ADMINISTRATION_GET_USER_SUCCESS: 'USER_ADMINISTRATION_GET_USER_SUCCESS',
  USER_ADMINISTRATION_GET_USER_FAILED: 'USER_ADMINISTRATION_GET_USER_FAILED',
  USER_ADMINISTRATION_GET_USER_RESET: 'USER_ADMINISTRATION_GET_USER_RESET',
  USER_ADMINISTRATION_SET_DATA_USER_GENERATED:
    'USER_ADMINISTRATION_SET_DATA_USER_GENERATED',
  USER_ADMINISTRATION_RESET_DATA_USER_GENERATED:
    'USER_ADMINISTRATION_RESET_DATA_USER_GENERATED',
  USER_ADMINISTRATION_DYNAMIC_CHECK_DATA_USER:
    'USER_ADMINISTRATION_DYNAMIC_CHECK_DATA_USER',
  USER_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_USER:
    'USER_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_USER',
  USER_ADMINISTRATION_CHECK_ALL_DATA_USER:
    'USER_ADMINISTRATION_CHECK_ALL_DATA_USER',
  USER_ADMINISTRATION_UNCHECK_ALL_DATA_USER:
    'USER_ADMINISTRATION_UNCHECK_ALL_DATA_USER',
  USER_ADMINISTRATION_SET_APPLIED_HEADER_SORT:
    'USER_ADMINISTRATION_SET_APPLIED_HEADER_SORT',
  USER_ADMINISTRATION_RESET_APPLIED_HEADER_SORT:
    'USER_ADMINISTRATION_RESET_APPLIED_HEADER_SORT',

  ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT:
    'ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_TEXT_INPUT',
  ROLE_ADMINISTRATION_CHANGE_CHECK_HEADER:
    'ROLE_ADMINISTRATION_CHANGE_CHECK_HEADER',
  ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN:
    'ROLE_ADMINISTRATION_DYNAMIC_ONCHANGE_DROP_DOWN',
  ROLE_ADMINISTRATION_DYNAMIC_SUCCESS: 'ROLE_ADMINISTRATION_DYNAMIC_SUCCESS',
  ROLE_ADMINISTRATION_DYNAMIC_FAILED: 'ROLE_ADMINISTRATION_DYNAMIC_FAILED',
  ROLE_ADMINISTRATION_DYNAMIC_LOADING: 'ROLE_ADMINISTRATION_DYNAMIC_LOADING',
  ROLE_ADMINISTRATION_DYNAMIC_RESET: 'ROLE_ADMINISTRATION_DYNAMIC_RESET',
  ROLE_ADMINISTRATION_RESET_ALL_VALUE: 'ROLE_ADMINISTRATION_RESET_ALL_VALUE',
  ROLE_ADMINISTRATION_UPDATE_BUNDLE_ARRAY:
    'ROLE_ADMINISTRATION_UPDATE_BUNDLE_ARRAY',
  ROLE_ADMINISTRATION_SET_SEARCH_TEXT: 'ROLE_ADMINISTRATION_SET_SEARCH_TEXT',
  ROLE_ADMINISTRATION_RESET_SEARCH_TEXT:
    'ROLE_ADMINISTRATION_RESET_SEARCH_TEXT',
  ROLE_ADMINISTRATION_GENERATE_PARAMS: 'ROLE_ADMINISTRATION_SET_PARAMS',
  ROLE_ADMINISTRATION_RESET_PARAMS: 'ROLE_ADMINISTRATION_RESET_PARAMS',
  ROLE_ADMINISTRATION_GET_ROLE_LOADING: 'ROLE_ADMINISTRATION_GET_ROLE_LOADING',
  ROLE_ADMINISTRATION_GET_ROLE_SUCCESS: 'ROLE_ADMINISTRATION_GET_ROLE_SUCCESS',
  ROLE_ADMINISTRATION_GET_ROLE_FAILED: 'ROLE_ADMINISTRATION_GET_ROLE_FAILED',
  ROLE_ADMINISTRATION_GET_ROLE_RESET: 'ROLE_ADMINISTRATION_GET_ROLE_RESET',
  ROLE_ADMINISTRATION_SET_DATA_ROLE_GENERATED:
    'ROLE_ADMINISTRATION_SET_DATA_ROLE_GENERATED',
  ROLE_ADMINISTRATION_RESET_DATA_ROLE_GENERATED:
    'ROLE_ADMINISTRATION_RESET_DATA_ROLE_GENERATED',
  ROLE_ADMINISTRATION_DYNAMIC_CHECK_DATA_ROLE:
    'ROLE_ADMINISTRATION_DYNAMIC_CHECK_DATA_ROLE',
  ROLE_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_ROLE:
    'ROLE_ADMINISTRATION_DYNAMIC_UNCHECK_DATA_ROLE',
  ROLE_ADMINISTRATION_CHECK_ALL_DATA_ROLE:
    'ROLE_ADMINISTRATION_CHECK_ALL_DATA_ROLE',
  ROLE_ADMINISTRATION_UNCHECK_ALL_DATA_ROLE:
    'ROLE_ADMINISTRATION_UNCHECK_ALL_DATA_ROLE',
  ROLE_ADMINISTRATION_SET_APPLIED_HEADER_SORT:
    'ROLE_ADMINISTRATION_SET_APPLIED_HEADER_SORT',
  ROLE_ADMINISTRATION_RESET_APPLIED_HEADER_SORT:
    'ROLE_ADMINISTRATION_RESET_APPLIED_HEADER_SORT',

  SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_TEXT_INPUT:
    'SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_TEXT_INPUT',
  SUBSCRIPTION_PACKAGE_CHANGE_CHECK_HEADER:
    'SUBSCRIPTION_PACKAGE_CHANGE_CHECK_HEADER',
  SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_DROP_DOWN:
    'SUBSCRIPTION_PACKAGE_DYNAMIC_ONCHANGE_DROP_DOWN',
  SUBSCRIPTION_PACKAGE_DYNAMIC_SUCCESS: 'SUBSCRIPTION_PACKAGE_DYNAMIC_SUCCESS',
  SUBSCRIPTION_PACKAGE_DYNAMIC_FAILED: 'SUBSCRIPTION_PACKAGE_DYNAMIC_FAILED',
  SUBSCRIPTION_PACKAGE_DYNAMIC_LOADING: 'SUBSCRIPTION_PACKAGE_DYNAMIC_LOADING',
  SUBSCRIPTION_PACKAGE_DYNAMIC_RESET: 'SUBSCRIPTION_PACKAGE_DYNAMIC_RESET',
  SUBSCRIPTION_PACKAGE_RESET_ALL_VALUE: 'SUBSCRIPTION_PACKAGE_RESET_ALL_VALUE',
  SUBSCRIPTION_PACKAGE_UPDATE_BUNDLE_ARRAY:
    'SUBSCRIPTION_PACKAGE_UPDATE_BUNDLE_ARRAY',
  SUBSCRIPTION_PACKAGE_SET_SEARCH_TEXT: 'SUBSCRIPTION_PACKAGE_SET_SEARCH_TEXT',
  SUBSCRIPTION_PACKAGE_RESET_SEARCH_TEXT:
    'SUBSCRIPTION_PACKAGE_RESET_SEARCH_TEXT',
  SUBSCRIPTION_PACKAGE_GENERATE_PARAMS: 'SUBSCRIPTION_PACKAGE_SET_PARAMS',
  SUBSCRIPTION_PACKAGE_RESET_PARAMS: 'SUBSCRIPTION_PACKAGE_RESET_PARAMS',
  SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_LOADING:
    'SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_LOADING',
  SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_SUCCESS:
    'SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_SUCCESS',
  SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_FAILED:
    'SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_FAILED',
  SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_RESET:
    'SUBSCRIPTION_PACKAGE_GET_SUBSCRIPTION_RESET',
  SUBSCRIPTION_PACKAGE_SET_DATA_SUBSCRIPTION_GENERATED:
    'SUBSCRIPTION_PACKAGE_SET_DATA_SUBSCRIPTION_GENERATED',
  SUBSCRIPTION_PACKAGE_RESET_DATA_SUBSCRIPTION_GENERATED:
    'SUBSCRIPTION_PACKAGE_RESET_DATA_SUBSCRIPTION_GENERATED',
  SUBSCRIPTION_PACKAGE_DYNAMIC_CHECK_DATA_SUBSCRIPTION:
    'SUBSCRIPTION_PACKAGE_DYNAMIC_CHECK_DATA_SUBSCRIPTION',
  SUBSCRIPTION_PACKAGE_DYNAMIC_UNCHECK_DATA_SUBSCRIPTION:
    'SUBSCRIPTION_PACKAGE_DYNAMIC_UNCHECK_DATA_SUBSCRIPTION',
  SUBSCRIPTION_PACKAGE_CHECK_ALL_DATA_SUBSCRIPTION:
    'SUBSCRIPTION_PACKAGE_CHECK_ALL_DATA_SUBSCRIPTION',
  SUBSCRIPTION_PACKAGE_UNCHECK_ALL_DATA_SUBSCRIPTION:
    'SUBSCRIPTION_PACKAGE_UNCHECK_ALL_DATA_SUBSCRIPTION',
  SUBSCRIPTION_PACKAGE_SET_APPLIED_HEADER_SORT:
    'SUBSCRIPTION_PACKAGE_SET_APPLIED_HEADER_SORT',
  SUBSCRIPTION_PACKAGE_RESET_APPLIED_HEADER_SORT:
    'SUBSCRIPTION_PACKAGE_RESET_APPLIED_HEADER_SORT',

  BANNER_MANAGEMENT_UPDATE_BUNDLE_ARRAY:
    'BANNER_MANAGEMENT_UPDATE_BUNDLE_ARRAY',
  BANNER_MANAGEMENT_GET_BANNER_LOADING: 'BANNER_MANAGEMENT_GET_BANNER_LOADING',
  BANNER_MANAGEMENT_GET_BANNER_SUCCESS: 'BANNER_MANAGEMENT_GET_BANNER_SUCCESS',
  BANNER_MANAGEMENT_GET_BANNER_FAILED: 'BANNER_MANAGEMENT_GET_BANNER_FAILED',
  BANNER_MANAGEMENT_SET_DATA_BANNER_GENERATED:
    'BANNER_MANAGEMENT_SET_DATA_BANNER_GENERATED',

  ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_TEXT_INPUT:
    'ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_TEXT_INPUT',
  ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_DROP_DOWN:
    'ENTERPRISE_MANAGEMENT_DYNAMIC_ONCHANGE_DROP_DOWN',
  ENTERPRISE_MANAGEMENT_CHANGE_CHECK_HEADER:
    'ENTERPRISE_MANAGEMENT_CHANGE_CHECK_HEADER',
  ENTERPRISE_MANAGEMENT_DYNAMIC_SUCCESS:
    'ENTERPRISE_MANAGEMENT_DYNAMIC_SUCCESS',
  ENTERPRISE_MANAGEMENT_DYNAMIC_FAILED: 'ENTERPRISE_MANAGEMENT_DYNAMIC_FAILED',
  ENTERPRISE_MANAGEMENT_DYNAMIC_LOADING:
    'ENTERPRISE_MANAGEMENT_DYNAMIC_LOADING',
  ENTERPRISE_MANAGEMENT_DYNAMIC_RESET: 'ENTERPRISE_MANAGEMENT_DYNAMIC_RESET',
  ENTERPRISE_MANAGEMENT_RESET_ALL_VALUE:
    'ENTERPRISE_MANAGEMENT_RESET_ALL_VALUE',
  ENTERPRISE_MANAGEMENT_UPDATE_BUNDLE_ARRAY:
    'ENTERPRISE_MANAGEMENT_UPDATE_BUNDLE_ARRAY',
  ENTERPRISE_MANAGEMENT_SET_SEARCH_TEXT:
    'ENTERPRISE_MANAGEMENT_SET_SEARCH_TEXT',
  ENTERPRISE_MANAGEMENT_RESET_SEARCH_TEXT:
    'ENTERPRISE_MANAGEMENT_RESET_SEARCH_TEXT',
  ENTERPRISE_MANAGEMENT_GENERATE_PARAMS:
    'ENTERPRISE_MANAGEMENT_GENERATE_PARAMS',
  ENTERPRISE_MANAGEMENT_RESET_PARAMS: 'ENTERPRISE_MANAGEMENT_RESET_PARAMS',
  ENTERPRISE_MANAGEMENT_REQUEST_DATA: 'ENTERPRISE_MANAGEMENT_REQUEST_DATA',
  ENTERPRISE_MANAGEMENT_REQUEST_DATA_END: 'ENTERPRISE_MANAGEMENT_REQUEST_DATA_END',
  ENTERPRISE_UPDATE_DATA: 'ENTERPRISE_UPDATE_DATA',
  ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS:
    'ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS',
  ACTIVE_ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS:
    'ACTIVE_ENTERPRISE_MANAGEMENT_GET_DATA_SUCCESS',
  ENTERPRISE_MANAGEMENT_GET_DATA_FAIL: 'ENTERPRISE_MANAGEMENT_GET_DATA_FAIL',
  ENTERPRISE_MANAGEMENT_SET_APPLIED_HEADER_SORT:
    'ENTERPRISE_MANAGEMENT_SET_APPLIED_HEADER_SORT',
  ENTERPRISE_MANAGEMENT_RESET_APPLIED_HEADER_SORT:
    'ENTERPRISE_MANAGEMENT_RESET_APPLIED_HEADER_SORT',
  ENTERPRISE_MANAGEMENT_SET_DATA_GENERATED:
    'ENTERPRISE_MANAGEMENT_SET_DATA_GENERATED',

  AUTOMATION_CHANGE_CHECK_HEADER: 'AUTOMATION_CHANGE_CHECK_HEADER',
  AUTOMATION_DYNAMIC_ONCHANGE_DROP_DOWN:
    'AUTOMATION_DYNAMIC_ONCHANGE_DROP_DOWN',
  AUTOMATION_DYNAMIC_SUCCESS: 'AUTOMATION_DYNAMIC_SUCCESS',
  AUTOMATION_DYNAMIC_FAILED: 'AUTOMATION_DYNAMIC_FAILED',
  AUTOMATION_DYNAMIC_LOADING: 'AUTOMATION_DYNAMIC_LOADING',
  AUTOMATION_DYNAMIC_RESET: 'AUTOMATION_DYNAMIC_RESET',
  AUTOMATION_RESET_ALL_VALUE: 'AUTOMATION_RESET_ALL_VALUE',
  AUTOMATION_UPDATE_BUNDLE_ARRAY: 'AUTOMATION_UPDATE_BUNDLE_ARRAY',
  AUTOMATION_SET_SEARCH_TEXT: 'AUTOMATION_SET_SEARCH_TEXT',
  AUTOMATION_RESET_SEARCH_TEXT: 'AUTOMATION_RESET_SEARCH_TEXT',
  AUTOMATION_GENERATE_PARAMS: 'AUTOMATION_SET_PARAMS',
  AUTOMATION_RESET_PARAMS: 'AUTOMATION_RESET_PARAMS',
  AUTOMATION_GET_AUTOMATION_LOADING: 'AUTOMATION_GET_AUTOMATION_LOADING',
  AUTOMATION_GET_AUTOMATION_SUCCESS: 'AUTOMATION_GET_AUTOMATION_SUCCESS',
  AUTOMATION_GET_AUTOMATION_FAILED: 'AUTOMATION_GET_AUTOMATION_FAILED',
  AUTOMATION_GET_AUTOMATION_RESET: 'AUTOMATION_GET_AUTOMATION_RESET',
  AUTOMATION_SET_DATA_AUTOMATION_GENERATED:
    'AUTOMATION_SET_DATA_AUTOMATION_GENERATED',
  AUTOMATION_RESET_DATA_AUTOMATION_GENERATED:
    'AUTOMATION_RESET_DATA_AUTOMATION_GENERATED',
  AUTOMATION_DYNAMIC_CHECK_DATA_AUTOMATION:
    'AUTOMATION_DYNAMIC_CHECK_DATA_AUTOMATION',
  AUTOMATION_DYNAMIC_UNCHECK_DATA_AUTOMATION:
    'AUTOMATION_DYNAMIC_UNCHECK_DATA_AUTOMATION',
  AUTOMATION_SET_APPLIED_HEADER_SORT: 'AUTOMATION_SET_APPLIED_HEADER_SORT',
  AUTOMATION_RESET_APPLIED_HEADER_SORT: 'AUTOMATION_RESET_APPLIED_HEADER_SORT',

  ROLES_REQUEST_DATA: "ROLES_REQUEST_DATA",
  ROLES_GET_ACTIVE_ROLES_FAIL: "ROLES_GET_ACTIVE_ROLES_FAIL",
  ROLES_GET_ACTIVE_ROLES_SUCCESS: "ROLES_GET_ACTIVE_ROLES_SUCCESS",
};

export default reduxString;

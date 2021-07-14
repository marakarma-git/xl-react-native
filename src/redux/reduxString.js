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
  HOME_LOGIN: 'HOME_LOGIN',
  SET_MULTI_SESSION_DETECTED: 'SET_MULTI_SESSION_DETECTED',
  RESET_MULTI_SESSION_DETECTED: 'RESET_MULTI_SESSION_DETECTED',
  SET_IS_ERRICSON: 'SET_IS_ERRICSON',
  SET_SESSION_EXPIRED: 'SET_SESSION_EXPIRED',
  CLEAR_SESSION_EXPIRED_FLAG: 'CLEAR_SESSION_EXPIRED_FLAG',

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
  USER_ADMINISTRATION_UPDATE_LOCK_UNLOCK_USER:
    'USER_ADMINISTRATION_UPDATE_LOCK_UNLOCK_USER',
  USER_ADMINISTRATION_CREATE_USER: 'USER_ADMINISTRATION_CREATE_USER',

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
  ROLE_ADMINISTRSTION_UPDATE_ROLE_LIST: 'ROLE_ADMINISTRSTION_UPDATE_ROLE_LIST',
  ROLE_ADMINISTRATION_CRUD_ACTIVE_MENU: 'ROLE_ADMINISTRATION_CRUD_ACTIVE_MENU',
  // roleAdministrationCopyRoleList
  ROLE_ADMINISTRATION_COPY_ROLE_LIST: 'ROLE_ADMINISTRATION_COPY_ROLE_LIST',

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
  SUBSCRIPTION_DYNAMIC_ARRAY_SNAPSHOT_GENERATE_PARAMS:
    'SUBSCRIPTION_DYNAMIC_ARRAY_SNAPSHOT_GENERATE_PARAMS',
  SUBSCRIPTION_DYNAMIC_ARRAY_RE_APPLY_DATA_FROM_SNAPSHOT:
    'SUBSCRIPTION_DYNAMIC_ARRAY_RE_APPLY_DATA_FROM_SNAPSHOT',

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
  ENTERPRISE_MANAGEMENT_CLEAR_ACTIVE_ENTERPRISE_DATA:
    'ENTERPRISE_MANAGEMENT_CLEAR_ACTIVE_ENTERPRISE_DATA',
  ENTERPRISE_MANAGEMENT_REQUEST_DATA_END:
    'ENTERPRISE_MANAGEMENT_REQUEST_DATA_END',
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
  AUTOMATION_GET_AUTOMATION_RELOAD: 'AUTOMATION_GET_AUTOMATION_RELOAD',
  AUTOMATION_GET_AUTOMATION_LOADING: 'AUTOMATION_GET_AUTOMATION_LOADING',
  AUTOMATION_GET_AUTOMATION_SUCCESS: 'AUTOMATION_GET_AUTOMATION_SUCCESS',
  AUTOMATION_GET_AUTOMATION_FAILED: 'AUTOMATION_GET_AUTOMATION_FAILED',
  AUTOMATION_GET_AUTOMATION_RESET: 'AUTOMATION_GET_AUTOMATION_RESET',
  AUTOMATION_SET_DATA_RULE_CATEGORY_BULK:
    'AUTOMATION_SET_DATA_RULE_CATEGORY_BULK',
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
  AUTOMATION_GET_ACTIVE_ENTERPRISE_LOADING:
    'AUTOMATION_GET_ACTIVE_ENTERPRISE_LOADING',
  AUTOMATION_GET_ACTIVE_ENTERPRISE_SUCCESS:
    'AUTOMATION_GET_ACTIVE_ENTERPRISE_SUCCESS',
  AUTOMATION_GET_ACTIVE_ENTERPRISE_FAILED:
    'AUTOMATION_GET_ACTIVE_ENTERPRISE_FAILED',
  AUTOMATION_SET_ACTIVE_ENTERPRISE: 'AUTOMATION_SET_ACTIVE_ENTERPRISE',
  AUTOMATION_CREATE_EDIT_SET_VALUE: 'AUTOMATION_CREATE_EDIT_SET_VALUE',
  AUTOMATION_CREATE_EDIT_SET_SUB_VALUE: 'AUTOMATION_CREATE_EDIT_SET_SUB_VALUE',
  AUTOMATION_CREATE_EDIT_SET_ERROR_TEXT:
    'AUTOMATION_CREATE_EDIT_SET_ERROR_TEXT',
  AUTOMATION_CREATE_EDIT_SET_SUB_ERROR_TEXT:
    'AUTOMATION_CREATE_EDIT_SET_SUB_ERROR_TEXT',
  AUTOMATION_CREATE_EDIT_CHECK: 'AUTOMATION_CREATE_EDIT_CHECK',
  AUTOMATION_CREATE_EDIT_LOADING: 'AUTOMATION_CREATE_EDIT_LOADING',
  AUTOMATION_CREATE_EDIT_SUCCESS: 'AUTOMATION_CREATE_EDIT_SUCCESS',
  AUTOMATION_CREATE_EDIT_FAILED: 'AUTOMATION_CREATE_EDIT_FAILED',
  AUTOMATION_CREATE_EDIT_RESET: 'AUTOMATION_CREATE_EDIT_RESET',
  AUTOMATION_ACTIVE_ENTERPRISE_RESET: 'AUTOMATION_ACTIVE_ENTERPRISE_RESET',

  ROLES_REQUEST_DATA: 'ROLES_REQUEST_DATA',
  ROLES_GET_ACTIVE_ROLES_FAIL: 'ROLES_GET_ACTIVE_ROLES_FAIL',
  ROLES_GET_ACTIVE_ROLES_SUCCESS: 'ROLES_GET_ACTIVE_ROLES_SUCCESS',

  SMS_A2P_DYNAMIC_ONCHANGE_DROP_DOWN: 'SMS_A2P_DYNAMIC_ONCHANGE_DROP_DOWN',
  SMS_A2P_DYNAMIC_ONCHANGE_TEXT_INPUT: 'SMS_A2P_DYNAMIC_ONCHANGE_TEXT_INPUT',
  SMS_A2P_DYNAMIC_ONCHANGE_DATE_TIME: 'SMS_A2P_DYNAMIC_ONCHANGE_DATE_TIME',
  SMS_A2P_CHANGE_CHECK_HEADER: 'SMS_A2P_CHANGE_CHECK_HEADER',
  SMS_A2P_DYNAMIC_SUCCESS: 'SMS_A2P_DYNAMIC_SUCCESS',
  SMS_A2P_DYNAMIC_FAILED: 'SMS_A2P_DYNAMIC_FAILED',
  SMS_A2P_DYNAMIC_LOADING: 'SMS_A2P_DYNAMIC_LOADING',
  SMS_A2P_DYNAMIC_RESET: 'SMS_A2P_DYNAMIC_RESET',
  SMS_A2P_RESET_ALL_VALUE: 'SMS_A2P_RESET_ALL_VALUE',
  SMS_A2P_UPDATE_BUNDLE_ARRAY: 'SMS_A2P_UPDATE_BUNDLE_ARRAY',
  SMS_A2P_SET_SEARCH_TEXT: 'SMS_A2P_SET_SEARCH_TEXT',
  SMS_A2P_RESET_SEARCH_TEXT: 'SMS_A2P_RESET_SEARCH_TEXT',
  SMS_A2P_GENERATE_PARAMS: 'SMS_A2P_SET_PARAMS',
  SMS_A2P_RESET_PARAMS: 'SMS_A2P_RESET_PARAMS',
  SMS_A2P_GET_SMS_LOADING: 'SMS_A2P_GET_SMS_LOADING',
  SMS_A2P_GET_SMS_SUCCESS: 'SMS_A2P_GET_SMS_SUCCESS',
  SMS_A2P_GET_SMS_FAILED: 'SMS_A2P_GET_SMS_FAILED',
  SMS_A2P_GET_SMS_RESET: 'SMS_A2P_GET_SMS_RESET',
  SMS_A2P_SET_DATA_SMS_GENERATED: 'SMS_A2P_SET_DATA_SMS_GENERATED',
  SMS_A2P_RESET_DATA_SMS_GENERATED: 'SMS_A2P_RESET_DATA_SMS_GENERATED',
  SMS_A2P_DYNAMIC_CHECK_DATA_SMS: 'SMS_A2P_DYNAMIC_CHECK_DATA_SMS',
  SMS_A2P_DYNAMIC_UNCHECK_DATA_SMS: 'SMS_A2P_DYNAMIC_UNCHECK_DATA_SMS',
  SMS_A2P_CHECK_ALL_DATA_SMS: 'SMS_A2P_CHECK_ALL_DATA_SMS',
  SMS_A2P_UNCHECK_ALL_DATA_SMS: 'SMS_A2P_UNCHECK_ALL_DATA_SMS',
  SMS_A2P_SET_APPLIED_HEADER_SORT: 'SMS_A2P_SET_APPLIED_HEADER_SORT',
  SMS_A2P_RESET_APPLIED_HEADER_SORT: 'SMS_A2P_RESET_APPLIED_HEADER_SORT',

  GET_LIST_PERMISSION: 'GET_LIST_PERMISSION',
  REQUEST_LIST_PERMISSION: 'REQUEST_LIST_PERMISSION',
  SET_ERROR_PERMISSION: 'SET_ERROR_PERMISSION',

  SIM_PRODUCTIVITY_DYNAMIC_ONCHANGE_DROP_DOWN:
    'SIM_PRODUCTIVITY_DYNAMIC_ONCHANGE_DROP_DOWN',
  SIM_PRODUCTIVITY_DYNAMIC_SUCCESS: 'SIM_PRODUCTIVITY_DYNAMIC_SUCCESS',
  SIM_PRODUCTIVITY_DYNAMIC_FAILED: 'SIM_PRODUCTIVITY_DYNAMIC_FAILED',
  SIM_PRODUCTIVITY_DYNAMIC_LOADING: 'SIM_PRODUCTIVITY_DYNAMIC_LOADING',
  SIM_PRODUCTIVITY_DYNAMIC_RESET_SELECTED_VALUE:
    'SIM_PRODUCTIVITY_DYNAMIC_RESET_SELECTED_VALUE',
  SIM_PRODUCTIVITY_RESET_ALL_VALUE: 'SIM_PRODUCTIVITY_RESET_ALL_VALUE',
  SIM_PRODUCTIVITY_GENERATE_PARAMS: 'SIM_PRODUCTIVITY_GENERATE_PARAMS',
  SIM_PRODUCTIVITY_RESET_GENERATE_PARAMS:
    'SIM_PRODUCTIVITY_RESET_GENERATE_PARAMS',
  SIM_PRODUCTIVITY_SET_PARAMS_NAVIGATION:
    'SIM_PRODUCTIVITY_SET_PARAMS_NAVIGATION',
  SIM_PRODUCTIVITY_RESET_PARAMS_NAVIGATION:
    'SIM_PRODUCTIVITY_RESET_PARAMS_NAVIGATION',
  SIM_PRODUCTIVITY_CHART_LOADING: 'SIM_PRODUCTIVITY_CHART_LOADING',
  SIM_PRODUCTIVITY_CHART_FAILED: 'SIM_PRODUCTIVITY_CHART_FAILED',
  SIM_PRODUCTIVITY_CHART_SUCCESS: 'SIM_PRODUCTIVITY_CHART_SUCCESS',
};

export default reduxString;

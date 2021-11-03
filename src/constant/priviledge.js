import {
  iconComponents,
  iconGrids,
  iconHome,
  iconAdmin,
  iconAutomation,
  iconAnalytics,
} from '../assets/images';
import {
  LandingPage,
  DashboardPage,
  SubscriptionPage,
  MyAccountPage,
  ChangePasswordPage,
  SubscriptionFilter,
  AboutPage,
  UserAdministrationPage,
  RoleAdministrationPage,
  EnterpriseManagementPage,
  SubscriptionPackagePage,
  UserAdministrationCreatePage,
  RoleAdministrationCreatePage,
  RoleAdministrationFilterPage,
  EnterpriseManagementFilterPage,
  EnterpriseManagementOnBoardPage,
  SubscriptionPackageFilterPage,
  UserAdministrationFilterPage,
  NotificationPage,
  AutomationPage,
  AutomationFilterPage,
  SmsA2pPage,
  SmsA2pFilterPage,
  CreateNewUserPage,
  AutomationCreDitPage,
  SimProductivityPage,
  GeoDistributionPage,
  UsageAnalyticsPage,
  UsageSubscribersAnalyticsPage,
  GeoDistributionFilterPage,
  SimProductivityFilterPage,
  UsageAnalyticsFilterPage,
  UsageSubscribersAnalyticsFilterPage,
  SubscriptionPackageEditPage,
  SmsA2pEditPage,
} from '../pages/Home/index';

import {
  DASHBOARD_PRIVILEDGE_ID,
  SUBSCRIPTION_PRIVILEDGE_ID,
  ADMINISTRATION_PRIVILEDGE_ID,
  AUTOMATION_PRIVILEDGE_ID,
  ANALYTICS_PRIVILEDGE_ID,
} from './actionPriv';

export const DRAWER_MENU_PRIVILEDGE = [
  {
    name: 'Home',
    icon: iconHome,
    type: 'initialRoute',
    components: LandingPage,
    priviledgeIds: [],
  },
  {
    name: 'Dashboard',
    icon: iconGrids,
    type: 'drawer',
    components: DashboardPage,
    priviledgeIds: DASHBOARD_PRIVILEDGE_ID || [],
  },
  {
    name: 'Subscription',
    icon: iconComponents,
    type: 'drawer',
    components: SubscriptionPage,
    priviledgeIds: SUBSCRIPTION_PRIVILEDGE_ID || [],
  },
  {
    name: 'Administration',
    icon: iconAdmin,
    type: 'drawer',
    width: 25,
    height: 25,
    components: '',
    priviledgeIds: ADMINISTRATION_PRIVILEDGE_ID,
    subMenu: [
      {
        name: 'User Administration',
        type: 'drawer',
        width: 25,
        height: 25,
        components: UserAdministrationPage,
      },
      {
        name: 'Role Administration',
        type: 'drawer',
        width: 25,
        height: 25,
        components: RoleAdministrationPage,
      },
      {
        name: 'Enterprise Management',
        type: 'drawer',
        width: 25,
        height: 25,
        components: EnterpriseManagementPage,
      },
      {
        name: 'Subscription Package',
        type: 'drawer',
        width: 25,
        height: 25,
        components: SubscriptionPackagePage,
      },
      {
        name: 'SmsA2p Configuration',
        icon: '',
        type: 'drawer',
        components: SmsA2pPage,
      },
    ],
  },
  {
    name: 'Automation',
    icon: iconAutomation,
    type: 'drawer',
    components: AutomationPage,
    priviledgeIds: AUTOMATION_PRIVILEDGE_ID,
  },
  {
    name: 'Analytics',
    icon: iconAnalytics,
    type: 'drawer',
    width: 25,
    height: 25,
    components: '',
    priviledgeIds: ANALYTICS_PRIVILEDGE_ID,
    subMenu: [
      {
        name: 'Sim Productivity',
        type: 'drawer',
        width: 25,
        height: 25,
        components: SimProductivityPage,
      },
      {
        name: 'Usage Analytics',
        type: 'drawer',
        width: 25,
        height: 25,
        components: UsageAnalyticsPage,
      },
      {
        name: 'Usage & Subscribers Analytics',
        type: 'drawer',
        width: 25,
        height: 25,
        components: UsageSubscribersAnalyticsPage,
      },
      {
        name: 'Geo Distribution',
        type: 'drawer',
        width: 25,
        height: 25,
        components: GeoDistributionPage,
      },
    ],
  },
  {
    name: 'Create User',
    icon: '',
    type: 'non-drawer',
    components: CreateNewUserPage,
  },
  {
    name: 'AutomationFilter',
    icon: '',
    type: 'non-drawer',
    components: AutomationFilterPage,
  },
  {
    name: 'AutomationCreDit',
    icon: '',
    type: 'non-drawer',
    components: AutomationCreDitPage,
  },
  {
    name: 'SmsA2pFilter',
    icon: '',
    type: 'non-drawer',
    components: SmsA2pFilterPage,
  },
  {
    name: 'SmsA2pEdit',
    icon: '',
    type: 'non-drawer',
    components: SmsA2pEditPage,
  },
  {
    name: 'SubscriptionFilter',
    icon: '',
    type: 'non-drawer',
    components: SubscriptionFilter,
  },
  {
    name: 'Account',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: MyAccountPage,
  },
  {
    name: 'Notification',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: NotificationPage,
  },
  {
    priviledgeId: '711111aa-643a-11ea-bc55-0242ac130003',
    name: 'Change Password',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: ChangePasswordPage,
  },
  {
    name: 'About',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: AboutPage,
  },
  {
    name: 'UserAdministrationCreate',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: UserAdministrationCreatePage,
  },
  {
    name: 'UserAdministrationFilter',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: UserAdministrationFilterPage,
  },
  {
    name: 'RoleAdministrationCreate',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: RoleAdministrationCreatePage,
  },
  {
    name: 'RoleAdministrationFilter',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: RoleAdministrationFilterPage,
  },
  {
    name: 'EnterpriseManagementFilter',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: EnterpriseManagementFilterPage,
  },
  {
    name: 'EnterpriseManagementOnboard',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: EnterpriseManagementOnBoardPage,
  },
  {
    name: 'SubscriptionPackageFilter',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: SubscriptionPackageFilterPage,
  },
  {
    name: 'SubscriptionPackageEdit',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: SubscriptionPackageEditPage,
  },
  {
    name: 'GeoDistributionFilterPage',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: GeoDistributionFilterPage,
  },
  {
    name: 'SimProductivityFilterPage',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: SimProductivityFilterPage,
  },
  {
    name: 'UsageAnalyticsFilterPage',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: UsageAnalyticsFilterPage,
  },
  {
    name: 'UsageSubscribersAnalyticsFilterPage',
    icon: '',
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: UsageSubscribersAnalyticsFilterPage,
  },
];

import {iconComponents, iconGrids, iconHome, iconAdmin} from '../assets/images';
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
  BannerManagementPage,
  UserAdministrationCreatePage,
  RoleAdministrationCreatePage,
  RoleAdministrationFilterPage,
  EnterpriseManagementFilterPage,
  EnterpriseManagementOnBoardPage,
  SubscriptionPackageFilterPage,
  BannerManagementCreatePage,
  UserAdministrationFilterPage,
  NotificationPage,
  AutomationPage,
  AutomationFilterPage,
  FormStepPage,
} from '../pages/Home/index';

export const DRAWER_MENU_PRIVILEDGE = [
  {
    priviledgeId: '',
    name: 'Home',
    icon: iconHome,
    type: 'initialRoute',
    components: LandingPage,
  },
  {
    priviledgeId: '02ac2c76-53ce-11ea-8d77-2e728ce88125',
    name: 'Dashboard',
    icon: iconGrids,
    type: 'drawer',
    components: DashboardPage,
  },
  {
    priviledgeId: '',
    name: 'Subscription',
    icon: iconComponents,
    type: 'drawer',
    components: SubscriptionPage,
  },
  {
    priviledgeId: '',
    name: 'Administration',
    icon: iconAdmin,
    type: 'drawer',
    width: 25,
    height: 25,
    components: '',
    subMenu: [
      {
        priviledgeId: '',
        name: 'User Administration',
        type: 'drawer',
        width: 25,
        height: 25,
        components: UserAdministrationPage,
      },
      {
        priviledgeId: '',
        name: 'Role Administration',
        type: 'drawer',
        width: 25,
        height: 25,
        components: RoleAdministrationPage,
      },
      {
        priviledgeId: '',
        name: 'Enterprise Management',
        type: 'drawer',
        width: 25,
        height: 25,
        components: EnterpriseManagementPage,
      },
      {
        priviledgeId: '',
        name: 'Subscription Package',
        type: 'drawer',
        width: 25,
        height: 25,
        components: SubscriptionPackagePage,
      },
      {
        priviledgeId: '',
        name: 'Banner Management',
        type: 'drawer',
        width: 25,
        height: 25,
        components: BannerManagementPage,
      },
    ],
  },
  {
    priviledgeId: '',
    name: 'Automation',
    icon: iconHome,
    type: 'drawer',
    components: AutomationPage,
  },
  // {
  //   priviledgeId: '',
  //   name: 'Dev Form Step',
  //   icon: iconHome,
  //   type: 'drawer',
  //   components: FormStepPage,
  // },
  {
    priviledgeId: '',
    name: 'AutomationFilter',
    icon: iconHome,
    type: 'non-drawer',
    components: AutomationFilterPage,
  },
  {
    priviledgeId: '',
    name: 'SubscriptionFilter',
    icon: iconHome,
    type: 'non-drawer',
    components: SubscriptionFilter,
  },
  {
    priviledgeId: '',
    name: 'Account',
    icon: iconGrids,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: MyAccountPage,
  },
  {
    priviledgeId: '',
    name: 'Notification',
    icon: iconGrids,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: NotificationPage,
  },
  {
    priviledgeId: '711111aa-643a-11ea-bc55-0242ac130003',
    name: 'Change Password',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: ChangePasswordPage,
  },
  {
    priviledgeId: '',
    name: 'About',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: AboutPage,
  },
  {
    priviledgeId: '',
    name: 'UserAdministrationCreate',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: UserAdministrationCreatePage,
  },
  {
    priviledgeId: '',
    name: 'UserAdministrationFilter',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: UserAdministrationFilterPage,
  },
  {
    priviledgeId: '',
    name: 'RoleAdministrationCreate',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: RoleAdministrationCreatePage,
  },
  {
    priviledgeId: '',
    name: 'RoleAdministrationFilter',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: RoleAdministrationFilterPage,
  },
  {
    priviledgeId: '',
    name: 'EnterpriseManagementFilter',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: EnterpriseManagementFilterPage,
  },
  {
    priviledgeId: '',
    name: 'EnterpriseManagementOnboard',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: EnterpriseManagementOnBoardPage,
  },
  {
    priviledgeId: '',
    name: 'SubscriptionPackageFilter',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: SubscriptionPackageFilterPage,
  },
  {
    priviledgeId: '',
    name: 'BannerManagementCreate',
    icon: iconComponents,
    type: 'non-drawer',
    width: 25,
    height: 25,
    components: BannerManagementCreatePage,
  },
];


// you can adjust action by you redux action

export const ACTION_PRIVILEDGE = [
  { 
    moduleName: "Activity Log",
    activity: [
      { action: "", actionCode: "AL1",description: "Generate Table List", privId: "adfda120-1193-4ea1-bf35-e3ed3ee2be48", impactOn: "View Activity Log" },
      { action: "", actionCode: "AL2",description: "Search/Filter", privId: "a7d61448-56ff-11eb-ae93-0242ac130002", impactOn: "Filter" }
    ] 
  },
  {
    moduleName: "Automation",
    activity: [
      { action: "", actionCode: "AT1", description: "Generate Table List", privId: "dabf1d82-8162-4f2c-98ae-55017c31601b", impactOn: "View" },
      { action: "", actionCode: "AT2", description: "Create Automation", privId: "6b431287-3e27-4e9f-9749-250ff540b9a8", impactOn: "Create" },
      { action: "", actionCode: "AT3", description: "Delete Automation", privId: "9b253667-9c77-4f35-8c4c-d1acf15dc1ec", impactOn: "Delete" },
      { action: "", actionCode: "AT4", description: "Edit Automation", privId: "b9941376-e8c2-4df1-92dc-868873d782d1", impactOn: "Edit" },
      { action: "", actionCode: "AT5", description: "Filter Automation", privId: "a8cf454f-61b7-4c40-81de-67e2f20f1d53", impactOn: "Filter" },
    ]
  },
  {
    moduleName: "Banner Management",
    activity: [
      { action: "", actionCode: "BM1", description: "Swapping Banner Order", privId: "ee1a50ee-6439-11eb-ae93-0242ac130002", impactOn: "Banner Management: Arrange Order" },
      { action: "", actionCode: "BM2", description: "Generate Table List", privId: "", impactOn: "Banner Management: View" },
      { action: "SET_CAROUSEL", actionCode: "BM3", description: "Generate Banner Image", privId: "ee1a4b4e-6439-11eb-ae93-0242ac130002", impactOn: "Banner Management: Banner Image" },
      { action: "", actionCode: "BM4", description: "Create Banner", privId: "ee1a4c20-6439-11eb-ae93-0242ac130002", impactOn: "Banner Management: Create" },
      { action: "", actionCode: "BM5", description: "Edit Banner", privId: "ee1a4cde-6439-11eb-ae93-0242ac130002", impactOn: "Banner Management: Edit" },
      { action: "", actionCode: "BM6", description: "Delete Banner", privId: "ee1a4fea-6439-11eb-ae93-0242ac130002", impactOn: "Banner Management: Delete" }
    ],
  },
  {
    moduleName: "Change Password",
    activity: [
      { action: "CHANGE_PASSWORD", actionCode: "CP", description: "Change Password", privId: "711111aa-643a-11ea-bc55-0242ac130003", impactOn: "" }
    ]
  },
  {
    moduleName: "Dashboard",
    activity: [
      { action: "", actionCode: "DB", description: "Dashboard", privId: "02ac2c76-53ce-11ea-8d77-2e728ce88125", impactOn: "" }
    ]
  },
  {
    moduleName: "Diagnostic Wizard",
    activity: [
      { action: "", actionCode: "DW1", description: "", privId: "d154bdb7-d552-4cbc-814c-1f77c15d9a19", impactOn: "Search and View" },
      { action: "", actionCode: "DW2", description: "", privId: "5c65cf2f-d2fb-4fc8-b38b-12828b120fff", impactOn: "Fix Status" }
    ]
  },
  {
    moduleName: "Enterprise Management",
    activity: [
      { action: "", actionCode: "EM1", description: "Edit Enterprise", privId: "4acca57c-7245-11ea-bc55-0242ac130003", impactOn: "Edit Enterprise" },
      { action: "", actionCode: "EM2", description: "View Enterprise List (Tree View)", privId: "4acca400-7245-11ea-bc55-0242ac130003", impactOn: "View Enterprise List (Tree View)" },
      { action: "", actionCode: "EM3", description: "Create New Enterprise", privId: "4acca4be-7245-11ea-bc55-0242ac130003", impactOn: "Create New Enterprise" },
    ]
  },
  {
    moduleName: "Login/Logout",
    activity: [
      { action: "AUTH_SUCCESS", actionCode: "LL1", description: "Login as", privId: "4acc8dc6-7245-11ea-bc55-0242ac130003", impactOn: "Sign In" },
      { action: "AUTH_LOGOUT", actionCode: "LL2", description: "Logout user", privId: "4acca644-7245-11ea-bc55-0242ac130003", impactOn: "Logout" }
    ]
  },
  {
    moduleName: "Subscription",
    activity: [
      { action: "", actionCode: "SB1", description: "Search & Filter", privId: "4acc9460-7245-11ea-bc55-0242ac130003", impactOn: "Search & Filter" },
      { action: "", actionCode: "SB2", description: "Pause SIM", privId: "4acc9794-7245-11ea-bc55-0242ac130003", impactOn: "Pause Sim" },
      { action: "", actionCode: "SB3", description: "Bulk Update Label", privId: "4acc9924-7245-11ea-bc55-0242ac130003", impactOn: "Bulk Update Label" },
      { action: "", actionCode: "SB4", description: "Deactivate SIM", privId: "4acc96b8-7245-11ea-bc55-0242ac130003", impactOn: "Deactivate SIM" },
      { action: "", actionCode: "SB5", description: "Terminate SIM", privId: "4acc985c-7245-11ea-bc55-0242ac130003", impactOn: "Terminate SIM" },
      { action: "", actionCode: "SB6", description: "View SIM Inventory", privId: "4acc9528-7245-11ea-bc55-0242ac130003", impactOn: "View SIM Inventory" },
      { action: "", actionCode: "SB7", description: "Activate SIM", privId: "4acc95f0-7245-11ea-bc55-0242ac130003", impactOn: "Activate SIM" },
      { action: "", actionCode: "SB8", description: "See SIM Location", privId: "4acc9c94-7245-11ea-bc55-0242ac130003", impactOn: "See SIM Location" }
    ]
  },
  {
    moduleName: "Subscription Package",
    activity: [
      { action: "", actionCode: "SP1", description: "View Subscription Package", privId: "50b49572-8d01-11ea-bc55-0242ac130003", impactOn: "View Subscription Package" },
      { action: "", actionCode: "SP2", description: "Export CSV", privId: "50b497fc-8d01-11ea-bc55-0242ac130003", impactOn: "Export CSV" },
      { action: "", actionCode: "SP3", description: "Filter Data", privId: "50b49964-8d01-11ea-bc55-0242ac130003", impactOn: "Filter Data" },
      { action: "", actionCode: "SP4", description: "Update Data 1 by 1", privId: "50b49a7c-8d01-11ea-bc55-0242ac130003", impactOn: "Update Data 1 by 1" },
      { action: "", actionCode: "SP5", description: "Export Data to CSV", privId: "a7d611f0-56ff-11eb-ae93-0242ac130002", impactOn: "Export Data to CSV" },
    ]
  },
  {
    moduleName: "User & Roles",
    activity: [
      { action: "", actionCode: "UR1", description: "Edit User", privId: "4acc9ee2-7245-11ea-bc55-0242ac130003", impactOn: "Edit User" },
      { action: "", actionCode: "UR2", description: "View User List", privId: "4acc9d5c-7245-11ea-bc55-0242ac130003", impactOn: "View User List" },
      { action: "", actionCode: "UR3", description: "Create New User", privId: "4acc9e1a-7245-11ea-bc55-0242ac130003", impactOn: "Create New User" },
      { action: "", actionCode: "UR4", description: "View Roles", privId: "4acc9faa-7245-11ea-bc55-0242ac130003", impactOn: "View Roles" },
      { action: "", actionCode: "UR5", description: "Edit Role", privId: "4acca338-7245-11ea-bc55-0242ac130003", impactOn: "Edit Role" },
      { action: "", actionCode: "UR6", description: "Create New Role", privId: "4acca068-7245-11ea-bc55-0242ac130003", impactOn: "Create New Role" },
      { action: "", actionCode: "UR7", description: "Filter", privId: "a7d61538-56ff-11eb-ae93-0242ac130002", impactOn: "Filter" },
    ]
  },
  {
    moduleName: "Customer Consent",
    activity: [
      { action: "", actionCode: "CC", description: "View Customer Consent", privId: "b1aef948-7d5c-11eb-9439-0242ac130002", impactOn: "View Customer Consent" },
    ]
  },
  {
    moduleName: "My Account",
    activity: [
      { action: "", actionCode: "MA", description: "My Account", privId: "4acc8dc6-7245-11ea-bc55-0242ac130003", impactOn: "View My Account" },
    ]
  },
]
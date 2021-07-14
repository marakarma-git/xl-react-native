const DASHBOARD_PRIVILEDGE_ID = [
  {privId: '02ac2c76-53ce-11ea-8d77-2e728ce88125', menuName: "Dashboard",  actionName: "Dashboard", activityLog: "SIM Statistics"},
  {privId: '02ac2c76-53ce-11ea-8d77-2e728ce88125', menuName: "Dashboard",  actionName: "Summary", activityLog: "Generate Dashboard Summary Data"},
  {privId: '02ac2c76-53ce-11ea-8d77-2e728ce88125', menuName: "Dashboard",  actionName: "TopTraffic", activityLog: "Traffic Statistics"},
];

const SUBSCRIPTION_PRIVILEDGE_ID = [
  {privId: '4acc9460-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "Search&Filter", activityLog: "Search & Filter"},
  {privId: '4acc9794-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "PauseSIM", activityLog: "Pause SIM"},
  {privId: '4acc9924-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "BulkUpdateLabel", activityLog: "Bulk Update Label"},
  {privId: '4acc96b8-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "DeactivateSIM", activityLog: "Deactivate SIM"},
  {privId: '4acc985c-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "TerminateSIM", activityLog: "Terminate SIM"},
  {privId: '4acc9528-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "ViewSIMInventor", activityLog: "View SIM Inventory"},
  {privId: '4acc95f0-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "ActivateSIM", activityLog: "Activate SIM"},
  {privId: '4acc9c94-7245-11ea-bc55-0242ac130003', menuName: "Subscription",  actionName: "SeeSIMLocation", activityLog: "See SIM Location"},
];

const ADMINISTRATION_PRIVILEDGE_ID = [
  {privId: '4acc9ee2-7245-11ea-bc55-0242ac130003', menuName: "User Administration",  actionName: "Edit", activityLog: ""},
  {privId: '4acc9d5c-7245-11ea-bc55-0242ac130003', menuName: "User Administration",  actionName: "View", activityLog: "Generate information for User Administration"},
  {privId: '4acc9e1a-7245-11ea-bc55-0242ac130003', menuName: "User Administration",  actionName: "Create", activityLog: ""},
  {privId: '4acc9faa-7245-11ea-bc55-0242ac130003', menuName: "Role Administration",  actionName: "View", activityLog: "Role Administration: View Roles"},
  {privId: '4acca338-7245-11ea-bc55-0242ac130003', menuName: "Role Administration",  actionName: "Edit", activityLog: "Role Administration: Edit Role"},
  {privId: '4acca068-7245-11ea-bc55-0242ac130003', menuName: "Role Administration",  actionName: "Create", activityLog: "Role Administration: Create New Role"},
  {privId: 'a7d61538-56ff-11eb-ae93-0242ac130002', menuName: "Role Administration",  actionName: "Filter", activityLog: "Role Administration: Filter Role"},
  {privId: '5265e528-96b1-11eb-a8b3-0242ac130003', menuName: "User Administration",  actionName: "Filter", activityLog: " Filter User"},
  {privId: '02ac302c-53ce-11ea-8d77-2e728ce88125', menuName: "",  actionName: "", activityLog: ""},
  {privId: 'e1dc5db0-91fa-11eb-a8b3-0242ac130003', menuName: "User Administration",  actionName: "Delete", activityLog: ""},
  {privId: 'e1dc5ebe-91fa-11eb-a8b3-0242ac130003', menuName: "User Administration",  actionName: "Lock", activityLog: ""},
  {privId: 'e1dc5f90-91fa-11eb-a8b3-0242ac130003', menuName: "User Administration",  actionName: "Unlock", activityLog: ""},
  {privId: '31a717d4-9b67-11eb-a8b3-0242ac130003', menuName: "Role Administration",  actionName: "Delete", activityLog: "Role Administration: Delete Role"},
  {privId: '31a718ba-9b67-11eb-a8b3-0242ac130003', menuName: "Role Administration",  actionName: "Copy", activityLog: "Role Administration: Copy Role"},
  {privId: '4acca57c-7245-11ea-bc55-0242ac130003', menuName: "Enterprise Management",  actionName: "Edit", activityLog: "Enterprise Management: Edit"},
  {privId: '4acca400-7245-11ea-bc55-0242ac130003', menuName: "Enterprise Management",  actionName: "View", activityLog: "Enterprise Management: View Enterprise List (Tree View)"},
  {privId: '4acca4be-7245-11ea-bc55-0242ac130003', menuName: "Enterprise Management",  actionName: "Create", activityLog: "Enterprise Management: Create"},
  {privId: '50b49572-8d01-11ea-bc55-0242ac130003', menuName: "Subscription Package",  actionName: "View", activityLog: "View Subscription Package"},
  {privId: '50b497fc-8d01-11ea-bc55-0242ac130003', menuName: "Subscription Package",  actionName: "ExportCSV", activityLog: "Export CSV"},
  {privId: '50b49964-8d01-11ea-bc55-0242ac130003', menuName: "Subscription Package",  actionName: "Filter", activityLog: "Filter Data"},
  {privId: '50b49a7c-8d01-11ea-bc55-0242ac130003', menuName: "Subscription Package",  actionName: "Update", activityLog: "Update Data 1 by 1"},
  {privId: 'a7d611f0-56ff-11eb-ae93-0242ac130002', menuName: "SmsA2p Configuration",  actionName: "ExportDatatoCSV", activityLog: "Export Data To CSV"},
  {privId: '570b8992-9b2b-48b4-a743-1c38f3db11a3', menuName: "SmsA2p Configuration",  actionName: "Create", activityLog: "Create SMS A2P Configuration"},
  {privId: '838b998f-acaf-4249-8521-c217b73634f2', menuName: "SmsA2p Configuration",  actionName: "Edit", activityLog: "Edit SMS A2P Configuration"},
  {privId: '99b1ec5b-0cdc-4683-b642-71725ba7e707', menuName: "SmsA2p Configuration",  actionName: "Delete", activityLog: "Delete SMS A2P Configuration"},
  {privId: 'c6363dd0-6684-4b53-aabd-25ffe9728f29', menuName: "SmsA2p Configuration",  actionName: "Search", activityLog: "Search SMS A2P Configuration"},
  {privId: '77f616ba-542d-4997-b2bf-213bd71c93ff', menuName: "SmsA2p Configuration",  actionName: "Filter", activityLog: "Filter SMS A2P Configuration"},
  {privId: 'a9c84041-7829-4678-9f2f-f8baa66d16da', menuName: "SmsA2p Configuration",  actionName: "View", activityLog: "View SMS A2P Configuration"},
];

const AUTOMATION_PRIVILEDGE_ID = [
  {privId: '6b431287-3e27-4e9f-9749-250ff540b9a8', menuName: "Automation",  actionName: "Create", activityLog: "Automation:	Create"},
  {privId: '9b253667-9c77-4f35-8c4c-d1acf15dc1ec', menuName: "Automation",  actionName: "Delete", activityLog: "Automation:	Delete"},
  {privId: 'b9941376-e8c2-4df1-92dc-868873d782d1', menuName: "Automation",  actionName: "Edit", activityLog: "Automation:	Edit"},
  {privId: 'dabf1d82-8162-4f2c-98ae-55017c31601b', menuName: "Automation",  actionName: "View", activityLog: "Automation:	View"},
  {privId: 'a8cf454f-61b7-4c40-81de-67e2f20f1d53', menuName: "Automation",  actionName: "Filter", activityLog: "Automation:	Filter"},
];

const ANALYTICS_PRIVILEDGE_ID = [
  {privId: '26f20e88-badb-4bcc-a33d-8d897d675455', menuName: "Sim Productivity",  actionName: "View", activityLog: "SIM Productivity:	View"},
  {privId: '43e6210b-221c-4488-a921-5ec68daecd88', menuName: "Sim Productivity",  actionName: "Filter", activityLog: "SIM Productivity:	Filter"},
  {privId: 'ee1a526a-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "SimStatisticsView", activityLog: "SIM Statistics"},
  {privId: 'ee1a51ac-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "SimStatisticsFilter", activityLog: "SIM Statistics"},
  {privId: 'ee1a526a-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "TrafficStatisticsView", activityLog: "Traffic Statistics"},
  {privId: 'ee1a51ac-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "TrafficStatisticsFilter", activityLog: "Traffic Statistics"},
  {privId: 'ee1a526a-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "AggregatedTrafficsView", activityLog: "Aggregated Traffics"},
  {privId: 'ee1a51ac-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "AggregatedTrafficsFilter", activityLog: "Aggregated Traffics"},
  {privId: 'ee1a526a-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "Last12MonthUsageView", activityLog: "Last 12 Month Usage"},
  {privId: 'ee1a51ac-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "Last12MonthUsageFilter", activityLog: "Last 12 Month Usage"},
  {privId: 'ee1a526a-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "MonthlyUsageView", activityLog: "Monthly Usage"},
  {privId: 'ee1a51ac-6439-11eb-ae93-0242ac130002', menuName: "Usage Analytics",  actionName: "MonthlyUsageFilter", activityLog: "Monthly Usage"},
  {privId: '99bd51a2-69d6-11eb-9439-0242ac130002', menuName: "Usage & Subscribers Analytics",  actionName: "Filter", activityLog: "Usage & Subscriber Analytics: Filter"},
  {privId: '99bd52b0-69d6-11eb-9439-0242ac130002', menuName: "Usage & Subscribers Analytics",  actionName: "View", activityLog: "Usage & Subscriber Analytics: View"},
  {privId: '5733ffea-301f-45ec-9f00-52c8cfcae183', menuName: "Geo Distribution",  actionName: "View", activityLog: "Geo Distribution: View"},
  {privId: 'acf5f391-a469-4d6a-a0b1-1de0bb2f4aba', menuName: "Geo Distribution",  actionName: "Filter", activityLog: "Geo Distribution: Filter"},
];

const LOGIN_LOGOUT_PRIVILEDGE_ID = [
  {privId: '4acc8dc6-7245-11ea-bc55-0242ac130003', menuName: "Login",  actionName: "Login", activityLog: "Login"},
  {privId: '4acca644-7245-11ea-bc55-0242ac130003', menuName: "Logout",  actionName: "Logout", activityLog: "Logout"},
  {privId: 'ee1a4a4a-6439-11eb-ae93-0242ac130002', menuName: "Home",  actionName: "Home", activityLog: "See Home Banner Promotion"},
];

const CHANGE_PASSWORD_PRIVILEDGE_ID = [
  {privId: '711111aa-643a-11ea-bc55-0242ac130003', menuName: "Change Password",  actionName: "ChangePassword", activityLog: ""}
];

const CUSTOMER_CONSENT_PRIVILEDGE_ID = [
  {privId: 'b1aef948-7d5c-11eb-9439-0242ac130002', menuName: "Customer Consent",  actionName: "View", activityLog: ""},
]

export {
  DASHBOARD_PRIVILEDGE_ID,
  SUBSCRIPTION_PRIVILEDGE_ID,
  ADMINISTRATION_PRIVILEDGE_ID,
  AUTOMATION_PRIVILEDGE_ID,
  ANALYTICS_PRIVILEDGE_ID,
  LOGIN_LOGOUT_PRIVILEDGE_ID,
  CHANGE_PASSWORD_PRIVILEDGE_ID,
  CUSTOMER_CONSENT_PRIVILEDGE_ID
}
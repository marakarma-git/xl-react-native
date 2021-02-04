export default ActivityMatrix = [
    { 
        actionType: "AUTH_SUCCESS", 
        activityType: "Login", 
        initDescription: "Login success as user ", 
        moduleName: "Login" 
    },
    { 
        actionType: "AUTH_LOGOUT", 
        activityType: "Logout", 
        initDescription: "Logout success ", 
        moduleName: "Logout" 
    },
    { 
        actionType: "SET_WIDGET_LIST", 
        activityType: "Generate widget list", 
        initDescription: "Success generate widget list", 
        moduleName: "Dashboard" 
    },
    { 
        actionType: "SET_DASHBOARD_SUMMARY", 
        activityType: "Get dashboard summary", 
        initDescription: "Success get dashboard summary data", 
        moduleName: "Dashboard" 
    },
    { 
        actionType: "SET_CAROUSEL", 
        activityType: "Get banner list", 
        initDescription: "Success get banner list", 
        moduleName: "Home" 
    }
];

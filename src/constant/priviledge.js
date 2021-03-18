import { iconComponents, iconGrids, iconHome } from "../assets/images";
import {
    LandingPage,
    DashboardPage,
    SubscriptionPage,
    MyAccountPage,
    ChangePasswordPage,
    SubscriptionFilter,
    AboutPage,
    AutomationPage,
    AutomationCreatePage
  } from '../pages/Home/index';

export const DRAWER_MENU_PRIVILEDGE = [
    { 
        priviledgeId: "",
        name: 'Home', 
        icon: iconHome, 
        type: 'initialRoute', 
        components: LandingPage 
    },
    { 
        priviledgeId: "02ac2c76-53ce-11ea-8d77-2e728ce88125",
        name: 'Dashboard', 
        icon: iconGrids, 
        type: 'drawer', 
        components: DashboardPage 
    },
    { 
        priviledgeId: "",
        name: 'Subscription', 
        icon: iconComponents, 
        type: 'drawer', 
        components: SubscriptionPage 
    },
    { 
        priviledgeId: "",
        name: 'SubscriptionFilter', 
        icon: iconHome, 
        type: 'non-drawer', 
        components: SubscriptionFilter 
    },
    { 
        priviledgeId: "",
        name: 'Account', 
        icon: iconGrids, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: MyAccountPage 
    },
    { 
        priviledgeId: "711111aa-643a-11ea-bc55-0242ac130003",
        name: 'Change Password', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: ChangePasswordPage 
    },
    { 
        priviledgeId: "",
        name: 'About', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: AboutPage 
    },
    { 
        priviledgeId: "",
        name: 'Automation', 
        icon: iconComponents, 
        type: 'drawer', 
        width: 25,
        height: 25,
        components: AutomationPage 
    },
    { 
        priviledgeId: "",
        name: 'Automation Create', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: AutomationCreatePage 
    },
];
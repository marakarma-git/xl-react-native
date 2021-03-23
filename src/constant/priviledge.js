import { iconComponents, iconGrids, iconHome, iconAdmin } from "../assets/images";
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
    BannerManagementCreatePage
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
        name: 'Administration', 
        icon: iconAdmin, 
        type: 'drawer', 
        width: 25,
        height: 25,
        components: '',
        subMenu: [
            {
                priviledgeId: "",
                name: 'User Administration', 
                type: 'drawer', 
                width: 25,
                height: 25,
                components: UserAdministrationPage
            },
            { 
                priviledgeId: "",
                name: 'Role Administration', 
                type: 'drawer', 
                width: 25,
                height: 25,
                components: RoleAdministrationPage 
            },
            { 
                priviledgeId: "",
                name: 'Enterprise Management', 
                type: 'drawer', 
                width: 25,
                height: 25,
                components: EnterpriseManagementPage 
            },       
            { 
                priviledgeId: "",
                name: 'Subscription Package', 
                type: 'drawer', 
                width: 25,
                height: 25,
                components: SubscriptionPackagePage 
            },       
            { 
                priviledgeId: "",
                name: 'Banner Management', 
                type: 'drawer', 
                width: 25,
                height: 25,
                components: BannerManagementPage 
            },       
        ] 
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
        name: 'User Administration Create', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: UserAdministrationCreatePage 
    },
    { 
        priviledgeId: "",
        name: 'Role Administration Create', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: RoleAdministrationCreatePage 
    },
    { 
        priviledgeId: "",
        name: 'Role Administration Filter', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: RoleAdministrationFilterPage 
    },
    { 
        priviledgeId: "",
        name: 'Enterprise Management Filter', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: EnterpriseManagementFilterPage 
    },
    { 
        priviledgeId: "",
        name: 'Enterprise Management Onboard', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: EnterpriseManagementOnBoardPage 
    },
    { 
        priviledgeId: "",
        name: 'Subscription Package Management Filter', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: SubscriptionPackageFilterPage 
    },
    { 
        priviledgeId: "",
        name: 'Banner Management Create', 
        icon: iconComponents, 
        type: 'non-drawer', 
        width: 25,
        height: 25,
        components: BannerManagementCreatePage 
    },
]; 
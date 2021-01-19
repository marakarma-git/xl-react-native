import React from 'react';
import {
  LandingPage,
  DashboardPage,
  SubscriptionPage,
  MyAccountPage,
} from './Home/index';
import {CustomDrawerContent} from '../components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{backgroundColor: '#002DBB'}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={LandingPage} />
      <Drawer.Screen name="Dashboard" component={DashboardPage} />
      <Drawer.Screen name="Subscription" component={SubscriptionPage} />
      <Drawer.Screen name="Account" component={MyAccountPage} />
    </Drawer.Navigator>
  );
};
export default Home;

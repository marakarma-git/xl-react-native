import React from 'react';
import {LandingPage} from './Home/index';
import {CustomDrawerContent} from '../components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import Helper from '../helpers/helper';
import {colors} from '../constant/color';

const Drawer = createDrawerNavigator();

const Home = () => {
  const {authority} = useSelector((state) => state.auth_reducer.data);

  const generateHomeScreen = () => {
    const availableMenu = Helper.drawerData(authority, 'all');
    return availableMenu.map((menu, i) => (
      <Drawer.Screen key={i} name={menu.name} component={menu.components} />
    ));
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerStyle={{backgroundColor: colors.button_color_one}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {generateHomeScreen()}
    </Drawer.Navigator>
  );
};
export default Home;

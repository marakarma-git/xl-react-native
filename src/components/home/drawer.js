import React from 'react';
import { View, Image, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  iconUser,
  iconHome,
  iconComponents,
  iconGrids,
  iconLogout
} from '../../assets/images/index';
import styles from '../../style/drawer.style';


const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
  },
  {
    name: 'Dashboard',
    icon: iconGrids,
  },
  {
    name: 'Subscription',
    icon: iconComponents,
  },
];

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={iconUser}
        />
        <View style={{ paddingLeft: 15 }}>
          <Text style={styles.userName}>Gerry Geraldy</Text>
          <Text style={{ color: '#4BC1FD' }}>gerryg@xl.co.id</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Image style={{ width: 20, height: 20 }} source={item.icon} />
              <Text style={styles.menuTitle}>{item.name}</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate(item.name)}
        />
      ))}
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 15, height: 15, marginTop: 3, marginLeft: 6 }}
              source={iconLogout}
            />
            <Text style={styles.menuTitle}>Logout</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('Login')}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Image, Text, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  iconLogout,
  iconAboutus
} from '../../assets/images/index';
import { useSelector, useDispatch } from 'react-redux';
import { authLogout } from '../../redux/action/auth_action';
import styles from '../../style/drawer.style';
import { removeEnterPriseLogo } from '../../redux/action/enterprise_action';
import { TouchableOpacity } from 'react-native';
import Helper from '../../helpers/helper';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const [drawerData, setDrawerData] = useState([]);
  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout ?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(removeEnterPriseLogo());
            dispatch(authLogout());
          },
        },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    const drawerLoad = props.navigation.addListener('focus', () => {
      setDrawerData(Helper.addDrawerMenu(userData.authority));
    });

    return drawerLoad;
  });

  return (
    <DrawerContentScrollView {...props} style={{ padding: 0 }}>
      <View style={styles.avatarContainer}>
        {/* To-do Avatar Icon jika API sudah ada */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Account')}
          style={styles.userImageContainer}>
          <Ionicons name={'md-person'} color={'white'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Account')}
          style={{ paddingLeft: 15 }}>
          <Text style={styles.userName}>
            {userData.principal
              ? userData.principal.firstName + ' ' + userData.principal.lastName
              : ''}
          </Text>
          <Text style={{ color: '#4BC1FD' }}>
            {userData.principal && `${userData.principal.email || '-'}`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={[styles.menuLabelFlex]}>
              <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={item.icon} />
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
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
              source={iconAboutus}
            />
            <Text style={styles.menuTitle}>About</Text>
          </View>
        )}
        onPress={() => props.navigation.navigate('About')}
      />
      <View style={styles.divider} />
      <DrawerItem
        label={() => (
          <View style={styles.menuLabelFlex}>
            <Image
              style={{ width: 23, height: 23, resizeMode: 'contain' }}
              source={iconLogout}
            />
            <Text style={styles.menuTitle}>Logout</Text>
          </View>
        )}
        onPress={confirmLogout}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

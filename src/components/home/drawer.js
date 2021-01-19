import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image, Text, Alert, TouchableWithoutFeedback} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StackActions} from '@react-navigation/native';
import {
  iconUser,
  iconHome,
  iconComponents,
  iconGrids,
  iconLogout,
} from '../../assets/images/index';
import {useSelector, useDispatch} from 'react-redux';
import {authLogout} from '../../redux/action/auth_action';
import styles from '../../style/drawer.style';
import {removeEnterPriseLogo} from '../../redux/action/enterprise_action';
import { TouchableOpacity } from 'react-native';

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
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const confirmLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah anda yakin ingin logout ?',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yakin',
          onPress: () => {
            dispatch(removeEnterPriseLogo());
            dispatch(authLogout());
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <DrawerContentScrollView {...props} style={{padding: 0}}>
      <View
         style={styles.avatarContainer}>
          {/* To-do Avatar Icon jika API sudah ada */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Account')} 
          style={styles.userImageContainer}>
          <Ionicons name={'md-person'} color={'white'} size={24} /> 
        </TouchableOpacity>  
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('Account')} 
          style={{paddingLeft: 15}}>
          <Text style={styles.userName}>
            {userData.principal
              ? userData.principal.firstName + ' ' + userData.principal.lastName
              : ''}
          </Text>
          <Text style={{color: '#4BC1FD'}}>
            {userData.principal && `${userData.principal.email || "-"}` }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      {drawerData.map((item, idx) => (
        <DrawerItem
          key={`drawer_item-${idx + 1}`}
          label={() => (
            <View style={styles.menuLabelFlex}>
              <Image style={{width: 20, height: 20}} source={item.icon} />
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
              style={{width: 15, height: 15, marginTop: 3, marginLeft: 6}}
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

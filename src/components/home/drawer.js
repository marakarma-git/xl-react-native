import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image, Alert} from 'react-native';
import {Text} from '../../components';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {iconLogout, iconAboutus} from '../../assets/images/index';
import {useSelector, useDispatch} from 'react-redux';
import {authLogout} from '../../redux/action/auth_action';
import {removeEnterPriseLogo} from '../../redux/action/enterprise_action';
import {TouchableOpacity} from 'react-native';

import Helper from '../../helpers/helper';
import privHelper from '../../helpers/privHelper';
import styles from '../../style/drawer.style';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const [drawerData, setDrawerData] = useState([]);
  const [activeMenu, setActiveMenu] = useState('Home');
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
      {cancelable: false},
    );
  };

  const drawerOnPress = (menuName, subMenu) => {
    if (subMenu) {
      if (activeMenu != menuName) {
        setActiveMenu(menuName);
      } else {
        setActiveMenu('');
      }
    } else {
      props.navigation.navigate(menuName);
      setActiveMenu(menuName);
    }
  };

  const generateDrawerMenu = (listDrawer, type = 'menu') =>
    listDrawer.map((item, index) => (
      <React.Fragment>
        <CustomMenu
          type={type}
          key={index + 1}
          style={{
            backgroundColor: type == 'submenu' ? '#122b86' : 'transparent',
          }}
          index={index}
          item={item}
          activeMenu={activeMenu}
          submitEvent={() => drawerOnPress(item.name, item.subMenu)}
        />
        {item.subMenu &&
          activeMenu == item.name &&
          generateDrawerMenu(item.subMenu, 'submenu')}
      </React.Fragment>
    ));

  useEffect(() => {
    const drawerLoad = props.navigation.addListener('focus', () => {
      setDrawerData(Helper.addDrawerMenu(userData.authority));
    });

    return drawerLoad;
  });

  return (
    <DrawerContentScrollView {...props} style={{padding: 0}}>
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          disabled={!privHelper.isHasPriviledge("MA", userData.authority)}
          onPress={() => props.navigation.navigate('Account')}
          style={styles.userImageContainer}>
          <Ionicons name={'md-person'} color={'white'} size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!privHelper.isHasPriviledge("MA", userData.authority)}
          onPress={() => props.navigation.navigate('Account')}
          style={{paddingLeft: 15}}>
          <Text fontType="regular" style={styles.userName}>
            {userData.principal
              ? userData.principal.firstName + ' ' + userData.principal.lastName
              : ''}
          </Text>
          <Text style={{color: '#4BC1FD'}}>
            {userData.principal && `${userData.principal.email || '-'}`}
          </Text>
        </TouchableOpacity>
      </View>
      {drawerData.length > 0 && <View style={styles.divider} />}
      {generateDrawerMenu(drawerData)}
      <View style={styles.divider} />
      <CustomMenu
        item={{name: 'About', icon: iconAboutus}}
        activeMenu={activeMenu}
        submitEvent={() => drawerOnPress('About', '')}
      />
      <View style={styles.divider} />
      <CustomMenu
        item={{name: 'Logout', icon: iconLogout}}
        activeMenu={activeMenu}
        submitEvent={() => confirmLogout()}
      />
    </DrawerContentScrollView>
  );
};

const CustomMenu = ({item, style, activeMenu, submitEvent, type = 'menu'}) => {
  return (
    <View
      style={[style, activeMenu == item.name && {backgroundColor: '#122b86'}]}>
      <DrawerItem
        label={() => (
          <View
            style={[styles.menuLabelFlex, type != 'menu' && {paddingLeft: 20}]}>
            {type == 'menu' && (
              <Image style={styles.iconDrawer} source={item.icon} />
            )}
            <Text
              fontType={activeMenu == item.name && 'bold'}
              style={[styles.menuTitle]}>
              {item.name}
            </Text>
            {item.subMenu && (
              <Ionicons
                name={activeMenu == item.name ? 'caret-down' : 'caret-back'}
                color={'white'}
                style={styles.caretMenu}
              />
            )}
          </View>
        )}
        onPress={submitEvent}
      />
    </View>
  );
};

export default CustomDrawerContent;

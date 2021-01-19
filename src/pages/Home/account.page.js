import React, {useState} from 'react';
import {Card} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  HeaderContainer,
  OverlayBackground,
  AccountForm,
} from '../../components/index';
import {authLogout} from '../../redux/action/auth_action';
import {removeEnterPriseLogo} from '../../redux/action/enterprise_action';

import styles from '../../style/account.style';

const userForm = [
  {title: 'First Name', key: 'firstName'},
  {title: 'Last Name', key: 'lastName'},
  {title: 'User ID', key: 'username'},
  {title: 'Mobile Phone', key: 'phoneNumber'},
  {title: 'Email Address', key: 'email'},
  {title: 'Language', key: 'language'},
];

const MyAccountPage = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  const [form, setForm] = useState(userData.principal);
  const [editable] = useState(false);

  const inputHandler = (name, key) => {
    setForm({
      ...form,
      [name]: key,
    });
  };

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
    <View>
      <HeaderContainer
        navigation={props.navigation}
        companyLogo={imageBase64}
        headerTitle={'My Account'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 130,
          }}>
          <OverlayBackground />
          <TouchableOpacity style={styles.avatarContainer}>
            {/* To-do Jadiin Image Pas API udah ada */}
            <Ionicons name={'md-person'} color={'white'} size={108} />
            {/* To-do Edit Gambar */}
            {/* <MaterialCommunityIcons name={'square-edit-outline'} size={38} style={styles.editIcon} /> */}
          </TouchableOpacity>
          {userData.principal && (
            <Card style={styles.accountPlaceholder}>
              <Text
                style={
                  styles.nameText
                }>{`${userData.principal.firstName} ${userData.principal.lastName}`}</Text>
              <Text style={styles.usernameText}>
                {userData.principal.email || '-'}
              </Text>
            </Card>
          )}
          <Card style={styles.basicContainer}>
            <View style={styles.cardTitleWrapper}>
              <Text style={styles.nameText}>Basic Information</Text>
              {/* To-do Edit User */}
              {/* <TouchableOpacity
              onPress={() => setEditable(!editable)}>
              <MaterialCommunityIcons name={editable ? 'cancel' : 'square-edit-outline'} size={32} style={styles.editIconCard} />
            </TouchableOpacity> */}
            </View>
            <AccountForm
              value={form}
              formList={userForm}
              editable={editable}
              inputHandler={inputHandler}
            />
            {/* Todo Change Password */}
            {/* <TouchableOpacity>
                <Text style={styles.linkText}>Change Password</Text>
              </TouchableOpacity> */}
            {editable && (
              <TouchableOpacity
                onPress={() => alert('Todo edit user')}
                style={styles.blockButton}>
                <Text style={{fontSize: 14, color: 'white'}}>Save</Text>
              </TouchableOpacity>
            )}
          </Card>
          <View style={styles.footer}>
            <TouchableOpacity onPress={confirmLogout}>
              <Text style={styles.logoutButton}>
                <AntDesign
                  name={'logout'}
                  size={20}
                  style={styles.editIconCard}
                />{' '}
                &nbsp; Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default MyAccountPage;

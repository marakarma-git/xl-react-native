import React, {useEffect, useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import {ScrollView, View, Dimensions} from 'react-native';
import { FormStepComponent, HeaderContainer, OverlayBackground, AccountForm, PasswordInput } from '../../components';

import style from '../../style/home.style';

const FormStepPage = ({navigation}) => {
  const [formPosition, setFormPosition] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  const formArray = [
    {
      title: 'User Information',
      body: [
        { component: <CreateBasicUserInformation />, componentTitle: "Basic Information"},
      ]
    },
    {
      title: 'Organzations',
      body: [
        { component: <CreateBasicUserInformation /> },
      ]
    },
    {
      title: 'Roles',
      body: [
        { component: <CreateBasicUserInformation /> },
      ]
    },
    {
      title: 'Summary',
      body: [
        { component: <CreateBasicUserInformation /> },
      ]
    },
  ]

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Dev Form Step'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}>
          <OverlayBackground />
          <FormStepComponent 
            formPosition={formPosition} 
            formTitle={formArray[formPosition].title} f
            formLength={formArray.length}
            formBody={formArray[formPosition].body}
            onBack={() => setFormPosition(prevState => prevState - 1)}
            onNext={() => setFormPosition(prevState => prevState + 1)}
            onSubmit={() => alert("Submit Todo")}
            />
      </ScrollView>
    </View>
  );
};

const userForm = [
  {title: 'First Name', key: 'firstName'},
  {title: 'Last Name', key: 'lastName'},
  {title: 'User ID', key: 'username'},
  {title: 'Mobile Phone', key: 'phoneNumber'},
  {title: 'Email Address', key: 'email'},
  {title: 'Language', key: 'language'},
];

const CreateBasicUserInformation = (props) => {
  const [form, setForm] = useState([]);

  const inputHandler = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  return(
    //those value and handler are temporary
    <AccountForm 
      formList={userForm}
      editable={true}
      value={form}
      inputHandler={inputHandler}
    />
  );
}

export default FormStepPage;

import React, {useEffect, useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import {ScrollView, View} from 'react-native';
import {
  Text, 
  FormStepComponent, 
  HeaderContainer, 
  OverlayBackground, 
  AccountForm, 
  FormPassword  
} from '../../components';
import { RadioButton } from 'react-native-paper';

import style from '../../style/home.style';

const FormStepPage = ({navigation}) => {
  const [formPosition, setFormPosition] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  const formArray = [
    {
      title: 'User Information',
      body: [
        { component: <CreateBasicUserInformation />, componentTitle: "Basic Information"},
        { component: <CreateBasicCreatePassword />, componentTitle: "Password"},
      ]
    },
    {
      title: 'Organzations',
      body: [
        { component: <CreateOrganization />, componentTitle: "Organizations" },
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

const passwordFormArray = [
  {
    name: 'Password',
    label: 'Password',
    required: true,
    visible: false,
    validation: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    required: true,
    visible: false,
    validation: false,
  },
];

const passwordRulesArray = [
  {label: 'Be between 8 and 30 characters', valid: false},
  {label: 'contain at least 1 number 0-9', valid: false},
  {label: 'contain at least 1 lower case letter (a-z)', valid: false},
  {label: 'contain at least 1 upper case letter (A-Z)', valid: false},
  {
    label: 'not contain more than 3 consecutives identical characters',
    valid: true,
  },
  {
    label: 'not contain more than 3 consecutives lower-case characters',
    valid: true,
  },
  {
    label:
      'contain only the following characters a-z, A-Z, 0-9, #, -, !, @, %, &, /, (, ), ?, + *',
    valid: true,
  },
  {label: "match the entry in 'Confrim Password'", valid: true},
];

const CreateBasicCreatePassword = (props) => {

  const passwordValidator = (value) => {
    let isEmpty = value == 0;

    const newPasswordRules = [...passwordRules];

    newPasswordRules[0].valid =
      value.length >= 8 && value.length < 30 ? true : false;
    newPasswordRules[1].valid = /(?=.*[0-9])/.test(value) ? true : false;
    newPasswordRules[2].valid = /(?=.*[a-z])/.test(value) ? true : false;
    newPasswordRules[3].valid = /(?=.*[A-Z])/.test(value) ? true : false;
    newPasswordRules[4].valid = /(.)\1{3,}/.test(value) ? false : true;
    newPasswordRules[5].valid = /([a-z]){4}/.test(value) ? false : true;
    newPasswordRules[6].valid =
      /^[a-zA-Z0-9#*!?+&@.$%\-,():;/]+$/.test(value) || isEmpty ? true : false;

    setPasswordRules(newPasswordRules);
  };
  
  return(
    <View style={{ alignItems: 'center' }}>
      <FormPassword 
        formList={passwordFormArray}
        passwordRules={passwordRulesArray}
        passwordValidator={passwordValidator}
        
      />
    </View>
  );
}

const CreateOrganization = () => {
  return(
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
      <RadioButton
        value="first"
        status={"unchecked"}
      />
      <Text style={{ fontSize: 14 }}>XL User</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
      <RadioButton
        value="second"
        status={"unchecked"}
      />
      <Text style={{ fontSize: 14 }}>Non XL User</Text>
      </View>
    </View>
  )
}

export default FormStepPage;

import React from 'react';
import {View} from 'react-native';
import { FormPassword } from '../../components';

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

CreateBasicCreatePassword.propTypes = {};

export default CreateBasicCreatePassword;
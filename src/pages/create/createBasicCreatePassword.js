import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import { FormPassword } from '../../components';

const passwordFormArray = [
  {
    name: 'password',
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

  const [passwordForm, setPasswordForm] = useState(passwordFormArray);
  const [passwordRules, setPasswordRules] = useState(passwordRulesArray);

  const inputHandler = (name, value, validation) => {
    props.setUserPassword({...props.userPassword, [name]: value});
    {
      validation && passwordValidator(value);
    }
    {
      validation && matchConfirmPassword();
    }
  };

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

  const matchConfirmPassword = () => {
    const newPasswordRules = [...passwordRules];

    newPasswordRules[7].valid = props.userPassword.password == props.userPassword.confirmPassword;
    setPasswordRules(newPasswordRules);
  };

  const checkFormComplete = () => {
    let validRules = 0;
    const passwordRulesLength = passwordRules.length;
    passwordRules.map((rules) => rules.valid && validRules++);
    const validationRulesComplete = validRules === passwordRulesLength;

    if (props.userPassword.password.length > 0 && validationRulesComplete) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }
  };

  useEffect(() => {
    checkFormComplete();
    matchConfirmPassword();
  }, [props.userPassword])
  
  return(
    <View style={{ alignItems: 'center' }}>
      <FormPassword 
        form={props.userPassword}
        passwordForm={passwordForm}
        setPasswordForm={setPasswordForm}
        passwordRules={passwordRules}
        passwordValidator={passwordValidator}
        inputHandler={inputHandler}
      />
    </View>
  );
}

CreateBasicCreatePassword.propTypes = {
  userPassword: PropTypes.array,
  setIsComplete: PropTypes.func,
  setUserPassword: PropTypes.func
};

CreateBasicCreatePassword.defaultProps = {
  userPassword: [],
  setIsComplete: () => {},
  setUserPassword: () => {}
}

export default CreateBasicCreatePassword;
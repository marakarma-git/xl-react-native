import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {FormPassword} from '../../components';

const CreateBasicCreatePassword = (props) => {
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

    const newPasswordRules = [...props.passwordRules];

    newPasswordRules[0].valid =
      value.length >= 8 && value.length < 30 ? true : false;
    newPasswordRules[1].valid = /(?=.*[0-9])/.test(value) ? true : false;
    newPasswordRules[2].valid = /(?=.*[a-z])/.test(value) ? true : false;
    newPasswordRules[3].valid = /(?=.*[A-Z])/.test(value) ? true : false;
    newPasswordRules[4].valid = /(?=.?[/\!@#?\$%\\&\,\)\(+-])/.test(value)
      ? true
      : false;
    newPasswordRules[5].valid = /(.)\1{3,}/.test(value) ? false : true;
    newPasswordRules[6].valid = /([a-z]){4}/.test(value) ? false : true;

    props.setPasswordRules(newPasswordRules);
  };

  const matchConfirmPassword = () => {
    const newPasswordRules = [...props.passwordRules];

    newPasswordRules[7].valid =
      props.userPassword.password == props.userPassword.confirmPassword;

    props.setPasswordRules(newPasswordRules);
    checkFormComplete();
  };

  const checkFormComplete = () => {
    let validRules = 0;

    const passwordRulesLength = props.passwordRules.length;
    props.passwordRules.map((rules) => rules.valid && validRules++);

    const validationRulesComplete = validRules === passwordRulesLength;

    if (props.userPassword.password.length > 0 && validationRulesComplete) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }
  };

  useEffect(() => {
    matchConfirmPassword();
  }, [props.userPassword]);

  return (
    <View style={{alignItems: 'center'}}>
      <FormPassword
        form={props.userPassword}
        passwordForm={props.passwordForm}
        setPasswordForm={props.setPasswordForm}
        passwordRules={props.passwordRules}
        passwordValidator={passwordValidator}
        inputHandler={inputHandler}
      />
    </View>
  );
};

CreateBasicCreatePassword.propTypes = {
  passwordForm: PropTypes.object,
  passwordRules: PropTypes.object,
  userPassword: PropTypes.object,
  setIsComplete: PropTypes.func,
  setUserPassword: PropTypes.func,
  setPasswordForm: PropTypes.func,
  setPasswordRules: PropTypes.func,
};

CreateBasicCreatePassword.defaultProps = {
  passwordForm: {},
  passwordRules: {},
  userPassword: [],
  setIsComplete: () => {},
  setUserPassword: () => {},
  setPasswordForm: () => {},
  setPasswordRules: () => {},
};

export default CreateBasicCreatePassword;

import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../style/account.style';

const passwordRulesArray = [
  {label: 'contain at least 1 number 0-9', valid: null},
  {label: 'contain at least 1 lower case letter (a-z)', valid: null},
  {label: 'contain at least 1 upper case letter (A-Z)', valid: null},
  {
    label: 'not contain more than 3 consecutives identical characters',
    valid: null,
  },
  {
    label: 'not contain more than 3 consecutives lower-case characters',
    valid: null,
  },
  {
    label:
      'contain only the following characters a-z, A-Z, 0-9, #, -, !, @, %, &, /, (, ), ?, + *',
    valid: null,
  },
  {label: "match the entry in 'Confrim Password'", valid: null},
];

const passwordFormArray = [
  {
    name: 'oldPassword',
    label: 'Current Password',
    required: true,
    visible: false,
    validation: false,
  },
  {
    name: 'newPassword',
    label: 'New Password',
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

const PasswordInput = ({submitHandler, requestLoading, navigation}) => {
  const userData = useSelector((state) => state.auth_reducer.data);
  const [passwordForm, setPasswordForm] = useState(passwordFormArray);
  const [passwordRules, setPasswordRules] = useState(passwordRulesArray);
  const [formComplete, setFormComplete] = useState(false);
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    updatedBy: userData ? userData.principal.username : '',
    username: userData ? userData.principal.username : '',
  });

  const inputHandler = (name, value, validation) => {
    setForm({...form, [name]: value});
    {
      validation && passwordValidator(value);
    }
    {
      validation && matchConfirmPassword();
    }
  };

  const passwordValidator = (value) => {
    const newPasswordRules = [...passwordRules];

    if (value.length > 0) {
      newPasswordRules[0].valid = /(?=.*[0-9])/.test(value) ? true : false;
      newPasswordRules[1].valid = /(?=.*[a-z])/.test(value) ? true : false;
      newPasswordRules[2].valid = /(?=.*[A-Z])/.test(value) ? true : false;
      newPasswordRules[3].valid = /(.)\1{3,}/.test(value) ? false : true;
      newPasswordRules[4].valid = /([a-z]){3}/.test(value) ? true : false;
      newPasswordRules[5].valid = /^[a-zA-Z0-9#*!?+&@.$%\-,():;/]+$/.test(value)
        ? true
        : false;

      setPasswordRules(newPasswordRules);
    } else {
      newPasswordRules.map((rules) => (rules.valid = false));
      setPasswordRules(newPasswordRules);
    }
  };

  const matchConfirmPassword = () => {
    const newPasswordRules = [...passwordRules];

    if (form.newPassword.length > 0) {
      newPasswordRules[6].valid = form.newPassword == form.confirmPassword;
      setPasswordRules(newPasswordRules);
    }
  };

  const generateForm = () =>
    passwordForm.map((forms, index) => (
      <View key={index} style={styles.formGroup}>
        <Text style={styles.label}>
          {forms.label}
          {forms.required && <Text style={{color: 'red'}}> *</Text>}
        </Text>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            onFocus={() =>
              forms.validation && passwordValidator(form.newPassword)
            }
            onChangeText={(text) =>
              inputHandler(forms.name, text, forms.validation)
            }
            value={form[forms.name]}
            style={styles.passwordInput}
            secureTextEntry={!forms.visible}
            placeholder={forms.label}
            name={forms.name}
          />
          <ButtonShowHide
            visible={forms.visible}
            position={index}
            passwordForm={passwordForm}
            setPasswordForm={setPasswordForm}
          />
        </View>
      </View>
    ));

  const generatePasswordRules = () =>
    passwordRules.map((rules, index) => (
      <Text
        key={index}
        style={{
          fontSize: 12,
          color: rulesColorValidator(rules.valid),
          textAlign: 'left',
        }}>
        <Entypo color={rulesColorValidator(rules.valid)} name="dot-single" />
        &nbsp;
        {rules.label}
      </Text>
    ));

  const rulesColorValidator = (valid) => {
    if (valid) {
      return '#00D3A0';
    }
    if (valid == false) {
      return 'red';
    }
    return '#949494';
  };

  const checkFormComplete = () => {
    let validRules = 0;
    const passwordRulesLength = passwordRules.length;
    passwordRules.map((rules) => rules.valid && validRules++);
    const validationRulesComplete = validRules === passwordRulesLength;

    if (form.newPassword.length > 0 && validationRulesComplete) {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  };

  useEffect(() => {
    if (form.confirmPassword.length > 0) {
      matchConfirmPassword();
    }
    checkFormComplete();
    return;
  }, [form]);

  return (
    <View style={[styles.formContainer, {marginTop: 10}]}>
      {generateForm()}
      <View style={styles.passwordRulesContainer}>
        <Text style={{fontSize: 12, color: '#949494', textAlign: 'left'}}>
          Follow the Password validation rules:{' '}
        </Text>
        {generatePasswordRules()}
      </View>
      <View style={styles.buttonGroupContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.buttonGroup, {backgroundColor: '#AFAFAF'}]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => submitHandler(form)}
          disabled={!formComplete ? true : false}
          style={[
            styles.buttonGroup,
            {backgroundColor: !formComplete ? '#949494' : '#002DBB'},
          ]}>
          {requestLoading ? (
            <ActivityIndicator color={'#fff'} style={styles.buttonText} />
          ) : (
            <Text style={styles.buttonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ButtonShowHide = ({visible, position, passwordForm, setPasswordForm}) => {
  const showHide = () => {
    const newForm = [...passwordForm];
    newForm[position].visible = !passwordForm[position].visible;
    setPasswordForm(newForm);
  };

  return (
    <TouchableOpacity onPress={showHide} style={styles.buttonShowHide}>
      <Feather color="#A8A8A8" size={20} name={visible ? 'eye-off' : 'eye'} />
    </TouchableOpacity>
  );
};

export default PasswordInput;
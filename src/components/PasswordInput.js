import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text} from '../components';
import {useDispatch} from 'react-redux';
import {ModalTermCondition} from '../components';


import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../style/account.style';
import { authLogout } from '../redux/action/auth_action';

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

const formBody = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const PasswordInput = ({submitHandler, requestLoading, navigation, orientation, isCreate = false}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth_reducer.data);
  const homeLogin = useSelector((state) => state.auth_reducer.homeLogin);
  const [passwordForm, setPasswordForm] = useState(passwordFormArray);
  const [passwordRules, setPasswordRules] = useState(passwordRulesArray);
  const [formComplete, setFormComplete] = useState(false);
  const [form, setForm] = useState(formBody);
  const [showModal, setShowModal] = useState(true);

  const inputHandler = (name, value, validation) => {
    setForm({...form, [name]: value});
    {
      validation && passwordValidator(value);
    }
    {
      validation && matchConfirmPassword();
    }
  };

  const goBack = () => {
    if(userData.principal.mustChangePass && !homeLogin){
      dispatch(authLogout());
      navigation.replace("Auth");
    }else{
      navigation.goBack();
    }
  }

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

    newPasswordRules[7].valid = form.newPassword == form.confirmPassword;
    setPasswordRules(newPasswordRules);
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
      return '#048004';
    }
    if (valid == false) {
      return '#FF0101';
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
    matchConfirmPassword();
    checkFormComplete();
  }, [form]);

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {

      setForm({...formBody});
      setPasswordForm([
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
      ]);
      setPasswordRules([
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
      ]);
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View style={{ alignItems: 'center', position: 'relative', top: -60 }}>
        <View style={[styles.formContainer, 
          {marginTop: 10, borderColor: '#8D8D8D', borderWidth: 0.8, width: orientation === 'potrait' ? '90%' : '50%', backgroundColor: 'white'}]}>
            <Text style={styles.headerText}>Password</Text>
            {generateForm()}
            { userData?.principal?.mustChangePass && !userData?.principal?.isCustomerConsent
            && <ModalTermCondition 
                showModal={showModal} 
                closeModal={() => setShowModal(!showModal)}
                title={'Terms of Use & Privacy Policy'}/>}
            <View style={styles.passwordRulesContainer}>
              <Text style={{fontSize: 12, color: '#949494', textAlign: 'left'}}>
                Follow the Password validation rules:{' '}
              </Text>
              {generatePasswordRules()}
            </View>
        </View>
      {
        !isCreate &&
        <View style={[styles.buttonGroupContainer, { width: orientation === 'potrait' ? '80%' : '40%' }]}>
          <TouchableOpacity
            onPress={goBack}
            style={[styles.buttonGroup, {backgroundColor: '#AFAFAF'}]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => submitHandler(form)}
            disabled={!formComplete ? true : false}
            style={[
              styles.buttonGroup,
              {backgroundColor: '#002DBB'},
            ]}>
            {requestLoading ? (
              <ActivityIndicator color={'#fff'} style={styles.buttonText} />
            ) : (
              <Text style={styles.buttonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </View>
      }
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
      <Feather color="#A8A8A8" size={20} name={visible ? 'eye' : 'eye-off'} />
    </TouchableOpacity>
  );
};

export default PasswordInput;

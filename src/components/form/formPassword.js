import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '../index';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import styles from '../../style/account.style';

const FormPassword = (props) => {

    const rulesColorValidator = (valid) => {
        if (valid) {
          return '#048004';
        }
        if (valid == false) {
          return '#FF0101';
        }
        return '#949494';
      };

    return(
        <React.Fragment>
            { props.formList.map((form, index) => (
                <View key={index} style={styles.formGroup}>
                    <Text style={styles.label}>
                    {form.label}
                    {form.required && <Text style={{color: 'red'}}> *</Text>}
                    </Text>
                    <View style={styles.passwordInputWrapper}>
                    <TextInput
                        onFocus={() =>
                        form.validation && props.passwordValidator(form.newPassword)
                        }
                        onChangeText={(text) =>
                        props.inputHandler(form.name, text, form.validation)
                        }
                        value={form[form.name]}
                        style={styles.passwordInput}
                        secureTextEntry={!form.visible}
                        placeholder={form.label}
                        name={form.name}
                    />
                    <ButtonShowHide
                        visible={form.visible}
                        position={index}
                        passwordForm={props.passwordForm}
                        setPasswordForm={props.setPasswordForm}
                    />
                    </View>
                </View>
            )) }
            <View style={styles.passwordRulesContainer}>
            <Text style={{fontSize: 12, color: '#949494', textAlign: 'left'}}>
                Follow the Password validation rules:{' '}
            </Text>
            { 
                props.passwordRules.map((rules, index) => (
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
                  ))
            }
            </View>
        </React.Fragment>
    );
}

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

FormPassword.propTypes = {
    formList: PropTypes.array,
    passwordRules: PropTypes.array,
    passwordForm: PropTypes.object,
    setPasswordForm: PropTypes.func,
    inputHandler: PropTypes.func,
    passwordValidator: PropTypes.func
}

FormPassword.defaultProps = {
    formList: [],
    passwordRules: [],
    passwordForm: {},
    setPasswordForm: () => {},
    inputHandler: () => {},
    passwordValidator: () => {}
}

export default FormPassword;
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { View, TextInput, Text } from 'react-native';

import styles from '../style/account.style';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const passwordRules = [
    { label: 'contain at least 1 number 0-9', valid: null },
    { label: 'contain at least 1 lower case letter (a-z)', valid: null },
    { label: 'contain at least 1 upper case letter (A-Z)', valid: null },
    { label: 'not contain more than 3 consecutives identical characters', valid: null },
    { label: 'not contain more than 3 consecutives lower-case characters', valid: null },
    { label: 'contain only the following characters a-z, A-Z, 0-9, #, -, !, @, %, &, /, (, ), ?, + *', valid: null },
    { label: "match the entry in 'Confrim Password'", valid: null },
];

const PasswordInput = ({ submitHandler }) => {

    const generatePasswordRules = () => (
        passwordRules.map((rules, index) => (
            <Text key={index} style={{ fontSize: 12, color: rulesColorValidator(rules.valid), textAlign: 'left' }}>
                <Entypo color={rulesColorValidator(rules.valid)} name="dot-single" /> 
                &nbsp;
                {rules.label}
            </Text>
        ))
    );
    
    const rulesColorValidator = (valid) => {
        if (valid) return '#00D3A0';
        if (valid == false) return 'red';
        return '#949494';
    }

    return(
        <View style={[styles.formContainer, { marginTop: 10 }]}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Username <Text style={{ color: 'red' }}>*</Text></Text>
                <TextInput
                    style={styles.textInputContainer}/>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>New Password <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.passwordInputWrapper}>
                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry
                    placeholder={"New Password"}
                    name="password"/>
                <ButtonShowHide />
                </View>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Confirm Password <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.passwordInputWrapper}>
                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry
                    placeholder={"Confirm Password"}
                    name="confirmPassword"/>
                <ButtonShowHide />
                </View>
            </View>
            <View style={styles.passwordRulesContainer}>
                <Text style={{ fontSize: 12, color: '#949494', textAlign: 'left' }}>Follow the Password validation rules: </Text>
                { generatePasswordRules() }
            </View>
            <View style={styles.buttonGroupContainer}>
                <TouchableOpacity style={[styles.buttonGroup, { backgroundColor: '#AFAFAF' }]}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonGroup, { backgroundColor: '#002DBB' }]}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const ButtonShowHide = ({ visible }) => {
    return(
        <TouchableOpacity style={styles.buttonShowHide}>
            <Feather color="#A8A8A8" size={20} name={visible ? "eye-off" : "eye"} />
        </TouchableOpacity>
    );
}

export default PasswordInput;
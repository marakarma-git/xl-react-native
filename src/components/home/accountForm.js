import React from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from '../../style/account.style';

const AccountFormComponent  = ({ formList, editable = false, value, inputHandler }) => {

    const generateForm = () => (
        <>
            { formList.map((form, index) => (
                <View 
                    key={index}
                    style={styles.formGroup}>
                    <Text style={styles.label}>{form.title}</Text>
                    <TextInput 
                        onChangeText={(text) => inputHandler(form.key, text)}
                        style={styles.textInputContainer} 
                        value={value[form.key] || '-' } 
                        editable={editable} 
                        placeholder={form.title}/>
                </View>
            )) }
        </>
    );

    return(
        <View style={styles.formContainer}>
            { generateForm() }
        </View>
    );

}

export default AccountFormComponent;
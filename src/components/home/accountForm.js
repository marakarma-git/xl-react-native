import React from 'react';
import {View, TextInput} from 'react-native';
import {Text} from '../index';

import styles from '../../style/account.style';

const AccountFormComponent = ({
  formList,
  editable = false,
  value,
  inputHandler,
  isValidate,
  formError,
}) => {
  const generateForm = () => (
    <>
      {formList.map((form, index) => (
        <View key={index} style={styles.formGroup}>
          <Text style={styles.label}>
              {form.title}
              {form.isRequired && <Text style={{color: 'red'}}> *</Text>}
          </Text>
          <TextInput
            onChangeText={(text) => inputHandler(form.key, text)}
            style={styles.textInputContainer}
            value={value[form.key]}
            editable={editable}
            placeholder={form.title}
          />
          {
            isValidate && formError[form.key] &&
            <Text style={{ color: 'red' }}>{formError[form.key]}</Text>
          }
        </View>
      ))}
    </>
  );

  return <View style={styles.formContainer}>{generateForm()}</View>;
};

export default AccountFormComponent;

import React from 'react';
import {View, TextInput} from 'react-native';
import {Text} from '../index';
import DropDownPicker from 'react-native-dropdown-picker';

import styles from '../../style/account.style';

const AccountFormComponent = ({
  formList,
  editable = false,
  value,
  inputHandler,
  isValidate,
  formError,
  setIsTouch = () => {}
}) => {
  
  const formType = (form) => {
    if(editable){
      switch (form.type) {
        case "text":
          return(
            <TextInput
              onFocus={() => setIsTouch(true)}
              onChangeText={(text) => inputHandler(form.key, text)}
              style={styles.textInputContainer}
              value={value[form.key]}
              editable={editable}
              placeholder={form.title}
            />
          );
        case "select":
          return(
            <DropDownPicker
              disabled={!editable}
              setValue={form.config?.setValue}
              open={form.config?.isOpen}
              items={form.options}
              style={styles.textInputContainer} 
              dropDownDirection="TOP"
              dropDownContainerStyle={{ borderRadius: 3 }}
              searchable={form.config?.searchable}
              setOpen={form.config?.onClick}
              value={value[form.key] || form.config?.defaultValue}
            />
          )
      
        default:
          return(
            <TextInput
              onFocus={() => setIsTouch(true)}
              onChangeText={(text) => inputHandler(form.key, text)}
              style={styles.textInputContainer}
              value={value[form.key]}
              editable={editable}
              placeholder={form.title}
            />
          );
      }
    }else{
      return(
        <TextInput
          onFocus={() => setIsTouch(true)}
          onChangeText={(text) => inputHandler(form.key, text)}
          style={styles.textInputContainer}
          value={value[form.key]}
          editable={editable}
          placeholder={form.title}
        />
      );
    }
  }

  const generateForm = () => (
    <>
      {formList.map((form, index) => (
        <View key={index} style={styles.formGroup}>
          <Text style={styles.label}>
              {form.title}
              {form.isRequired && <Text style={{color: 'red'}}> *</Text>}
          </Text>
          { formType(form) }
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

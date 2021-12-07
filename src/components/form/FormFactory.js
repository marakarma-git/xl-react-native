import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import TextInputComponent from './TextInput';
import DropDownPickerComponent from './DropDownPicker';
import TextAreaInputComponent from './TextArea';
import Text from '../global/text';
import {View} from 'react-native';
import {colors} from '../../constant/color';
import DocumentPickerComponent from './DocumentPicker';

const FormFactoryComponent = (props) => {
  const {
    formList,
    editable,
    value,
    inputHandler,
    isValidate,
    formError,
    setIsTouch,
  } = props;
  const formType = (form) => {
    if (editable) {
      console.log(form?.config, ' <<< CONFIG');
      switch (form.type) {
        case 'text':
          return (
            <TextInputComponent
              name={form.name}
              setIsTouch={setIsTouch}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={form?.editable}
              placeholder={form.title}
            />
          );
        case 'select':
          return (
            <DropDownPickerComponent
              disabled={!editable}
              setValue={form?.config?.setValue}
              placeholder={form?.config?.placeholder}
              options={form.options}
              searchable={form?.config?.searchable}
              value={value[form.name] || form?.config?.defaultValue}
            />
          );
        case 'textarea':
          return (
            <TextAreaInputComponent
              name={form.name}
              setIsTouch={setIsTouch}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={form?.editable}
              placeholder={form.title}
            />
          );
        case 'document-picker':
          return <DocumentPickerComponent />;
        case 'color-picker':
          return;
        default:
          return (
            <TextInputComponent
              name={form.name}
              setIsTouch={setIsTouch}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={form?.editable}
              placeholder={form.title}
            />
          );
      }
    } else {
      return (
        <TextInputComponent
          name={form.name}
          setIsTouch={setIsTouch}
          inputHandler={inputHandler}
          value={value[form.name]}
          editable={editable}
          placeholder={form.title}
        />
      );
    }
  };

  const generateForm = () => (
    <>
      {formList.map((form, index) => (
        <View key={index} style={styles.formGroup}>
          <Text fontType="bold" style={styles.label}>
            {form.title}
            {form.isRequired && <Text style={{color: colors.delete}}> *</Text>}
          </Text>
          {formType(form)}
          {isValidate && formError[form.name] && (
            <Text style={{color: colors.delete}}>
              {formError[form.name] || ' '}
            </Text>
          )}
        </View>
      ))}
    </>
  );

  return <View style={styles.formContainer}>{generateForm()}</View>;
};

FormFactoryComponent.propTypes = {
  formList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      validation: PropTypes.bool,
      isRequired: PropTypes.bool.isRequired,
      type: PropTypes.oneOf([
        'text',
        'select',
        'textarea',
        'document-picker',
        'color-picker',
      ]),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        }),
      ),
      config: PropTypes.shape({
        searchable: PropTypes.bool,
        setValue: PropTypes.func,
        placeholder: PropTypes.string,
      }),
      editable: PropTypes.bool,
    }),
  ),
  editable: PropTypes.bool,
  value: PropTypes.object,
  inputHandler: PropTypes.func,
  isValidate: PropTypes.bool,
  setIsTouch: PropTypes.func,
};
FormFactoryComponent.defaultProps = {
  formList: [],
  editable: false,
  value: '',
  inputHandler: () => {},
  isValidate: false,
  setIsTouch: () => {},
};

export default FormFactoryComponent;

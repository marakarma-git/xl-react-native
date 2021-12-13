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
import ColorPickerComponent from './ColorPicker';
import ImagePreviewComponent from './ImagePreview';

const FormFactoryComponent = (props) => {
  const {
    formList,
    editable,
    value,
    inputHandler,
    isValidate,
    formError,
    setFormError,
    imageBgColor,
    imagePreview,
  } = props;
  const formType = (form) => {
    if (editable) {
      switch (form.type) {
        case 'text':
          return (
            <TextInputComponent
              name={form.name}
              title={form.title}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={form?.editable}
              placeholder={form?.title}
              validation={form?.validation}
              validationType={form?.validationType}
              setValidationError={setFormError}
            />
          );
        case 'select':
          return (
            <DropDownPickerComponent
              name={form.name}
              title={form?.title}
              editable={!form?.editable}
              setValue={form?.config?.setValue}
              placeholder={form?.config?.placeholder}
              options={form.options}
              searchable={form?.config?.searchable}
              validation={form?.validation}
              value={value[form.name] || form?.config?.defaultValue}
              setValidationError={setFormError}
              dropDownHeight={form?.config?.dropDownHeight}
            />
          );
        case 'textarea':
          return (
            <TextAreaInputComponent
              name={form.name}
              title={form.title}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={form?.editable}
              placeholder={form.title}
              validation={form?.validation}
              validationType={form?.validationType}
              setValidationError={setFormError}
            />
          );
        case 'document-picker':
          return (
            <DocumentPickerComponent
              name={form.name}
              type={form?.fileType}
              inputHandler={inputHandler}
              fieldForFilename={form?.fieldForFilename}
              value={value}
            />
          );
        case 'color-picker':
          return (
            <ColorPickerComponent
              name={form.name}
              value={value[form.name]}
              inputHandler={inputHandler}
            />
          );
        case 'image-preview':
          return (
            <ImagePreviewComponent
              image={imagePreview}
              bgColor={imageBgColor}
            />
          );
        default:
          return (
            <TextInputComponent
              name={form.name}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={form?.editable}
              placeholder={form.title}
            />
          );
      }
    } else {
      switch (form.type) {
        case 'select':
          return (
            <DropDownPickerComponent
              name={form.name}
              title={form?.title}
              editable={!form?.editable}
              setValue={form?.config?.setValue}
              placeholder={form?.config?.placeholder}
              options={form.options}
              searchable={form?.config?.searchable}
              validation={form?.validation}
              value={value[form.name] || form?.config?.defaultValue}
              setValidationError={setFormError}
              dropDownHeight={form?.config?.dropDownHeight}
            />
          );
        default:
          return (
            <TextInputComponent
              name={form.name}
              inputHandler={inputHandler}
              value={value[form.name]}
              editable={editable}
              placeholder={form.title}
            />
          );
      }
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
            <Text style={[styles.label, {color: colors.delete}]}>
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
        'image-preview',
      ]),
      fileType: PropTypes.array,
      fieldForFilename: PropTypes.string,
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
        dropDownHeight: PropTypes.number,
      }),
      editable: PropTypes.bool,
    }),
  ),
  editable: PropTypes.bool,
  value: PropTypes.object,
  inputHandler: PropTypes.func,
  isValidate: PropTypes.bool,
  imagePreview: PropTypes.string,
  imageBgColor: PropTypes.string,
  formError: PropTypes.object,
  setFormError: PropTypes.func,
};
FormFactoryComponent.defaultProps = {
  formList: [],
  editable: false,
  value: '',
  inputHandler: () => {},
  isValidate: false,
  setFormError: () => {},
  fieldForFilename: '',
};

export default FormFactoryComponent;

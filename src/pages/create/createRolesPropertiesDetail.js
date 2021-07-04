import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {useNavigation} from '@react-navigation/native';
import {AccountForm} from '../../components';
import Helper from '../../helpers/helper';

const initialForm = [
    {
      title: 'Role Name', 
      key: 'roleName', 
      validation: true,
      isRequired: true, 
      type: "text",
      validationType: "required",
      editable: true
    },
    {
      title: 'Role Description', 
      key: 'roleDescription', 
      validation: true, 
      isRequired: true, 
      type: "textarea",
      validationType: "required",
      editable: true
    },
]

const CreateRolesPropertiesDetail = (props) => {
  const navigation = useNavigation();

  // State
  const [touchForm, setTouchForm] = useState(false);
  const [formList, setFormList] = useState(initialForm);
  const [formError, setFormError] = useState({});

  // Action
  const inputHandler = (name, value) => {
    props.setFormValue({
      ...props.formValue,
      [name]: value
    })
  }

  // Validation

  const validateForm = () => {
    const validationError = {};
    if(touchForm){
      formList.map((form) => {
        if(form.validation){
          formValidation(form.key, form.title, validationError, form.validationType);
        }
      })
    }
    setFormError(prevState => prevState = validationError);
  }

  const formValidation = (formKey, formTitle, validationError, validationRules) => {
    const splitValidation = String(validationRules).split("|");

    splitValidation.map((type) => {
      switch (type) {
        case "required":
          validationIsRequired(formKey, formTitle, validationError);
          break;
        case "isEmail":
          validateEmail(formKey, formTitle, validationError);
          break;

        default:
         validationIsRequired(formKey, formTitle, validationError);
      }
    });
  }

  const validationIsRequired = (formKey, formTitle, validationError) => {
    let isError = false;
    if(props.formValue[formKey].length <= 0){
      isError = true;
      validationError[formKey] = `${formTitle} is required`;
    }

    return isError;
  }

  const validateEmail = (formKey, formTitle, validationError) => {
      let isError = false;
      var re = /\S+@\S+\.\S+/;

      if(re.test(props.formValue[formKey]) == false){
        isError = true;
        validationError[formKey] = `Email is not valid!`;
      }

      return isError;
  }

  // End Action

  // Life Cycle
  useEffect(() => {
    validateForm();

    if(typeof formError === 'object'){
      if(Object.keys(formError) <= 0){
        props.setIsComplete(true);
      }else{
        props.setIsComplete(false);
      }
    }

  }, [props.formValue, touchForm]);

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      setFormError({});
      setTouchForm(false);
    });

    return pageLoad;
  }, []);

  return (
    <AccountForm
      isValidate={true}
      formList={formList}
      editable={true}
      setIsTouch={setTouchForm}
      value={props.formValue}
      formError={formError}
      inputHandler={inputHandler}
    />
  );
};

CreateRolesPropertiesDetail.propTypes = {
  mode: PropTypes.string,
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  setIsComplete: PropTypes.func
};

CreateRolesPropertiesDetail.defaultProps = {
  mode: 'create',
  formValue: {},
  setFormValue: () => {},
  setIsComplete: () => {},
}

export default CreateRolesPropertiesDetail;

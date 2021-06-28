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

  const validateForm = () => {
    let validationError = {};

    if(touchForm){
      const errorValidation = {};

      formList.map((form) => {
        if(form.validation){
          let validateForm = Helper.formValidation(form.key, form.title, form.validationType, props.formValue, errorValidation);
          if(validateForm){
            validationError[form.key] = validateForm;
          }

        }
      })
    }

    setFormError(prevState => prevState = validationError);
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

  }, [props.formValue]);

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      console.log("page load");
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
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  setIsComplete: PropTypes.func
};

CreateRolesPropertiesDetail.defaultProps = {
  formValue: {},
  setFormValue: () => {},
  setIsComplete: () => {},
}

export default CreateRolesPropertiesDetail;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {AccountForm} from '../../components';

const CreateBasicUserInformation = (props) => {

  const [formError, setFormError] = useState({});
  const [touchForm, setTouchForm] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);

  const userForm = [
    {
      title: 'First Name', 
      key: 'firstName', 
      validation: true, 
      type: "text",
      validationType: "required"
    },
    {
      title: 'Last Name', 
      key: 'lastName', 
      validation: true, 
      type: "text",
      validationType: "required"
    },
    {
      title: 'Username', 
      key: 'username', 
      validation: true, 
      type: "text",
      validationType: "required"
    },
    {
      title: 'Mobile Phone', 
      key: 'phoneNumber', 
      validation: false, 
      type: "text",
      validationType: "required"
    },
    {
      title: 'Email Address', 
      key: 'email', 
      validation: true, 
      type: "text",
      validationType: "isEmail|required"
    },
    {
      title: 'Language', 
      key: 'language', 
      validation: true, 
      type: "select",
      validationType: "required",
      options: [
        { value: "english", label: "English" },
        { value: "bahasa", label: "Bahasa" }
      ],
      config: {
        searchable: false,
        isOpen: openDropDown,
        onClick: () => setOpenDropDown(prevState => prevState = prevState ? false : true),
        setValue: setDropDownValue
      }
    },
  ];

  const inputHandler = (name, value) => {
    props.setBasicInformation({
      ...props.basicInformation,
      [name]: value
    });
  }

  const validateForm = () => {
    const validationError = {};
    if(touchForm){
      userForm.map((form) => {
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
    if(props.basicInformation[formKey].length <= 0){
      isError = true;
      validationError[formKey] = `${formTitle} is required`;
    }

    return isError;
  }

  const validateEmail = (formKey, formTitle, validationError) => {
      let isError = false;
      var re = /\S+@\S+\.\S+/;

      if(re.test(props.basicInformation[formKey]) == false){
        isError = true;
        validationError[formKey] = `Email is not valid!`;
      }

      return isError;
  }
  
  useEffect(() => {
    validateForm();

    if(Object.keys(formError) <= 0){
      props.setIsComplete(true);
    }else{
      props.setIsComplete(false);
    }

  }, [props.basicInformation, dropDownValue, touchForm]);

  useEffect(() => {
    if(dropDownValue !== null){
      inputHandler("language", dropDownValue);
    }
  }, [dropDownValue]);

  return(
    <AccountForm
      isValidate={true}
      formList={userForm}
      editable={props.isEditable}
      setIsTouch={setTouchForm}
      value={props.basicInformation}
      formError={formError}
      inputHandler={inputHandler}
    />
  );
}

CreateBasicUserInformation.propTypes = {
  isEditable: PropTypes.bool,
  basicInformation: PropTypes.array,
  setIsComplete: PropTypes.func,
  setBasicInformation: PropTypes.func
};

CreateBasicUserInformation.defaultProps = {
  isEditable: false,
  basicInformation: [],
  setIsComplete: () => {},
  setBasicInformation: () => {}
}

export default CreateBasicUserInformation;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {AccountForm} from '../../components';

const userForm = [
  {title: 'First Name', key: 'firstName', isRequired: true},
  {title: 'Last Name', key: 'lastName', isRequired: true},
  {title: 'User ID', key: 'username', isRequired: true},
  {title: 'Mobile Phone', key: 'phoneNumber', isRequired: false},
  {title: 'Email Address', key: 'email', isRequired: true},
  {title: 'Language', key: 'language', isRequired: true},
];

const CreateBasicUserInformation = (props) => {

  const [formError, setFormError] = useState({});
  const [touchForm, setTouchForm] = useState(false);

  const inputHandler = (name, value) => {
    props.setBasicInformation({
      ...props.basicInformation,
      [name]: value
    });
  }

  return(
    <AccountForm
      isValidate={true}
      formList={userForm}
      editable={props.isEditable}
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
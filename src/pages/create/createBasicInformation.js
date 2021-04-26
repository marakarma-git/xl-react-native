import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {AccountForm} from '../../components';

const userForm = [
  {title: 'First Name', key: 'firstName'},
  {title: 'Last Name', key: 'lastName'},
  {title: 'User ID', key: 'username'},
  {title: 'Mobile Phone', key: 'phoneNumber'},
  {title: 'Email Address', key: 'email'},
  {title: 'Language', key: 'language'},
];

const CreateBasicUserInformation = (props) => {
  const [form, setForm] = useState([]);

  const inputHandler = (name, value) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  return(
    //those value and handler are temporary
    <AccountForm 
      formList={userForm}
      editable={true}
      value={form}
      inputHandler={inputHandler}
    />
  );
}

CreateBasicUserInformation.propTypes = {};

export default CreateBasicUserInformation;
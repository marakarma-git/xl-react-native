import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {AccountForm} from '../../components';
import {View, Text} from 'react-native';

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
    {
      title: 'Owner Organization', 
      key: 'ownerOrganization', 
      validation: true, 
      isRequired: true, 
      type: "text",
      validationType: "required",
      editable: true
    },
]

const CreateRolesSummaryProperties = (props) => {

  const [touchForm, setTouchForm] = useState(false);
  const [formList, setFormList] = useState(initialForm);
  const [formError, setFormError] = useState({});

  return (
    <AccountForm
      isValidate={false}
      formList={formList}
      editable={false}
      setIsTouch={setTouchForm}
      value={props.formValue}
      formError={formError}
    />
  );
};

CreateRolesSummaryProperties.propTypes = {
  formValue: PropTypes.object,
  setFormValue: PropTypes.func,
  setIsComplete: PropTypes.func
};

CreateRolesSummaryProperties.defaultProps = {
  formValue: {},
  setFormValue: () => {},
  setIsComplete: () => {},
}

export default CreateRolesSummaryProperties;

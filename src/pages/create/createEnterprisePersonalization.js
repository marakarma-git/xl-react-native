import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {FormFactory, Text} from '../../components';

const CreateEnterprisePersonalization = (props) => {
  const {editable, formError, inputHandler, value} = props;
  const formList = [
    {
      title: 'Upload Company Logo',
      name: 'companyLogo',
      validation: true,
      isRequired: true,
      type: 'document-picker',
      validationType: 'required',
      editable: true,
    },
  ];
  return (
    <FormFactory
      formList={formList}
      isValidate={true}
      editable={editable}
      formError={formError}
      inputHandler={inputHandler}
      value={value}
    />
  );
};

CreateEnterprisePersonalization.propTypes = {
  editable: PropTypes.bool,
  formError: PropTypes.object,
  inputHandler: PropTypes.func,
  value: PropTypes.object,
};
CreateEnterprisePersonalization.defaultProps = {
  editable: true,
  formError: {},
  inputHandler: () => {},
  value: {},
};

export default CreateEnterprisePersonalization;

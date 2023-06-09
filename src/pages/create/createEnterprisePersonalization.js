import React from 'react';
import PropTypes from 'prop-types';
import {FormFactory} from '../../components';

const CreateEnterprisePersonalization = (props) => {
  const {editable, formError, inputHandler, value, isActive} = props;
  const formList = [
    {
      title: 'Upload Company Logo',
      name: 'companyLogo',
      validation: false,
      isRequired: false,
      type: 'document-picker',
      editable: true,
      fileType: ['image/png'],
      fieldForFilename: 'fileName',
    },
    {
      title: 'Top Bar Colour',
      name: 'topBarColour',
      validation: false,
      isRequired: false,
      type: 'color-picker',
      editable: true,
    },
    {
      title: 'Preview',
      name: 'companyLogo|topBarColour',
      validation: false,
      isRequired: false,
      type: 'image-preview',
      editable: true,
    },
  ];
  return (
    <FormFactory
      formList={isActive ? formList : [formList[2]]}
      isValidate={false}
      editable={editable}
      formError={formError}
      inputHandler={inputHandler}
      value={value}
      imagePreview={value?.companyLogo}
      imageBgColor={value?.topBarColour}
    />
  );
};

CreateEnterprisePersonalization.propTypes = {
  editable: PropTypes.bool,
  formError: PropTypes.object,
  inputHandler: PropTypes.func,
  value: PropTypes.object,
  isActive: PropTypes.bool,
};
CreateEnterprisePersonalization.defaultProps = {
  editable: true,
  formError: {},
  inputHandler: () => {},
  value: {},
  isActive: true,
};

export default CreateEnterprisePersonalization;

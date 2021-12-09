import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FormFactory} from '../../components';

const CreateEnterpriseBasicInformation = (props) => {
  const [dropDownValue, setDropDownValue] = useState(null);
  const {
    editable,
    formError,
    inputHandler,
    value,
    setFormError,
    dropDownData,
  } = props;
  const formList = [
    {
      title: 'Enterprise Name',
      name: 'enterpriseName',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'Customer Number',
      name: 'customerNumber',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'BP HO',
      name: 'bpHo',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'BP Payer',
      name: 'bpPayer',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'Organizational Unit',
      name: 'organizationalUnit',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'Agreement Number',
      name: 'agreementNumber',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'BP VAT',
      name: 'bpVat',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'LA Number',
      name: 'laNumber',
      validation: true,
      isRequired: true,
      type: 'text',
      validationType: 'required',
      editable: true,
    },
    {
      title: 'Business Category',
      name: 'businessCategory',
      validation: true,
      isRequired: true,
      type: 'select',
      validationType: 'required',
      editable: true,
      options: dropDownData || [{value: '', label: ''}],
      config: {
        searchable: false,
        setValue: setDropDownValue,
        placeholder: 'Choose Business Category',
        dropDownHeight: 350,
      },
    },
  ];
  useEffect(() => {
    if (dropDownValue !== null) {
      inputHandler('businessCategory', dropDownValue);
    }
  }, [dropDownValue]);
  return (
    <FormFactory
      formList={formList}
      isValidate={true}
      editable={editable}
      formError={formError}
      setFormError={setFormError}
      inputHandler={inputHandler}
      value={value}
    />
  );
};

CreateEnterpriseBasicInformation.propTypes = {
  editable: PropTypes.bool,
  formError: PropTypes.object,
  setFormError: PropTypes.func,
  inputHandler: PropTypes.func,
  value: PropTypes.object,
  dropDownData: PropTypes.array,
};
CreateEnterpriseBasicInformation.defaultProps = {
  editable: false,
  formError: {},
  setFormError: () => {},
  inputHandler: () => {},
  value: {},
  dropDownData: [{value: '', label: ''}],
};

export default CreateEnterpriseBasicInformation;

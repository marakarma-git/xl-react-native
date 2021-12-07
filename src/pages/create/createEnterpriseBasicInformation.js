import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormFactory} from '../../components';

const CreateEnterpriseBasicInformation = (props) => {
  const [dropDownValue, setDropDownValue] = useState(null);
  const {editable, formError, inputHandler, value} = props;
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
      title: 'BusinessCategory',
      name: 'businessCategory',
      validation: true,
      isRequired: true,
      type: 'select',
      validationType: 'required',
      editable: true,
      options: [
        {value: 'Banking EDC', label: 'Banking EDC'},
        {value: 'GPS Tracker', label: 'GPS Tracker'},
        {value: 'Vending Machine', label: 'Vending Machine'},
        {value: 'AMR', label: 'AMR'},
        {value: 'General', label: 'General'},
      ],
      config: {
        searchable: false,
        setValue: setDropDownValue,
        placeholder: 'Choose Business Category',
      },
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

CreateEnterpriseBasicInformation.propTypes = {
  editable: PropTypes.bool,
  formError: PropTypes.object,
  inputHandler: PropTypes.func,
  value: PropTypes.object,
};
CreateEnterpriseBasicInformation.defaultProps = {
  editable: false,
  formError: {},
  inputHandler: () => {},
  value: {},
};

export default CreateEnterpriseBasicInformation;

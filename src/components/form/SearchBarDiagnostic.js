import React from 'react';
import PropTypes from 'prop-types';
import FormFactory from './FormFactory';

const SearchBarDiagnostic = (props) => {
  const {onSubmit, editable, searchHandler, value} = props;
  const formList = [
    {
      title: 'Search',
      name: 'keyword',
      validation: false,
      isRequired: false,
      type: 'search',
      editable: true,
      config: {
        placeholder: 'Search with IMSI, MSISDN, or ICCID',
        action: onSubmit,
      },
    },
  ];
  return (
    <FormFactory
      formList={formList}
      editable={editable}
      inputHandler={searchHandler}
      value={value}
    />
  );
};

SearchBarDiagnostic.defaultProps = {
  onSubmit: () => {},
  editable: true,
  inputHandler: () => {},
  value: {keyword: ''},
};
SearchBarDiagnostic.propTypes = {
  onSubmit: PropTypes.func,
  editable: PropTypes.bool,
  inputHandler: PropTypes.func,
  value: PropTypes.object,
};

export default SearchBarDiagnostic;

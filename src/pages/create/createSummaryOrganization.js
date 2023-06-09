import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import {GridComponent} from '../../components';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '50%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Company Name',
    field: 'enterpriseName',
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '50%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Company Name',
    field: 'enterpriseName',
    cellType: 'text',
    headerType: 'text',
  },
];

const CreateSummaryOrganization = (props) => {
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  return (
    <View
      style={{marginTop: 10}}
      onStartShouldSetResponderCapture={props.detectOffset}>
      <GridComponent
        gridData={props.selectedOrganization}
        gridOptions={gridOptions}
        keyExtractor="enterpriseId"
        colHeight={30}
        tableMaxHeight={100}
        customTableStyle={{
          width: '95%',
          marginHorizontal: '2.5%',
          borderWidth: 1,
          borderColor: '#A8A8A8',
          marginBottom: 10,
        }}
      />
    </View>
  );
};

CreateSummaryOrganization.propTypes = {
  selectedOrganization: PropTypes.array,
  detectOffset: PropTypes.func,
};

CreateSummaryOrganization.defaultProps = {
  selectedOrganization: [],
  detectOffset: () => {},
};

export default CreateSummaryOrganization;

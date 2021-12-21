import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import {GridComponent} from '../../components';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '10%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Roles',
    field: 'roleId',
    cellType: 'checkbox',
    headerType: 'checkbox',
    isCheck: false,
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '45%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Roles',
    field: 'roleName',
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '45%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Organizations',
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
        gridData={props.selectedRoles}
        gridOptions={gridOptions}
        keyExtractor="roleId"
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
  selectedRoles: PropTypes.array,
  detectOffset: PropTypes.func,
};

CreateSummaryOrganization.defaultProps = {
  selectedRoles: [],
  detectOffset: () => {},
};

export default CreateSummaryOrganization;

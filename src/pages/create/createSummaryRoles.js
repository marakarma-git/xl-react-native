import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { GridComponent } from '../../components';
import { useSelector, useDispatch } from 'react-redux';

const gridOptionsArray = [
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '10%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Roles", 
    field: "roleId", 
    cellType: "checkbox",
    headerType: "checkbox",
    isCheck: false
  },
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '45%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Roles", 
    field: "roleName", 
    cellType: "text",
    headerType: "text"
  },
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '45%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Organization", 
    field: "enterpriseName", 
    cellType: "text",
    headerType: "text"
  },
];

const CreateSummaryOrganization = (props) => {
  const dispatch = useDispatch();
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  return(
    <View
      style={{ marginTop: 10 }}
      onStartShouldSetResponderCapture={props.detectOffset}>
          <GridComponent 
            gridData={[]}
            gridOptions={gridOptions}
            keyExtractor="roleId"
            colHeight={30}
            tableMaxHeight={100}
          />
    </View>
  );
}

CreateSummaryOrganization.propTypes = {
  detectOffset: PropTypes.func
}

CreateSummaryOrganization.defaultProps = {
  detectOffset: () => {}
}

export default CreateSummaryOrganization;
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, GridComponent} from '../../components';
import { getActiveEnterpriseList } from '../../redux/action/enterprise_management_action';
import Helper from '../../helpers/helper';

const gridOptionsArray = [
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '80%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Organization", 
    field: "enterpriseName", 
    cellType: "treeViewWithCheckBox", 
    headerType: "text"
  },
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '20%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Children", 
    field: "childrenCnt", 
    cellType: "text", 
    headerType: "text"
  },
];

const CreateOrganization = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data_active_enterprise, loading } = useSelector(state => state.enterprise_management_get_enterprise_reducer);


  // STATE GLOBAL
  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  // STATE Component

  // Function
  const treeViewToggle = (cellId) => {
    const data = Helper.treeViewToggle(gridData, cellId);

    setGridData(data);
  };

  const checkBoxToggle = (cellId) => {
    const data = Helper.checkboxToggle(gridData, cellId, 1);

    setGridData(data);
    checkSelectedData(data);
  };

  const checkSelectedData = (data) => {
    const newData = Helper.checkSelectedData(data);
    
    props.setSelectedOwnership(newData);
  }

  // End Function

  // Lifecycle
  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      dispatch(getActiveEnterpriseList());
    });

    return pageLoad;
  }, [navigation]);

  useEffect(() => {
    if(data_active_enterprise.length > 0){
      setGridData(Helper.manipulateIsDisabledArray(data_active_enterprise));
    }

  }, [data_active_enterprise]);

  return(
    <View
     onStartShouldSetResponderCapture={props.detectOffset}
     style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <GridComponent
          loading={loading}
          gridOptions={gridOptions}
          gridData={gridData}
          colHeight={30}
          tableMaxHeight={250}
          keyExtractor="enterpriseId"
          onPressTree={treeViewToggle}
          onPressCheckBox={checkBoxToggle}
        />
    </View>
  )
}

CreateOrganization.propTypes = {
  selectedOwnership: PropTypes.array,
  setSelectedOwnership: PropTypes.func,
  detectOffset: PropTypes.func,
};

CreateOrganization.defaultProps = {
  selectedOwnership: [],
  setSelectedOwnership: () => {},
  detectOffset: () => {},
}

export default CreateOrganization;
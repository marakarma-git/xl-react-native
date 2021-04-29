import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, CustomRadioButtonComponent, GridComponent} from '../../components';

import styles from '../../style/create.style';
import { getActiveEnterpriseList, getEnterpriseList } from '../../redux/action/enterprise_management_action';

const gridOptionsArray = [
  {bgColor: "#F4F3F4", headerColor: "#707070", width: '50%', cellAlign: 'center', headerAlign: 'center', label: "Organization", field: "enterpriseName", cellType: "treeViewWithCheckBox", headerType: "text"},
  {bgColor: "#F4F3F4", headerColor: "#707070", width: '50%', cellAlign: 'center', headerAlign: 'center', label: "Children", field: "childrenCnt", cellType: "text", headerType: "text"},
];

const CreateOrganization = (props) => {
  const dispatch = useDispatch();
  const { data_active_enterprise, loading } = useSelector(state => state.enterprise_management_get_enterprise_reducer);

  const [gridData, setGridData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  
  useEffect(() => {
    if(data_active_enterprise.length <= 0){
      dispatch(getActiveEnterpriseList());
    }

    if(data_active_enterprise.length > 0){
      setGridData(data_active_enterprise)
    }

  }, [data_active_enterprise]);

    const treeViewToggle = (cellId) => {
      const newData = new Array();
      let isRoot = false;
      gridData.map((data) => {
        if(data.enterpriseId == cellId){
          if(data.enterpriseParentId === null){
            isRoot = true;
          }
        }

        if(isRoot){
          if(data.enterpriseId !== cellId){
              data.visibility = !data.collapse;
              data.collapse = !data.collapse;          
          }

        }else{
          if(data.enterpriseParentId === cellId){
            data.visibility = !data.visibility;
          }
        }

        if (data.icon) {
          data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
        }

        newData.push(data);
      });
      
      setGridData(newData);
    };

    const checkBoxToggle = (cellId) => {
      const newData = new Array();
      let isRoot = false;
      let parentCheck = false;

      gridData.map((data) => {
        if(data.enterpriseId == cellId){
          if(data.enterpriseParentId === null){
            isRoot = true;
          }
          parentCheck = !data.treeCheck;
          data.treeCheck = !data.treeCheck;
        }

        if(isRoot){
          if(data.enterpriseId !== cellId){
              data.treeCheck = parentCheck;
          }

        }else{
          if(data.enterpriseParentId === cellId){
              data.treeCheck = parentCheck;
          }
        }

        newData.push(data);
      });

      setGridData(newData);

      const selectedData = new Array();
      newData.map((data) => {
        if(data.treeCheck){
          selectedData.push(data);
        }
      });

      props.setSelectedOrganization(selectedData);
    }

  return(
    <View
     onStartShouldSetResponderCapture={props.detectOffset}
     style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <CustomRadioButtonComponent
        onPressRadio={() => setSelectedRadio(prevState => prevState = 0)}
        label="XL User"
        radioValue="XL User"
        status={selectedRadio === 0 ? "checked" : "unchecked"}
      />
      <CustomRadioButtonComponent
        onPressRadio={() => setSelectedRadio(prevState => prevState = 1)}
        label="Non XL User"
        radioValue="Non XL User"
        status={selectedRadio === 1 ? "checked" : "unchecked"}
      />
      <View style={styles.menuBarContainer}>
        <Text style={{ color: "#707070" }}>Total: {gridData.length} | Selected: {props.selectedOrganization.length}</Text>
      </View>
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
  detectOffset: PropTypes.func,
  selectedOrganization: PropTypes.array,
  setSelectedOrganization: PropTypes.func
};

CreateOrganization.defaultProps = {
  detectOffset: () => {},
  selectedOrganization: [],
  setSelectedOrganization: () => {}
}

export default CreateOrganization;
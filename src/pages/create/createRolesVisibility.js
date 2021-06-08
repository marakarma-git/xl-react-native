import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, CustomRadioButtonComponent, GridComponent} from '../../components';

import styles from '../../style/create.style';
import Helper from '../../helpers/helper';

const gridOptionsArray = [
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '80%', 
    cellAlign: 'flex-start', 
    headerAlign: 'center', 
    label: "Organization", 
    field: "enterpriseName", 
    cellType: "text", 
    headerType: "text",
    cellVisible: true
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
    headerType: "text",
    cellVisible: false
  }
];

const createRolesVisibility = (props) => {
  const dispatch = useDispatch();

  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  // Function
  const treeViewToggle = (cellId) => {
    const newData = gridData.slice();

    newData[0].visibility = true;

    const data = Helper.treeViewToggle(newData, cellId);
    setGridData(data);
  }

  const selectedOwnershipToggle = (selectedValue) => {
    const newOptions = gridOptions.slice();

    if(selectedValue === 0){
      cellVisibilityToggle(gridData, selectedValue);
    }

    newOptions[0].cellType = props.selectedVisibility == 0 ? "treeView" : "text";
    newOptions[1].cellVisible = props.selectedVisibility == 0 ? true : false;

    setGridOptions(newOptions);
    props.setSelectedVisibility(selectedValue);
  }

  const cellVisibilityToggle = (data, visibility) => {
    data.map((dataGrid, index) => {
      if(index === 0){
        dataGrid.icon = visibility ? 'caret-down' : 'caret-up';
      }else{
        dataGrid.visibility = visibility;
      }
    });

    return data;
  }
  // End of Function

  useEffect(() => {
    const newData = props.selectedOwnership.slice();
    const dataToggle = cellVisibilityToggle(newData, false);

    setGridData(dataToggle);
  }, [props.selectedOwnership]);

  return(
    <View
     style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <View style={styles.menuBarContainer}>
        <Text style={{ color: "#707070", paddingLeft: 10 }}>Visibility type</Text>
      </View>
      <CustomRadioButtonComponent
        onPressRadio={() => selectedOwnershipToggle(0)}
        style={{paddingLeft: 10, fontSize: 10}}
        label="Owner Organizations Only"
        radioValue="0"
        status={props.selectedVisibility === 0 ? "checked": "unchecked"}
      />
      <CustomRadioButtonComponent
        onPressRadio={() => selectedOwnershipToggle(1)}
        style={{paddingLeft: 10, fontSize: 10}}
        label="All Child Organizations"
        radioValue="1"
        status={props.selectedVisibility === 1 ? "checked": "unchecked"}
      />
        <GridComponent
          loading={false}
          gridOptions={gridOptions}
          gridData={gridData}
          colHeight={30}
          tableMaxHeight={150}
          keyExtractor="enterpriseId"
          onPressTree={treeViewToggle}
        />
    </View>
  )
}

createRolesVisibility.propTypes = {
  selectedOwnership: PropTypes.array,
  selectedVisibility: PropTypes.number,
  setSelectedVisibility: PropTypes.func
};

createRolesVisibility.defaultProps = {
  selectedOwnership: [],
  selectedVisibility: 0,
  setSelectedVisibility: () => {}
}

export default createRolesVisibility;
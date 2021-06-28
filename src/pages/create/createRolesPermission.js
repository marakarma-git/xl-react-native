import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import { getListPermission } from '../../redux/action/permission_action';

import styles from '../../style/create.style';
import { GridComponent } from '../../components';

const gridOptionsArray = [
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '10%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "", 
    field: "priviledgeId", 
    cellType: "checkbox", 
    headerType: "checkbox"
  },
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '50%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Name", 
    field: "name", 
    cellType: "text", 
    headerType: "text"
  },
  {
    bgColor: "#F4F3F4", 
    headerColor: "#707070", 
    width: '40%', 
    cellAlign: 'center', 
    headerAlign: 'center', 
    label: "Impact On", 
    field: "impactOn", 
    cellType: "text", 
    headerType: "text"
  },
];

const CreateRolesPermission = (props) => {
  const dispatch = useDispatch();
  const {loading, listPermission} = useSelector((state) => state.permission_reducer);

  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  useEffect(() => {
    if(listPermission.length > 0){
      setGridData(prevState => prevState = listPermission)
    }
  }, [listPermission])

  useEffect(() => {
    dispatch(getListPermission());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.menuBarContainer}>
        <Text style={{ color: "#707070" }}>Selected: 0 | Total: {gridData.length}</Text>
      </View>
      <GridComponent
        loading={loading}
        gridOptions={gridOptions}
        gridData={gridData}
        colHeight={30}
        tableMaxHeight={300}
        keyExtractor="priviledgeId"
      />
    </View>
  );
};

CreateRolesPermission.propTypes = {};
CreateRolesPermission.defaultProps = {};

export default CreateRolesPermission;

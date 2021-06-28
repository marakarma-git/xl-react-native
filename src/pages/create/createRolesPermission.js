import React, { useEffect, useState, useCallback } from 'react';
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

    const selectCheckBox = (privId = null, action = "general") => {
      console.log(privId)
      if(gridData.length > 0){
        const newData = new Array();
        const newOptions = new Array();

        let isHeaderCheck = false;

        if(privId === null){
          gridOptions.map((option) => {
            if(option.headerType === 'checkbox'){
              isHeaderCheck = !option.isCheck;
              option.isCheck = !option.isCheck;
            }

            newOptions.push(option)
          })

          setGridOptions(prevState => prevState = newOptions);
        }

        gridData.map((data) => {
          if(privId === null){
            data.isCheck = isHeaderCheck;
          }else{
            if(data.priviledgeId === privId){
              if(action === 'general'){
                data.isCheck = !data.isCheck;
              }else{
                data.isCheck = true;
              }
            }
          }

          newData.push(data);
        });

        const selectedData = new Array();

        newData.map((data) => {
          if(data.isCheck){
            selectedData.push(data);
          }
        })

        props.setSelectedPermission(selectedData);
        setGridData(prevState => prevState = newData);

      }
  }

  const checkHistory = useCallback(() => {
    if(gridData.length > 0){
      props.selectedPermission.map(roles => {
        selectCheckBox(roles.priviledgeId, 're-render');
      })
    }
  }, [gridData]);

  useEffect(() => {
    if(listPermission.length > 0){
      setGridData(prevState => prevState = listPermission)
    }

    checkHistory();
  }, [listPermission])

  useEffect(() => {
    dispatch(getListPermission());
  }, []);

  return (
    <View 
      style={styles.container}
      onTouchStart={() => props.setScrollView(true)}
      onTouchEnd={() => props.setScrollView(false)}>
      <View style={styles.menuBarContainer}>
        <Text style={{ color: "#707070" }}>Selected: {props.selectedPermission.length} | Total: {gridData.length}</Text>
      </View>
      <GridComponent
        loading={loading}
        gridOptions={gridOptions}
        gridData={gridData}
        colHeight={30}
        tableMaxHeight={200}
        keyExtractor="priviledgeId"
        onPressHeaderCheckBox={selectCheckBox}
        onPressCheckBox={selectCheckBox}
      />
    </View>
  );
};

CreateRolesPermission.propTypes = {
  selectedPermission: PropTypes.array,
  setScrollView: PropTypes.func,
  setSelectedPermission: PropTypes.func
};
CreateRolesPermission.defaultProps = {
  selectedPermission: [],
  setScrollView: () => {},
  setSelectedPermission: () => {}
};

export default CreateRolesPermission;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';
import { GridComponent } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveRoles } from '../../redux/action/roles_action';

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

const CreateUserRoles = (props) => {
  const dispatch = useDispatch();
  const { data_active_roles, loading } = useSelector((state) => state.roles_reducer);

  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  const selectCheckBox = (roleId = null) => {
    const newData = new Array();
    const newOptions = new Array();

    let isHeaderCheck = false;

    if(roleId === null){
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
      if(roleId === null){
        data.isCheck = isHeaderCheck;
      }else{
        if(data.roleId === roleId){
          data.isCheck = !data.isCheck;
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

    props.setSelectedRoles(selectedData);

    setGridData(prevState => prevState = newData);
  }

  useEffect(() => {
    dispatch(getActiveRoles(props.enterpriseId))
  }, [props.enterpriseId])

  useEffect(() => {

    if(data_active_roles.length > 0){
      setGridData(data_active_roles)
    }

  }, [data_active_roles]);

  return(
    <View
      onStartShouldSetResponderCapture={props.detectOffset}>
          <GridComponent 
            loading={loading}
            gridData={gridData}
            gridOptions={gridOptions}
            keyExtractor="roleId"
            colHeight={30}
            tableMaxHeight={200}
            onPressHeaderCheckBox={selectCheckBox}
            onPressCheckBox={selectCheckBox}
          />
    </View>
  );
}

CreateUserRoles.propTypes = {
  enterpriseId: PropTypes.string,
  setSelectedRoles: PropTypes.func,
  detectOffset: () => {}
};

CreateUserRoles.defaultProps = {
  enterpriseId: "",
  setSelectedRoles: () => {},
  detectOffset: () => {}
}

export default CreateUserRoles;
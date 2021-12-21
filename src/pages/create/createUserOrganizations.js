import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  CustomRadioButtonComponent,
  GridComponent,
} from '../../components';

import styles from '../../style/create.style';
import {
  enterpriseManagementRequestData,
  enterpriseManagementRequestDataEnd,
  getActiveEnterpriseList,
} from '../../redux/action/enterprise_management_action';
import {useCallback} from 'react';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '80%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Organization',
    field: 'enterpriseName',
    cellType: 'treeViewWithCheckBox',
    headerType: 'text',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '20%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Children',
    field: 'childrenCnt',
    cellType: 'text',
    headerType: 'text',
  },
];

const CreateOrganization = (props) => {
  const dispatch = useDispatch();
  const {data_active_enterprise, loading} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );

  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);

  const treeViewToggle = (cellId) => {
    const newData = new Array();

    let isRoot = false;
    gridData.map((data) => {
      if (data.enterpriseId == cellId) {
        if (data.enterpriseParentId === null) {
          isRoot = true;
        }
      }

      if (isRoot) {
        if (data.enterpriseId !== cellId) {
          data.visibility = !data.collapse;
          data.collapse = !data.collapse;
        }
      } else {
        if (data.enterpriseParentId === cellId) {
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
      if (data.enterpriseId == cellId) {
        if (data.enterpriseParentId === null) {
          isRoot = true;
        }
        parentCheck = !data.treeCheck;
        data.treeCheck = !data.treeCheck;
      }

      if (isRoot) {
        if (data.enterpriseId !== cellId) {
          if (props.selectedRadio === 1) {
            data.isDisabled = !data.isDisabled;
          }
          data.treeCheck = parentCheck;
        }
      } else {
        if (data.enterpriseParentId === cellId) {
          if (props.selectedRadio === 1) {
            data.isDisabled = !data.isDisabled;
          }
          data.treeCheck = parentCheck;
        } else {
          if (props.selectedRadio === 1) {
            if (data.enterpriseId !== cellId) {
              data.isDisabled = !data.isDisabled;
            }
          }
        }
      }

      newData.push(data);
    });

    setGridData(newData);
    checkSelectedData(newData);
  };

  const checkSelectedOrganization = (data, selectedOrganization) => {
    let parentSelected = false;
    const newData = new Array();

    data.map((data, index) => {
      data.isDisabled = false;
      selectedOrganization.map((organization) => {
        if (organization == data.enterpriseId) {
          data.treeCheck = true;
        }
      });

      if (data.treeCheck) {
        if (props.selectedRadio == 1) {
          if (parentSelected) {
            data.isDisabled = true;
          }
        }
        parentSelected = true;
      } else {
        if (props.selectedRadio === 1) {
          data.isDisabled = true;
        }
      }

      newData.push(data);
    });

    setGridData(newData);
    checkSelectedData(newData);
  };

  const resetGridData = useCallback(() => {
    if (gridData.length > 0) {
      const newData = new Array();
      gridData.map((data) => {
        data.treeCheck = false;
        data.isSelect = false;
        data.isDisabled = false;

        newData.push(data);
      });

      setGridData(newData);
      checkSelectedData(newData);
    }
  }, [gridData]);

  const checkSelectedData = (newData) => {
    const selectedData = new Array();
    newData.map((data, index) => {
      if (data.treeCheck) {
        selectedData.push(data);
      }
    });

    props.setSelectedOrganization(selectedData);
  };

  useEffect(() => {
    if (props.selectedOrganization.length > 0) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }
  }, [props.selectedOrganization]);

  useEffect(() => {
    // wait for selected radio re render
    dispatch(enterpriseManagementRequestData());
    resetGridData();
    setTimeout(() => {
      dispatch(enterpriseManagementRequestDataEnd());
    }, 1500);
  }, [props.selectedRadio]);

  useEffect(() => {
    if (data_active_enterprise.length <= 0) {
      dispatch(getActiveEnterpriseList());
    }

    if (data_active_enterprise.length > 0) {
      props.defaultParentId(data_active_enterprise[0].enterpriseId); //this useful if user choose xl user

      if (props.isUpdate) {
        checkSelectedOrganization(
          data_active_enterprise,
          props.selectedOrganization,
        );
      } else {
        setGridData(data_active_enterprise);
      }
    }
  }, [data_active_enterprise]);

  return (
    <View
      onStartShouldSetResponderCapture={props.detectOffset}
      style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      <CustomRadioButtonComponent
        onPressRadio={() => props.setSelectedRadio(0)}
        label="XL User"
        radioValue="XL User"
        status={props.selectedRadio === 0 ? 'checked' : 'unchecked'}
      />
      <CustomRadioButtonComponent
        onPressRadio={() => props.setSelectedRadio(1)}
        label="Non XL User"
        radioValue="Non XL User"
        status={props.selectedRadio === 1 ? 'checked' : 'unchecked'}
      />
      <View style={styles.menuBarContainer}>
        <Text style={{color: '#707070'}}>
          Total: {gridData.length} | Selected:{' '}
          {props.selectedOrganization.length}
        </Text>
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

CreateOrganization.propTypes = {
  selectedRadio: PropTypes.array,
  setSelectedRadio: PropTypes.func,
  detectOffset: PropTypes.func,
  setIsComplete: PropTypes.func,
  selectedOrganization: PropTypes.array,
  setSelectedOrganization: PropTypes.func,
  isUpdate: PropTypes.bool,
  defaultParentId: PropTypes.func,
};

CreateOrganization.defaultProps = {
  isUpdate: false,
  selectedRadio: [],
  setSelectedRadio: () => {},
  setIsComplete: () => {},
  detectOffset: () => {},
  selectedOrganization: [],
  setSelectedOrganization: () => {},
  defaultParentId: () => {},
};

export default CreateOrganization;

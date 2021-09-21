import React, {useEffect, useState, useCallback} from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, GridComponent} from '../../components';
import {
  enterpriseManagementClearActiveEnterpriseData,
  getActiveEnterpriseList,
} from '../../redux/action/enterprise_management_action';
import Helper from '../../helpers/helper';

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

const CreateRolesPropertiesOwnership = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data_active_enterprise, loading} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );

  // STATE GLOBAL
  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [isCheckData, setIsCheckData] = useState(false);
  const [isReCheckData, setIsReCheckData] = useState(false);
  const [isDataNotEmpty, setIsDataNotEmpty] = useState(false);

  // Function
  const treeViewToggle = (cellId) => {
    const data = Helper.treeViewToggle(gridData, cellId);

    setGridData(data);
  };

  const checkBoxToggle = (cellId) => {
    const newData = gridData.slice();
    props.setCurrentEnterprise(cellId);
    const data = Helper.checkboxToggle(newData, cellId, 1);

    setGridData(data);
    checkSelectedData(data);
  };

  const checkSelectedData = (data) => {
    const newData = Helper.checkSelectedData(data);

    if (newData.length > 0) {
      props.setIsComplete(true);
    } else {
      props.setIsComplete(false);
    }

    props.setSelectedOwnership(newData);
  };

  const revertData = () => {
    const oldData = gridData.slice();
    const newData = new Array();

    oldData.map((data, index) => {
      data.collapse = !data.collapse;
      if (data.childrenCnt > 0) data.icon = 'caret-up';
      else data.icon = '';

      newData.push(data);
    });

    treeViewToggle(props.currentEnterprise);
    setGridData(newData);
  };

  // End Function

  // Hooks
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(enterpriseManagementClearActiveEnterpriseData());
      setIsCheckData(false);
      setGridData([]);
      dispatch(getActiveEnterpriseList());
      setGridOptions(gridOptionsArray);
    });

    return pageLoad;
  }, [navigation]);

  useEffect(() => {
    if (data_active_enterprise.length > 0) {
      setGridData(Helper.manipulateIsDisabledArray(data_active_enterprise));
    }
  }, [data_active_enterprise]);

  useEffect(() => {
    if (!isCheckData) {
      if (gridData.length > 0) {
        // if (props.mode !== 'create') {
        checkBoxToggle(props.currentEnterprise);
        setIsCheckData(true);
        // }
      }
    }
  }, [gridData]);

  useEffect(() => {
    if (!isReCheckData) {
      if (props.selectedOwnership.length === 0) {
        checkBoxToggle(props.currentEnterprise);
        setIsReCheckData(true);
      }
    }
  }, [props.selectedOwnership]);

  useEffect(() => {
    if (!isDataNotEmpty) {
      if (gridData.length > 0) {
        revertData();
        setIsDataNotEmpty(true);
      }
    }
  }, [props.formPosition, gridData]);

  return (
    <View
      onTouchStart={() => props.setScrollView(false)}
      onTouchEnd={() => props.setScrollView(true)}>
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
  );
};

CreateRolesPropertiesOwnership.propTypes = {
  mode: PropTypes.string,
  formPosition: PropTypes.number,
  firstRender: PropTypes.bool,
  setFirstRender: PropTypes.func,
  currentEnterprise: PropTypes.string,
  selectedOwnership: PropTypes.array,
  setSelectedOwnership: PropTypes.func,
  setCurrentEnterprise: PropTypes.func,
  setScrollView: PropTypes.func,
  setIsComplete: PropTypes.func,
};

CreateRolesPropertiesOwnership.defaultProps = {
  mode: 'create',
  formPosition: 0,
  firstRender: false,
  setFirstRender: () => {},
  currentEnterprise: '',
  selectedOwnership: [],
  setSelectedOwnership: () => {},
  setCurrentEnterprise: () => {},
  setScrollView: () => {},
  setIsComplete: () => {},
};

export default CreateRolesPropertiesOwnership;

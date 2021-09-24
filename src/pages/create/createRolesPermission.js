import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import PropTypes from 'prop-types';
import {getListPermission} from '../../redux/action/permission_action';

import styles from '../../style/create.style';
import {GridComponent} from '../../components';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '10%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: '',
    field: 'priviledgeId',
    cellType: 'checkbox',
    headerType: 'checkbox',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '50%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Name',
    field: 'name',
    cellType: 'text',
    headerType: 'sortable',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '40%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Impact On',
    field: 'impactOn',
    cellType: 'text',
    headerType: 'sortable',
  },
];

const CreateRolesPermission = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {loading, listPermission} = useSelector(
    (state) => state.permission_reducer,
  );

  // Global State
  const [gridData, setGridData] = useState([]);
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [isCheckData, setIsCheckData] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [sortField, setSortField] = useState(null);

  // Function

  const selectCheckBox = (privId = null, action = 'general') => {
    if (gridData.length > 0) {
      const newData = new Array();
      const newOptions = new Array();

      let isHeaderCheck = false;

      if (privId === null) {
        gridOptions.map((option) => {
          if (option.headerType === 'checkbox') {
            isHeaderCheck = !option.isCheck;
            option.isCheck = !option.isCheck;
          }

          newOptions.push(option);
        });

        setGridOptions((prevState) => (prevState = newOptions));
      }

      gridData.map((data) => {
        if (privId === null) {
          data.isCheck = isHeaderCheck;
        } else {
          if (data.priviledgeId === privId) {
            if (action === 'general') {
              data.isCheck = !data.isCheck;
            } else {
              data.isCheck = true;
            }
          }
        }

        newData.push(data);
      });

      const selectedData = new Array();

      newData.map((data) => {
        if (data.isCheck) {
          selectedData.push(data);
        }
      });

      props.setSelectedPermission(selectedData);
      setGridData((prevState) => (prevState = newData));
    }
  };

  const onSort = (sortType, field) => {
    let isSort = null;
    let newData = [...gridData];
    if (field === null || field === sortField) {
      if (sortType === null) isSort = 'asc';
      if (sortType === 'asc') isSort = 'desc';
      if (sortType === 'desc') isSort = 'asc';
    }
    if (field !== null && field !== sortField) {
      isSort = 'asc';
    }
    setSortType(isSort);
    setSortField(field);
    if (isSort === 'asc')
      newData.sort((a, b) => (a[field] > b[field] ? 1 : -1));
    if (isSort === 'desc')
      newData.sort((a, b) => (a[field] < b[field] ? 1 : -1));

    setGridData((prevState) => (prevState = newData));
  };

  // End Function

  // Hooks

  const checkHistory = useCallback(() => {
    if (gridData.length > 0) {
      props.selectedPermission.map((roles) => {
        selectCheckBox(roles.priviledgeId, 're-render');
      });
    }
  }, [gridData]);

  useEffect(() => {
    if (!isCheckData) {
      if (gridData.length > 0) {
        if (props.mode !== 'create') {
          props.currentRoleIds.map((roleId) => {
            selectCheckBox(roleId, 're-render');
          });
          setIsCheckData(true);
        }
      }
    }
  }, [gridData]);

  useEffect(() => {
    if (listPermission.length > 0) {
      setGridData((prevState) => (prevState = listPermission));
    }

    checkHistory();
  }, [listPermission]);

  useEffect(() => {
    if (props.selectedPermission.length > 0) props.setIsComplete(true);
    else props.setIsComplete(false);
  }, [props.selectedPermission]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      setIsCheckData(false);
      setGridData([]);
      setGridOptions(gridOptionsArray);
    });

    return pageLoad;
  }, [navigation]);

  useEffect(() => {
    dispatch(getListPermission());
  }, []);

  return (
    <View
      style={styles.container}
      onTouchStart={() => props.setScrollView(true)}
      onTouchEnd={() => props.setScrollView(false)}>
      <View style={styles.menuBarContainer}>
        <Text style={{color: '#707070'}}>
          Selected: {props.selectedPermission.length} | Total: {gridData.length}
        </Text>
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
        sortType={sortType}
        sortField={sortField}
        onSort={onSort}
      />
    </View>
  );
};

CreateRolesPermission.propTypes = {
  mode: PropTypes.string,
  currentRoleIds: PropTypes.array,
  selectedPermission: PropTypes.array,
  setScrollView: PropTypes.func,
  setSelectedPermission: PropTypes.func,
  setIsComplete: PropTypes.func,
};
CreateRolesPermission.defaultProps = {
  mode: 'create',
  currentRoleIds: [],
  selectedPermission: [],
  setScrollView: () => {},
  setSelectedPermission: () => {},
  setIsComplete: () => {},
};

export default CreateRolesPermission;

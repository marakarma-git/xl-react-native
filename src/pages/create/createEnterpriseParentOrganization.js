import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/account.style';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GridComponent, Text} from '../../components';
import {getEnterpriseList} from '../../redux/action/enterprise_management_action';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ModalSearchPicker from '../../components/modal/ModalSearchPickerCustom';
import {enterpriseManagementSetSearchText} from '../../redux/action/enterprise_management_array_header_action';

const gridOptionsArray = [
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '75%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Name',
    field: 'enterpriseName',
    cellType: 'treeViewWithCheckBox',
    headerType: 'text',
  },
  {
    bgColor: '#F4F3F4',
    headerColor: '#707070',
    width: '25%',
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Children',
    field: 'childrenCnt',
    cellType: 'text',
    headerType: 'text',
  },
];

const CreateEnterpriseParentOrganization = (props) => {
  const dispatch = useDispatch();
  const {formPosition, selectedParentOrganization} = props;
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [gridData, setGridData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [filterValue, setFilterValue] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [addFilter, setAddFilter] = useState([
    {
      label: 'Name',
      value: 'enterpriseName',
      isDisabled: false,
      isVisible: true,
    },
  ]);
  const {loading, data_enterprise} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  const filterData = (searchText) => {
    dispatch(enterpriseManagementSetSearchText({searchText}));
    dispatch(getEnterpriseList());
  };
  const dataManipulation = (data) => {
    const resData = [...data];
    if (selectedParentOrganization.length > 0) {
    } else {
      setGridData(
        resData.map((data) => {
          data.isDisabled = false;
          return data;
        }),
      );
    }
  };
  const checkboxToggle = (cellId, actionType = 'checkbox') => {
    const resData = [...gridData];
    const selectedData = resData.find((data) => data.enterpriseId === cellId);
    const isCheck = selectedData.treeCheck;
    const parentId = selectedData.enterpriseParentId;
    const visibility = selectedData.visibility;
    let enterpriseStatus = 'root';
    if (selectedData.enterpriseParentId) {
      if (selectedData.childrenCnt > 0) enterpriseStatus = 'parent';
      else enterpriseStatus = 'child';
    }
    const newData =
      actionType === 'checkbox'
        ? onCheck(resData, cellId, enterpriseStatus, isCheck, parentId)
        : onCellHide(resData, cellId, enterpriseStatus, visibility);
    setGridData(newData);
  };
  const onCheck = (data, cellId, enterpriseStatus, isCheck, parentId) => {
    data.map((data) => {
      if (enterpriseStatus === 'root') {
        if (data.enterpriseId !== cellId) {
          data.isDisabled = !isCheck;
        }
        data.treeCheck = !isCheck;
      } else if (enterpriseStatus === 'parent') {
        if (data.enterpriseParentId) {
          if (data.enterpriseId === cellId) {
            data.treeCheck = !isCheck;
          } else {
            if (data.enterpriseParentId === cellId) {
              data.treeCheck = !isCheck;
            }
            data.isDisabled = !isCheck;
          }
        }
      } else {
        if (data.enterpriseParentId) {
          if (data.enterpriseId === cellId) data.treeCheck = !data.treeCheck;
          else {
            if (data.enterpriseId !== parentId)
              data.isDisabled = !data.isDisabled;
          }
        }
      }
    });
    return data;
  };
  const onCellHide = (data, cellId, enterpriseStatus, visibility) => {
    data.map((data) => {
      if (enterpriseStatus === 'root') {
        if (data.enterpriseId !== cellId) {
          data.visibility = !data.visibility;
        }
      } else if (enterpriseStatus === 'parent') {
        if (data.enterpriseParentId) {
          if (data.enterpriseParentId === cellId)
            data.visibility = !data.visibility;
        }
      }
      if (data.icon) {
        data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
      }
    });
    return data;
  };
  useEffect(() => {
    if (formPosition === 1) {
      dispatch(getEnterpriseList());
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [formPosition]);
  useEffect(() => {
    if (isReady) {
      dataManipulation(data_enterprise);
    }
  }, [data_enterprise]);

  return (
    <View style={{marginVertical: 10}}>
      <TouchableOpacity
        onPress={() => setShowFilterModal(true)}
        style={styles.buttonFilter}>
        <AntDesign name="plus" size={14} color="black" />
        <Text fontType="semi-bold" style={{fontSize: 12}}>
          Add Filter
        </Text>
        <AntDesign name="caretdown" size={12} color="black" />
      </TouchableOpacity>
      {filterValue === 'enterpriseName' && (
        <View style={styles.filterInput}>
          <TouchableOpacity
            onPress={() => {
              setFilterValue(null);
              setKeyword('');
              setAddFilter((prevState) =>
                [...prevState].map((data) => {
                  data.isDisabled = data.value === filterValue && false;
                  return data;
                }),
              );
            }}>
            <AntDesign name="close" size={14} color="black" />
          </TouchableOpacity>
          <Text fontType="semi-bold" style={{fontSize: 12}}>
            Name contains
          </Text>
          <TextInput
            value={keyword}
            onChangeText={(text) => {
              setKeyword(text);
              filterData(text);
            }}
            style={styles.filterTextInput}
          />
        </View>
      )}
      <GridComponent
        loading={loading}
        gridOptions={gridOptions}
        gridData={gridData}
        colHeight={40}
        tableMaxHeight={250}
        keyExtractor="enterpriseId"
        onPressCheckBox={(enterpriseId) =>
          checkboxToggle(enterpriseId, 'checkbox')
        }
        onPressTree={(enterpriseId) => checkboxToggle(enterpriseId, 'tree')}
      />
      {showFilterModal && (
        <ModalSearchPicker
          modalHeight={120}
          data={addFilter}
          onChange={(e) => {
            setFilterValue(e.value);
            setShowFilterModal(false);
            setAddFilter((prevState) =>
              [...prevState].map((data) => {
                data.isDisabled = data.value === e.value;
                return data;
              }),
            );
          }}
          onClose={() => setShowFilterModal(false)}
          removeSearch={true}
          title={'Filter'}
          value={filterValue}
        />
      )}
    </View>
  );
};

CreateEnterpriseParentOrganization.propTypes = {
  formPosition: PropTypes.number,
  selectedParentOrganization: PropTypes.array,
};
CreateEnterpriseParentOrganization.defaultProps = {
  formPosition: 0,
  selectedParentOrganization: [],
};

export default CreateEnterpriseParentOrganization;

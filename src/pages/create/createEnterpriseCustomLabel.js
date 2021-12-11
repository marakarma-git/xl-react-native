import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {GridComponent} from '../../components';
import {colors} from '../../constant/color';
import styles from '../../style/account.style';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomLabel} from '../../redux/action/enterprise_management_action';
const gridOptionsArray = [
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 100,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Enabled',
    field: 'isActive',
    cellType: 'switch',
    headerType: 'text',
    activeText: 'Yes',
    inActiveText: 'No',
  },
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 150,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Default Label',
    field: 'defaultLabel',
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 150,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Field Type',
    field: 'fieldType',
    cellType: 'dropdown',
    headerType: 'text',
    optionField: 'fieldTypeArray',
  },
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 250,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Custom Label',
    field: 'customLabel',
    cellType: 'textinput',
    headerType: 'text',
    formRequired: true,
  },
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 250,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Custom Value',
    field: 'customValue',
    cellType: 'textinput',
    headerType: 'text',
    activeIfValue: 'Combo Box',
    keyToActivateField: 'fieldType',
    placeholder: 'e.g option1,option2,option3',
    formRequired: true,
  },
];

const CreateEnterpriseCustomLabel = (props) => {
  const dispatch = useDispatch();
  const {
    formPosition,
    businessCategory,
    setCustomLabel,
    changesLabelRow,
    setChangesLabelRow,
  } = props;
  const {custom_label} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [gridData, setGridData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const onSwitchStatus = (dataId, val) => {
    const resData = [...gridData];
    const dataChanges = resData.map((data) => {
      if (data.suggestId === dataId) {
        data.switchActive = val;
        data.activeStatus = val;
      }
      return data;
    });
    changeDataHandler(dataChanges, dataId, 'switch');
  };
  const onPickItem = (value, dataId) => {
    const resData = [...gridData];
    const dataChanges = resData.map((data) => {
      if (data.suggestId === dataId) {
        data.fieldType = value;
      }
      return data;
    });
    changeDataHandler(dataChanges, dataId, 'combobox');
  };
  const onChangeText = (dataId, keyName, text) => {
    const resData = [...gridData];
    const dataChanges = resData.map((data) => {
      if (data.suggestId === dataId) {
        data[keyName] = text;
      }
      return data;
    });
    changeDataHandler(dataChanges, dataId, 'textinput');
  };
  const changeDataHandler = (dataChanges, dataId, formType = 'switch') => {
    const addChangesLabel = [...changesLabelRow];
    const filterChangesLabel = dataChanges.find(
      (data) => data.suggestId == dataId,
    );
    if (filterChangesLabel.activeStatus) {
      if (formType === 'switch') {
        addChangesLabel.push(filterChangesLabel);
        setChangesLabelRow(addChangesLabel);
      } else {
        setChangesLabelRow((prevState) =>
          [...prevState].map((data) => {
            if (data.suggestId === dataId) data = filterChangesLabel;
            return data;
          }),
        );
      }
    } else {
      const filterData = addChangesLabel.filter(
        (data) => data.suggestId !== dataId,
      );
      setChangesLabelRow(filterData);
    }
    setGridData(dataChanges);
    setCustomLabel(changeCustomLabel(dataChanges));
  };
  const dataManipulation = (data) => {
    const resData = [...data];
    const dataChanges = [];
    if (changesLabelRow.length > 0) {
      const changesLabel = [...changesLabelRow];
      resData.map((data) => {
        let changesTempData = null;
        changesLabel.map((labelData) => {
          if (data.suggestId === labelData.suggestId)
            changesTempData = labelData;
        });
        if (changesTempData) dataChanges.push(changesTempData);
        else dataChanges.push(data);
      });
      setGridData(dataChanges);
      setCustomLabel(dataChanges);
    } else {
      setGridData(resData);
      setCustomLabel(changeCustomLabel(resData));
    }
  };
  const changeCustomLabel = (data) => {
    const resData = [...data];
    return resData.map((data) => {
      return {
        activeStatus: data.activeStatus,
        customLabel: data.customLabel,
        customLabelId: '',
        customValue: data.customValue,
        fieldType: data.fieldType,
        labelNumber: data.labelNumber,
      };
    });
  };
  useEffect(() => {
    if (formPosition === 2) {
      dispatch(getCustomLabel(businessCategory));
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [formPosition]);
  useEffect(() => {
    if (isReady) {
      dataManipulation(custom_label);
    }
  }, [custom_label]);
  return (
    <View style={{marginVertical: 10}}>
      <GridComponent
        loading={custom_label === null}
        gridOptions={gridOptions}
        gridData={gridData}
        colHeight={40}
        tableMaxHeight={400}
        isOverflow={true}
        customTableStyle={styles.customTable}
        onSwitch={onSwitchStatus}
        keyExtractor="suggestId"
        activateDisabledFeature={true}
        onPickItem={onPickItem}
        onChangeText={onChangeText}
      />
    </View>
  );
};

CreateEnterpriseCustomLabel.propTypes = {
  formPosition: PropTypes.number,
  businessCategory: PropTypes.string,
  setCustomLabel: PropTypes.array,
  changesLabelRow: PropTypes.array,
  setChangesLabelRow: PropTypes.func,
};
CreateEnterpriseCustomLabel.defaultProps = {
  PropTypes: 0,
  businessCategory: '',
  setCustomLabel: [],
  changesLabelRow: [],
  setChangesLabelRow: () => {},
};

export default CreateEnterpriseCustomLabel;

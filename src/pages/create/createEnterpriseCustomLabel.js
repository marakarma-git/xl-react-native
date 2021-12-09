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
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 250,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Custom Label',
    field: 'customLabel',
    cellType: 'text',
    headerType: 'text',
  },
  {
    bgColor: colors.main_color,
    headerColor: 'white',
    width: 250,
    cellAlign: 'center',
    headerAlign: 'center',
    label: 'Custom Value',
    field: 'customValue',
    cellType: 'text',
    headerType: 'text',
  },
];

const CreateEnterpriseCustomLabel = (props) => {
  const dispatch = useDispatch();
  const {formPosition, businessCategory} = props;
  const {custom_label} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [gridData, setGridData] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const onSwitchStatus = (dataId, val) => {
    setGridData((prevState) =>
      [...prevState].map((data) => {
        if (data.suggestId === dataId) {
          data.switchActive = val;
          data.activeStatus = val;
        }
        return data;
      }),
    );
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
      setGridData(custom_label);
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
      />
    </View>
  );
};

CreateEnterpriseCustomLabel.propTypes = {
  formPosition: PropTypes.number,
  businessCategory: PropTypes.string,
};
CreateEnterpriseCustomLabel.defaultProps = {
  PropTypes: 0,
  businessCategory: '',
};

export default CreateEnterpriseCustomLabel;

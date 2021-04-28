import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, CustomRadioButtonComponent, GridComponent} from '../../components';

import styles from '../../style/create.style';
import { getEnterpriseList } from '../../redux/action/enterprise_management_action';

const gridOptionsArray = [
  {bgColor: "#F4F3F4", headerColor: "#707070", width: '50%', cellAlign: 'center', headerAlign: 'center', label: "Organization", field: "enterpriseName", cellType: "treeViewWithCheckBox"},
  {bgColor: "#F4F3F4", headerColor: "#707070", width: '50%', cellAlign: 'center', headerAlign: 'center', label: "Children", field: "childrenCnt", cellType: "text"},
];

const CreateOrganization = () => {
  const dispatch = useDispatch();
  const { data_enterprise } = useSelector(state => state.enterprise_management_get_enterprise_reducer);

  const [gridOptions, setGridOptions] = useState(gridOptionsArray);
  const [gridData, setGridData] = useState([]);
  
  useEffect(() => {
    if(data_enterprise.length <= 0){
      dispatch(getEnterpriseList());
    }

    if(data_enterprise.length > 0){
      setGridData(data_enterprise)
    }

  }, [data_enterprise]);

  return(
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <CustomRadioButtonComponent
        label="XL User"
        radioValue="XL User"
        status="unchecked"
      />
      <CustomRadioButtonComponent
        label="Non XL User"
        radioValue="Non XL User"
        status="unchecked"
      />
      <View style={styles.menuBarContainer}>
        <Text style={{ color: "#707070" }}>Total: 0 | Selected: 0</Text>
      </View>
      {
        gridData.length > 0 &&
        <GridComponent
          dataSetter={setGridData}
          gridOptions={gridOptions}
          gridData={gridData}
          colHeight={30}
          tableMaxHeight={250}
          keyExtractor="enterpriseId"
        />
      }
    </View>
  )
}

CreateOrganization.propTypes = {};

export default CreateOrganization;
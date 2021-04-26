import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Text, CustomRadioButtonComponent, GridComponent} from '../../components';

import styles from '../../style/create.style';

const gridOptions = [
  {bgColor: "#F4F3F4", headerColor: "#707070", width: '50%', cellAlign: 'center', headerAlign: 'center', label: "Organization", field: "enterpriseName", cellType: "treeCheckBox"},
  {bgColor: "#F4F3F4", headerColor: "#707070", width: '50%', cellAlign: 'center', headerAlign: 'center', label: "Children", field: "children", cellType: "text"},
];

const gridData = [
  { id: 0, enterpriseName: "XL Axiata", children: 59, level: 0 },
  { id: 1, enterpriseName: "Monitor VADS", children: 0, level: 1 }
]

const CreateOrganization = () => {
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
        <Text style={{ color: "#707070" }}>Total: 103 | Selected: 0</Text>
      </View>
      <GridComponent
        gridOptions={gridOptions}
        gridData={gridData}
        colHeight={30}
      />
    </View>
  )
}

CreateOrganization.propTypes = {};

export default CreateOrganization;
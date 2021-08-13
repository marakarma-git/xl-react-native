import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from '../../style/create.style';


const CreateRolesSummaryVisibility = (props) => {

  useEffect(() => {
    props.setScrollView(true)
  }, []);

  return (
    <View>
      <View style={[styles.menuBarContainer, styles.menuBarContainerAsTitle]}>
        <View style={styles.menuBarTitleContainer}>
          <Text>Visibility Type</Text>
        </View>
        <View style={styles.menuBarTitleContainer}>
          <Text>Number of Organization</Text>
        </View>
      </View>
      <View style={[styles.menuBarContainer, styles.menuBarContainerAsTitle, { backgroundColor: 'white' }]}>
        <View style={styles.menuBarTitleContainer}>
          <Text>{props.selectedVisibility === 0 ? "Owner Organizations Only" : "All Child Organizations"}</Text>
        </View>
        <View style={styles.menuBarTitleContainer}>
          <Text>{props.selectedVisibility === 0 ? "owner organizations": `${props.selectedOwnership[0].childrenCnt}+ owner organizations`}</Text>
        </View>
      </View>
      <View style={[styles.menuBarContainer, styles.menuBarContainerAsTitle]}>
        <View style={styles.menuBarTitleContainer}>
          <Text>Organization</Text>
        </View>
        <View style={styles.menuBarTitleContainer}>
          <Text>Child Organization</Text>
        </View>
      </View>
      <View style={[styles.menuBarContainer, styles.menuBarContainerAsTitle, { backgroundColor: 'white' }]}>
        <View style={styles.menuBarTitleContainer}>
          <Text>{props.selectedOwnership[0].enterpriseName}</Text>
        </View>
        <View style={styles.menuBarTitleContainer}>
          <Text>{props.selectedOwnership[0].childrenCnt}</Text>
        </View>
      </View>
    </View>
  );
};

CreateRolesSummaryVisibility.propTypes = {
  selectedOwnership: PropTypes.array,
  selectedVisibility: PropTypes.string,
  setScrollView: PropTypes.func
}

CreateRolesSummaryVisibility.defaultProps = {
  selectedOwnership: [],
  selectedVisibility: "",
  setScrollView: () => {} 
}

export default CreateRolesSummaryVisibility;

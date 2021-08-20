import React, {useState, useEffect} from 'react';
import {Text} from '../index';
import {View, TouchableOpacity} from 'react-native';

// Undestruct
import styles from '../../style/usageAnalytics.style';
import PropTypes from 'prop-types';
import CardFilterLabel from './CardFilterLabel';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const FilterCardComponent = (props) => {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterLabelContainer}>
        <CardFilterLabel title="Enterprise" value="Company A" />
        <CardFilterLabel title="Subscription Package" value="Company A" />
      </View>
      <View>
        <TouchableOpacity>
          <MaterialCommunityIcon name={'filter'} size={26} color={'#707070'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

FilterCardComponent.propTypes = {};
FilterCardComponent.defaultProps = {};

export default FilterCardComponent;

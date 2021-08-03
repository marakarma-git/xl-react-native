import React from 'react';
import PropTypes from 'prop-types';
import Text from './text';
import {View, StyleSheet} from 'react-native';

const NoDataTextComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text fontType="bold" style={styles.noDataText}>
        {props.noDataText || 'No Data'}
      </Text>
    </View>
  );
};

NoDataTextComponent.propTypes = {};
NoDataTextComponent.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
  },
});

export default NoDataTextComponent;
import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Text} from '../index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constant/color';

const CardSeverityLevel = (props) => {
  const {severityHigh, severityMedium, severityLow} = props;
  const {
    red_severity_level,
    yellow_severity_level,
    gray_severity_level,
  } = colors;
  return (
    <View style={styles.cardContainer}>
      <SeverityLevel colors={red_severity_level} totalMessage={severityHigh} />
      <SeverityLevel
        colors={yellow_severity_level}
        totalMessage={severityMedium}
      />
      <SeverityLevel colors={gray_severity_level} totalMessage={severityLow} />
    </View>
  );
};

const SeverityLevel = ({colors, totalMessage}) => {
  return (
    <View style={styles.severityLevelWrapper}>
      <FontAwesome
        name="circle"
        size={20}
        color={colors}
        style={styles.iconMessage}
      />
      <Text style={styles.textMessage}>{totalMessage} Message</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
    height: 40,
    backgroundColor: 'white',
    marginHorizontal: '3%',
  },
  severityLevelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '32%',
    height: '100%',
  },
  textMessage: {
    fontSize: 13,
  },
  iconMessage: {
    marginRight: 10,
  },
});
CardSeverityLevel.propTypes = {
  severityHigh: PropTypes.number,
  severityMedium: PropTypes.number,
  severityLow: PropTypes.number,
};
CardSeverityLevel.defaultProps = {
  severityHigh: 0,
  severityMedium: 0,
  severityLow: 0,
};

export default CardSeverityLevel;

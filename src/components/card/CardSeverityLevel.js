import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../index';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../constant/color';

const CardSeverityLevel = (props) => {
  const {
    totalMessage,
    severityHigh,
    severityMedium,
    severityLow,
    activeMenu,
    setActiveMenu,
  } = props;
  const {
    red_severity_level,
    yellow_severity_level,
    gray_severity_level,
  } = colors;
  return (
    <View style={styles.cardContainer}>
      <SeverityLevel
        isActive={activeMenu === 'All'}
        color={'white'}
        totalMessage={totalMessage}
        title={'All'}
        setActiveMenu={setActiveMenu}
      />
      <SeverityLevel
        isActive={activeMenu === 'High'}
        color={red_severity_level}
        totalMessage={severityHigh}
        title={'High'}
        setActiveMenu={setActiveMenu}
      />
      <SeverityLevel
        isActive={activeMenu === 'Medium'}
        color={yellow_severity_level}
        totalMessage={severityMedium}
        title={'Medium'}
        setActiveMenu={setActiveMenu}
      />
      <SeverityLevel
        isActive={activeMenu === 'Low'}
        color={gray_severity_level}
        totalMessage={severityLow}
        title={'Low'}
        setActiveMenu={setActiveMenu}
      />
    </View>
  );
};

const SeverityLevel = ({
  color,
  totalMessage,
  title,
  isActive,
  setActiveMenu,
}) => {
  return (
    <TouchableOpacity
      onPress={() => setActiveMenu(title)}
      style={[
        styles.severityLevelWrapper,
        {
          borderBottomColor: isActive
            ? colors.main_color_overlay
            : 'transparent',
        },
      ]}>
      {color !== 'white' && (
        <FontAwesome
          name="circle"
          size={16}
          color={color}
          style={styles.iconMessage}
        />
      )}
      <Text
        style={[
          styles.textMessage,
          {color: isActive ? colors.main_color_overlay : 'black'},
        ]}>{`${title} (${totalMessage})`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_severity_level,
  },
  severityLevelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
    height: '100%',
    borderBottomWidth: 3,
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

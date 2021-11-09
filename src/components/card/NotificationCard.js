import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReadMore from '@fawazahmed/react-native-read-more';

import {colors} from '../../constant/color';
import {Text} from '../index';
import {View, StyleSheet} from 'react-native';

const NotificationCard = (props) => {
  const {message, title, time, userInteraction, severityLevel} = props;

  const severityColor = (severityLevel) => {
    if (severityLevel === 'high') return colors.red_severity_level;
    if (severityLevel === 'medium') return colors.yellow_severity_level;
    return colors.gray_severity_level;
  };

  return (
    <View style={styles.cardContainer}>
      <Text fontType="bold" style={styles.cardTitle}>
        {title}
      </Text>
      <ReadMore
        customTextComponent={Text}
        style={styles.cardText}
        numberOfLines={3}
        seeMoreText="more"
        seeMoreStyle={styles.collapsibleText}
        seeLessText="less"
        seeLessStyle={styles.collapsibleText}>
        {message}
      </ReadMore>
      <View style={styles.cardFooter}>
        <Text style={styles.cardTime}>
          {time ? dayjs(time).fromNow() : '-'}
        </Text>
      </View>
      <FontAwesome
        name="circle"
        size={18}
        color={severityColor(severityLevel)}
        style={styles.severityLevel}
      />
    </View>
  );
};

NotificationCard.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  userInteraction: PropTypes.bool,
  severityLevel: PropTypes.string,
};

NotificationCard.defaultProps = {
  message: 'Test Message',
  title: 'Tesss',
  time: new Date(),
  userInteraction: false,
  severityLevel: 'low',
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 5,
    minHeight: 80,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.gray_severity_level,
  },
  cardFooter: {
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  cardTitle: {
    fontSize: 13,
    color: colors.font_gray,
  },
  cardText: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 15,
  },
  cardTime: {
    fontSize: 10,
    color: colors.gray,
  },
  severityLevel: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  collapsibleText: {
    color: colors.imsi_blue,
  },
});

export default NotificationCard;

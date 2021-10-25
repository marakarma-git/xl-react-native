import React from 'react';
import PropTypes from 'prop-types';

import {View, StyleSheet} from 'react-native';
import {Text} from '../index';
import {Card} from 'react-native-paper';
import {colors} from '../../constant/color';
import dayjs from 'dayjs';

const NotificationCard = (props) => {
  const {message, title, time, userInteraction} = props;

  return (
    <View style={styles.cardContainer}>
      <Text fontType="bold" style={styles.cardTitle}>
        {title}
      </Text>
      <Text style={styles.cardText}>{message}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardTime}>
          {time ? dayjs(time).fromNow() : '-'}
        </Text>
      </View>
    </View>
  );
};

NotificationCard.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  time: PropTypes.string,
  userInteraction: PropTypes.bool,
};

NotificationCard.defaultProps = {
  message: 'Test Message',
  title: 'Tesss',
  time: '',
  userInteraction: false,
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 5,
    height: 90,
    backgroundColor: colors.gray_200,
    borderWidth: 1,
    borderColor: colors.card_border,
  },
  cardFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    bottom: -20,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.font_gray,
  },
  cardText: {
    fontSize: 12,
    color: colors.gray,
  },
  cardTime: {
    fontSize: 10,
    color: colors.gray,
  },
});

export default NotificationCard;

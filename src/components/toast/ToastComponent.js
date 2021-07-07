import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '../index';
import { Animated, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ToastComponent = (props) => {
  const slideAnimation = useRef(new Animated.Value(-60)).current;

  const renderToastType = (type, impactOn = 'color') => {
    switch (type) {
      case "success":
        return impactOn == 'color' ? '#14B8A6' : 'checkmark';
      case "warning":
        return impactOn == 'color' ? '#FBBF24' : 'warning';
      case "error":
        return impactOn == 'color' ? '#EF4444' : 'close';
      case "notice":
        return impactOn == 'color' ? '#3B82F6' : 'chatbox-ellipses';
      case "info":
        return impactOn == 'color' ? '#06B6D4' : 'information-circle';
    
      default:
        return impactOn == 'color' ? '#14B8A6' : 'information-circle';
    }
  }

  useEffect(() => {
    Animated.timing(
      slideAnimation,
      {
        toValue: 15,
        duration: 700
      }
    ).start();
  }, [slideAnimation])

  return (
    <Animated.View style={
      [
        styles.toastContainer,
        props.type && { backgroundColor: renderToastType(props.type, 'color') },
        props.position == 'top' ? { top: slideAnimation } : { bottom: slideAnimation }
      ]
    }>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={renderToastType(props.type, 'icon')}
          color={props.type == 'warning' ? 'black' : 'white'}
          size={30}
        />
      </View>
      <View style={styles.textContainer}>
        <Text fontType="bold" style={
          { color: props.type == 'warning' ? 'black' : 'white', fontSize: 16, paddingBottom: 5 }
        }>
          {props.title}
        </Text>
        <Text style={
          { color: props.type == 'warning' ? 'black' : 'white', fontSize: 14 }
          }>
          {props.message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: '90%',
    marginLeft: '5%',
    minHeight: 60,
    borderRadius: 7
  },
  iconContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    width: '80%',
    height: '100%',
    paddingVertical: 5
  }
});

ToastComponent.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string
}

ToastComponent.defaultProps = {
  title: "",
  type: "success",
  message: ""
}

export default ToastComponent;
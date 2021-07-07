import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from '../index';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const toastWidth = Dimensions.get('screen').width - 20;

const ToastComponent = (props) => {
  const slideAnimation = useRef(new Animated.Value(-60)).current;
  const loadAnimation = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(
      loadAnimation,
      {
        toValue: toastWidth,
        duration: props.duration - 700
      }
    ).start();
  }, [loadAnimation])

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
          { color: props.type == 'warning' ? 'black' : 'white', fontSize: 14, paddingBottom: 5, paddingRight: 10 }
          }>
          {props.message}
        </Text>
      </View>
      <Animated.View style={[styles.loadAnimation, { width: loadAnimation }]}></Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    position: 'absolute', 
    width: toastWidth,
    marginLeft: 10,
    minHeight: 60,
    borderRadius: 5
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
  },
  loadAnimation: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#e7e7e7',
    height: 6,
    width: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  }
});

ToastComponent.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  message: PropTypes.string,
  duration: PropTypes.number
}

ToastComponent.defaultProps = {
  title: "",
  type: "success",
  message: "",
  duration: 4500
}

export default ToastComponent;
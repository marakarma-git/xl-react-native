import React from 'react';
import PropTypes from 'prop-types';
import ProgressCircle from 'react-native-progress-circle';
import { Text } from '../index';

const CircularProgressComponent = (props) => {
    return(
        <ProgressCircle 
            percent={props.stepPercent}
            radius={35}
            borderWidth={8}
            color={props.color}
            shadowColor={props.shadowColor}
            bgColor={props.bgColor}
        >
        <Text style={{ fontSize: 14, color: '#707070' }}>{props.progressText}</Text>
        </ProgressCircle>
    );
}

CircularProgressComponent.propTypes = {
    stepPercent: PropTypes.number,
    color: PropTypes.string,
    shadowColor: PropTypes.string,
    bgColor: PropTypes.string
};

CircularProgressComponent.defaultProps = {
    stepPercent: 0,
    color: "#3399FF",
    shadowColor: "#999",
    bgColor: "#fff",
    progressText: "Progress"
}

export default CircularProgressComponent;
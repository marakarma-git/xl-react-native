import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {View, Dimensions} from 'react-native';
import VolumeChartComponent from './volumeChart';
import CumulativeChartComponent from './cumulativeChart';
import BothChartComponent from './bothChart';
import Orientation from '../../helpers/orientation';

const RealtimeChartComponent = (props) => {
  const {dataSet1, dataSet2, chartType} = props;
  const [orientation, setOrientation] = useState('potrait');
  const detectOrientation = useCallback(() => {
    if (Orientation.getHeight() <= Orientation.getWidth()) {
      setOrientation('landscape');
    }
    Dimensions.addEventListener('change', () => {
      setOrientation(Orientation.isPortrait() ? 'potrait' : 'landscape');
    });
  }, [Dimensions]);
  useEffect(() => {
    detectOrientation();
  }, []);
  const generateChartType = (type) => {
    switch (type) {
      case 'day':
        return <VolumeChartComponent dataSet={dataSet1} />;
      case 'cumulative':
        return <CumulativeChartComponent dataSet={dataSet2} />;
      case 'both':
        return <BothChartComponent dataSet1={dataSet1} dataSet2={dataSet2} />;

      default:
        return;
    }
  };
  const generateChart = () => (
    <View style={{position: 'relative'}}>{generateChartType(chartType)}</View>
  );
  return <View style={{paddingLeft: 10}}>{generateChart()}</View>;
};

RealtimeChartComponent.propTypes = {
  dataSet1: PropTypes.array,
  dataSet2: PropTypes.array,
  chartType: PropTypes.string,
};
RealtimeChartComponent.defaultProps = {
  dataSet1: [],
  dataSet2: [],
  chartType: 'day',
};

export default RealtimeChartComponent;

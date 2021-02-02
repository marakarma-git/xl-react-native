import React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Helper from '../../helpers/helper';

import styles from '../../style/home.style';

const ChartLegendComponent = ({dataSet}) => {
  const generateLegend = () =>
    dataSet.map((data, index) => (
      <View key={index} style={styles.legendContainer}>
        <Ionicons name="square" color={data.color} style={styles.legendIcon} />
        <Text style={{fontSize: 11, color: data.color}}>
          {`${data.percentage}% ${data.status} (${Helper.numberFormat(
            data.total,
            '.',
          )})`}
        </Text>
      </View>
    ));

  return (
    <View style={[styles.containerPie, {width: '55%'}]}>
      {generateLegend()}
    </View>
  );
};

export default ChartLegendComponent;

import React from 'react';
import {View} from 'react-native';
import PieChart from './piechart';
import BarChart from './barchart';

const WidgetStore = ({widgetList, navigation}) => {
  const generateWidget = () => (
    <>
      {widgetList.map((item, index) => (
        <View key={index}>{widgetType(item)}</View>
      ))}
    </>
  );

  const widgetType = (item) => {
    switch (item.widgetCode) {
      case 'SIM-Statistics':
        return <PieChart navigation={navigation} item={item} />;
      case 'Top-Traffic':
        return <BarChart navigation={navigation} item={item} />;
      // case 'Aggregated-Traffic':
      //     return(
      //         <AggregateTraffic
      //             item={item}
      //             navigation={navigation}
      //         />
      //     )

      default:
        return;
    }
  };

  return <>{generateWidget()}</>;
};

export default WidgetStore;

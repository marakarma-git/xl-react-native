import React from 'react';
import {View} from 'react-native';
import PieChart from './piechart';
import BarChart from './barchart';

const WidgetStore = ({widgetList}) => {
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
        return <PieChart item={item} />;
      case 'Top-Traffic':
        return <BarChart viewType="dashboard" item={item} filterParams={{}} />;
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

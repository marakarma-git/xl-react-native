import React from 'react';
import {View} from 'react-native';
import PieChart from './piechart';
import BarChart from './barchart';
import ColumnChart from './columnchart';

const WidgetStore = ({widgetList}) => {
  var widgetListdata = widgetList.sort(function (a, b) {
    return a.position < b.position;
  });
  const generateWidget = () => (
    <>
      {widgetListdata.map((item, index) => (
        <View key={index}>{widgetType(item)}</View>
      ))}
    </>
  );

  const widgetType = (item) => {
    console.log(item)
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
      // case 'SIM-Statistics':
      //   return <PieChart item={item} />;
      case 'Financial-Report':
        return <ColumnChart viewType="dashboard" item={item} filterParams={{}} />;
      // case 'Top-Traffic':
      //   return <BarChart viewType="dashboard" item={item} filterParams={{}} />;
      // case 'Aggregated-Traffic':
      //   return <Aggregate item={item} filterParams={{}} />; 
      // case 'custom-statistics':
      //   return <BarChart viewType="dashboard" item={item} filterParams={{}} />; 
      // case 'Device-Network-Statistics':
      //   return <BarChart viewType="dashboard" item={item} filterParams={{}} />; 
      // case 'Top-Device':
      //   return <ColumnChart viewType="dashboard" item={item} filterParams={{}} />;
      default:
        return;
    }
  };

  return <>{generateWidget()}</>;
};

export default WidgetStore;

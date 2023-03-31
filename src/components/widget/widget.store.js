import React from 'react';
import {View} from 'react-native';
import PieChart from './piechart';
import BarChart from './barchart';
import BarChartWithoutFilter from './barchartwithoutfilter';
import ColumnChart from './columnchart';
import RadarChart from './radarchart';
import Aggregate from './aggregate.traffic';

const WidgetStore = ({widgetList}) => {
  var widgetListdata = widgetList.sort(function (a, b) {
    return a.jsonData.position > b.jsonData.position ? 1 : (a.jsonData.position === b.jsonData.position ? 0 : -1 );
  });
  const generateWidget = () => (
    <>
      {widgetListdata.map((item, index) => (
        <View key={index}>{widgetType(item)}</View>
      ))}
    </>
  );

  const widgetType = (item) => {
    switch (item.widgetCode) {
      case 'SIM-Statistics':
        return <PieChart item={item} datareduce="sim"/>;
      case 'Top-Traffic':
        return <BarChart viewType="dashboard" item={item} filterParams={{}}/>;
      case 'Financial-Report':
        return <ColumnChart item={item} />;
      case 'custom-statistics':
        return <PieChart item={item} datareduce="custom"/>; 
      case 'Aggregated-Traffic':
        return <Aggregate item={item} filterParams={{}} />; 
      case 'Device-Network-Statistics':
        return <RadarChart item={item}/>; 
      case 'Top-Device':
        return <BarChartWithoutFilter item={item}/>;
      default:
        return;
    }
  };

  return <>{generateWidget()}</>;
};

export default WidgetStore;

import React from 'react';
import {View} from 'react-native';
import PieChart from './piechart';
import BarChart from './barchart';
import BarChartWithoutFilter from './barchartwithoutfilter';
import ColumnChart from './columnchart';
import RadarChart from './radarchart';
import Aggregate from './aggregate.traffic';

const WidgetStore = ({widgetList, param1}) => {
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
        return <PieChart item={item} datareduce="sim" param1={param1}/>;
      case 'Top-Traffic':
        return <BarChart viewType="dashboard" item={item} filterParams={{}} param1={param1}/>;
      case 'Financial-Report':
        return <ColumnChart item={item}  param1={param1}/>;
      case 'custom-statistics':
        return <PieChart item={item} datareduce="custom" param1={param1}/>; 
      case 'Aggregated-Traffic':
        return <Aggregate item={item} filterParams={{}}  param1={param1}/>; 
      case 'Device-Network-Statistics':
        return <RadarChart item={item} param1={param1}/>; 
      case 'Top-Device':
        return <BarChartWithoutFilter item={item} param1={param1}/>;
      default:
        return;
    }
  };

  return <>{generateWidget()}</>;
};

export default WidgetStore;

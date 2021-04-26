import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View} from 'react-native';
import {Text} from '../../components';

// const GridComponent = (props) => {
//   return(
//       <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
//         <GridHeaderComponent 
//           gridOptions={props.gridOptions}
//           colHeight={props.colHeight}
//         />
//         <GridCellComponent
//           gridOptions={props.gridOptions} 
//           gridData={props.gridData}
//           colHeight={props.colHeight}
//         />
//       </View>
//   );
// }

const GridHeaderComponent = (props) => {
  return(
    <React.Fragment>
      {props.gridOptions.map((option) => (
        <View style={{ 
          height: props.colHeight, 
          width: option?.width,
          justifyContent: 'center',
          alignItems: option.headerAlign,
          backgroundColor: option.bgColor || "#F4F3F4",
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: 1 }}>
            <Text style={{ color: option.headerColor || "black" }}>{option.label}</Text>
        </View>
      ))}
    </React.Fragment>
  );
}

// const GridCellComponent = (props) => {

//   const renderItem = ({ item }) => {
//     return(
//       <View style={{ 
//         height: props.colHeight, 
//         width: item?.width,
//         justifyContent: 'center',
//         alignItems: item.cellAlign,
//         backgroundColor: "white",
//         borderBottomColor: "#D8D8D8",
//         borderBottomWidth: 1 }}>
//           <Text style={{color: "black" }}>{item.colHeight}</Text>
//       </View>
//     );
//   }

//   return(
//     <FlatList 
//       data={props.gridOptions}
//       renderItem={renderItem}
//       keyExtractor={item => item.id}
//     />
//   );
// }

GridComponent.propTypes = {
  gridData: PropTypes.array,
  gridOptions: PropTypes.array,
  onPressCell: PropTypes.func,
  onPressCheckBox: PropTypes.func,
  colHeight: PropTypes.number
};

GridComponent.defaultProps = {
  gridData: [],
  gridOptions: [],
  onPressCell: () => {},
  onPressCheckBox: () => {},
  colHeight: 40
};

export default GridComponent;
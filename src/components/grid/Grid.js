import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {Text} from '../../components';
import {FlatList, View, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomCheckBox from '../customCheckBox';

const GridComponent = (props) => {
  return(
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <GridHeaderComponent 
            gridOptions={props.gridOptions}
            colHeight={props.colHeight}
          />
        </View>
        <GridCellComponent
          keyExtractor={props.keyExtractor}
          dataSetter={props.dataSetter}
          gridOptions={props.gridOptions} 
          gridData={props.gridData}
          colHeight={props.colHeight}
          tableMaxHeight={props.tableMaxHeight}
        />
      </View>
  );
}

const GridHeaderComponent = (props) => {
  return(
    <React.Fragment>
      {props.gridOptions.map((option, index) => (
        <View
        key={index}  
        style={{ 
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

const GridCellComponent = (props) => {

  const treeViewToggle = (cellId) => {
    const newData = new Array();
    let isRoot = false;
    props.gridData.map((data) => {
      if(data.enterpriseId == cellId){
        if(data.enterpriseParentId === null){
          isRoot = true;
        }
      }

      if(isRoot){
        if(data.enterpriseId !== cellId){
          data.visibility = !data.visibility;
        }
        data.icon
      }else{
        if(data.enterpriseParentId === cellId){
          data.visibility = !data.visibility;
        }
      }

      if (data.icon) {
        data.icon = data.icon == 'caret-down' ? 'caret-up' : 'caret-down';
      }

      newData.push(data);
    });
    props.dataSetter(newData);
  };

  const renderList = useCallback(() => {
    return(
      <View style={{ maxHeight: 200 }}>
        <FlatList
          data={props.gridData}
          renderItem={renderCell}
          keyExtractor={item => item[props.keyExtractor]}
          extraData={item => item.visibility}
        />
      </View>
    )
  }, [props.gridData]);

  const renderCell = ({ item }) => {
    return(
      <View style={{ flexDirection: 'row' }}>
        { props.gridOptions.map((option, index) => (
          <CellComponent 
            key={index}
            cellId={item.enterpriseId}
            colHeight={props.colHeight}
            width={option.width}
            align={option.headerAlign}
            bgColor={'white'}
            data={item[option.field]}
            headerColor={"black"}
            cellType={option.cellType}
            level={item.level ? item.level : 0}
            visibility={item.visibility ? true : false}
            icon={item.icon}
            onPressTree={treeViewToggle}
          />
        )) }
      </View>
    );
  }

  return(
    <React.Fragment>
      { renderList() }
    </React.Fragment>
  );
}

const CellComponent = (props) => {

  const generateCellType = () => {
    switch (props.cellType) {
      case "text":
        return <CellTextComponent {...props} />;
      case "treeViewWithCheckBox":
        return <CellTreeViewCheckBoxComponent {...props} />;

      default:
        return <CellTextComponent {...props} />;
    }
  }

  return(
    <React.Fragment>
      { props.visibility && generateCellType() }
    </React.Fragment>
  );
}

const CellTreeViewCheckBoxComponent = (props) => {

  return(
    <View
      style={{ 
        flexDirection: 'row',
        height: props.colHeight, 
        width: props?.width,
        justifyContent: 'flex-start',
        alignItems: props.align,
        backgroundColor: props.bgColor,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
          {
            props.icon ?
            <TouchableOpacity
              onPress={() => props.onPressTree(props.cellId)}>
                <Ionicons
                  name={"caret-down"}
                  color={'black'}
                  style={{ paddingLeft: (props.level * 10) + 5 }}
                />
            </TouchableOpacity>
            :
            <Text style={{ paddingLeft: (props.level * 10) + 8 }}></Text>
            }
          <CustomCheckBox
            style={{ marginHorizontal: 10 }}
            value={false}
            onPress={() => alert("tes")}
          />
          <Text 
            style={{ color: props.headerColor || "black", fontSize: 12 }}>
              {props.data.length > 30 ? props.data.substring(0, 30) + "..." : props.data}
            </Text>
    </View>
  )
}

const CellTextComponent = (props) => {
  return(
    <View
      style={{ 
        height: props.colHeight, 
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.align,
        backgroundColor: props.bgColor,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
          <Text 
            style={{ color: props.headerColor || "black", fontSize: 12 }}>
              {props.data}
          </Text>
    </View>
  )
}

GridComponent.propTypes = {
  gridData: PropTypes.array,
  gridOptions: PropTypes.array,
  onPressCell: PropTypes.func,
  onPressCheckBox: PropTypes.func,
  colHeight: PropTypes.number,
  dataSetter: PropTypes.func,
  keyExtractor: PropTypes.string
};

GridComponent.defaultProps = {
  keyExtractor: "",
  gridData: [],
  gridOptions: [],
  colHeight: 40,
  tableMaxHeight: 100,
  onPressCell: () => {},
  onPressCheckBox: () => {},
  dataSetter: () => {}
};

export default GridComponent;
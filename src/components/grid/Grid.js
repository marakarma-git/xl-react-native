import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {Text} from '../../components';
import {FlatList, View, TouchableOpacity, ActivityIndicator} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomCheckBox from '../grid/GridCheckBox';

const GridComponent = (props) => {
  return(
      <View style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row' }}>
          <GridHeaderComponent 
            gridOptions={props.gridOptions}
            colHeight={props.colHeight}
            onPressHeaderCheckBox={props.onPressHeaderCheckBox}
          />
        </View>
        {
          props.loading ?
            <View style={{ justifyContent: 'center', height: 100 }}>
              <ActivityIndicator color="#002DBB" />
              <Text style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingVertical: 10,
                }}>Loading...</Text>
            </View>
            :
            <GridCellComponent
              loading={props.loading}
              keyExtractor={props.keyExtractor}
              gridOptions={props.gridOptions} 
              gridData={props.gridData}
              colHeight={props.colHeight}
              tableMaxHeight={props.tableMaxHeight}
              onPressTree={props.onPressTree}
              onPressCheckBox={props.onPressCheckBox}
            />
        }
      </View>
  );
}

const GridHeaderComponent = (props) => {
  const generateHeader = (option, index) => {
    switch (option.headerType) {
      case "text":
        return  <GridHeaderTextComponent 
                  key={index} 
                  width={option.width}
                  headerAlign={option.headerAlign}
                  bgColor={option.bgColor}
                  headerAlign={option.headerAlign}
                  label={option.label}
                  {...props} />
      case "checkbox": 
        return  <GridHeaderCheckBoxComponent 
                  key={index} 
                  width={option.width}
                  headerAlign={option.headerAlign}
                  bgColor={option.bgColor}
                  headerAlign={option.headerAlign}
                  label={option.label}
                  isCheck={option.isCheck}
                  {...props} />
    
      default:
        return  <GridHeaderTextComponent 
                  key={index} 
                  width={option.width}
                  headerAlign={option.headerAlign}
                  bgColor={option.bgColor}
                  headerAlign={option.headerAlign}
                  label={option.label}
                  {...props} />

    }
  }

  return(
    <React.Fragment>
      {props.gridOptions.map((option, index) => (
        generateHeader(option, index)
      ))}
    </React.Fragment>
  );
}

const GridHeaderTextComponent = (props) => {
  return(
    <View
      key={props.index}  
      style={{ 
        height: props.colHeight, 
        width: props.width,
        justifyContent: 'center',
        alignItems: props.headerAlign,
        backgroundColor: props.bgColor || "#F4F3F4",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
          <Text style={{ color: props.headerColor || "black" }}>{props.label}</Text>
    </View>
  )
}

const GridHeaderCheckBoxComponent = (props) => {
  return(
    <View
      key={props.index}  
      style={{ 
        height: props.colHeight, 
        width: props.width,
        justifyContent: 'center',
        alignItems: props.headerAlign,
        backgroundColor: props.bgColor || "#F4F3F4",
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
        <CustomCheckBox
          disabled={false}
          value={props.isCheck}
          onPress={() => props.onPressHeaderCheckBox(null)}
        />
    </View>
  );
}

const GridCellComponent = (props) => {

  const renderList = useCallback(() => {
    return(
      <View style={{ height: props.tableMaxHeight }}>
        <FlatList
          data={props.gridData}
          renderItem={renderCell}
          keyExtractor={item => item[props.keyExtractor]}
          extraData={item => item.visibility} />
      </View>
    )
  }, [props.gridData]);

  const renderCell = ({ item }) => {
    return(
      <View style={{ flexDirection: 'row' }}>
        { props.gridOptions.map((option, index) => (
          <CellComponent 
            key={index}
            cellId={item[props.keyExtractor]}
            colHeight={props.colHeight}
            width={option.width}
            align={option.headerAlign}
            cellAlign={option.cellAlign}
            bgColor={'white'}
            data={item[option.field]}
            headerColor={"black"}
            cellType={option.cellType}
            level={item.level ? item.level : 0}
            visibility={item.visibility || item.visibility == undefined ? true : false}
            icon={item.icon}
            isSelect={item.treeCheck}
            isCheck={item.isCheck}
            isDisabled={item.isDisabled}
            onPressTree={props.onPressTree}
            onPressCheckBox={props.onPressCheckBox}
            cellVisible={option.cellVisible == undefined ? true : option.cellVisible}
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
      case "treeView":
        return <CellTreeViewComponent {...props} />;
      case "treeViewWithCheckBox":
        return <CellTreeViewCheckBoxComponent {...props} />;
      case "checkbox":
        return <CellCheckBoxComponent {...props} />;

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
        alignItems: 'center',
        backgroundColor: props.bgColor,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
          {
            props.icon ?
            <TouchableOpacity
              onPress={() => props.onPressTree(props.cellId)}>
                <Ionicons
                  name={props.icon}
                  color={'black'}
                  style={{ paddingLeft: (props.level * 10) + 5 }}
                />
            </TouchableOpacity>
            :
            <Text style={{ paddingLeft: (props.level * 10) + 8 }}></Text>
            }
          <CustomCheckBox
            disabled={props.isDisabled}
            style={{ marginHorizontal: 10 }}
            value={props.isSelect}
            onPress={() => props.onPressCheckBox(props.cellId)}
          />
          <Text 
            style={{ color: props.headerColor || "black", fontSize: 12 }}>
              {props.data.length > 30 ? props.data.substring(0, 30) + "..." : props.data}
            </Text>
    </View>
  )
}

const CellTreeViewComponent = (props) => {

  return(
    <View
      style={{ 
        flexDirection: 'row',
        height: props.colHeight, 
        width: props?.width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: props.bgColor,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
          {
            props.icon ?
            <TouchableOpacity
              onPress={() => props.onPressTree(props.cellId)}>
                <Ionicons
                  name={props.icon}
                  color={'black'}
                  style={{ paddingLeft: (props.level * 10) + 5 }}
                />
            </TouchableOpacity>
            :
            <Text style={{ paddingLeft: (props.level * 10) + 8 }}></Text>
            }
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
        alignItems: props.cellAlign,
        backgroundColor: props.bgColor,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
          <Text
            numberOfLines={1} 
            style={{ color: props.headerColor || "black", fontSize: 12, paddingLeft: 5 }}>
              {props.cellVisible ? props.data : ""}
          </Text>
    </View>
  )
}

const CellCheckBoxComponent = (props) => {
  return(
    <View
      style={{ 
        height: props.colHeight, 
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.cellAlign,
        backgroundColor: props.bgColor,
        borderBottomColor: "#D8D8D8",
        borderBottomWidth: 1 }}>
        <CustomCheckBox
          disabled={false}
          value={props.isCheck}
          onPress={() => props.onPressCheckBox(props.cellId)}
        />
    </View>
  )
}

GridComponent.propTypes = {
  loading: PropTypes.bool,
  indexIdentifier: PropTypes.string,
  gridData: PropTypes.array,
  gridOptions: PropTypes.array,
  onPressCell: PropTypes.func,
  onPressCheckBox: PropTypes.func,
  colHeight: PropTypes.number,
  keyExtractor: PropTypes.string,
  onPressHeaderCheckBox: PropTypes.func
};

GridComponent.defaultProps = {
  loading: false,
  keyExtractor: "",
  gridData: [],
  gridOptions: [],
  colHeight: 40,
  tableMaxHeight: 100,
  onPressTree: () => {},
  onPressCell: () => {},
  onPressCheckBox: () => {},
  dataSetter: () => {},
  onPressHeaderCheckBox: () => {}
};

export default GridComponent;
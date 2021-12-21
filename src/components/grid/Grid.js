import React, {useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Text} from '../../components';
import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomCheckBox from '../grid/GridCheckBox';
import {colors, color_theme_one} from '../../constant/color';
import GridSwitchComponent from './GridSwitch';
import GridDropDownComponent from './GridDropDown';
import GridTextInputComponent from './GridTextInput';

const GridComponent = (props) => {
  return (
    <>
      {props.isOverflow ? (
        <ScrollView
          style={[{flex: 1}, {...props.customTableStyle}]}
          contentContainerStyle={{flexDirection: 'column'}}
          horizontal={true}>
          <View style={{flexDirection: 'row'}}>
            <GridHeaderComponent
              sortField={props.sortField}
              sortType={props.sortType}
              gridOptions={props.gridOptions}
              colHeight={props.colHeight}
              onPressHeaderCheckBox={props.onPressHeaderCheckBox}
              onSort={props.onSort}
            />
          </View>
          {props.loading ? (
            <View style={{justifyContent: 'center', height: 100}}>
              <ActivityIndicator color={colors.main_color} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingVertical: 10,
                }}>
                Loading...
              </Text>
            </View>
          ) : (
            <GridCellComponent
              loading={props.loading}
              keyExtractor={props.keyExtractor}
              gridOptions={props.gridOptions}
              gridData={props.gridData}
              colHeight={props.colHeight}
              tableMaxHeight={props.tableMaxHeight}
              onPressTree={props.onPressTree}
              onPressCheckBox={props.onPressCheckBox}
              onSwitch={props.onSwitch}
              onPickItem={props.onPickItem}
              onChangeText={props.onChangeText}
              activateDisabledFeature={props.activateDisabledFeature}
              isTableDisabled={props.isTableDisabled}
              setFormValidation={props.setFormValidation}
            />
          )}
        </ScrollView>
      ) : (
        <View style={[{width: '100%'}, {...props.customTableStyle}]}>
          <View style={{flexDirection: 'row'}}>
            <GridHeaderComponent
              sortField={props.sortField}
              sortType={props.sortType}
              gridOptions={props.gridOptions}
              colHeight={props.colHeight}
              onPressHeaderCheckBox={props.onPressHeaderCheckBox}
              onSort={props.onSort}
            />
          </View>
          {props.loading ? (
            <View style={{justifyContent: 'center', height: 100}}>
              <ActivityIndicator color={colors.main_color} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingVertical: 10,
                }}>
                Loading...
              </Text>
            </View>
          ) : (
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
          )}
        </View>
      )}
    </>
  );
};

const GridHeaderComponent = (props) => {
  const generateHeader = (option, index) => {
    switch (option.headerType) {
      case 'text':
        return (
          <GridHeaderTextComponent
            key={index}
            width={option.width}
            headerAlign={option.headerAlign}
            bgColor={option.bgColor}
            headerColor={option.headerColor}
            headerAlign={option.headerAlign}
            label={option.label}
            field={option.field}
            {...props}
          />
        );
      case 'checkbox':
        return (
          <GridHeaderCheckBoxComponent
            key={index}
            width={option.width}
            headerAlign={option.headerAlign}
            bgColor={option.bgColor}
            headerColor={option.headerColor}
            headerAlign={option.headerAlign}
            label={option.label}
            isCheck={option.isCheck}
            field={option.field}
            {...props}
          />
        );
      case 'sortable':
        return (
          <GridHeaderSortableComponent
            key={index}
            width={option.width}
            headerAlign={option.headerAlign}
            bgColor={option.bgColor}
            headerColor={option.headerColor}
            headerAlign={option.headerAlign}
            label={option.label}
            field={option.field}
            {...props}
          />
        );

      default:
        return (
          <GridHeaderTextComponent
            key={index}
            width={option.width}
            headerAlign={option.headerAlign}
            bgColor={option.bgColor}
            headerColor={option.headerColor}
            headerAlign={option.headerAlign}
            label={option.label}
            {...props}
          />
        );
    }
  };

  return (
    <React.Fragment>
      {props.gridOptions.map((option, index) => generateHeader(option, index))}
    </React.Fragment>
  );
};

const GridHeaderTextComponent = (props) => {
  return (
    <View
      key={props.index}
      style={{
        height: props.colHeight,
        width: props.width,
        justifyContent: 'center',
        alignItems: props.headerAlign,
        backgroundColor: props.bgColor || '#F4F3F4',
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: 'white',
        borderRightWidth: 1,
      }}>
      <Text style={{color: props.headerColor || 'black'}}>{props.label}</Text>
    </View>
  );
};

const GridHeaderCheckBoxComponent = (props) => {
  return (
    <View
      key={props.index}
      style={{
        height: props.colHeight,
        width: props.width,
        justifyContent: 'center',
        alignItems: props.headerAlign,
        backgroundColor: props.bgColor || '#F4F3F4',
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: 'white',
        borderRightWidth: 1,
      }}>
      <CustomCheckBox
        disabled={false}
        value={props.isCheck}
        onPress={() => props.onPressHeaderCheckBox(null)}
      />
    </View>
  );
};

const GridHeaderSortableComponent = (props) => {
  return (
    <TouchableOpacity
      key={props.index}
      onPress={() => props.onSort(props.sortType, props.field)}
      style={{
        height: props.colHeight,
        width: props.width,
        justifyContent: 'center',
        alignItems: props.headerAlign,
        backgroundColor: props.bgColor || '#F4F3F4',
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: 'white',
        borderRightWidth: 1,
        flexDirection: 'row',
      }}>
      <Text style={{color: props.headerColor || 'black', paddingRight: 3}}>
        {props.label}{' '}
      </Text>
      <View>
        <Ionicons
          name="caret-up"
          size={10}
          color={
            props.sortField === props.field && props.sortType === 'asc'
              ? colors.sorted_table_color
              : colors.gray
          }
        />
        <Ionicons
          name="caret-down"
          size={10}
          color={
            props.sortField === props.field && props.sortType === 'desc'
              ? colors.sorted_table_color
              : colors.gray
          }
        />
      </View>
    </TouchableOpacity>
  );
};

const GridCellComponent = (props) => {
  const renderList = useCallback(() => {
    return (
      <View style={{height: props.tableMaxHeight}}>
        <FlatList
          data={props.gridData}
          renderItem={renderCell}
          keyExtractor={(item) => item[props.keyExtractor]}
          extraData={(item) => item.visibility}
        />
      </View>
    );
  }, [props.gridData, props.isTableDisabled]);

  const renderCell = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        {props.gridOptions.map((option, index) => (
          <CellComponent
            activeIfValue={option?.activeIfValue}
            keyToActivateField={option?.keyToActivateField}
            key={index}
            keyName={option.field}
            formRequired={option?.formRequired}
            activateDisabledFeature={props.activateDisabledFeature}
            cellId={item[props.keyExtractor]}
            colHeight={props.colHeight}
            width={option.width}
            align={option.headerAlign}
            cellAlign={option.cellAlign}
            activeText={option?.activeText}
            inActiveText={option?.inActiveText}
            placeholder={option?.placeholder}
            bgColor={'white'}
            data={item[option.field]}
            dataObj={item}
            options={item[option.optionField]}
            headerColor={'black'}
            cellType={option.cellType}
            level={item.level ? item.level : 0}
            visibility={
              item.visibility || item.visibility == undefined ? true : false
            }
            icon={item.icon}
            isActive={item.switchActive}
            isCellDisabled={!item.switchActive}
            isDisabled={item.isDisabled}
            isTableDisabled={props?.isTableDisabled}
            isSelect={item.treeCheck}
            isCheck={item.isCheck}
            onPressTree={props.onPressTree}
            onPressCheckBox={props.onPressCheckBox}
            onSwitch={props.onSwitch}
            onPickItem={props.onPickItem}
            onChangeText={props.onChangeText}
            cellVisible={
              option.cellVisible == undefined ? true : option.cellVisible
            }
            setFormValidation={props?.setFormValidation}
          />
        ))}
      </View>
    );
  };

  return (
    <React.Fragment>
      {props.gridData.length > 0 ? (
        renderList()
      ) : (
        <Text
          style={{
            fontSize: 16,
            paddingVertical: 10,
            textAlign: 'center',
            fontFamily: 'bold',
          }}>
          There is no data
        </Text>
      )}
    </React.Fragment>
  );
};

const CellComponent = (props) => {
  const generateCellType = () => {
    switch (props.cellType) {
      case 'text':
        return <CellTextComponent {...props} />;
      case 'treeView':
        return <CellTreeViewComponent {...props} />;
      case 'treeViewWithCheckBox':
        return <CellTreeViewCheckBoxComponent {...props} />;
      case 'checkbox':
        return <CellCheckBoxComponent {...props} />;
      case 'switch':
        return <CellSwitchComponent {...props} />;
      case 'dropdown':
        return <CellDropDownComponent {...props} />;
      case 'textinput':
        return <CellTextInputComponent {...props} />;
      default:
        return <CellTextComponent {...props} />;
    }
  };

  return (
    <React.Fragment>{props.visibility && generateCellType()}</React.Fragment>
  );
};

const CellTreeViewCheckBoxComponent = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      {props.icon ? (
        <TouchableOpacity onPress={() => props.onPressTree(props.cellId)}>
          <Ionicons
            name={props.icon}
            color={'black'}
            style={{paddingLeft: props.level * 10 + 5}}
          />
        </TouchableOpacity>
      ) : (
        <Text style={{paddingLeft: props.level * 10 + 8}} />
      )}
      <CustomCheckBox
        disabled={props.isDisabled}
        style={{marginHorizontal: 10}}
        value={props.isSelect}
        onPress={() => props.onPressCheckBox(props.cellId)}
      />
      <Text style={{color: props.headerColor || 'black', fontSize: 12}}>
        {props.data.length > 30
          ? props.data.substring(0, 40) + '...'
          : props.data}
      </Text>
    </View>
  );
};

const CellTreeViewComponent = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      {props.icon ? (
        <TouchableOpacity onPress={() => props.onPressTree(props.cellId)}>
          <Ionicons
            name={props.icon}
            color={'black'}
            style={{paddingLeft: props.level * 10 + 5}}
          />
        </TouchableOpacity>
      ) : (
        <Text style={{paddingLeft: props.level * 10 + 8}} />
      )}
      <Text style={{color: props.headerColor || 'black', fontSize: 12}}>
        {props.data.length > 30
          ? props.data.substring(0, 30) + '...'
          : props.data}
      </Text>
    </View>
  );
};

const CellTextComponent = (props) => {
  return (
    <View
      style={{
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.cellAlign,
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      <Text
        numberOfLines={1}
        style={{
          color: props.isCellDisabled
            ? colors.gray
            : props.headerColor || 'black',
          fontSize: 12,
          paddingLeft: 5,
        }}>
        {props.cellVisible ? props.data : ''}
      </Text>
    </View>
  );
};

const CellCheckBoxComponent = (props) => {
  return (
    <View
      style={{
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.cellAlign,
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      <CustomCheckBox
        disabled={false}
        value={props.isCheck}
        onPress={() => props.onPressCheckBox(props.cellId)}
      />
    </View>
  );
};

const CellSwitchComponent = (props) => {
  return (
    <View
      style={{
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.cellAlign,
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      {props.isTableDisabled ? (
        <GridSwitchComponent
          value={props.isActive}
          onSwitch={() => {}}
          activeText={props.activeText}
          inActiveText={props.inActiveText}
          isDisabled={props.isDisabled}
          dataId={props.cellId}
        />
      ) : (
        <GridSwitchComponent
          value={props.isActive}
          onSwitch={props.onSwitch}
          activeText={props.activeText}
          inActiveText={props.inActiveText}
          isDisabled={props.isDisabled}
          dataId={props.cellId}
        />
      )}
    </View>
  );
};

const CellDropDownComponent = (props) => {
  return (
    <View
      style={{
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.cellAlign,
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      <GridDropDownComponent
        isDisabled={props.isCellDisabled}
        dataId={props.cellId}
        items={props.options}
        color={
          props.isCellDisabled ? colors.gray : props.headerColor || 'black'
        }
        onPickItem={props.onPickItem}
        value={props.data}
      />
    </View>
  );
};

const CellTextInputComponent = (props) => {
  const isEditable = () => {
    if (props.activeIfValue && props.keyToActivateField) {
      return props.dataObj[props.keyToActivateField] === props.activeIfValue;
    }
    return !props.isCellDisabled;
  };
  return (
    <View
      style={{
        height: props.colHeight,
        width: props?.width,
        justifyContent: 'center',
        alignItems: props.cellAlign,
        backgroundColor: !props.isTableDisabled
          ? props.activateDisabledFeature
            ? props.isCellDisabled
              ? colors.disabled_table
              : props.bgColor
            : props.bgColor
          : colors.disabled_table,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        borderRightColor: '#D8D8D8',
        borderRightWidth: 1,
      }}>
      {props.isTableDisabled ? (
        <GridTextInputComponent
          isEditable={!props.isTableDisabled}
          dataId={props.cellId}
          onChangeText={props.onChangeText}
          color={
            props.isCellDisabled ? colors.gray : props.headerColor || 'black'
          }
          value={props.data}
          keyName={props.keyName}
          placeholder={props.placeholder}
          isRequired={props.formRequired}
          setFormValidation={props.setFormValidation}
        />
      ) : (
        <GridTextInputComponent
          isEditable={isEditable()}
          dataId={props.cellId}
          onChangeText={props.onChangeText}
          color={
            props.isCellDisabled ? colors.gray : props.headerColor || 'black'
          }
          value={props.data}
          keyName={props.keyName}
          placeholder={props.placeholder}
          isRequired={props.formRequired}
          setFormValidation={props.setFormValidation}
        />
      )}
    </View>
  );
};

GridComponent.propTypes = {
  loading: PropTypes.bool,
  indexIdentifier: PropTypes.string,
  gridData: PropTypes.array,
  gridOptions: PropTypes.array,
  onPressCell: PropTypes.func,
  onPressCheckBox: PropTypes.func,
  onSwitch: PropTypes.func,
  onPickItem: PropTypes.func,
  onChangeText: PropTypes.func,
  colHeight: PropTypes.number,
  keyExtractor: PropTypes.string,
  onPressHeaderCheckBox: PropTypes.func,
  sortType: PropTypes.string,
  sortField: PropTypes.string,
  onSort: PropTypes.func,
  isOverflow: PropTypes.bool,
  isTableDisabled: PropTypes.bool,
  customTableStyle: PropTypes.object,
  activateDisabledFeature: PropTypes.bool,
  setFormValidation: PropTypes.func,
};

GridComponent.defaultProps = {
  loading: false,
  keyExtractor: '',
  gridData: [],
  gridOptions: [],
  colHeight: 40,
  tableMaxHeight: 100,
  sortType: null,
  sortField: null,
  onPressTree: () => {},
  onPressCell: () => {},
  onPressCheckBox: () => {},
  onChangeText: () => {},
  dataSetter: () => {},
  onPressHeaderCheckBox: () => {},
  onSwitch: () => {},
  onPickItem: () => {},
  onSort: () => {},
  isOverflow: false,
  isTableDisabled: false,
  customTableStyle: {},
  activateDisabledFeature: false,
  setFormValidation: () => {},
};

export default GridComponent;

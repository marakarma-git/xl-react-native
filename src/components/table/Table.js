import React, {useState, useRef} from 'react';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import {DragSortableView} from 'react-native-drag-sort';
import PropTypes from 'prop-types';
import TableCell from './tableCell';
import {colors} from '../../constant/color';
import {device_width, defaultHeightCell} from '../../constant/config';
const Table = (props) => {
  const {
    dataHeader,
    dataTable,
    onPressHeader,
    onPressCell,
    onPressCheckHeader,
    onPressCheckCell,
    loading,
    selectedHeaderOrderSort,
    isScrollView,
    headerOtherLayout,
    stickHeaderIndices,
    hideStickySide,
    onRight,
    isDragNSort,
    onDataChange,
  } = props || {};
  const headerScrollView = useRef(ScrollView);
  const rowsScrollView = useRef(ScrollView);
  const [rowWidth, setRowWidth] = useState(device_width);
  const [borderWidth, setBorderWidth] = useState(false);
  const [headerIsScrolling, setHeaderIsScrolling] = useState(false);
  const [rightIsScrolling, setRightIsScrolling] = useState(false);
  const {formId, sortBy} = selectedHeaderOrderSort || {};
  const CreateComponent = isScrollView ? ScrollView : View;
  return (
    <CreateComponent
      style={{flex: 1}}
      stickyHeaderIndices={stickHeaderIndices || null}>
      {headerOtherLayout()}
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {dataHeader && dataHeader.length > 0 && !onRight && (
              <TableCell
                sorted={dataHeader[0].formId === formId ? sortBy : null}
                type={dataHeader[0].cellType || null}
                dataOption={dataHeader[0].dataOption}
                onPress={() =>
                  onPressHeader({
                    dataSort: selectedHeaderOrderSort,
                    item: dataHeader[0],
                  })
                }
                onChangeCheck={(value) =>
                  onPressCheckHeader({
                    selectedValue: value,
                    ...dataHeader[0],
                  })
                }
                {...dataHeader[0]}
              />
            )}
            <ScrollView
              horizontal={true}
              scrollEnabled={false}
              scrollEventThrottle={16}
              showsHorizontalScrollIndicator={false}
              ref={headerScrollView}
              onScroll={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                if (!headerIsScrolling) {
                  rowsScrollView.current.scrollTo({x: offsetX});
                }
                setRightIsScrolling(false);
              }}>
              {dataHeader &&
                dataHeader.map((item, index) => {
                  const {cellType, shown, formId: inFormId} = item || {};
                  if (index > 0 && shown && !item.config.doNotShowOnTable) {
                    return (
                      <TableCell
                        key={index}
                        sorted={inFormId === formId ? sortBy : null}
                        type={cellType}
                        onPress={() =>
                          onPressHeader({
                            dataSort: selectedHeaderOrderSort,
                            item: dataHeader[index],
                          })
                        }
                        onChangeCheck={() => onPressCheckHeader(dataHeader[0])}
                        {...item}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </ScrollView>
            {loading && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0,
                }}
              />
            )}
            {dataHeader && dataHeader.length > 0 && onRight && (
              <TableCell
                sorted={dataHeader[0].formId === formId ? sortBy : null}
                type={dataHeader[0].cellType || null}
                dataOption={dataHeader[0].dataOption}
                onPress={() =>
                  onPressHeader({
                    dataSort: selectedHeaderOrderSort,
                    item: dataHeader[0],
                  })
                }
                onChangeCheck={(value) =>
                  onPressCheckHeader({
                    selectedValue: value,
                    ...dataHeader[0],
                  })
                }
                {...dataHeader[0]}
              />
            )}
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        {dataTable.length > 0 ? (
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
              {!onRight && !hideStickySide && (
                <StickyComponent
                  dataTable={dataTable}
                  onPressCell={onPressCell}
                  onPressCheckCell={onPressCheckCell}
                  borderWidth={borderWidth}
                />
              )}
              <ScrollView
                horizontal={true}
                scrollEventThrottle={16}
                ref={rowsScrollView}
                showsHorizontalScrollIndicator={false}
                onScroll={(event) => {
                  const offsetX = event.nativeEvent.contentOffset.x;
                  if (!rightIsScrolling) {
                    setHeaderIsScrolling(true);
                    headerScrollView.current.scrollTo({x: offsetX});
                  }
                  setRightIsScrolling(false);
                  if (!onRight) {
                    if (offsetX >= 10) {
                      setBorderWidth(true);
                    }
                    if (offsetX < 10) {
                      setBorderWidth(false);
                    }
                  }
                }}>
                <View style={{flexDirection: 'column'}}>
                  {dataTable &&
                    dataTable.length > 0 &&
                    !isDragNSort &&
                    dataTable.map((value, index) => {
                      const {dataCell} = value || [];
                      return (
                        <View
                          onLayout={({nativeEvent}) => {
                            const {layout} = nativeEvent || {};
                            const {width} = layout || {};
                            setRowWidth(width);
                          }}
                          style={{flexDirection: 'row'}}
                          key={index}>
                          {dataCell.map((subValue, index2) => {
                            const {cellType} = subValue || {};
                            if (index2 > (hideStickySide ? -1 : 0)) {
                              return (
                                <TableCell
                                  key={index2}
                                  type={cellType}
                                  onPress={() => onPressCell(subValue)}
                                  onChangeCheck={() =>
                                    onPressCheckCell(subValue)
                                  }
                                  {...subValue}
                                />
                              );
                            } else {
                              return null;
                            }
                          })}
                        </View>
                      );
                    })}
                </View>
                {isDragNSort && dataTable.length > 0 && (
                  <DragSortableView
                    dataSource={dataTable}
                    maxScale={1}
                    delayLongPress={100}
                    parentWidth={rowWidth}
                    childrenHeight={defaultHeightCell}
                    childrenWidth={device_width}
                    onDataChange={onDataChange}
                    renderItem={(value, index) => {
                      const {dataCell} = value || [];
                      return (
                        <View
                          onLayout={({nativeEvent}) => {
                            const {layout} = nativeEvent || {};
                            const {width} = layout || {};
                            setRowWidth(width);
                          }}
                          style={{flexDirection: 'row'}}
                          key={index}>
                          {dataCell.map((subValue, index2) => {
                            const {cellType} = subValue || {};
                            if (index2 > (hideStickySide ? -1 : 0)) {
                              return (
                                <TableCell
                                  key={index2}
                                  type={cellType}
                                  onPress={() => onPressCell(subValue)}
                                  onChangeCheck={() =>
                                    onPressCheckCell(subValue)
                                  }
                                  {...subValue}
                                />
                              );
                            } else {
                              return null;
                            }
                          })}
                        </View>
                      );
                    }}
                  />
                )}
              </ScrollView>
              {onRight && !hideStickySide && (
                <StickyComponent
                  dataTable={dataTable}
                  onPressCell={onPressCell}
                  onPressCheckCell={onPressCheckCell}
                  borderWidth={borderWidth}
                  onRight={true}
                />
              )}
            </View>
          </ScrollView>
        ) : (
          <Text
            style={{
              flex: 1,
              textAlignVertical: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            There is no data, to show
          </Text>
        )}
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              alignItems: 'flex-end',
            }}>
            <ActivityIndicator color={colors.button_color_one} size={'small'} />
          </View>
        )}
      </View>
    </CreateComponent>
  );
};
Table.propTypes = {
  dataHeader: PropTypes.array,
  dataTable: PropTypes.array,
  onPressHeader: PropTypes.func,
  onPressCell: PropTypes.func,
  onPressCheckHeader: PropTypes.func,
  onPressCheckCell: PropTypes.func,
  loading: PropTypes.bool,
  selectedHeaderOrderSort: PropTypes.objectOf({
    formId: PropTypes.string,
    orderBy: PropTypes.string,
    sortBy: PropTypes.string,
  }),
  isScrollView: PropTypes.bool,
  stickyHeaderIndices: PropTypes.arrayOf([PropTypes.number]),
  headerOtherLayout: PropTypes.func,
  hideStickySide: PropTypes.bool,
  onRight: PropTypes.bool,
  isDragNSort: PropTypes.bool,
  onDataChange: PropTypes.func,
};
Table.defaultProps = {
  dataHeader: [],
  dataTable: [],
  onPressHeader: () => {},
  onPressCell: () => {},
  onPressCheckHeader: () => {},
  onPressCheckCell: () => {},
  headerOtherLayout: () => <></>,
  onDataChange: () => {},
};
const StickyComponent = (props) => {
  const {borderWidth, dataTable, onPressCell, onPressCheckCell, onRight} =
    props || {};
  return (
    <View
      style={{
        elevation: borderWidth ? 5 : 0,
        borderRightWidth: !onRight && borderWidth ? 1 : 0,
        borderColor: 'white',
      }}>
      {dataTable &&
        dataTable.map((value, index) => {
          const {dataCell, is_checked_root} = value || {};
          return (
            <TableCell
              value={is_checked_root}
              key={index}
              type={dataCell[0].cellType || 'TableCellCheckBox'}
              onPress={() => onPressCell(dataCell[0])}
              onChangeCheck={() =>
                onPressCheckCell({item: dataCell[0], index: index})
              }
              {...dataCell[0]}
            />
          );
        })}
    </View>
  );
};
StickyComponent.propTypes = {
  setLeftRowWidth: PropTypes.number,
  borderWidth: PropTypes.number,
  dataTable: PropTypes.number,
  onPressCell: PropTypes.func,
  onPressCheckCell: PropTypes.func,
  onRight: PropTypes.bool,
};
StickyComponent.defaultProps = {
  borderWidth: 1,
  onPressCell: () => {},
  onPressCheckCell: () => {},
};
export default Table;

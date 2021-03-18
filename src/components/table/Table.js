import React, {useState, useRef} from 'react';
import {View, ScrollView, ActivityIndicator, Text} from 'react-native';
import PropTypes from 'prop-types';
import TableCell from './tableCell';
import {colors} from '../../constant/color';
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
  } = props || {};
  const headerScrollView = useRef(ScrollView);
  const rowsScrollView = useRef(ScrollView);
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
            {dataHeader && (
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
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        {dataTable.length > 0 ? (
          <ScrollView>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  elevation: borderWidth ? 5 : 0,
                  borderRightWidth: borderWidth ? 1 : 0,
                  borderColor: 'white',
                }}>
                {dataTable &&
                  dataTable.map((value, index) => {
                    const {dataCell, is_checked_root} = value || {};
                    return (
                      <TableCell
                        value={is_checked_root}
                        key={index}
                        type={'TableCellCheckBox'}
                        onPress={() => onPressCell(dataCell[0])}
                        onChangeCheck={() =>
                          onPressCheckCell({item: dataCell[0], index: index})
                        }
                        {...dataCell[0]}
                      />
                    );
                  })}
              </View>
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
                  if (offsetX >= 10) {
                    setBorderWidth(true);
                  }
                  if (offsetX < 10) {
                    setBorderWidth(false);
                  }
                }}>
                <View style={{flexDirection: 'column'}}>
                  {dataTable &&
                    dataTable.map((value, index) => {
                      const {dataCell} = value || [];
                      return (
                        <View style={{flexDirection: 'row'}} key={index}>
                          {dataCell.map((subValue, index2) => {
                            const {cellType} = subValue || {};
                            if (index2 > 0) {
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
              </ScrollView>
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
};
Table.defaultProps = {
  dataHeader: [],
  dataTable: [],
  onPressHeader: () => {},
  onPressCell: () => {},
  onPressCheckHeader: () => {},
  onPressCheckCell: () => {},
  headerOtherLayout: () => <></>,
};
export default Table;

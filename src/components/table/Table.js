import React, {useState, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import TableCell from './tableCell';
const Table = (props) => {
  const {
    dataHeader,
    dataTable,
    onPressHeader,
    onPressCell,
    onPressCheckHeader,
    onPressCheckCell,
  } = props || {};
  const headerScrollView = useRef(ScrollView);
  const rowsScrollView = useRef(ScrollView);
  const [borderWidth, setBorderWidth] = useState(false);
  const [headerIsScrolling, setHeaderIsScrolling] = useState(false);
  const [rightIsScrolling, setRightIsScrolling] = useState(false);
  return (
    <View style={{flex: 1}}>
      <View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
            }}>
            {dataHeader && (
              <TableCell
                type={dataHeader[0].cellType}
                dataOption={dataHeader[0].dataOption}
                onPress={() => onPressHeader(dataHeader[0])}
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
                  const {cellType, shown} = item || {};
                  if (index > 0 && shown) {
                    return (
                      <TableCell
                        type={cellType}
                        onPress={() => onPressHeader(dataHeader[0])}
                        onChangeCheck={() => onPressCheckHeader(dataHeader[0])}
                        {...item}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                elevation: borderWidth ? 5 : 0,
                borderRightWidth: borderWidth ? 1 : 0,
                borderColor: 'white',
              }}>
              {dataTable &&
                dataTable.map((value) => {
                  return (
                    <TableCell
                      type={'TableCellCheckBox'}
                      onPress={() => onPressCell(value[0])}
                      onChangeCheck={() => onPressCheckCell(value[0])}
                      {...value[0]}
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
                if (offsetX >= 10) {
                  setBorderWidth(true);
                }
                if (offsetX < 10) {
                  setBorderWidth(false);
                }
                if (!rightIsScrolling) {
                  setHeaderIsScrolling(true);
                  headerScrollView.current.scrollTo({x: offsetX});
                }
                setRightIsScrolling(false);
              }}>
              <View style={{flexDirection: 'column'}}>
                {dataTable &&
                  dataTable.map((value, index) => {
                    return (
                      <View style={{flexDirection: 'row'}}>
                        {value.map((subValue, index2) => {
                          const {cellType} = subValue || {};
                          if (index2 > 0) {
                            return (
                              <TableCell
                                key={index2 + index}
                                type={cellType}
                                onPress={() => onPressCell(subValue)}
                                onChangeCheck={() => onPressCheckCell(subValue)}
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
      </View>
    </View>
  );
};
Table.propTypes = {
  dataHeader: PropTypes.array,
  dataTable: PropTypes.array,
  onPressHeader: PropTypes.func,
  onPressCell: PropTypes.func,
  onPressCheckHeader: PropTypes.func,
  onPressCheckCell: PropTypes.func,
};
Table.defaultProps = {
  dataHeader: [],
  dataTable: [],
  onPressHeader: () => {},
  onPressCell: () => {},
  onPressCheckHeader: () => {},
  onPressCheckCell: () => {},
};
export default Table;

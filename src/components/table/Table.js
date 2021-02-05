import React, {useState, useRef} from 'react';
import {View, ScrollView, Text} from 'react-native';
import PropTypes from 'prop-types';
import TableCell from './tableCell';
const Table = (props) => {
  const {dataHeader, dataTable} = props || {};
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
                config={dataHeader[0].config}
                type={dataHeader[0].type}
                dataOption={dataHeader[0].dataOption}
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
                  const {shown} = item;
                  if (index > 0 && shown) {
                    return <TableCell {...item} />;
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
                dataTable.map((value, index) => {
                  return (
                    <TableCell
                      config={value[index].config}
                      type={value[index].type}
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
              {dataTable &&
                dataTable.map((value, index) => {
                  return (
                    <>
                      {value.map((subValue, index2) => {
                        if (index2 > 0) {
                          return <TableCell {...subValue} />;
                        } else {
                          return null;
                        }
                      })}
                    </>
                  );
                })}
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
};
export default Table;

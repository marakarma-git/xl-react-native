import {Text, TouchableOpacity, View} from 'react-native';
import CustomCheckBox from '../customCheckBox';
import {colors} from '../../constant/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import {defaultWidthCell, defaultHeightCell} from '../../constant/config';
import PropTypes from 'prop-types';
import ModalSearchPicker from '../modal/ModalSearchPicker';

const TableCellHeaderOptionCheckBox = (props) => {
  const {config, onPress, onChangeCheck, valueCheck, sorted, dataOption, key} =
    props || {};
  const {label, width, height, isTouchable, fontColor, backgroundColor} =
    config || {};
  const TouchView = isTouchable ? TouchableOpacity : View;
  const [viewModal, setViewModal] = useState(false);
  return (
    <View
      key={key}
      style={{
        width: width || defaultWidthCell,
        height: height || defaultHeightCell,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'blue',
      }}>
      <CustomCheckBox
        style={{marginLeft: 16}}
        value={valueCheck}
        onPress={() => setViewModal(true)}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: colors.gray_button,
            paddingHorizontal: 2,
            borderRadius: 3,
            borderWidth: 1,
            borderColor: 'gray',
          }}>
          <FontAwesome
            name={'sort-desc'}
            color={'black'}
            size={18}
            style={{bottom: 3}}
          />
        </View>
      </CustomCheckBox>
      <TouchView
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
        onPress={onPress}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: fontColor || 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {label}
          </Text>
          <FontAwesome
            style={{marginLeft: 5}}
            name={
              sorted === 'ASC'
                ? 'sort-asc'
                : sorted === 'DESC'
                ? 'sort-desc'
                : 'unsorted'
            }
            color={'white'}
            size={18}
          />
        </View>
      </TouchView>
      {viewModal && (
        <ModalSearchPicker
          title={'Select Attribute'}
          removeSearch={true}
          data={dataOption}
          onChange={(value) => {
            onChangeCheck(value);
            setViewModal(false);
          }}
          onClose={() => setViewModal(false)}
        />
      )}
    </View>
  );
};
TableCellHeaderOptionCheckBox.propTypes = {
  config: PropTypes.objectOf({
    label: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.number,
    isTouchable: PropTypes.bool,
  }),
  dataOption: PropTypes.array,
  onPress: PropTypes.func,
  onChangeCheck: PropTypes.func,
  sorted: PropTypes.oneOf(['ASC', 'DESC', null]),
  valueCheck: PropTypes.bool,
};
export default TableCellHeaderOptionCheckBox;

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constant/color';
import {inputHybridStyle, subscriptionStyle} from '../../style';
import {device_width} from '../../constant/config';
import CustomCheckBox from '../customCheckBox';
import lod from 'lodash';
import Text from '../global/text';
const ModalMenuPicker = (props) => {
  const {data, onClose, onApply, title} = props;
  const [localData, setLocaldata] = useState(data);
  const onPress = (index) => {
    let newArr = lod.cloneDeep(localData);
    newArr[index].shown = !newArr[index].shown;
    setLocaldata(newArr);
  };
  return (
    <Modal animationType="slide" transparent onRequestClose={onClose}>
      <View style={inputHybridStyle.modalBackdrop} />
      <KeyboardAvoidingView
        enabled={false}
        style={inputHybridStyle.modalContainer}>
        <View style={inputHybridStyle.modalTitleContainer}>
          <Text style={inputHybridStyle.modalTitleText}>{title}</Text>
        </View>
        <ScrollView style={{flex: 1}}>
          <View style={[subscriptionStyle.containerWrap]}>
            {localData.map((value, index) => {
              const {shown, config} = value || {};
              const {
                label,
                doNotShowOnFilter,
                doNotShowOnTable,
                forceHideColumn,
              } = config || {};
              if (!doNotShowOnFilter && !doNotShowOnTable && !forceHideColumn) {
                return (
                  <TouchableOpacity
                    key={`${index}${label}`}
                    style={{
                      width: device_width * 0.38,
                      marginBottom: 12,
                      flexDirection: 'row',
                    }}>
                    <CustomCheckBox
                      style={{marginRight: 12}}
                      value={shown}
                      onPress={() => onPress(index)}
                    />
                    <Text style={{flex: 1}}>{label}</Text>
                  </TouchableOpacity>
                );
              } else {
                return null;
              }
            })}
          </View>
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={[
              inputHybridStyle.buttonStyle,
              {backgroundColor: colors.gray_button_cancel},
            ]}
            onPress={onClose}>
            <Text fontType={'bold'} style={{color: 'black'}}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={inputHybridStyle.buttonStyle}
            onPress={() => onApply(localData)}>
            <Text fontType={'bold'} style={{color: 'white'}}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
ModalMenuPicker.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onClose: PropTypes.func,
  onApply: PropTypes.func,
  value: PropTypes.oneOf([
    PropTypes.objectOf({
      ...PropTypes.any,
      shown: PropTypes.string,
      config: PropTypes.objectOf({
        label: PropTypes.string,
      }),
    }),
    PropTypes.any,
  ]),
};
export default ModalMenuPicker;

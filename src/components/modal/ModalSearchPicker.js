import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constant/color';
import {inputHybridStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ModalSearchPicker = (props) => {
  const {data, onClose, onChange, value, title, removeSearch} = props;
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  useEffect(() => {
    if (data.length > 0) {
      const results = data.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchResult(results);
    }
  }, [data, searchText]);
  return (
    <Modal animationType="slide" transparent onRequestClose={onClose}>
      <View style={inputHybridStyle.modalBackdrop} />
      <KeyboardAvoidingView
        enabled={false}
        style={inputHybridStyle.modalContainer}>
        <View style={inputHybridStyle.modalTitleContainer}>
          <Text style={inputHybridStyle.modalTitleText}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons
              name={'close-circle'}
              color={colors.gray}
              size={28}
            />
          </TouchableOpacity>
        </View>
        {!removeSearch && (
          <View style={inputHybridStyle.modalTextInputContainer}>
            <FontAwesome
              style={{marginRight: 8}}
              name={'search'}
              color={colors.gray_0}
              size={20}
            />
            <TextInput
              placeholder={`Search ${title}`}
              onChangeText={(e) => setSearchText(e)}
            />
          </View>
        )}
        <FlatList
          data={searchResults}
          renderItem={({item, index}) => {
            const {label} = item;
            return (
              <TouchableOpacity
                onPress={() => {
                  onChange(item);
                }}
                style={[
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.gray_table : 'white',
                    borderRadius: 3,
                    borderColor: colors.gray_border,
                  },
                  inputHybridStyle.modalItem,
                ]}>
                <MaterialCommunityIcons
                  name={
                    label === value || item.value === value
                      ? 'circle-slice-8'
                      : 'circle-outline'
                  }
                  color={colors.button_color_one}
                  size={20}
                  style={{marginRight: 5}}
                />
                <Text style={{flex: 1}}>{label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
};
ModalSearchPicker.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  removeSearch: PropTypes.bool,
  value: PropTypes.oneOf([
    PropTypes.objectOf({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    PropTypes.any,
  ]),
};
export default ModalSearchPicker;
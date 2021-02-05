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
import lod from 'lodash';
import CustomCheckBox from '../customCheckBox';
const ModalMenuPicker = (props) => {
  const {data, onClose, onApply, title, removeSearch} = props;
  const [localData, setLocaldata] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResult] = useState([]);
  useEffect(() => {
    if (localData.length > 0) {
      const results = localData.filter((item) =>
        item.label.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchResult(results);
    }
  }, [localData, searchText]);
  const onClick = (index) => {
    let newArr = lod.cloneDeep(localData);
    newArr[index].is_selected = !newArr[index].is_selected;
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
            const {label, is_selected} = item;
            return (
              <TouchableOpacity
                onPress={() => onClick(index)}
                style={[
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.gray_table : 'white',
                    borderRadius: 3,
                    borderColor: colors.gray_border,
                  },
                  inputHybridStyle.modalItem,
                ]}>
                <CustomCheckBox
                  value={is_selected}
                  style={{marginRight: 5}}
                  onPress={() => onClick(index)}
                />
                <Text style={{flex: 1}}>{label}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={inputHybridStyle.buttonStyle}
            onPress={() => {
              onApply(localData);
              onClose(true);
            }}>
            <Text style={{color: 'white'}}>Apply</Text>
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
  removeSearch: PropTypes.bool,
  value: PropTypes.oneOf([
    PropTypes.objectOf({
      label: PropTypes.string,
      value: PropTypes.string,
      is_selected: PropTypes.bool,
    }),
    PropTypes.any,
  ]),
};
export default ModalMenuPicker;

import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../global/text';
import React, {useState} from 'react';
import {inputHybridStyle} from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TableCellButton = (props) => {
  const [modal, setModal] = useState(false);
  const {config, item} = props || {};
  const {label, width, height, backgroundColor, key} = config || {};
  const {bannerImage} = item || {};
  return (
    <React.Fragment>
      <View
        key={key}
        style={{
          width: width || defaultWidthCell,
          height: height || defaultHeightCell,
          alignItems: 'center',
          backgroundColor: backgroundColor || 'white',
        }}>
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={inputHybridStyle.buttonStyle}>
          <Text style={{color: 'white'}}>View</Text>
        </TouchableOpacity>
      </View>
      {modal && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => setModal(false)}>
          <View style={inputHybridStyle.modalBackdrop} />
          <KeyboardAvoidingView
            enabled={false}
            style={[inputHybridStyle.modalContainer, {padding: 0}]}>
            <View
              style={[
                inputHybridStyle.modalTitleContainer,
                inputHybridStyle.additionalTitleContainer,
              ]}>
              <Text
                style={[inputHybridStyle.modalTitleText, {color: 'white'}]}
                numberOfLines={1}>
                {label}
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <MaterialCommunityIcons
                  name={'close-circle'}
                  color={'white'}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <View style={inputHybridStyle.mapContainer}>
              <View style={{flex: 1, width: '100%', paddingHorizontal: 12}}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${bannerImage}`,
                  }}
                  style={{flex: 1, width: '100%', resizeMode: 'contain'}}
                />
              </View>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={inputHybridStyle.buttonStyle}>
                <Text style={{color: 'white'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </React.Fragment>
  );
};
export default TableCellButton;

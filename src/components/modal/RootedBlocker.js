import {KeyboardAvoidingView, Modal, Text, View} from 'react-native';
import JailMonkey from 'jail-monkey';
import {inputHybridStyle} from '../../style';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RootedBlocker = () => {
  const [rooted, setRooted] = useState(false);
  useEffect(() => {
    if (JailMonkey.isJailBroken()) {
      setRooted(true);
    }
  }, []);
  return (
    <React.Fragment>
      {rooted && (
        <Modal animationType="slide" transparent>
          <View style={inputHybridStyle.modalBackdrop} />
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <KeyboardAvoidingView
              enabled={false}
              style={[
                inputHybridStyle.modalContainer,
                {
                  padding: 0,
                  flex: 0,
                },
              ]}>
              <View
                style={[
                  inputHybridStyle.modalTitleContainer,
                  inputHybridStyle.additionalTitleContainer,
                  {justifyContent: 'flex-start', alignItems: 'center'},
                ]}>
                <MaterialCommunityIcons
                  name={'alert-circle-outline'}
                  color={'white'}
                  size={22}
                />
                <Text
                  style={[
                    inputHybridStyle.modalTitleText,
                    {
                      color: 'white',
                      flex: 0,
                    },
                  ]}
                  numberOfLines={1}>
                  {'  Rooted Device Alert'}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  padding: 24,
                }}>
                {
                  'Your Device has been rooted, \n IoT connectivity+ cannot be used on\n rooted device for security reason.'
                }
              </Text>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      )}
    </React.Fragment>
  );
};
export default RootedBlocker;

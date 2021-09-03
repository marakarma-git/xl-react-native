import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '../global/text';
import {defaultHeightCell, defaultWidthCell} from '../../constant/config';
import lod from 'lodash';
import {inputHybridStyle} from '../../style';
import {colors} from '../../constant/color';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {base_url} from '../../constant/connection';
import {stickyNotesIcon} from '../../assets/images';
import Clipboard from '@react-native-community/clipboard';

const TableCellUserAdministrationOrganization = (props) => {
  const [moreText, setMoreText] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [subOrganization, setSubOrganization] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const {access_token} = useSelector((state) => state.auth_reducer?.data) || {};
  const {config, item} = props || {};
  const {label, width, height, backgroundColor} = config || {};
  const {xlUser, userId} = item || {};
  const callSubOrganization = () => {
    axios
      .get(`${base_url}/user/usr/getUserInfo?userId=${userId}`, {
        headers: {Authorization: `Bearer ${access_token}`},
      })
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          const {enterpriseScopeData} = result || {};
          setSubOrganization(enterpriseScopeData);
        } else {
          setErrorText('Something went wrong');
        }
        setLoading(false);
      })
      .catch(() => {
        setErrorText('Something went wrong');
        setLoading(false);
      });
  };
  const onLongPress = () => {
    Clipboard.setString(label);
    ToastAndroid.show('Text copied', ToastAndroid.LONG);
  };
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          if (moreText || xlUser) {
            setShowMore(true);
            if (xlUser) {
              setErrorText('');
              setLoading(true);
              callSubOrganization();
            }
          }
        }}
        onLongPress={() => onLongPress()}
        style={{
          width: width || defaultWidthCell,
          height: height || defaultHeightCell,
          backgroundColor: backgroundColor || 'white',
        }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: '10%',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 4,
            }}>
            {xlUser && (
              <Image
                source={stickyNotesIcon}
                style={{width: 15, resizeMode: 'contain', height: 15}}
              />
            )}
          </View>
          <Text
            style={{
              flex: 1,
            }}
            numberOfLines={1}
            onTextLayout={(e) => {
              setMoreText(lod.size(e.nativeEvent.lines) > 1);
            }}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
      {showMore && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => setShowMore(false)}>
          <View style={inputHybridStyle.modalBackdrop} />
          <KeyboardAvoidingView
            enabled={false}
            style={[inputHybridStyle.modalContainer]}>
            <View style={inputHybridStyle.modalTitleContainer}>
              <Text style={inputHybridStyle.modalTitleText}>
                Organization Details
              </Text>
              {loading && <ActivityIndicator color="#002DBB" size="small" />}
            </View>
            <ScrollView style={{flex: 1}}>
              {!xlUser && <Text selectable>{label}</Text>}
              {xlUser && (
                <React.Fragment>
                  <Text selectable fontType={'semi-bold'}>
                    Organization Name: {label}
                  </Text>
                  <Text
                    selectable
                    fontType={'semi-bold'}
                    style={{marginTop: 10}}>
                    Sub Organization:
                    {' ' + `${subOrganization.length === 0 ? '-' : ''}`}
                  </Text>
                  {subOrganization &&
                    subOrganization.length > 0 &&
                    subOrganization.map(({enterpriseName}) => {
                      return (
                        <Text
                          selectable
                          style={{
                            marginTop: 8,
                          }}>{`- ${enterpriseName}`}</Text>
                      );
                    })}
                  <Text style={{color: 'red'}}>{`${
                    errorText ? `Error: ${errorText}` : ''
                  }`}</Text>
                </React.Fragment>
              )}
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
                onPress={() => setShowMore(false)}>
                <Text style={{color: 'black'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </React.Fragment>
  );
};
TableCellUserAdministrationOrganization.propTypes = {};
TableCellUserAdministrationOrganization.defaultProps = {};
export default TableCellUserAdministrationOrganization;

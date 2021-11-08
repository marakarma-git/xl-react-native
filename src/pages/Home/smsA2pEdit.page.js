import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import InputHybrid from '../../components/InputHybrid';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {base_url} from '../../constant/connection';
import {setRequestError} from '../../redux/action/dashboard_action';
import getA2pEditDetail, {
  getA2pEnterprise,
  smsA2pEditReset,
  smsA2pEditTextInput,
} from '../../redux/action/sms_a2p_edit_action';

const SmsA2pEdit = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {params} = route || {};
  const {positionTableIndex, layoutType, dataConfig} = params || {};
  const {configId} = dataConfig || '';
  const {dataA2pEdit} =
    useSelector((state) => state.sms_a2p_edit_reducer) || [];
  const {access_token} = useSelector((state) => state.auth_reducer.data);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (layoutType === 'Create') {
      dispatch(getA2pEnterprise());
    }
    if (
      (positionTableIndex || positionTableIndex === 0) &&
      layoutType === 'Edit' &&
      configId
    ) {
      dispatch(
        getA2pEditDetail({
          indexSelected: positionTableIndex,
          configId: configId,
        }),
      );
    }
  }, [positionTableIndex, layoutType]);
  const onSubmit = () => {
    setLocalLoading(true);
    axios({
      method: 'post',
      url: `${base_url}/dcp/a2pConfiguration/updateA2PConfiguration`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: '',
    })
      .then(({data}) => {
        const {statusCode} = data || {};
        if (statusCode === 0) {
        } else {
        }
      })
      .catch((error) => {
        setLocalLoading(false);
        alert('error');
        dispatch(setRequestError(error));
      });
  };
  const handlingBack = () => {
    dispatch(smsA2pEditReset());
    navigation.setParams({
      positionTableIndex: undefined,
      layoutType: undefined,
      configId: undefined,
    });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => handlingBack());
  }, [navigation]);
  return (
    <HeaderContainer headerTitle={'SMS A2P'} backIcon={true}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <OverlayBackground />
        <Container style={{marginTop: 16}}>
          <View style={subscriptionStyle.containerTitle}>
            <Text style={{fontSize: 16}}>{layoutType || ''}</Text>
            <TouchableOpacity
              onPress={() => {
                handlingBack();
                navigation.goBack();
              }}>
              <Ionicons
                name={'chevron-back-circle'}
                color={colors.gray}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <View style={subscriptionStyle.containerWrap}>
            {dataA2pEdit &&
              dataA2pEdit.map((item) => {
                const {for_layout_edit_only, formId} = item || {};
                const {
                  edit_value,
                  type_input_edit,
                  edit_label,
                  disabled,
                  secure_text_entry,
                  edit_data_array,
                } = for_layout_edit_only || {};
                return (
                  <InputHybrid
                    data={edit_data_array}
                    fullWidthInput={true}
                    disabled={disabled}
                    type={type_input_edit}
                    value={edit_value}
                    errorText={''}
                    label={edit_label}
                    onChange={(e) => {
                      dispatch(
                        smsA2pEditTextInput({
                          valueInput: e,
                          formId: formId,
                        }),
                      );
                    }}
                    isSecureTextEntry={secure_text_entry}
                  />
                );
              })}
          </View>
        </Container>
        <View style={subscriptionStyle.buttonContainer}>
          {['Cancel', 'Submit'].map((value) => {
            return (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor:
                      value === 'Cancel' ? colors.gray_400 : colors.main_color,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (value === 'Cancel') {
                    handlingBack();
                  }
                  if (value === 'Submit') {
                    //do something
                  }
                }}>
                <Text
                  fontType={'bold'}
                  style={{
                    color: value === 'Cancel' ? 'black' : 'white',
                  }}>
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </HeaderContainer>
  );
};

export default SmsA2pEdit;

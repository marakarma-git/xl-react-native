import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../constant/color';
import InputHybrid from '../../components/InputHybrid';
import {useDispatch, useSelector} from 'react-redux';
import {setRequestError} from '../../redux/action/dashboard_action';
import getA2pEditDetail, {
  getA2pEnterprise,
  smsA2pEditDynamicFormFailed,
  smsA2pEditReset,
  smsA2pEditTextInput,
} from '../../redux/action/sms_a2p_edit_action';
import Helper from '../../helpers/helper';
import getSmsA2p, {
  smsA2pReplaceCellWithIndex,
} from '../../redux/action/sms_a2p_get_all_sms_action';
import httpRequest from '../../constant/axiosInstance';

const SmsA2pEdit = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {params} = route || {};
  const {positionTableIndex, layoutType, dataConfig} = params || {};
  const {configId} = dataConfig || '';
  const {dataA2pEdit, dataA2pSnapShot, loading} =
    useSelector((state) => state.sms_a2p_edit_reducer) || [];
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
  const handlingBack = () => {
    dispatch(smsA2pEditReset());
    navigation.setParams({
      positionTableIndex: undefined,
      layoutType: undefined,
      configId: undefined,
    });
  };
  const onSubmit = () => {
    const {data: getSmsData, errorCount} = Helper.editFormValidator(
      dataA2pEdit,
    );
    if (errorCount > 0) {
      dispatch(
        smsA2pEditDynamicFormFailed({
          dataEditArray: getSmsData,
        }),
      );
    }
    if (errorCount === 0) {
      const getValueObject = Helper.createObjectPostEdit(dataA2pEdit);
      setLocalLoading(true);
      httpRequest({
        method: 'post',
        url: `/dcp/a2pConfiguration/${
          layoutType === 'Create'
            ? 'create'
            : layoutType === 'Edit'
            ? 'update'
            : ''
        }A2PConfiguration${
          layoutType === 'Edit' ? `?configId=${configId}` : ''
        }`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: getValueObject,
      })
        .then(({data}) => {
          const {statusCode} = data || {};
          if (statusCode === 0) {
            if (layoutType === 'Create') {
              dispatch(
                getSmsA2p({
                  page_params: 0,
                }),
              );
              handlingBack();
              navigation.goBack();
            }
            if (layoutType === 'Edit') {
              dispatch(
                smsA2pReplaceCellWithIndex({
                  indexToReplace: positionTableIndex,
                  indexReplaceData: {
                    ...dataA2pSnapShot,
                    dataCell: dataA2pEdit,
                  },
                }),
              );
            }
            setLocalLoading(false);
            alert('success');
          } else {
            setLocalLoading(false);
          }
        })
        .catch((error) => {
          alert('error');
          dispatch(setRequestError(error));
          setLocalLoading(false);
        });
    }
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
          {(loading || localLoading) && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                flex: 1,
              }}>
              <ActivityIndicator size={'small'} color={colors.main_color} />
            </View>
          )}
          <View style={subscriptionStyle.containerWrap}>
            {dataA2pEdit &&
              dataA2pEdit.map((item) => {
                const {for_layout_edit_only, subItem} = item || {};
                const {formId, validationError} = subItem || '';
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
                    errorText={validationError}
                    label={edit_label}
                    onChange={(e) => {
                      if (formId !== 'sender-address-hard-code') {
                        dispatch(
                          smsA2pEditTextInput({
                            valueInput: e,
                            formId: formId,
                          }),
                        );
                      }
                      /^[0-9]*$/.test(e) &&
                        dispatch(
                          smsA2pEditTextInput({
                            valueInput: e,
                            formId: formId,
                          }),
                        );
                    }}
                    keyboardType={
                      formId === 'sender-address-hard-code'
                        ? 'number-pad'
                        : undefined
                    }
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
                    navigation.goBack();
                  }
                  if (value === 'Submit') {
                    onSubmit();
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

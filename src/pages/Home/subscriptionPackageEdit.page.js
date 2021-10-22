import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {Container} from './subscriptionFilter.page';
import {subscriptionStyle} from '../../style';
import {colors} from '../../constant/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputHybrid from '../../components/InputHybrid';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import callSubsPackagePredefinedValue, {
  subscriptionPackageEditDropDownType2Edit,
  subscriptionPackageEditTextInputEdit,
} from '../../redux/action/subscription_package_edit_action';
import Helper from '../../helpers/helper';
import {subscriptionPackageReplaceCellWithIndex} from '../../redux/action/subscription_package_get_subscription_action';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const SubscriptionPackageEdit = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = route || {};
  const {positionTableIndex} = params || {};
  const {
    dataSubscriptionEdit,
    dataSubscriptionSnapShot,
    loading,
    errorText,
  } = useSelector((state) => state.subscription_package_edit_reducer);
  const {customerNo, access_token, principal} = useSelector(
    (state) => state.auth_reducer.data,
  );
  const {username} = principal || '';
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (positionTableIndex || positionTableIndex === 0) {
      dispatch(
        callSubsPackagePredefinedValue({
          indexSelected: positionTableIndex,
        }),
      );
    }
  }, [positionTableIndex]);
  const onSubmit = () => {
    setLocalLoading(true);
    const getPackageId = dataSubscriptionEdit[4]?.item?.packageId || '';
    const createData = Helper.createObjectPostEdit(
      dataSubscriptionEdit,
      {
        customerNo,
        packageId: getPackageId,
      },
      true,
    );
    axios({
      method: 'post',
      url: `${base_url}/dcp/package/updateSubscriptionPackage`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        username: username,
        'Content-Type': 'application/json',
      },
      data: createData,
    })
      .then(({data}) => {
        const {statusCode, statusDescription} = data || {};
        if (statusCode === 0) {
          dispatch(
            subscriptionPackageReplaceCellWithIndex({
              indexToReplace: positionTableIndex,
              indexReplaceData: {
                ...dataSubscriptionSnapShot,
                dataCell: dataSubscriptionEdit,
              },
            }),
          );
          setLocalLoading(false);
          alert('Success');
        } else {
          setLocalLoading(false);
          alert(statusDescription);
        }
      })
      .catch((e) => {
        alert(e);
        setLocalLoading(false);
      });
  };
  const handlingBack = () => {
    navigation.setParams({
      positionTableIndex: undefined,
    });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => handlingBack());
  }, []);
  return (
    <HeaderContainer headerTitle={'Subscription Package'} backIcon={true}>
      <ScrollView style={{backgroundColor: 'white'}}>
        <OverlayBackground />
        <Container style={{marginTop: 16}}>
          <View style={subscriptionStyle.containerTitle}>
            <Text style={{fontSize: 16}}>Edit</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
          {errorText ? (
            <Text style={{color: colors.delete}}>{`Error: ${errorText}`}</Text>
          ) : (
            <></>
          )}
          <View style={subscriptionStyle.containerWrap}>
            {dataSubscriptionEdit.map((item) => {
              const {for_layout_edit_only, edit_form_id} = item || {};
              const {
                edit_value,
                edit_value2,
                type_input_edit,
                edit_text_type,
                constantLabelLeft,
                constantLabelRight,
                edit_label,
                edit_data_array,
                disabled,
              } = for_layout_edit_only || {};
              const isCurrency = edit_text_type === 'Currency';
              return (
                <InputHybrid
                  fullWidthInput={true}
                  disabled={disabled || localLoading}
                  type={type_input_edit}
                  value={edit_value}
                  selectedValue={edit_value2}
                  loading={false}
                  data={edit_data_array}
                  errorText={''}
                  label={edit_label}
                  onChange={(e) => {
                    dispatch(
                      subscriptionPackageEditTextInputEdit({
                        valueInput: isCurrency
                          ? Helper.delimiterNumberOnInput(
                              e,
                              edit_form_id ===
                                'edit-subscription-quota-internet-hard-code',
                            )
                          : e,
                        editFormId: edit_form_id,
                      }),
                    );
                  }}
                  onChange2={(e) => {
                    dispatch(
                      subscriptionPackageEditDropDownType2Edit({
                        valueInput2: e,
                        editFormId: edit_form_id,
                      }),
                    );
                  }}
                  placeholder={isCurrency ? '0' : ''}
                  constantLabelLeft={constantLabelLeft}
                  constantLabelRight={constantLabelRight}
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
                      value === 'Cancel' || loading || localLoading
                        ? colors.gray_400
                        : colors.main_color,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (!localLoading || !loading) {
                    if (value === 'Cancel') {
                      handlingBack();
                    }
                    if (value === 'Submit') {
                      onSubmit();
                    }
                  }
                }}>
                <Text
                  fontType={'bold'}
                  style={{
                    color:
                      value === 'Cancel' || loading || localLoading
                        ? 'black'
                        : 'white',
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

export default SubscriptionPackageEdit;

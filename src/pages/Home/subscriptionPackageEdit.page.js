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
import {setRequestError} from '../../redux/action/dashboard_action';
import httpRequest from '../../constant/axiosInstance';
import {useToastHooks} from '../../customHooks/customHooks';

const SubscriptionPackageEdit = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = route || {};
  const {positionTableIndex} = params || {};
  const {dataSubscriptionEdit, dataSubscriptionSnapShot, loading, errorText} =
    useSelector((state) => state.subscription_package_edit_reducer);
  const {customerNo} = useSelector((state) => state.auth_reducer.data);
  const [localLoading, setLocalLoading] = useState(false);
  const showToast = useToastHooks();

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
    const customHeaders = {
      activityId: 'AP-21',
      descSuffix: `packageId ${dataSubscriptionEdit[0]?.item?.packageId}`,
    };
    httpRequest({
      method: 'post',
      url: '/dcp/package/updateSubscriptionPackage',
      data: createData,
      headers: {
        ...customHeaders,
      },
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
          showToast({
            title: 'Edit Package',
            type: 'success',
            message: 'Selected package has been edited',
            duration: 4500,
            showToast: true,
            position: 'top',
          });
          navigation.goBack();
        } else {
          setLocalLoading(false);
          showToast({
            title: statusCode,
            type: 'error',
            message: statusDescription,
            duration: 3000,
            showToast: true,
            position: 'top',
          });
        }
      })
      .catch((error) => {
        dispatch(setRequestError(error));
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
              const getValue =
                dataSubscriptionEdit[8]?.for_layout_edit_only?.edit_value
                  ?.value;
              return (
                <InputHybrid
                  fullWidthInput={true}
                  disabled={
                    disabled ||
                    localLoading ||
                    (edit_form_id ===
                      'edit-subscription-price-bulk-shared-hard-code' &&
                      (getValue === 'Individual' ||
                        getValue === 'Individual shared'))
                  }
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
        {dataSubscriptionEdit.length > 0 && (
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
                        navigation.goBack();
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
        )}
      </ScrollView>
    </HeaderContainer>
  );
};

export default SubscriptionPackageEdit;

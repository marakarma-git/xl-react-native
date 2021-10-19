import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
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
  subscriptionPackageEditReset,
  subscriptionPackageEditTextInputEdit,
} from '../../redux/action/subscription_package_edit_action';
import Loading from '../../components/loading';
import Helper from '../../helpers/helper';
import {value} from 'lodash/seq';

const SubscriptionPackageEdit = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = route || {};
  const {positionTableIndex} = params || {};
  const {dataSubscriptionEdit, loading} = useSelector(
    (state) => state.subscription_package_edit_reducer,
  );

  useEffect(() => {
    if (positionTableIndex || positionTableIndex === 0) {
      dispatch(
        callSubsPackagePredefinedValue({
          indexSelected: positionTableIndex,
        }),
      );
    }
  }, [positionTableIndex]);

  const handlingBack = () => {
    navigation.setParams({
      positionTableIndex: undefined,
    });
    // dispatch(subscriptionPackageEditReset())
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
                  disabled={disabled}
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
                      value === 'Cancel' ? colors.gray_400 : colors.main_color,
                  },
                  subscriptionStyle.buttonStyle,
                ]}
                onPress={() => {
                  if (value === 'Cancel') {
                    handlingBack();
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
      {/*{loading && <Loading />}*/}
    </HeaderContainer>
  );
};

export default SubscriptionPackageEdit;

import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {subscriptionStyle} from '../../style';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../style/home.style';
import {Card} from 'react-native-paper';
import InputHybrid from '../../components/InputHybrid';
import {colors} from '../../constant/color';
import AutomationCard from '../../card/AutomationCard';
import Loading from '../../components/loading';
import lod from 'lodash';
import callAutomationEnterprise, {
  automationActiveEnterpriseReset,
  automationSetActiveEnterprise,
} from '../../redux/action/automation_get_enterprise_action';
import getAutomationCustomerNumber, {
  automationCreateEditCheck,
  automationCreateEditReset,
  automationCreateEditSetSubValue,
  automationCreateEditSetValue,
} from '../../redux/action/automation_create_edit_action';
import {useNavigation, useRoute} from '@react-navigation/native';
import {automation_create_edit_logic} from '../../redux/logic/automation_create_edit_logic';
import axios from 'axios';
import {automationGetAutomationReload} from '../../redux/action/automation_get_automation_action';
import {base_url, super_base_url} from '../../constant/connection';

const AutomationCreateEditPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  const [loadingCreDit, setLoadingCreDit] = useState(false);
  const {from, result} = params || {};
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    loading,
    errorText,
    data_active_enterprise,
    value: valueEnterprise,
    disabled: enterpriseDisabled,
  } = useSelector((state) => state.automation_get_enterprise_reducer);
  const {
    loading: loading_automation,
    errorText: error_automation,
    data_automation_create,
    dataRuleCategory,
  } = useSelector((state) => state.automation_create_edit_reducer);
  const {access_token} = useSelector((state) => state.auth_reducer.data) || {};
  useEffect(() => {
    dispatch(automationActiveEnterpriseReset());
    dispatch(automationCreateEditReset());
    dispatch(callAutomationEnterprise(!lod.isEmpty(result) && {from, result}));
    if (!lod.isEmpty(result)) {
      const {customerNumber} = result || {};
      dispatch(
        getAutomationCustomerNumber({
          customerNumber,
          from,
          result,
        }),
      );
    }
  }, [navigation, params, result]);
  return (
    <HeaderContainer
      headerTitle={`${!lod.isEmpty(from) ? from : 'Create New'} Automation`}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <ScrollView style={{flex: 1}}>
          <OverlayBackground />
          <LocalCardWrapper
            title={'Target Enterprise'}
            description={
              'It will affect all subscription packages and individual subscriptions within the selected enterprise'
            }>
            <InputHybrid
              fullWidthInput
              disabled={enterpriseDisabled || from}
              loading={loading}
              type={'DropDown'}
              label={'Enterprise'}
              data={data_active_enterprise}
              value={valueEnterprise}
              errorText={errorText}
              onChange={(e) => {
                const {customerNumber} = e || {};
                dispatch(automationSetActiveEnterprise(e));
                dispatch(getAutomationCustomerNumber({customerNumber}));
              }}
            />
          </LocalCardWrapper>
          <LocalCardWrapper
            title={'Select Rule Category'}
            description={
              'Choose at least one of 3 business automation rules below. Auto Downgrade to original package ' +
              'is applicable for any subscription package. Bulk shared notification and auto upgrade can only be ' +
              'configured for Enterprise that subscribes to Bulk Shared Package.'
            }>
            {error_automation ? (
              <Text style={{color: 'red'}}>{`Error: ${error_automation}`}</Text>
            ) : (
              <React.Fragment />
            )}
            {!error_automation &&
              dataRuleCategory?.length > 0 &&
              dataRuleCategory.map((item) => {
                const {
                  card_id,
                  card_type,
                  card_disabled,
                  card_is_checked,
                  card_title,
                  card_description,
                  card_warning_description,
                  card_type_title,
                  value,
                  value_error_text,
                  sub_value,
                  sub_value_error_text,
                  select_api,
                } = item || {};
                return (
                  <AutomationCard
                    type={card_type}
                    title={card_title}
                    checked={card_is_checked}
                    onChangeCheck={() => {
                      dispatch(
                        automationCreateEditCheck({
                          cardId: card_id,
                        }),
                      );
                    }}
                    disabled={
                      card_disabled ||
                      lod.isEmpty(data_automation_create) ||
                      from === 'Detail'
                    }
                    cardDescription={card_description}
                    cardWarningDescription={card_warning_description}
                    typeTitle={card_type_title}
                    data={data_automation_create[`${select_api}`] || []}
                    value={value}
                    onChange={(value) => {
                      dispatch(
                        automationCreateEditSetValue({
                          cardId: card_id,
                          inputValue: value,
                        }),
                      );
                    }}
                    valueError={value_error_text}
                    subValue={sub_value}
                    subOnChange={(value) => {
                      dispatch(
                        automationCreateEditSetSubValue({
                          cardId: card_id,
                          inputValue: value,
                        }),
                      );
                    }}
                    subValueError={sub_value_error_text}
                  />
                );
              })}
          </LocalCardWrapper>
          <View
            style={[
              subscriptionStyle.buttonContainer,
              {justifyContent: 'space-between'},
            ]}>
            {['Cancel', 'Submit'].map((value) => {
              if (value === 'Submit') {
                if (from !== 'Detail') {
                  return (
                    <LocalButton
                      value={from === 'Edit' ? 'Update' : 'Submit'}
                      navigation={navigation}
                      onPress={() => {
                        const generateCreateEdit = automation_create_edit_logic(
                          {
                            dataRuleCategory,
                            valueEnterprise,
                            dispatch,
                            from,
                            result,
                          },
                        );
                        if (!lod.isEmpty(generateCreateEdit)) {
                          setLoadingCreDit(true);
                          console.log(
                            `${base_url}/dcp/automation/${
                              from === 'Create'
                                ? 'createAutomation'
                                : from === 'Edit' && 'updateAutomation'
                            }`,
                          );
                          axios({
                            method: 'post',
                            url: `${base_url}/dcp/automation/${
                              from === 'Create'
                                ? 'createAutomation'
                                : from === 'Edit' && 'updateAutomation'
                            }`,
                            data: generateCreateEdit,
                            headers: {
                              Authorizations: `Bearer ${access_token}`,
                            },
                          })
                            .then(({data}) => {
                              const {statusCode} = data || {};
                              if (statusCode === 0) {
                                if (from === 'Create') {
                                  alert('Success to create automation');
                                }
                                if (from === 'Edit') {
                                  alert('Success to update data automation');
                                }
                                setLoadingCreDit(false);
                                dispatch(automationGetAutomationReload());
                                navigation.goBack();
                              } else {
                              }
                            })
                            .catch((e) => {
                              setLoadingCreDit(false);
                              console.log(
                                JSON.stringify(
                                  JSON.parse(e.config.data),
                                  null,
                                  2,
                                ),
                              );
                              alert(
                                JSON.stringify(
                                  JSON.parse(e.config.data),
                                  null,
                                  2,
                                ),
                              );
                            });
                        }
                      }}
                    />
                  );
                }
              } else {
                return <LocalButton value={value} navigation={navigation} />;
              }
            })}
          </View>
        </ScrollView>
        {(loading_automation || loadingCreDit) && <Loading />}
      </View>
    </HeaderContainer>
  );
};

export default AutomationCreateEditPage;

const LocalCardWrapper = (props) => {
  const {title, description, children} = props || {};
  return (
    <Card style={[styles.cardSection, {marginTop: '5%'}]}>
      <Card.Content style={[styles.formStepHeader, {flexDirection: 'column'}]}>
        <Text fontType="bold" style={styles.formStepHeaderTextTitle}>
          {title}
        </Text>
        <Text style={{marginVertical: 12}}>{description}</Text>
        {children}
      </Card.Content>
    </Card>
  );
};
const LocalButton = ({value, navigation, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor:
            value === 'Cancel' ? colors.gray_400 : colors.button_color_one,
        },
        subscriptionStyle.buttonStyle,
      ]}
      onPress={() => {
        if (value === 'Cancel') {
          navigation.goBack();
        } else {
          onPress(value);
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
};

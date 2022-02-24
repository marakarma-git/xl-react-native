import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, TouchableOpacity, View} from 'react-native';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {automationCreditStyle, subscriptionStyle} from '../../style';
import {useDispatch, useSelector} from 'react-redux';
import lod from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FormStepHeaderComponent} from '../../components/form/formStep';
import CardAutomation, {WrapperOne} from '../../components/card/CardAutomation';
import {colors} from '../../constant/color';
import {
  automationCreateReduxLoading,
  automationCreateReduxLoadingFalse,
  automationCreateSummary,
  automationResetFormContainerValue,
  automationValidationForm,
  callAutomationActiveEnterprise,
  callAutomationEnterprise,
} from '../../redux/action/automation_create_edit_action';
import {useToastHooks} from '../../customHooks/customHooks';
import httpRequest from '../../constant/axiosInstance';
import getAutomation from '../../redux/action/automation_get_automation_action';
import {automationElementStaticPlusOne} from '../../redux/action/automation_array_header_action';
import Loading from '../../components/loading';

const AutomationCreateEditPage = () => {
  const showToast = useToastHooks();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  const {from, result} = params || {};
  const [indexForm, setIndexForm] = useState(0);
  const [dataSummary, setDataSummary] = useState([]);
  const [wrapperTwoFind, setWrapperTwoFind] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {automationDefaultFormData, containerValue, loading} = useSelector(
    (state) => state.automation_create_edit_reducer,
  );
  const getCustomerNumber = useSelector(
    (state) => state.auth_reducer.data?.customerNo,
  );
  useEffect(() => {
    dispatch(callAutomationActiveEnterprise());
    if (!lod.isEmpty(result)) {
      const {customerNumber} = result || {};
      dispatch(callAutomationEnterprise({customerNumber, dataParams: params}));
    }
  }, [navigation, params, result]);

  const onCancel = () => {
    setIndexForm(0);
    setDataSummary([]);
    dispatch(automationResetFormContainerValue());
    dispatch(getAutomation());
    navigation.setParams({
      from: undefined,
      result: undefined,
      itemEdit: undefined,
    });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (!lod.isEmpty(from)) {
        onCancel();
      }
    });
  }, [BackHandler, from]);
  const onSubmit = (dataParameter = {}) => {
    dispatch(automationCreateReduxLoading());
    dataParameter = {
      isBulkNotification: false,
      isDowngrade: false,
      isIndividualNotification: false,
      isUpgradeBulk: false,
      isUpgradeIndividual: false,
      ...dataParameter,
    };
    if (!lod.isEmpty(result)) {
      dataParameter = {
        ...dataParameter,
        autoId: result?.autoId,
      };
    }
    if (lod.isEmpty(result)) {
      dataParameter = {
        ...dataParameter,
        customerNo: getCustomerNumber,
      };
    }
    let customHeaders = {
      activityId: !lod.isEmpty(result) ? 'AUP-3' : 'AUP-1',
      descSuffix: `${containerValue?.enterpriseId?.label}`,
    };
    httpRequest({
      method: 'post',
      url: `/dcp/automation/${
        !lod.isEmpty(result) ? 'updateAutomation' : 'createAutomation'
      }`,
      data: {
        ...dataParameter,
        enterpriseId: containerValue.enterpriseId?.value,
      },
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders,
      },
    })
      .then(({data}) => {
        const {statusCode, statusDescription} = data || {};
        if (statusCode === 0) {
          showToast({
            title: 'Success',
            type: 'success',
            message: `Success ${
              !lod.isEmpty(result) ? 'Update' : 'Create'
            } Automation`,
            duration: 4500,
            showToast: true,
            position: 'top',
          });
          navigation.goBack();
          onCancel();
          dispatch(getAutomation());
          if (lod.isEmpty(result)) {
            dispatch(automationElementStaticPlusOne());
          }
        } else {
          showToast({
            title: 'Error',
            type: 'error',
            message: `Error When ${
              !lod.isEmpty(result) ? 'Update' : 'Create'
            } Automation \n ${statusDescription}`,
            duration: 4500,
            showToast: true,
            position: 'top',
          });
        }
        dispatch(automationCreateReduxLoadingFalse());
      })
      .catch(() => {
        showToast({
          title: 'Catch',
          type: 'error',
          message: `Error Catch When ${
            !lod.isEmpty(result) ? 'Update' : 'Create'
          } Automation`,
          duration: 4500,
          showToast: true,
          position: 'top',
        });
        dispatch(automationCreateReduxLoadingFalse());
      });
  };
  return (
    <HeaderContainer
      headerTitle={`${!lod.isEmpty(from) ? from : 'Create New'} Automation`}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <ScrollView style={{flex: 1}}>
          <OverlayBackground />
          <FormStepHeaderComponent
            formPosition={indexForm}
            formLength={4}
            formTitle={automationDefaultFormData[indexForm].stepperTitle}
            formDescription={
              automationDefaultFormData[indexForm].stepperDescription
            }
          />
          {automationDefaultFormData[indexForm].dataContainer.map((item) => {
            const {groupByContainer, ...rest} = item || {};
            if (indexForm === 3) {
              return (
                <>
                  {dataSummary.map((item) => {
                    const {containerType} = item || {};
                    return (
                      containerType === 'WrapperOne' && (
                        <CardAutomation summaryMode={true} {...item} />
                      )
                    );
                  })}
                  {wrapperTwoFind && (
                    <WrapperOne
                      style={{paddingHorizontal: 0}}
                      containerTitle={'Rules'}
                      containerDescription={'Rules that has been defined'}
                      isRemoveBottomLine={true}>
                      {dataSummary.map((item) => {
                        const {containerType} = item || {};
                        return (
                          containerType === 'WrapperTwo' && (
                            <CardAutomation
                              summaryMode={true}
                              containerTopLine={true}
                              {...item}
                            />
                          )
                        );
                      })}
                    </WrapperOne>
                  )}
                </>
              );
            }
            if (!lod.isEmpty(groupByContainer)) {
              return (
                groupByContainer === containerValue?.category.value && (
                  <CardAutomation {...rest} forceDisabled={from === 'Detail'} />
                )
              );
            } else {
              return (
                <CardAutomation {...rest} forceDisabled={from === 'Detail'} />
              );
            }
          })}

          <View style={automationCreditStyle.containerFooter}>
            <LocalButton
              title={'Cancel'}
              buttonType={'Two'}
              style={{marginLeft: 0}}
              onPress={() => {
                onCancel();
                navigation.goBack();
              }}
            />
            <View style={{flexDirection: 'row'}}>
              {indexForm > 0 && indexForm <= 3 && (
                <LocalButton
                  title={'Prev'}
                  buttonType={'Two'}
                  onPress={() => setIndexForm((state) => state - 1)}
                />
              )}
              <LocalButton
                title={indexForm === 3 ? 'Finish' : 'Next'}
                buttonType={'One'}
                onPress={() => {
                  if (indexForm === 3 && from === 'Detail') {
                    onCancel();
                    navigation.goBack();
                  }
                  if (indexForm < 3) {
                    const {containerErrorString, counterFalse} =
                      automationValidationForm({
                        dataForm: automationDefaultFormData[indexForm],
                        dataContainerValue: containerValue,
                      });
                    if (counterFalse === 0) {
                      setIndexForm((state) => state + 1);
                    } else {
                      showToast({
                        title: 'Error Input',
                        type: 'error',
                        message: containerErrorString.join('\n'),
                        duration: 4000,
                        showToast: true,
                        position: 'top',
                      });
                    }
                    const {arraySummary} = automationCreateSummary({
                      getAllData: automationDefaultFormData,
                      dataContainerValue: containerValue,
                    });
                    setDataSummary(arraySummary);
                    const findWrapperTwo = lod.find(
                      arraySummary,
                      ({containerType}) => {
                        return containerType === 'WrapperTwo';
                      },
                    );
                    setWrapperTwoFind(findWrapperTwo);
                  }
                  if (indexForm === 3 && from !== 'Detail') {
                    const {getAllParams} = automationCreateSummary({
                      getAllData: automationDefaultFormData,
                      dataContainerValue: containerValue,
                    });
                    onSubmit(getAllParams);
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
        {loading && <Loading />}
      </View>
    </HeaderContainer>
  );
};
const LocalButton = (props) => {
  const {title, buttonType, onPress, style, disabled} = props || {};
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        {
          backgroundColor:
            buttonType === 'Two' || disabled
              ? colors.gray_400
              : colors.main_color,
        },
        subscriptionStyle.buttonStyle,
        style,
      ]}>
      <Text
        fontType={'bold'}
        style={{
          color: buttonType === 'Two' || disabled ? 'black' : 'white',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default AutomationCreateEditPage;

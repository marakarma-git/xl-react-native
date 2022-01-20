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
  automationCreateSummary,
  automationResetFormContainerValue,
  automationValidationForm,
} from '../../redux/action/automation_create_edit_action';

const AutomationCreateEditPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {params} = useRoute();
  const {from, result} = params || {};
  const [indexForm, setIndexForm] = useState(0);
  const [dataSummary, setDataSummary] = useState([]);
  const [wrapperTwoFind, setWrapperTwoFind] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {automationDefaultFormData, containerValue} = useSelector(
    (state) => state.automation_create_edit_reducer,
  );
  useEffect(() => {
    if (!lod.isEmpty(result)) {
      const {customerNumber} = result || {};
      console.log(
        'result_not_empty_customer_number: ' + JSON.stringify(params, null, 2),
      );
    }
  }, [navigation, params, result]);

  useEffect(() => {
    //this effect for tracking every time change the value of enterprise
    console.log(
      'Selected Enterprise: ' +
        JSON.stringify(containerValue.enterpriseId, null, 2),
    );
  }, [containerValue.enterpriseId]);

  const onCancel = () => {
    setIndexForm(0);
    setDataSummary([]);
    dispatch(automationResetFormContainerValue());
    navigation.setParams({
      from: undefined,
      result: undefined,
    });
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (!lod.isEmpty(from)) {
        onCancel();
      }
    });
  }, [BackHandler, from]);
  const onSubmit = () => {};
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
          <Text
            onPress={() => {
              const getMe = automationValidationForm({
                dataForm: automationDefaultFormData[indexForm],
                dataContainerValue: containerValue,
              });
            }}>
            Validation ME
          </Text>
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
                  <CardAutomation {...rest} />
                )
              );
            } else {
              return <CardAutomation {...rest} />;
            }
          })}

          <View style={automationCreditStyle.containerFooter}>
            <LocalButton
              title={'Cancel'}
              buttonType={'Two'}
              style={{marginLeft: 0}}
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
                title={indexForm === 3 ? 'Submit' : 'Next'}
                buttonType={'One'}
                onPress={() => {
                  if (indexForm < 3) {
                    setIndexForm((state) => state + 1);
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
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </HeaderContainer>
  );
};
const LocalButton = (props) => {
  const {title, buttonType, onPress, style} = props || {};
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor:
            buttonType === 'Two' ? colors.gray_400 : colors.main_color,
        },
        subscriptionStyle.buttonStyle,
        style,
      ]}>
      <Text
        fontType={'bold'}
        style={{
          color: buttonType === 'Two' ? 'black' : 'white',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default AutomationCreateEditPage;

import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {automationCreditStyle, subscriptionStyle} from '../../style';
import {useSelector} from 'react-redux';
import lod from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FormStepHeaderComponent} from '../../components/form/formStep';
import CardAutomation from '../../components/card/CardAutomation';
import {colors} from '../../constant/color';
import {automationValidationForm} from '../../redux/action/automation_create_edit_action';

const AutomationCreateEditPage = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {from, result} = params || {};
  const [indexForm, setIndexForm] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {automationDefaultFormData, containerValue} = useSelector(
    (state) => state.automation_create_edit_reducer,
  );
  useEffect(() => {
    if (!lod.isEmpty(result)) {
      const {customerNumber} = result || {};
      console.log('result_not_empty_customer_number: ' + customerNumber);
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
              alert(JSON.stringify(getMe, null, 2));
            }}>
            Validation ME
          </Text>
          {automationDefaultFormData[indexForm].dataContainer.map((item) => {
            const {groupByContainer, ...rest} = item || {};
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
                  if (indexForm !== 3) {
                    setIndexForm((state) => state + 1);
                  }
                }}
              />
            </View>
          </View>
          <Text>{JSON.stringify(containerValue, null, 2)}</Text>
          <Text>
            {JSON.stringify(
              automationDefaultFormData[indexForm].dataContainer,
              null,
              2,
            )}
          </Text>
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

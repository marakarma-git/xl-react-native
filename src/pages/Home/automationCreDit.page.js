import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {subscriptionStyle} from '../../style';
import {useSelector} from 'react-redux';
import lod from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FormStepHeaderComponent} from '../../components/form/formStep';
import styles from '../../style/home.style';
import {Card} from 'react-native-paper';
import InputHybrid from '../../components/InputHybrid';
import {colors} from '../../constant/color';
import GridSwitchComponent from '../../components/grid/GridSwitch';

const AutomationCreateEditPage = () => {
  const navigation = useNavigation();
  const {params} = useRoute();
  const {from, result} = params || {};
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
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
            formPosition={0}
            formLength={6}
            formTitle={'Form Title'}
            formDescription={'Description'}
          />
          <Card style={[styles.cardSection, {marginTop: '5%'}]}>
            <Card.Content>
              <Text fontType="bold" style={styles.formStepHeaderTextTitle}>
                Ini Title
              </Text>
              <Text style={styles.formStepHeaderTextBody}>Ini Description</Text>
            </Card.Content>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: 'black',
                marginTop: 12,
              }}
            />
            <Card.Content>
              <InputHybrid
                fullWidthInput
                type={'DropDown'}
                label={'Rules Name'}
              />
            </Card.Content>
          </Card>
          <View
            style={[
              styles.cardSection,
              {
                marginTop: '5%',
                marginHorizontal: 0,
                borderWidth: 0,
              },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.disabled_table,
                paddingHorizontal: '3%',
                paddingVertical: 6,
                alignItems: 'center',
              }}>
              <GridSwitchComponent
                inActiveText={''}
                activeText={''}
                switchBorderRadius={50}
                switchWidthMultiplier={3}
              />
              <Text
                fontType="bold"
                style={{fontSize: 18, color: 'black', marginLeft: 8}}>
                Ini Title
              </Text>
            </View>
            <Card.Content>
              <Text style={[styles.formStepHeaderTextBody, {marginTop: 16}]}>
                Ini Description
              </Text>
              <InputHybrid
                fullWidthInput
                type={'DropDown'}
                label={'Rules Name'}
              />
            </Card.Content>
          </View>
        </ScrollView>
      </View>
    </HeaderContainer>
  );
};

export default AutomationCreateEditPage;

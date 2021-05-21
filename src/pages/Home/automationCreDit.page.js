import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
import {subscriptionStyle} from '../../style';
import {useSelector} from 'react-redux';
import {FormStepHeaderComponent} from '../../components/form/formStep';
import styles from '../../style/home.style';
import {Card} from 'react-native-paper';
import InputHybrid from '../../components/InputHybrid';
import CustomCheckBox from '../../components/customCheckBox';
import {title_font_size} from '../../constant/config';
import {colors} from '../../constant/color';
import {
  userAdministrationGenerateParams,
  userAdministrationResetAllValue,
} from '../../redux/action/user_administration_array_header_action';
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
const AutomationCreateEditPage = () => {
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const [mode, setMode] = useState('Create');
  return (
    <HeaderContainer
      headerTitle={'Create New Automation'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <ScrollView style={{flex: 1}}>
          <OverlayBackground />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => setMode('Create')}
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'blue',
                paddingVertical: 12,
              }}>
              <Text
                fontType={mode === 'Create' && 'bold'}
                style={{color: 'white'}}>
                Create
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('Edit')}
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: 'green',
                paddingVertical: 12,
              }}>
              <Text
                fontType={mode === 'Edit' && 'bold'}
                style={{color: 'white'}}>
                Detail & Edit
              </Text>
            </TouchableOpacity>
          </View>
          <FormStepHeaderComponent
            formPosition={mode === 'Create' ? 0 : 1}
            formLength={2}
            formTitle={'Target Enterprise'}
            formDescription={''}
          />
          {mode === 'Create' && (
            <LocalCardWrapper
              title={'Target Enterprise'}
              description={
                'It will affect all subscription packages and individual subscriptions within the selected enterprise'
              }>
              <InputHybrid
                fullWidthInput
                type={'DropDown'}
                label={'Enterprise'}
                data={[]}
                value={{}}
              />
            </LocalCardWrapper>
          )}
          {mode === 'Edit' && (
            <LocalCardWrapper
              title={'Select Rule Category'}
              description={
                'Choose at least one of 3 business automation rules below. Auto Downgrade to original package ' +
                'is applicable for any subscription package. Bulk shared notification and auto upgrade can only be ' +
                'configured for Enterprise that subscribes to Bulk Shared Package.'
              }>
              {[0, 1, 2, 3].map(() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      marginVertical: 14,
                      borderWidth: 1,
                      borderColor: colors.gray_0,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: colors.button_color_one,
                        paddingHorizontal: 6,
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          fontSize: title_font_size,
                          color: 'white',
                          marginVertical: 10,
                        }}>
                        Auto Upgrade Individual Shared Package
                      </Text>
                      <CustomCheckBox style={{marginLeft: 16}} value={true} />
                    </View>
                    <View style={{padding: 8}}>
                      <Text
                        style={{
                          paddingBottom: 14,
                          borderBottomWidth: 1,
                          borderColor: colors.gray_0,
                        }}>
                        In the case where a subscription upgrades from package A
                        to higher package B, and you want to downgrade it back
                        to package A on the next month billing, you may use this
                        auto downgrade rule. Please note that it will impact to
                        change all SIMs subscription under selected enterprise.
                      </Text>
                      <Text
                        fontType={'bold'}
                        style={{marginTop: 16, marginBottom: 10}}>
                        Subscription Package
                      </Text>
                      <InputHybrid
                        labelLeft
                        type={'DropDown'}
                        label={'From:'}
                        data={[]}
                        value={{}}
                      />
                      <InputHybrid
                        labelLeft
                        type={'DropDown'}
                        label={'To:'}
                        data={[]}
                        value={{}}
                      />
                    </View>
                  </View>
                );
              })}
            </LocalCardWrapper>
          )}
          <View
            style={[
              subscriptionStyle.buttonContainer,
              {justifyContent: 'space-between'},
            ]}>
            {['Cancel', 'Submit'].map((value) => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor:
                        value === 'Cancel'
                          ? colors.gray_400
                          : colors.button_color_one,
                    },
                    subscriptionStyle.buttonStyle,
                  ]}>
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
      </View>
    </HeaderContainer>
  );
};

export default AutomationCreateEditPage;

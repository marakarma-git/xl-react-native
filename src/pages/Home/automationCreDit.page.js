import React, {useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {subscriptionStyle} from '../../style';
import {useSelector} from 'react-redux';
import lod from 'lodash';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FormStepHeaderComponent} from '../../components/form/formStep';

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
        </ScrollView>
      </View>
    </HeaderContainer>
  );
};

export default AutomationCreateEditPage;

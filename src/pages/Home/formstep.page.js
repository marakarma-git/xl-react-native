import React, {useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import {ScrollView, View} from 'react-native';
import {
  FormStepComponent, 
  HeaderContainer, 
  OverlayBackground, 
} from '../../components';

import {
  CreateBasicInformation, 
  CreateBasicCreatePassword, 
  CreateUserOrganizations, 
  CreateUserRoles,
  CreateSummaryOrganization,
  CreateSummaryRoles
} from "../create";

const FormStepPage = ({navigation}) => {
  const listViewRef = useRef();
  const [formPosition, setFormPosition] = useState(0);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  const detectOffset = () => {
    setScrollViewEnabled(false);
  }

  const formArray = [
    {
      title: 'User Information',
      body: [
        { component: <CreateBasicInformation />, componentTitle: "Basic Information"},
        { component: <CreateBasicCreatePassword />, componentTitle: "Password"},
      ]
    },
    {
      title: 'Organzations',
      body: [
        { component: <CreateUserOrganizations detectOffset={detectOffset} />, componentTitle: "Organizations" },
      ]
    },
    {
      title: 'Roles',
      body: [
        { component: <CreateUserRoles detectOffset={detectOffset} />, componentTitle: "Roles" },
      ]
    },
    {
      title: 'Summary',
      body: [
        { component: <CreateBasicInformation />, componentTitle: "Basic Information" },
        { component: <CreateSummaryOrganization detectOffset={detectOffset} />, componentTitle: "Organizations" },
        { component: <CreateSummaryRoles detectOffset={detectOffset} />, componentTitle: "Roles" },
      ]
    },
  ]

  return (
    <View
      onStartShouldSetResponderCapture={() => setScrollViewEnabled(true)}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Create User'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollViewEnabled}
        ref={listViewRef}>
          <OverlayBackground />
          <View>
            <FormStepComponent
              formPosition={formPosition} 
              formTitle={formArray[formPosition].title}
              formLength={formArray.length}
              formBody={formArray[formPosition].body}
              onBack={() => setFormPosition(prevState => prevState - 1)}
              onNext={() => setFormPosition(prevState => prevState + 1)}
              onSubmit={() => alert("Submit Todo")}
            />
          </View>
      </ScrollView>
    </View>
  );
};

export default FormStepPage;

import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import {ScrollView, View} from 'react-native';
import {
  FormStepComponent, 
  HeaderContainer, 
  OverlayBackground, 
} from '../../components';

import {CreateBasicInformation, CreateBasicCreatePassword, CreateUserOrganizations} from "../create";

const FormStepPage = ({navigation}) => {
  const [formPosition, setFormPosition] = useState(0);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

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
        { component: <CreateUserOrganizations />, componentTitle: "Organizations" },
      ]
    },
    {
      title: 'Roles',
      body: [
        { component: <CreateBasicInformation /> },
      ]
    },
    {
      title: 'Summary',
      body: [
        { component: <CreateBasicInformation /> },
      ]
    },
  ]

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Dev Form Step'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}>
          <OverlayBackground />
          <FormStepComponent 
            formPosition={formPosition} 
            formTitle={formArray[formPosition].title} f
            formLength={formArray.length}
            formBody={formArray[formPosition].body}
            onBack={() => setFormPosition(prevState => prevState - 1)}
            onNext={() => setFormPosition(prevState => prevState + 1)}
            onSubmit={() => alert("Submit Todo")}
            />
      </ScrollView>
    </View>
  );
};

export default FormStepPage;

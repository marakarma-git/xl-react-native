import React, {useState, useRef, useEffect} from 'react';
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
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  const [formPosition, setFormPosition] = useState(0);
  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: ""
  });
  const [basicInformation, setBasicInformation] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  const [isCreatePasswordComplete, setIsPasswordComplete] = useState(false);
  const [isbasicInformationComplete, setIsBasicInformationComplete] = useState(false);

  const detectOffset = () => {
    setScrollViewEnabled(false);
  }

  const formArray = [
    {
      title: 'User Information',
      body: [
        { 
          component: <CreateBasicInformation setIsCommplete={setIsBasicInformationComplete} basicInformation={basicInformation} setBasicInformation={setBasicInformation} isEditable={true} />, 
          componentTitle: "Basic Information"
        },
        { 
          component: <CreateBasicCreatePassword setIsComplete={setIsPasswordComplete} userPassword={userPassword} setUserPassword={setUserPassword} />,
          componentTitle: "Password"
        },
      ]
    },
    {
      title: 'Organzations',
      body: [
        { 
          component: <CreateUserOrganizations selectedOrganization={selectedOrganization} setSelectedOrganization={setSelectedOrganization} detectOffset={detectOffset} />, 
          componentTitle: "Organizations" 
        },
      ]
    },
    {
      title: 'Roles',
      body: [
        { 
          component: <CreateUserRoles setSelectedRoles={setSelectedRoles} enterpriseId={selectedOrganization[0]?.enterpriseId}  detectOffset={detectOffset} />, 
          componentTitle: "Roles" 
        },
      ]
    },
    {
      title: 'Summary',
      body: [
        { component: <CreateBasicInformation basicInformation={basicInformation} setBasicInformation={setBasicInformation} isEditable={false} />, componentTitle: "Basic Information" },
        { component: <CreateSummaryOrganization selectedOrganization={selectedOrganization} detectOffset={detectOffset} />, componentTitle: "Organizations" },
        { component: <CreateSummaryRoles selectedRoles={selectedRoles} detectOffset={detectOffset} />, componentTitle: "Roles" },
      ]
    },
  ]
  
  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      console.log("mounted")
    });
    
    return pageLoad;
  }, [navigation]);


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

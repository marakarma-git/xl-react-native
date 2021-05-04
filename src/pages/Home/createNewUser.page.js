import axios from 'axios';
import {base_url} from '../../constant/connection';

import React, {useState, useRef, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {ScrollView, View} from 'react-native';
import {
  FormStepComponent, 
  HeaderContainer, 
  OverlayBackground, 
} from '../../components';
import {useDispatch} from 'react-redux';

import {
  CreateBasicInformation, 
  CreateBasicCreatePassword, 
  CreateUserOrganizations, 
  CreateUserRoles,
  CreateSummaryOrganization,
  CreateSummaryRoles
} from "../create";
import { ToastAndroid } from 'react-native';
import { enterpriseManagementClearActiveEnterpriseData } from '../../redux/action/enterprise_management_action';
import { setRequestError } from '../../redux/action/dashboard_action';

const passwordForm = {
    password: "",
    confirmPassword: ""
};

const basicInformationArray = {
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    language: ""
};

const CreateNewUserPage = ({navigation}) => {
  const dispatch = useDispatch();
  const listViewRef = useRef();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const { data } = useSelector((state) => state.auth_reducer);
  const accessToken = useSelector((state) => state.auth_reducer.data.access_token);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [formPosition, setFormPosition] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState(-1);
  const [userPassword, setUserPassword] = useState(passwordForm);
  const [basicInformation, setBasicInformation] = useState(basicInformationArray);
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  const [isCreatePasswordComplete, setIsPasswordComplete] = useState(false);
  const [isBasicInformationComplete, setIsBasicInformationComplete] = useState(false);
  const [isUserOrganizationsComplete, setIsUserOrganizationsComplete] = useState(false);
  const [isUserRolesComplete, setIsUserRolesComplete] = useState(false);

  const detectOffset = () => {
    setScrollViewEnabled(false);
  }

  const formArray = [
    {
      title: 'User Information',
      body: [
        { 
          component: 
            <CreateBasicInformation 
              setIsComplete={setIsBasicInformationComplete} 
              basicInformation={basicInformation} 
              setBasicInformation={setBasicInformation} 
              isEditable={true} />, 
          componentTitle: "Basic Information"
        },
        { 
          component: 
            <CreateBasicCreatePassword 
              setIsComplete={setIsPasswordComplete} 
              userPassword={userPassword} 
              setUserPassword={setUserPassword} />,
          componentTitle: "Password"
        },
      ]
    },
    {
      title: 'Organzations',
      body: [
        { 
          component: 
            <CreateUserOrganizations
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio} 
              setIsComplete={setIsUserOrganizationsComplete} 
              selectedOrganization={selectedOrganization} 
              setSelectedOrganization={setSelectedOrganization} 
              detectOffset={detectOffset} />, 
          componentTitle: "Organizations" 
        },
      ]
    },
    {
      title: 'Roles',
      body: [
        { 
          component: 
            <CreateUserRoles 
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles} 
              enterpriseId={selectedOrganization[0]?.enterpriseId}  
              detectOffset={detectOffset}
              setIsComplete={setIsUserRolesComplete} />, 
          componentTitle: "Roles" 
        },
      ]
    },
    {
      title: 'Summary',
      body: [
        { 
          component: 
          <CreateBasicInformation 
            basicInformation={basicInformation} 
            setBasicInformation={setBasicInformation} 
            isEditable={false} />, 
          componentTitle: "Basic Information" 
        },
        { 
          component: 
            <CreateSummaryOrganization 
            selectedOrganization={selectedOrganization} 
            detectOffset={detectOffset} />, 
            componentTitle: "Organizations" 
          },
        { 
          component: 
            <CreateSummaryRoles 
              selectedRoles={selectedRoles} 
              detectOffset={detectOffset} />, 
              componentTitle: "Roles" 
        },
      ]
    },
  ]
  
  const onNextRules = () => {
    let isComplete = false;
    
    if(formPosition === 0){
      if(isCreatePasswordComplete && isBasicInformationComplete){
        isComplete = true;
      }
    }

    if(formPosition === 1){
      if(isUserOrganizationsComplete){
        isComplete = true;
      }
    }

    if(formPosition === 2){
      if(isUserRolesComplete){
        isComplete = true;
      }
    }

    if(isComplete){
      setFormPosition(prevState => prevState + 1);
    }else{
      ToastAndroid.showWithGravityAndOffset(
        "Please complete the field !", 
        ToastAndroid.LONG, 
        ToastAndroid.TOP,
        0,
        300
      );
    }
  }

  const onSubmit = () => {
    const dataRaw = {
      createdBy: "",
      email: "",
      enterpriseId: "",
      enterpriseScope: [],
      firstName: "",
      language: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      roleId: [],
      username: "",
      xlUser: false
    };

    //Enterprise id
    dataRaw.enterpriseId = selectedOrganization[0]?.enterpriseId;

    // Created By
    dataRaw.createdBy = data?.principal?.username;

    // Role Id
    selectedRoles.map(roles => {
      dataRaw.roleId.push(roles.roleId);
    });

    // Enterprise Scope
    // Selected Radio = 0 (XL User), Selected Radio = 1 (Non Xl User)
    if(selectedRadio == 0){
      dataRaw.xlUser = true;
      selectedOrganization.map((organization) => {
        dataRaw.enterpriseScope.push(organization.enterpriseId);
      });
    }

    // Basic Information
    dataRaw.firstName   = basicInformation.firstName;
    dataRaw.lastName    = basicInformation.lastName;
    dataRaw.username    = basicInformation.username;
    dataRaw.phoneNumber = basicInformation.phoneNumber;
    dataRaw.email       = basicInformation.email;
    dataRaw.language    = basicInformation.language;

    submitAction(dataRaw);
  }

  const submitAction = async (dataRaw) => {
    try {
      console.log(dataRaw)
      setSubmitLoading(prevState => prevState = true);
      const { data } = await axios.post(`${base_url}/user/usr/createUser`, dataRaw, {
        headers: {
          Authorization: "Bearer " + accessToken,
          'Content-Type': 'application/json',
        }
      });

      if(data){
        ToastAndroid.showWithGravityAndOffset(
          data.statusDescription, 
          ToastAndroid.LONG, 
          ToastAndroid.TOP,
          0,
          300
        );
        navigation.replace("Home");
        setSubmitLoading(false);
      }

    } catch (error) {
        setSubmitLoading(false);
        dispatch(setRequestError(error.response.data));
        ToastAndroid.show(
        error.response.data.error_description || error.message,
        ToastAndroid.LONG,
      );
    }
  }

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      setFormPosition(0);
      setUserPassword(passwordForm);
      setBasicInformation(basicInformationArray);
      setSelectedRadio(-1);
      setSelectedOrganization([]);
      setSelectedRoles([]);
      setScrollViewEnabled(true);
      setIsUserRolesComplete(false);
      setIsPasswordComplete(false);
      setIsBasicInformationComplete(false);
      setIsUserOrganizationsComplete(false);
      dispatch(enterpriseManagementClearActiveEnterpriseData());
      
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
              onCancel={() => navigation.replace('Home')}
              onBack={() => setFormPosition(prevState => prevState - 1)}
              onNext={onNextRules}
              onSubmit={onSubmit}
              submitLoading={submitLoading}
            />
          </View>
      </ScrollView>
    </View>
  );
};

export default CreateNewUserPage;

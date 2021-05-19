import axios from 'axios';
import {base_url} from '../../constant/connection';

import React, {useState, useRef, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {ScrollView, View, ToastAndroid, ActivityIndicator} from 'react-native';
import {Text} from '../../components';
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
import { enterpriseManagementClearActiveEnterpriseData } from '../../redux/action/enterprise_management_action';
import { setRequestError } from '../../redux/action/dashboard_action';

const passwordFormBody = {
    password: "",
    confirmPassword: ""
};

const basicInformationArray = {
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    email: "",
    language: "english"
};

const passwordFormArray = [
  {
    name: 'password',
    label: 'Password',
    required: true,
    visible: false,
    validation: true,
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    required: true,
    visible: false,
    validation: false,
  },
];

const passwordRulesArray = [
  {label: 'Be between 8 and 30 characters', valid: false},
  {label: 'contain at least 1 number 0-9', valid: false},
  {label: 'contain at least 1 lower case letter (a-z)', valid: false},
  {label: 'contain at least 1 upper case letter (A-Z)', valid: false},
  {
    label: 'not contain more than 3 consecutives identical characters',
    valid: true,
  },
  {
    label: 'not contain more than 3 consecutives lower-case characters',
    valid: true,
  },
  {
    label:
      'contain only the following characters a-z, A-Z, 0-9, #, -, !, @, %, &, /, (, ), ?, + *',
    valid: true,
  },
  {label: "match the entry in 'Confrim Password'", valid: true},
];

const CreateNewUserPage = ({route, navigation}) => {
  const userId = route.params?.userId || "";
  const dispatch = useDispatch();
  const listViewRef = useRef();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const { data } = useSelector((state) => state.auth_reducer);
  const accessToken = useSelector((state) => state.auth_reducer.data.access_token);

  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formPosition, setFormPosition] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState(-1);
  const [userPassword, setUserPassword] = useState(passwordFormBody);
  const [basicInformation, setBasicInformation] = useState(basicInformationArray);
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [dataRoleId, setDataRoleId] = useState([]);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const [passwordForm, setPasswordForm] = useState(passwordFormArray);
  const [passwordRules, setPasswordRules] = useState(passwordRulesArray);
  const [defaultEnterpriseId, setDefaultEnterpriseId] = useState(null);

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
              isUpdate={userId ? true : false}
              setIsComplete={setIsBasicInformationComplete} 
              basicInformation={basicInformation} 
              setBasicInformation={setBasicInformation} 
              isEditable={true} />, 
          componentTitle: "Basic Information"
        },
        { 
          component: 
            <CreateBasicCreatePassword 
              passwordForm={passwordForm}
              passwordRules={passwordRules}
              setPasswordForm={setPasswordForm}
              setPasswordRules={setPasswordRules}
              setIsComplete={setIsPasswordComplete} 
              userPassword={userPassword} 
              setUserPassword={setUserPassword} />,
          componentTitle: "Password",
          isVisible: userId ? false : true
        },
      ]
    },
    {
      title: 'Organizations',
      body: [
        { 
          component: 
            <CreateUserOrganizations
              defaultParentId={setDefaultEnterpriseId}
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio} 
              setIsComplete={setIsUserOrganizationsComplete} 
              selectedOrganization={selectedOrganization} 
              setSelectedOrganization={setSelectedOrganization}
              detectOffset={detectOffset}
              isUpdate={userId ? true : false} />, 
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
              setIsComplete={setIsUserRolesComplete}
              isUpdate={userId ? true : false }
              dataRoleId={dataRoleId} />, 
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
      if(userId){
        if(isBasicInformationComplete){
          isComplete = true;
        }
      }else{
        console.log("Password:",isCreatePasswordComplete, "Basic Information",isBasicInformationComplete, basicInformation)
        if(isCreatePasswordComplete && isBasicInformationComplete){
          isComplete = true;
        }
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
    let url = `${base_url}/user/usr/createUser`;

    const dataRaw = {
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
    if(userId){
      if(selectedRadio == 0){
        dataRaw.enterpriseId = defaultEnterpriseId;
      }else{
        dataRaw.enterpriseId = selectedOrganization[0]?.enterpriseId;
      }
    }else{
        dataRaw.enterpriseId = selectedOrganization[0]?.enterpriseId;
    }

    // Password
    dataRaw.password  = userPassword?.password;

    // Role Id
    selectedRoles.map(roles => {
      dataRaw.roleId.push(roles.roleId);
    });

    // Enterprise Scope
    // Selected Radio = 0 (XL User), Selected Radio = 1 (Non Xl User)
    if(selectedRadio == 0){
      dataRaw.xlUser = true;
    }
    selectedOrganization.map((organization) => {
      dataRaw.enterpriseScope.push(organization.enterpriseId);
    });

    if(userId){
      url = `${base_url}/user/usr/updateUser?userId=${userId}`;
      dataRaw.updatedBy = data?.principal?.username;
    }else{
      // Created By
      dataRaw.createdBy = data?.principal?.username;
    }

    // Basic Information
    dataRaw.firstName   = basicInformation.firstName;
    dataRaw.lastName    = basicInformation.lastName;
    dataRaw.username    = basicInformation.username;
    dataRaw.phoneNumber = basicInformation.phoneNumber;
    dataRaw.email       = basicInformation.email;
    dataRaw.language    = basicInformation.language;

    console.log(dataRaw, url, "default enterpirse id: ", defaultEnterpriseId);
    submitAction(dataRaw, url);
  }

  const submitAction = async (dataRaw, url) => {
    try {
      setSubmitLoading(prevState => prevState = true);
      const { data } = await axios.post(url, dataRaw, {
        headers: {
          Authorization: "Bearer " + accessToken,
          'Content-Type': 'application/json',
        }
      });

      if(data){
        let wording = "";
        if(data.statusCode === 0){
          wording = data.statusDescription;
          navigation.navigate("User Administration");
        }else if(data.statusCode === 1002){
           wording = data.statusDescription + ", please use another username! ";
           setFormPosition(0);
        }
        ToastAndroid.showWithGravityAndOffset(
          wording, 
          ToastAndroid.LONG, 
          ToastAndroid.TOP,
          0,
          300
        );

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

  const getUserDetail = async () => {
    try {
      setLoadingUserDetail(true);
      const { data } = await axios.get(`${base_url}/user/usr/getUserDetail?userId=${userId}`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        }
      });

      if(data){
        const { result } = data;
        console.log(result);
        setBasicInformation(prevState => prevState = {
          firstName: result.firstName,
          lastName: result.lastName,
          username: result.username,
          phoneNumber: result.phoneNumber,
          email: result.email,
          language: result.language
        })
        setSelectedRadio(result.xlUser ? 0 : 1);
        setSelectedOrganization(result.enterpriseScope);
        setDataRoleId(result.roleId);
        setLoadingUserDetail(false);
      }

    } catch (error) {
      dispatch(setRequestError(error.response.data))
      ToastAndroid.show(
        error.response.data.error_description || error.message,
        ToastAndroid.LONG,
      );
    }
  }

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      if(userId){
        getUserDetail();
      }

      setFormPosition(0);
      setUserPassword(passwordFormBody);
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
      setPasswordForm([
          {
            name: 'password',
            label: 'Password',
            required: true,
            visible: false,
            validation: true,
          },
          {
            name: 'confirmPassword',
            label: 'Confirm Password',
            required: true,
            visible: false,
            validation: false,
          },
        ]);
        setPasswordRules([
          {label: 'Be between 8 and 30 characters', valid: false},
          {label: 'contain at least 1 number 0-9', valid: false},
          {label: 'contain at least 1 lower case letter (a-z)', valid: false},
          {label: 'contain at least 1 upper case letter (A-Z)', valid: false},
          {
            label: 'not contain more than 3 consecutives identical characters',
            valid: true,
          },
          {
            label: 'not contain more than 3 consecutives lower-case characters',
            valid: true,
          },
          {
            label:
              'contain only the following characters a-z, A-Z, 0-9, #, -, !, @, %, &, /, (, ), ?, + *',
            valid: true,
          },
          {label: "match the entry in 'Confrim Password'", valid: true},
        ]);
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
              { loadingUserDetail ? 
                <View style={{ justifyContent: 'center', height: 100 }}>
                  <ActivityIndicator color="#002DBB" />
                  <Text style={{
                      textAlign: 'center',
                      fontSize: 14,
                      paddingVertical: 10,
                    }}>Load user data...</Text>
                </View>
              :
              <FormStepComponent
                formPosition={formPosition} 
                formTitle={formArray[formPosition].title}
                formLength={formArray.length}
                formBody={formArray[formPosition].body}
                onCancel={() => navigation.goBack()}
                onBack={() => setFormPosition(prevState => prevState - 1)}
                onNext={onNextRules}
                onSubmit={onSubmit}
                submitLoading={submitLoading}
              />
            } 
          </View>
      </ScrollView>
    </View>
  );
};

export default CreateNewUserPage;

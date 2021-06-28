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
  CreateRolesPermission,
  CreateRolesPropertiesDetail, 
  CreateRolesPropertiesOwnership,
  CreateRolesSummaryProperties,
  CreateRolesSummaryVisibility,
  CreateRolesVisibility
} from "../create";
import { setRequestError } from '../../redux/action/dashboard_action';

const CreateNewUserPage = ({route, navigation}) => {
  const listViewRef = useRef();
  const dispatch = useDispatch();

  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const { access_token } = useSelector((state) => state.auth_reducer.data);


  // State Global
  const [formPosition, setFormPosition] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  // State Per Component
  const [formProperties, setFormProperties] = useState({
    roleName: "",
    roleDescription: "",
    ownerOrganization: ""
  });
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [selectedPermission, setSelectedPerimission] = useState([]);

  //Properties State
  const [selectedVisibility, setSelectedVisibility] = useState(0);

  // State Complete Form
  const [isRolesPropertiesDetailComplete, setIsRolesPropertiesDetailComplete] = useState(false);
  const [isRolesPropertiesOwnershipComplete, setIsRolesPropertiesOwnershipComplete] = useState(false);

  const formArray = [
    {
      title: 'Properties',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: 
            <CreateRolesPropertiesDetail 
              formValue={formProperties}
              setFormValue={setFormProperties}
              setIsComplete={setIsRolesPropertiesDetailComplete}
            />, 
          componentTitle: "Details"
        },
        { 
          component: 
          <CreateRolesPropertiesOwnership
            selectedOwnership={selectedOwnership}
            setSelectedOwnership={setSelectedOwnership}
            setIsComplete={setIsRolesPropertiesOwnershipComplete}
            setScrollView={setScrollViewEnabled}
          />, 
          componentTitle: "Ownership"
        }
      ]
    },
    {
      title: 'Visibility',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: 
            <CreateRolesVisibility 
              selectedOwnership={selectedOwnership}
              selectedVisibility={selectedVisibility}
              setSelectedVisibility={setSelectedVisibility}
              setScrollView={setScrollViewEnabled}
            />, 
          componentTitle: "Visibility"
        }
      ]
    },
    {
      title: 'Permission',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: 
            <CreateRolesPermission
              selectedPermission={selectedPermission}
              setSelectedPermission={setSelectedPerimission}
              setScrollView={setScrollViewEnabled}
            />, 
          componentTitle: "Permission"
        },
      ]
    },
    {
      title: 'Summary',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: 
            <CreateRolesSummaryProperties
              formValue={formProperties}
            />, 
          componentTitle: "Properties"
        },
        { 
          component: 
            <CreateRolesSummaryVisibility
              selectedVisibility={selectedVisibility}
              selectedOwnership={selectedOwnership} 
              setScrollView={setScrollViewEnabled}
            />, 
          componentTitle: "Visibility"
        }
      ]
    }
  ]

  // ACTION FUNCTION

  const onNextRules = () => {
    let isComplete = false;
    if(formPosition === 0){
      console.log("Role Properties Detail Complete :", isRolesPropertiesDetailComplete);
      console.log("Role Properties Ownership Complete :", isRolesPropertiesOwnershipComplete);
      if(isRolesPropertiesDetailComplete && isRolesPropertiesOwnershipComplete){
        isComplete = true;
      }
    }

    if(formPosition === 1){
      isComplete = true;
    }

    if(formPosition === 2){
      isComplete = true;
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
  };

  const onSubmit = () => {
    let url = `${base_url}/user/role/createRole`;

    const dataRaw = {
      priviledgeIds: [],
      roleDescription: "",
      roleName: "",
      roleOwnership: "",
      showToChild: ""
    };

    // Priviledge Id
    selectedPermission.map((permission) => {
      console.log(permission)
      dataRaw.priviledgeIds.push(permission.priviledgeId);
    });

    dataRaw.roleDescription = formProperties.roleDescription;
    dataRaw.roleName        = formProperties.roleName;
    dataRaw.roleOwnership   = selectedOwnership[0].enterpriseId;
    dataRaw.showToChild     = selectedVisibility == 0 ? false : true;

    console.log(dataRaw)

    submitAction(dataRaw, url);
  };

    const submitAction = async (dataRaw, url) => {
    try {
      setSubmitLoading(prevState => prevState = true);
      
      const { data } = await axios.post(url, dataRaw, {
        headers: {
          Authorization: "Bearer " + access_token,
          'Content-Type': 'application/json',
        }
      });

      console.log(data, access_token)

      if(data){
        console.log(data)
        let wording = "";
        if(data.statusCode === 0){
          wording = "Create new role success";
          navigation.navigate("Role Administration");
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
      console.log(error.response.data)
        setSubmitLoading(false);
        dispatch(setRequestError(error.response.data));
        ToastAndroid.show(
        error.response.data.error_description || error.message,
        ToastAndroid.LONG,
      );
    }
  }
  

  // END ACTION FUNCTION

  useEffect(() => {
    if(selectedOwnership.length > 0){
      setFormProperties({
        ...formProperties,
        ownerOrganization: selectedOwnership[0].enterpriseName
      });
    }
  }, [selectedOwnership])

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Create Role'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollViewEnabled}
        onScrollBeginDrag={() => setScrollViewEnabled(true)}>
          <OverlayBackground />
          <View>
              { loadingUserDetail ? 
                <View style={{ justifyContent: 'center', height: 100 }}>
                  <ActivityIndicator color="#002DBB" />
                  <Text style={{
                      textAlign: 'center',
                      fontSize: 14,
                      paddingVertical: 10,
                    }}>Loading...</Text>
                </View>
              :
              <FormStepComponent
                formPosition={formPosition} 
                formTitle={formArray[formPosition].title}
                formDescription={formArray[formPosition].description}
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

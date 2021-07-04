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

const formBody = {
    roleName: "",
    roleDescription: "",
    ownerOrganization: ""
}

import { setRequestError } from '../../redux/action/dashboard_action';
import Helper from '../../helpers/helper';

const CreateNewUserPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {roleId, type} = route.params;

  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const { access_token } = useSelector((state) => state.auth_reducer.data);

  // Data State
  const [roleDetail, setRoleDetail] = useState([]);

  // State Global
  const [formPosition, setFormPosition] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  // State Per Component
  const [formProperties, setFormProperties] = useState(formBody);
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [selectedPermission, setSelectedPerimission] = useState([]);

  //Properties State
  const [selectedVisibility, setSelectedVisibility] = useState(0);

  // State Complete Form
  const [isRolesPropertiesDetailComplete, setIsRolesPropertiesDetailComplete] = useState(false);
  const [isRolesPropertiesOwnershipComplete, setIsRolesPropertiesOwnershipComplete] = useState(false);
  const [isRolesPermissionComplete, setIsRolesPermissionComplete] = useState(false);

  // Update & Copy Additional State
  const [currentEnterprise, setCurrentEnterprise] = useState("");
  const [currentPriviledgeIds, setCurrentPriviledgeIds] = useState([]);

  const formArray = [
    {
      title: 'Properties',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: 
            <CreateRolesPropertiesDetail
              mode={type} 
              formValue={formProperties}
              setFormValue={setFormProperties}
              setIsComplete={setIsRolesPropertiesDetailComplete}
            />, 
          componentTitle: "Details"
        },
        { 
          component: 
          <CreateRolesPropertiesOwnership
            mode={type}
            currentEnterprise={currentEnterprise}
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
              mode={type}
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
              mode={type}
              currentRoleIds={currentPriviledgeIds}
              setIsComplete={setIsRolesPermissionComplete}
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
      if(isRolesPropertiesDetailComplete && isRolesPropertiesOwnershipComplete){
        isComplete = true;
      }
    }

    if(formPosition === 1){
      isComplete = true;
    }

    if(formPosition === 2){
      if(isRolesPermissionComplete){
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
  };

  const onSubmit = () => {
    let url = `${base_url}/user/role/createRole`;

    if(type === 'edit'){
      url = `${base_url}/user/role/updateRole?roleId=${roleId}`; 
    }

    const dataRaw = {
      priviledgeIds: [],
      roleDescription: "",
      roleName: "",
      roleOwnership: "",
      showToChild: ""
    };

    // Priviledge Id
    selectedPermission.map((permission) => {
      dataRaw.priviledgeIds.push(permission.priviledgeId);
    });

    if(type === 'edit'){
      delete dataRaw.roleDescription;
      dataRaw.description = formProperties.roleDescription;
    }else{
      dataRaw.roleDescription = formProperties.roleDescription;
    }

    dataRaw.roleName        = formProperties.roleName;
    dataRaw.roleOwnership   = selectedOwnership[0].enterpriseId;
    dataRaw.showToChild     = selectedVisibility == 0 ? false : true;

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

      if(data){
        let wording = "";
        if(data.statusCode === 0){

          if(type === 'create') wording = 'Create new role success';
          if(type === 'copy') wording = 'Copy role success';
          if(type === 'edit') wording = 'Update role success';

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
        setSubmitLoading(false);
        dispatch(setRequestError(error.response.data));
        ToastAndroid.show(
          error.response.data.error_description || error.message,
          ToastAndroid.LONG,
        );
    }
  }
  
  const getRoleDetail = async () => {
    try {
      setLoadingUserDetail(true);
      const { data } = await axios.get(`${base_url}/user/role/getRoleDetail?roleId=${roleId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if(data){
        const { result } = data;
        console.log(result);
        if(data.statusCode === 0){
          setFormProperties({
            roleName: type === "copy" ? `Copy of ${result.roleName}` : result.roleName,
            roleDescription: result.description,
            ownerOrganization: result.roleId
          });
          setCurrentEnterprise(result.enterpriseId);
          setSelectedVisibility(result.showToChild === false ? 0 : 1);
          setCurrentPriviledgeIds(result.listRolePriviledgeId);
          setLoadingUserDetail(false);
        }
      }

    } catch (error) {
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
      // Reset Global State
      setFormPosition(0);
      setSubmitLoading(false);
      setLoadingUserDetail(false);
      setScrollViewEnabled(true);

      if(type === 'create'){
        // Reset State Component
        setFormProperties(formBody);
        setSelectedOwnership([]);
        setSelectedPerimission([]);
  
        // Reset Properties State
        setSelectedVisibility(0);
  
        // Reset State Validation
        setIsRolesPropertiesDetailComplete(false);
        setIsRolesPropertiesOwnershipComplete(false);
        setIsRolesPermissionComplete(false);
      }else{
        getRoleDetail();
      }
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={`${Helper.makeCapital(type)} Role`}
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

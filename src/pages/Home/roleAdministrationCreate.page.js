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

const CreateNewUserPage = ({route, navigation}) => {
  const listViewRef = useRef();
  const dispatch = useDispatch();

  const {imageBase64} = useSelector((state) => state.enterprise_reducer);

  // State Global
  const [formPosition, setFormPosition] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);

  // State Per Component
  const [formProperties, setFormProperties] = useState({
    roleName: "",
    roleDescription: ""
  });
  const [selectedOwnership, setSelectedOwnership] = useState([]);

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
           detectOffset={detectOffset} 
           selectedOwnership={selectedOwnership}
           setSelectedOwnership={setSelectedOwnership}
           setIsComplete={setIsRolesPropertiesOwnershipComplete}
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
          component: <CreateRolesVisibility />, 
          componentTitle: "Visibility"
        }
      ]
    },
    {
      title: 'Permission',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: <CreateRolesPermission />, 
          componentTitle: "Permission"
        },
      ]
    },
    {
      title: 'Summary',
      description: "lorem ipsum sit dolor amet orem ipsum dolor",
      body: [
        { 
          component: <CreateRolesSummaryProperties />, 
          componentTitle: "Properties"
        },
        { 
          component: <CreateRolesSummaryVisibility />, 
          componentTitle: "Visibility"
        }
      ]
    }
  ]

  // ACTION FUNCTION

  const detectOffset = () => {
    setScrollViewEnabled(false);
  }

  const onNextRules = () => {
    setFormPosition(prevState => prevState += 1);
  };

  const onSubmit = () => {};
  

  // END ACTION FUNCTION

  useEffect(() => {
    const pageLoad = navigation.addListener("focus", () => {
      console.log("tes")
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View
      onStartShouldSetResponderCapture={() => setScrollViewEnabled(true)}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Create Role'}
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

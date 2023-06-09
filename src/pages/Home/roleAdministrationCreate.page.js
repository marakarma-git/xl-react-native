import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ScrollView, View, ToastAndroid, ActivityIndicator} from 'react-native';
import {Text} from '../../components';
import {
  FormStepComponent,
  HeaderContainer,
  OverlayBackground,
} from '../../components';
import {useDispatch} from 'react-redux';
import {useToastHooks} from '../../customHooks/customHooks';

import {
  CreateRolesPermission,
  CreateRolesPropertiesDetail,
  CreateRolesPropertiesOwnership,
  CreateRolesSummaryProperties,
  CreateRolesSummaryVisibility,
  CreateRolesVisibility,
} from '../create';

import Helper from '../../helpers/helper';
import {setRequestError} from '../../redux/action/dashboard_action';
import {roleAdministrationCopyRoleList} from '../../redux/action/role_administration_get_all_role_action';
import {getActiveEnterpriseList} from '../../redux/action/enterprise_management_action';
import {colors} from '../../constant/color';
import httpRequest from '../../constant/axiosInstance';

const formBody = {
  roleName: '',
  roleDescription: '',
  ownerOrganization: '',
};

const RoleAdministrationCreatePage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {roleId} = route.params;
  const showToast = useToastHooks();

  const {activeMenu} = useSelector(
    (state) => state.role_administration_get_all_role_reducer,
  );
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {access_token} = useSelector((state) => state.auth_reducer.data);

  // State Global
  const [formPosition, setFormPosition] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const [callDetailData, setCallDetailData] = useState(false);

  // State Per Component
  const [formProperties, setFormProperties] = useState(formBody);
  const [selectedOwnership, setSelectedOwnership] = useState([]);
  const [selectedPermission, setSelectedPerimission] = useState([]);
  const [rolePropertiesFirstRender, setRolePropertiesFirstRender] = useState(
    false,
  );

  //Properties State
  const [selectedVisibility, setSelectedVisibility] = useState(0);

  // State Complete Form
  const [
    isRolesPropertiesDetailComplete,
    setIsRolesPropertiesDetailComplete,
  ] = useState(false);
  const [
    isRolesPropertiesOwnershipComplete,
    setIsRolesPropertiesOwnershipComplete,
  ] = useState(false);
  const [isRolesPermissionComplete, setIsRolesPermissionComplete] = useState(
    false,
  );

  // Update & Copy Additional State
  const [currentEnterprise, setCurrentEnterprise] = useState('');
  const [currentPriviledgeIds, setCurrentPriviledgeIds] = useState([]);

  const formArray = [
    {
      title: 'Properties',
      description: 'Define role name and ownership',
      body: [
        {
          component: (
            <CreateRolesPropertiesDetail
              mode={activeMenu}
              formValue={formProperties}
              setFormValue={setFormProperties}
              setIsComplete={setIsRolesPropertiesDetailComplete}
            />
          ),
          componentTitle: 'Details',
        },
        {
          component: (
            <CreateRolesPropertiesOwnership
              mode={activeMenu}
              formPosition={formPosition}
              firstRender={rolePropertiesFirstRender}
              setFirstRender={setRolePropertiesFirstRender}
              currentEnterprise={currentEnterprise}
              selectedOwnership={selectedOwnership}
              setCurrentEnterprise={setCurrentEnterprise}
              setSelectedOwnership={setSelectedOwnership}
              setIsComplete={setIsRolesPropertiesOwnershipComplete}
              setScrollView={setScrollViewEnabled}
            />
          ),
          componentTitle: 'Ownership',
        },
      ],
    },
    {
      title: 'Visibility',
      description: 'Select the organizations(s) that can see the role',
      body: [
        {
          component: (
            <CreateRolesVisibility
              mode={activeMenu}
              selectedOwnership={selectedOwnership}
              selectedVisibility={selectedVisibility}
              setSelectedVisibility={setSelectedVisibility}
              setScrollView={setScrollViewEnabled}
            />
          ),
          componentTitle: 'Visibility',
        },
      ],
    },
    {
      title: 'Permission',
      description: 'Select the permissions for the role from the list',
      body: [
        {
          component: (
            <CreateRolesPermission
              mode={activeMenu}
              currentRoleIds={currentPriviledgeIds}
              setIsComplete={setIsRolesPermissionComplete}
              selectedPermission={selectedPermission}
              setSelectedPermission={setSelectedPerimission}
              setScrollView={setScrollViewEnabled}
            />
          ),
          componentTitle: 'Permission',
        },
      ],
    },
    {
      title: 'Summary',
      description: 'Review the details of the new user role',
      body: [
        {
          component: (
            <CreateRolesSummaryProperties formValue={formProperties} />
          ),
          componentTitle: 'Properties',
        },
        {
          component: (
            <CreateRolesSummaryVisibility
              selectedVisibility={selectedVisibility}
              selectedOwnership={selectedOwnership}
              setScrollView={setScrollViewEnabled}
            />
          ),
          componentTitle: 'Visibility',
        },
      ],
    },
  ];

  // ACTION FUNCTION

  const onNextRules = () => {
    let isComplete = false;
    if (formPosition === 0) {
      if (
        isRolesPropertiesDetailComplete &&
        isRolesPropertiesOwnershipComplete
      ) {
        isComplete = true;
      }
    }

    if (formPosition === 1) {
      isComplete = true;
    }

    if (formPosition === 2) {
      if (isRolesPermissionComplete) {
        isComplete = true;
      }
    }

    if (isComplete) {
      setFormPosition((prevState) => prevState + 1);
    } else {
      showToast({
        title: 'Validation',
        type: 'warning',
        message: 'Please complete the field!',
        duration: 2500,
        showToast: true,
        position: 'top',
      });
    }
  };

  const onSubmit = () => {
    let url = '/user/role/createRole';
    let activityId = 'AP-6';

    if (activeMenu === 'edit') {
      url = `/user/role/updateRole?roleId=${roleId}`;
      activityId = 'AP-5';
    }

    if (activeMenu === 'copy') {
      activityId = 'AP-14';
    }

    const dataRaw = {
      priviledgeIds: [],
      roleDescription: '',
      roleName: '',
      roleOwnership: '',
      showToChild: '',
    };

    // Priviledge Id
    selectedPermission.map((permission) => {
      dataRaw.priviledgeIds.push(permission.priviledgeId);
    });

    if (activeMenu === 'edit') {
      delete dataRaw.roleDescription;
      dataRaw.description = formProperties.roleDescription;
    } else {
      dataRaw.roleDescription = formProperties.roleDescription;
    }

    dataRaw.roleName = formProperties.roleName;
    dataRaw.roleOwnership = selectedOwnership[0].enterpriseId;
    dataRaw.showToChild = selectedVisibility == 0 ? false : true;

    submitAction(dataRaw, url, activityId);
  };

  const submitAction = async (dataRaw, url, activityId) => {
    const customHeaders = {
      headers: {
        activityId,
        descSuffix: dataRaw.roleName,
      },
    };
    try {
      setSubmitLoading((prevState) => (prevState = true));

      const {data} = await httpRequest.post(url, dataRaw, customHeaders);

      if (data) {
        let wording = '';
        if (data.statusCode === 0) {
          if (activeMenu === 'create') {
            wording = 'Create new role success';
          }
          if (activeMenu === 'copy') {
            wording = 'Copy role success';
          }
          if (activeMenu === 'edit') {
            wording = 'Update role success';
          }

          if (activeMenu !== 'create') {
            dispatch(roleAdministrationCopyRoleList());
          }

          navigation.navigate('Role Administration');
        }

        showToast({
          title: `${Helper.makeCapital(activeMenu)} Role`,
          type: 'success',
          message: wording,
          duration: 4500,
          showToast: true,
        });

        setSubmitLoading(false);
      }
    } catch (error) {
      setSubmitLoading(false);
      dispatch(setRequestError(error.response.data));
      showToast({
        title: 'Error',
        type: 'error',
        message: JSON.stringify(error.response.data),
        duration: 4500,
        showToast: true,
        position: 'top',
      });
    }
  };

  const getRoleDetail = async () => {
    try {
      setLoadingUserDetail(true);
      const {data} = await httpRequest.get(
        `/user/role/getRoleDetail?roleId=${roleId}`,
      );

      if (data) {
        const {result} = data;
        if (data.statusCode === 0) {
          setFormProperties({
            roleName:
              activeMenu === 'copy'
                ? `Copy of ${result.roleName}`
                : result.roleName,
            roleDescription: result.description,
            ownerOrganization: result.roleId,
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
  };

  // END ACTION FUNCTION

  useEffect(() => {
    if (selectedOwnership.length > 0) {
      setFormProperties({
        ...formProperties,
        ownerOrganization: selectedOwnership[0].enterpriseName,
      });
    }
  }, [selectedOwnership]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      // Reset Global State
      setFormPosition(0);
      setSubmitLoading(false);
      setLoadingUserDetail(false);
      setScrollViewEnabled(true);
      setCallDetailData(true);

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

      // Reset
      setCurrentEnterprise('');
    });

    return pageLoad;
  }, [navigation]);

  useEffect(() => {
    if (callDetailData) {
      if (activeMenu !== 'create') {
        getRoleDetail();
        dispatch(getActiveEnterpriseList());
        setCallDetailData(false);
      }
    }
  }, [activeMenu, callDetailData]);

  return (
    <View>
      <HeaderContainer
        navigation={navigation}
        headerTitle={`${Helper.makeCapital(activeMenu)} Role`}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollViewEnabled}
        onScrollBeginDrag={() => setScrollViewEnabled(true)}>
        <OverlayBackground />
        <View>
          {loadingUserDetail ? (
            <View style={{justifyContent: 'center', height: 100}}>
              <ActivityIndicator color={colors.main_color} />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  paddingVertical: 10,
                }}>
                Loading...
              </Text>
            </View>
          ) : (
            <FormStepComponent
              formPosition={formPosition}
              formTitle={formArray[formPosition].title}
              formDescription={formArray[formPosition].description}
              formLength={formArray.length}
              formBody={formArray[formPosition].body}
              onCancel={() => navigation.goBack()}
              onBack={() => setFormPosition((prevState) => prevState - 1)}
              onNext={onNextRules}
              onSubmit={onSubmit}
              submitLoading={submitLoading}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RoleAdministrationCreatePage;

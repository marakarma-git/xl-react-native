import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
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
  CreateSummaryRoles,
} from '../create';
import {enterpriseManagementClearActiveEnterpriseData} from '../../redux/action/enterprise_management_action';
import {setRequestError} from '../../redux/action/dashboard_action';
import {userAdministrationCreateUser} from '../../redux/action/user_administration_get_user_action';
import {useToastHooks} from '../../customHooks/customHooks';
import {ADMINISTRATION_PRIVILEDGE_ID} from '../../constant/actionPriv';
import {colors} from '../../constant/color';
import httpRequest from '../../constant/axiosInstance';

const passwordFormBody = {
  password: '',
  confirmPassword: '',
};

const basicInformationObject = {
  firstName: '',
  lastName: '',
  username: '',
  phoneNumber: '',
  email: '',
  language: 'english',
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
  {label: 'Contain at least 1 number 0-9', valid: false},
  {label: 'Contain at least 1 lower case letter (a-z)', valid: false},
  {label: 'Contain at least 1 upper case letter (A-Z)', valid: false},
  {
    label:
      'Contain at least 1 special character (#, -, !, @, %, &, /, (, ), ?, +, *)',
    valid: false,
  },
  {
    label: 'Not contain more than 3 consecutives identical characters',
    valid: true,
  },
  {
    label: 'Not contain more than 3 consecutives lower-case characters',
    valid: true,
  },
  {label: "Match the entry in 'Confirm Password'", valid: true},
];

const CreateNewUserPage = ({route, navigation}) => {
  const userId = route.params?.userId || '';
  const enterDate = route.params?.enterDate || '';
  const dispatch = useDispatch();
  const showToast = useToastHooks();
  const listViewRef = useRef();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {data} = useSelector((state) => state.auth_reducer);
  const accessToken = useSelector(
    (state) => state.auth_reducer.data.access_token,
  );

  const [loadingUserDetail, setLoadingUserDetail] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formPosition, setFormPosition] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState(-1);
  const [userPassword, setUserPassword] = useState(passwordFormBody);
  const [basicInformation, setBasicInformation] = useState(
    basicInformationObject,
  );
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [dataRoleId, setDataRoleId] = useState([]);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const [passwordForm, setPasswordForm] = useState(passwordFormArray);
  const [passwordRules, setPasswordRules] = useState(passwordRulesArray);
  const [defaultEnterpriseId, setDefaultEnterpriseId] = useState(null);

  const [isCreatePasswordComplete, setIsPasswordComplete] = useState(false);
  const [isBasicInformationComplete, setIsBasicInformationComplete] = useState(
    false,
  );
  const [
    isUserOrganizationsComplete,
    setIsUserOrganizationsComplete,
  ] = useState(false);
  const [isUserRolesComplete, setIsUserRolesComplete] = useState(false);

  const detectOffset = () => {
    setScrollViewEnabled(false);
  };

  const formArray = [
    {
      title: 'User Information',
      description: 'Input Basic Information & Password',
      body: [
        {
          component: (
            <CreateBasicInformation
              formPosition={formPosition}
              isUpdate={userId}
              setIsComplete={setIsBasicInformationComplete}
              basicInformation={basicInformation}
              setBasicInformation={setBasicInformation}
              isEditable={true}
            />
          ),
          componentTitle: 'Basic Information',
        },
        {
          component: (
            <CreateBasicCreatePassword
              passwordForm={passwordForm}
              passwordRules={passwordRules}
              setPasswordForm={setPasswordForm}
              setPasswordRules={setPasswordRules}
              setIsComplete={setIsPasswordComplete}
              userPassword={userPassword}
              setUserPassword={setUserPassword}
            />
          ),
          componentTitle: 'Password',
          isVisible: userId ? false : true,
        },
      ],
    },
    {
      title: 'Organizations',
      description: 'Select the target Organizations',
      body: [
        {
          component: (
            <CreateUserOrganizations
              defaultParentId={setDefaultEnterpriseId}
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio}
              setIsComplete={setIsUserOrganizationsComplete}
              selectedOrganization={selectedOrganization}
              setSelectedOrganization={setSelectedOrganization}
              detectOffset={detectOffset}
              isUpdate={userId ? true : false}
            />
          ),
          componentTitle: 'Organizations',
        },
      ],
    },
    {
      title: 'Roles',
      description: 'Select the User Roles',
      body: [
        {
          component: (
            <CreateUserRoles
              formPosition={formPosition}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
              enterpriseId={selectedOrganization[0]?.enterpriseId}
              detectOffset={detectOffset}
              setIsComplete={setIsUserRolesComplete}
              isUpdate={userId ? true : false}
              dataRoleId={dataRoleId}
            />
          ),
          componentTitle: 'Roles',
        },
      ],
    },
    {
      title: 'Summary',
      description: 'Review the Summary and Submit',
      body: [
        {
          component: (
            <CreateBasicInformation
              basicInformation={basicInformation}
              setBasicInformation={setBasicInformation}
              isEditable={false}
            />
          ),
          componentTitle: 'Basic Information',
        },
        {
          component: (
            <CreateSummaryOrganization
              selectedOrganization={selectedOrganization}
              detectOffset={detectOffset}
            />
          ),
          componentTitle: 'Organizations',
        },
        {
          component: (
            <CreateSummaryRoles
              selectedRoles={selectedRoles}
              detectOffset={detectOffset}
            />
          ),
          componentTitle: 'Roles',
        },
      ],
    },
  ];

  const onNextRules = () => {
    let isComplete = false;
    if (formPosition === 0) {
      if (userId) {
        isComplete = true;
      } else {
        if (isCreatePasswordComplete && isBasicInformationComplete) {
          isComplete = true;
        }
      }
    }

    if (formPosition === 1) {
      if (isUserOrganizationsComplete) {
        isComplete = true;
      }
    }

    if (formPosition === 2) {
      if (isUserRolesComplete) {
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
    let url = `/user/usr/createUser`;

    const dataRaw = {
      email: '',
      enterpriseId: '',
      enterpriseScope: [],
      firstName: '',
      language: '',
      lastName: '',
      password: '',
      phoneNumber: '',
      roleId: [],
      username: '',
      xlUser: false,
    };

    //Enterprise id
    if (selectedRadio == 0) {
      dataRaw.enterpriseId = defaultEnterpriseId;
    } else {
      dataRaw.enterpriseId = selectedOrganization[0]?.enterpriseId;
    }

    // Password
    dataRaw.password = userPassword?.password;

    // Role Id
    selectedRoles.map((roles) => {
      dataRaw.roleId.push(roles.roleId);
    });

    // Enterprise Scope
    // Selected Radio = 0 (XL User), Selected Radio = 1 (Non Xl User)
    if (selectedRadio == 0) {
      dataRaw.xlUser = true;
    }
    if (selectedRadio == 0) {
      selectedOrganization.map((organization) => {
        dataRaw.enterpriseScope.push(organization.enterpriseId);
      });
    }

    if (userId) {
      url = `/user/usr/updateUser?userId=${userId}`;
      dataRaw.updatedBy = data?.principal?.username;
    } else {
      // Created By
      dataRaw.createdBy = data?.principal?.username;
    }

    // Basic Information
    dataRaw.firstName = basicInformation.firstName;
    dataRaw.lastName = basicInformation.lastName;
    dataRaw.username = basicInformation.username;
    dataRaw.phoneNumber = basicInformation.phoneNumber;
    dataRaw.email = basicInformation.email;
    dataRaw.language = basicInformation.language;

    submitAction(dataRaw, url);
  };

  const submitAction = async (dataRaw, url) => {
    try {
      const customHeaders = {
        headers: {
          activityId: userId ? 'AP-5' : 'AP-3',
          descSuffix: dataRaw.username,
        },
      };
      setSubmitLoading((prevState) => (prevState = true));
      const {data} = await httpRequest.post(url, dataRaw, customHeaders);

      if (data) {
        let wording = '';
        let actionType = 'Edit';
        if (data.statusCode === 0) {
          if (!userId) {
            wording = 'Create new user success';
            actionType = 'Create';
            dispatch(userAdministrationCreateUser());
          } else {
            wording = 'Update user success';
          }
          navigation.navigate('User Administration');
        } else if (data.statusCode === 1002) {
          wording = data.statusDescription + ', please use another username! ';
          setFormPosition(0);
        }

        showToast({
          title: !userId ? 'Create User' : 'Edit User',
          type: 'success',
          message: wording,
          duration: 4500,
          showToast: true,
          position: 'top',
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

  const getUserDetail = async () => {
    try {
      setLoadingUserDetail(true);
      const {data} = await httpRequest.get(
        `/user/usr/getUserDetail?userId=${userId}`,
      );

      if (data) {
        const {result} = data;
        setBasicInformation(
          (prevState) =>
            (prevState = {
              firstName: result.firstName,
              lastName: result.lastName,
              username: result.username,
              phoneNumber: result.phoneNumber,
              email: result.email,
              language: result.language,
            }),
        );
        setSelectedRadio(result.xlUser ? 0 : 1);
        setSelectedOrganization(
          result.xlUser ? result.enterpriseScope : [result.enterpriseId],
        );
        setDataRoleId(result.roleId);
        setLoadingUserDetail(false);
        setIsBasicInformationComplete(true);
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
      ToastAndroid.show(
        error.response.data.error_description || error.message,
        ToastAndroid.LONG,
      );
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetail();
    } else {
      setLoadingUserDetail(true);
      setTimeout(() => {
        setLoadingUserDetail(false);
      }, 1000);
    }
  }, [userId, enterDate]);

  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      setFormPosition(0);
      setUserPassword(passwordFormBody);
      setBasicInformation(basicInformationObject);
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
        {label: 'Contain at least 1 number 0-9', valid: false},
        {label: 'Contain at least 1 lower case letter (a-z)', valid: false},
        {label: 'Contain at least 1 upper case letter (A-Z)', valid: false},
        {
          label:
            'Contain at least 1 special character (#, -, !, @, %, &, /, (, ), ?, +, *)',
          valid: false,
        },
        {
          label: 'Not contain more than 3 consecutives identical characters',
          valid: true,
        },
        {
          label: 'Not contain more than 3 consecutives lower-case characters',
          valid: true,
        },
        {label: "Match the entry in 'Confirm Password'", valid: true},
      ]);
    });

    return pageLoad;
  }, [navigation]);

  return (
    <View onStartShouldSetResponderCapture={() => setScrollViewEnabled(true)}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={userId ? 'Edit User' : 'Create User'}
        companyLogo={imageBase64}
      />
      <ScrollView
        style={{marginBottom: 130}}
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollViewEnabled}
        ref={listViewRef}>
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

export default CreateNewUserPage;

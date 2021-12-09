import React, {useEffect, useState} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {
  HeaderContainer,
  FormStepComponent,
  OverlayBackground,
  Text,
} from '../../components';
import {enterpriseStyle} from '../../style';
import {useDispatch, useSelector} from 'react-redux';
import {
  CreateEnterpriseBasicInformation,
  CreateEnterpriseCustomLabel,
  CreateEnterpriseParentOrganization,
  CreateEnterprisePersonalization,
} from '../create';
import Helper from '../../helpers/helper';
import {useToastHooks} from '../../customHooks/customHooks';
import {
  getBusinessCategory,
  getBusinessFieldType,
} from '../../redux/action/enterprise_management_action';
import {colors} from '../../constant/color';

const basicInformationObj = {
  enterpriseName: '',
  customerNumber: '',
  bpHo: '',
  bpPayer: '',
  organizationalUnit: '',
  agreementNumber: '',
  businessCategory: '',
  bpVat: '',
  laNumber: '',
};
const personalizationObj = {
  companyLogo: null,
  topBarColour: '#FFFFFF',
};

const EnterpriseManagementOnBoardPage = ({route, navigation}) => {
  const showToast = useToastHooks();
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {business_category, business_category_field_type} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  // Form State
  const [formPosition, setFormPosition] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const [basicInformation, setBasicFormation] = useState({
    ...basicInformationObj,
  });
  const [personalization, setPersonalization] = useState({
    ...personalizationObj,
  });
  const [selectedParentOrganization, setSelectedParentOrganization] = useState(
    [],
  );
  // Validation State
  const [formValidation, setFormValidation] = useState({});
  //Form Function
  const stepValidation = () => {
    let validateError = {};
    let validateErrorCnt = 0;
    Object.keys(basicInformation).map((key) => {
      let title = Helper.makeCamelCaseToTitle(key);
      let errorValidation = Helper.requiredValidation(
        title,
        basicInformation[key],
      );
      if (errorValidation) {
        validateError[key] = errorValidation;
        validateErrorCnt++;
      }
    });
    return {
      formError: validateError,
      errorCnt: validateErrorCnt,
    };
  };
  const onNextRules = () => {
    let isComplete = false;
    if (formPosition === 0) {
      const validation = stepValidation();
      if (validation.errorCnt > 0) setFormValidation(validation.formError);
      else isComplete = true;
    }
    if (formPosition === 1) isComplete = selectedParentOrganization.length > 0;

    if (isComplete) setFormPosition((prevState) => prevState + 1);
    else
      showToast({
        title: 'Validation',
        type: 'warning',
        message: 'Please complete the field!',
        duration: 2500,
        showToast: true,
        position: 'top',
      });
  };
  const onSubmit = () => {};
  const inputHandler = (name, value) => {
    setBasicFormation({
      ...basicInformation,
      [name]: value,
    });
  };
  const inputHandlerPersonalization = (name, value) => {
    setPersonalization({
      ...personalization,
      [name]: value,
    });
  };
  const setValidationError = (name, error) => {
    setFormValidation({
      ...formValidation,
      [name]: error,
    });
  };
  // Form Array
  const formArray = [
    {
      title: 'Enterprise Information',
      description: 'lorem ipsum sit dolor amet orem ipsum dolor',
      body: [
        {
          componentTitle: 'Basic Information',
          component: (
            <CreateEnterpriseBasicInformation
              editable={true}
              formError={formValidation}
              setFormError={setValidationError}
              inputHandler={inputHandler}
              value={basicInformation}
              dropDownData={business_category}
            />
          ),
        },
        {
          componentTitle: 'Enterprise Personalization',
          componentDescription:
            'Personalize the user interface using the company logo of the new onboarded enterprise and choose the top bar colour preference',
          component: (
            <CreateEnterprisePersonalization
              editable={true}
              inputHandler={inputHandlerPersonalization}
              value={personalization}
            />
          ),
        },
      ],
    },
    {
      title: 'Parent Organization',
      description: 'lorem ipsum sit dolor amet orem ipsum dolor',
      body: [
        {
          componentTitle: 'Parent Organization',
          componentDescription:
            'Define parent of the organization, select XL Axiata or one of the existing enterprise as the parent organization',
          component: (
            <CreateEnterpriseParentOrganization
              formPosition={formPosition}
              selectedParentOrganization={selectedParentOrganization}
              setSelectedParentOrganization={setSelectedParentOrganization}
            />
          ),
        },
      ],
    },
    {
      title: 'Custom Label',
      description: 'lorem ipsum sit dolor amet orem ipsum dolor',
      body: [
        {
          componentTitle: 'Custom Label',
          componentDescription: `Add more information which more familiar with your business by enabling up to 10 labels, and select the field type (combo box or text).
          \n Enter a custom field label and any custom values if the field type is combo box.`,
          component: (
            <CreateEnterpriseCustomLabel
              formPosition={formPosition}
              businessCategory={basicInformation.businessCategory}
            />
          ),
        },
      ],
    },
  ];
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(getBusinessCategory());
      dispatch(getBusinessFieldType());
    });
    return pageLoad;
  }, [navigation]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      // Reset State
      setFormPosition(0);
      setBasicFormation({...basicInformationObj});
      setPersonalization({...personalizationObj});
      setSelectedParentOrganization([]);
      setFormValidation({});
    });
    return pageBlur;
  }, [navigation]);
  return (
    <View style={enterpriseStyle.container}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Onboard Enterprise'}
        companyLogo={imageBase64}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={scrollViewEnabled}
        onScrollBeginDrag={() => setScrollViewEnabled(true)}>
        <OverlayBackground />
        <View>
          {!business_category && !business_category_field_type ? (
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

export default EnterpriseManagementOnBoardPage;

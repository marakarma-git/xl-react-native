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
  resetCustomLabel,
} from '../../redux/action/enterprise_management_action';
import {colors} from '../../constant/color';
import {setRequestError} from '../../redux/action/dashboard_action';
import httpRequest from '../../constant/axiosInstance';
import {enterpriseManagementSetSearchText} from '../../redux/action/enterprise_management_array_header_action';

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
  fileName: '',
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
  const [customLabel, setCustomLabel] = useState([]);
  const [changesLabelRow, setChangesLabelRow] = useState([]);
  // Validation State
  const [formValidation, setFormValidation] = useState({});
  const [customLabelValidation, setCustomLabelValidation] = useState([]);
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
    dispatch(enterpriseManagementSetSearchText({searchText: ''}));
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
  const onSubmit = async () => {
    const dataObj = {
      agreementNumber: '',
      bpHo: '',
      bpPayer: '',
      businessCat: '',
      colorCode: '',
      customLabels: [],
      customerNumber: '',
      enterpriseName: '',
      enterpriseParentId: '',
      fileName: '',
      bpVat: '',
      laNumber: '',
      organizationalUnit: '',
      imageLogo: '',
    };

    // check custom value validation
    let errorValidationCnt = 0;
    customLabelValidation.map((label) => {
      errorValidationCnt++;
      showToast({
        title: 'Error',
        type: 'error',
        message: label.errorMsg,
        duration: 3000,
        showToast: true,
        position: 'top',
      });
      return;
    });

    dataObj.agreementNumber = basicInformation?.agreementNumber;
    dataObj.bpHo = basicInformation?.bpHo;
    dataObj.bpPayer = basicInformation?.bpPayer;
    dataObj.bpVat = basicInformation?.bpVat;
    dataObj.businessCat = basicInformation?.businessCategory;
    dataObj.colorCode = personalization?.topBarColour;
    dataObj.customerNumber = basicInformation?.customerNumber;
    dataObj.enterpriseName = basicInformation?.enterpriseName;
    dataObj.enterpriseParentId =
      selectedParentOrganization[0]?.enterpriseParentId;
    dataObj.fileName = personalization?.fileName;
    dataObj.laNumber = basicInformation?.laNumber;
    dataObj.organizationalUnit = basicInformation?.organizationalUnit;
    dataObj.imageLogo = personalization?.companyLogo;

    customLabel.map((data) => {
      dataObj.customLabels.push({
        activeStatus: data.activeStatus,
        customLabel: data.customLabel,
        customLabelId: '',
        customValue: data.customValue,
        fieldType: data.fieldType,
        labelNumber: data.labelNumber,
      });
      if (data.fieldType === 'Combo Box' && !data.customValue) {
        errorValidationCnt++;
        showToast({
          title: 'Error',
          type: 'error',
          message: 'Custom Value Required',
          duration: 3000,
          showToast: true,
          position: 'top',
        });
        return;
      }
    });
    if (errorValidationCnt > 0) return;
    try {
      const customHeader = {
        headers: {
          activityId: 'AP-17',
          descSuffix: `Enterprise Name: ${dataObj.enterpriseName}`,
        },
      };
      const {data} = await httpRequest.post(
        '/user/corp/createEnterprise',
        dataObj,
        customHeader,
      );
      if (data) {
        const {statusCode, statusDescription} = data;
        if (statusCode === 0) {
          showToast({
            title: 'Create Onboard Enterprise',
            type: 'success',
            message: 'Onboard new enterprise success',
            duration: 3500,
            showToast: true,
            position: 'top',
          });
          navigation.goBack();
        } else {
          showToast({
            title: 'Create Onboard Enterprise',
            type: 'error',
            message: statusDescription,
            duration: 3500,
            showToast: true,
            position: 'top',
          });
          setFormPosition(0);
        }
      }
    } catch (error) {
      dispatch(setRequestError(error.response.data));
      showToast({
        title: 'Create Onboard Enterprise',
        type: 'error',
        message: error.response.data,
        duration: 3500,
        showToast: true,
        position: 'top',
      });
    }
  };
  const inputHandler = (name, value) => {
    setBasicFormation({
      ...basicInformation,
      [name]: value,
    });
  };
  const inputHandlerPersonalization = (name, value, type = 'string') => {
    if (type === 'string') {
      setPersonalization({
        ...personalization,
        [name]: value,
      });
    } else {
      const personalizationData = {...personalization};
      name.map((key, index) => {
        personalizationData[key] = value[index];
      });
      setPersonalization(personalizationData);
    }
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
              setCustomLabel={setCustomLabel}
              changesLabelRow={changesLabelRow}
              setChangesLabelRow={setChangesLabelRow}
              isDisabled={false}
              setFormValidation={setCustomLabelValidation}
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
      setChangesLabelRow([]);
      setCustomLabel([]);
      dispatch(resetCustomLabel());
    });
    return pageBlur;
  }, [navigation]);
  useEffect(() => {
    setChangesLabelRow([]);
  }, [basicInformation.businessCategory]);
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

import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonLabelComponent,
  ContentCard,
  HeaderContainer,
  ModalConfirmation,
  OverlayBackground,
  Text,
} from '../../components';
import httpRequest from '../../constant/axiosInstance';
import {colors} from '../../constant/color';
import {useToastHooks} from '../../customHooks/customHooks';
import Helper from '../../helpers/helper';
import {setRequestError} from '../../redux/action/dashboard_action';
import {
  enterpriseManagementSetDetailParams,
  getBusinessCategory,
  getBusinessFieldType,
  getEnterpriseDetail,
  resetEnterpriseDetail,
  getCustomLabel,
  resetCustomLabel,
} from '../../redux/action/enterprise_management_action';
import {enterpriseStyle} from '../../style';
import {
  CreateEnterpriseBasicInformation,
  CreateEnterpriseCustomLabel,
  CreateEnterprisePersonalization,
} from '../create';

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
const nonRequiredFields = ['organizationalUnit', 'laNumber'];

const EnterpriseManagementEditView = ({route, navigation}) => {
  const showToast = useToastHooks();
  const dispatch = useDispatch();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {business_category, enterprise_detail} = useSelector(
    (state) => state.enterprise_management_get_enterprise_reducer,
  );
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const [
    isEditBasicInformationActive,
    setIsEditBasicInformationActive,
  ] = useState(false);
  const [
    isEditPersonalizationActive,
    setIsEditPersonalizationActive,
  ] = useState(false);
  const [isEditCustomLabelActive, setIsEditCustomLabelActive] = useState(false);
  const [basicInformation, setBasicInformation] = useState(null);
  const [personalization, setPersonalization] = useState(null);
  const [customLabel, setCustomLabel] = useState([]);
  const [changesLabelRow, setChangesLabelRow] = useState([]);
  const [formValidation, setFormValidation] = useState({});
  const [localEnterpriseId, setLocalEnterpriseId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [customLabelValidation, setCustomLabelValidation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  //Function
  const basicInformationInputHandler = (name, value) => {
    setBasicInformation({
      ...basicInformation,
      [name]: value,
    });
  };
  const enterprisePersonalizationInputHandler = (
    name,
    value,
    type = 'string',
  ) => {
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
  const fillValue = (form = 'basicInformation', data) => {
    const {
      enterpriseName,
      customerNumber,
      bpHo,
      bpPayer,
      organizationalUnit,
      agreementNumber,
      businessCat,
      bpVat,
      laNumber,
      imageLogo,
      colorCode,
      fileName,
    } = data;
    if (form === 'basicInformation') {
      setBasicInformation({
        enterpriseName: enterpriseName,
        customerNumber: customerNumber,
        bpHo: bpHo,
        bpPayer: bpPayer,
        organizationalUnit: organizationalUnit,
        agreementNumber: agreementNumber,
        businessCategory: businessCat,
        bpVat: bpVat,
        laNumber: laNumber,
      });
    } else {
      setPersonalization({
        companyLogo: imageLogo,
        fileName: fileName,
        topBarColour: colorCode,
      });
    }
  };
  const onSubmit = async (message, actionNumber) => {
    const dataObj = {
      agreementNumber: '',
      bpHo: '',
      bpPayer: '',
      bpVat: '',
      colorCode: '',
      customLabels: [],
      enterpriseId: '',
      enterpriseName: '',
      fileName: '',
      imageLogo: '',
      laNumber: '',
      organizationalUnit: '',
    };

    // Validation before submit
    let validateError = {};
    let validateErrorCnt = 0;
    Object.keys(basicInformation).map((key) => {
      if (nonRequiredFields?.includes(key)) return;
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
    if (validateErrorCnt > 0) {
      setFormValidation(validateError);
      setIsLoading(false);
      showToast({
        title: 'Validation',
        type: 'warning',
        message: 'Please complete the field!',
        duration: 2500,
        showToast: true,
        position: 'top',
      });
      return;
    }
    // Custom Label Validation
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
    dataObj.colorCode = personalization?.topBarColour;
    dataObj.enterpriseId = localEnterpriseId || '';
    dataObj.enterpriseName = basicInformation?.enterpriseName;
    dataObj.fileName = personalization?.fileName;
    dataObj.laNumber = basicInformation?.laNumber;
    dataObj.organizationalUnit = basicInformation?.organizationalUnit;
    dataObj.imageLogo = personalization?.companyLogo;

    customLabel.map((data) => {
      dataObj.customLabels.push({
        activeStatus: data?.activeStatus,
        createdBy: data?.createdBy,
        createdTime: data?.createdTime,
        customLabel: data?.customLabel,
        customLabelId: data?.customLabelId,
        customValue: data?.customValue,
        enterpriseId: data?.enterpriseId,
        fieldType: data?.fieldType,
        labelNumber: data?.labelNumber,
        updatedBy: data?.updatedBy,
        updatedTime: data?.updatedTime,
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

    if (validateErrorCnt <= 0) {
      try {
        setIsLoading(true);
        const customHeader = {
          headers: {
            activityId: 'AP-15',
            descSuffix: `Enterprise Name: ${dataObj.enterpriseName}`,
          },
        };
        const {data} = await httpRequest.post(
          '/user/corp/updateEnterprise',
          dataObj,
          customHeader,
        );
        if (data) {
          setIsLoading(false);
          const {statusCode, statusDescription} = data;
          setShowModal(false);
          if (statusCode === 0) {
            showToast({
              title: 'Edit Onboard Enterprise',
              type: 'success',
              message: message,
              duration: 3500,
              showToast: true,
              position: 'top',
            });
            formCancelAction(actionNumber, 'submit');
            setFormValidation({});
            setCustomLabelValidation([]);
          } else {
            showToast({
              title: 'Edit Onboard Enterprise',
              type: 'error',
              message: statusDescription,
              duration: 3500,
              showToast: true,
              position: 'top',
            });
          }
        }
      } catch (error) {
        dispatch(setRequestError(error.response.data));
        showToast({
          title: 'Edit Onboard Enterprise',
          type: 'error',
          message: error.response.data,
          duration: 3500,
          showToast: true,
          position: 'top',
        });
      }
    }
  };
  const formCancelAction = (actionNumber, type = 'cancel') => {
    switch (actionNumber) {
      case 0:
        if (type == 'cancel') {
          fillValue('basicInformation', enterprise_detail);
        }
        setIsEditBasicInformationActive(false);
        break;
      case 1:
        if (type == 'cancel') {
          fillValue('personalization', enterprise_detail);
        }
        setIsEditPersonalizationActive(false);
        break;
      case 2:
        if (type == 'cancel') {
          setChangesLabelRow([]);
          dispatch(resetCustomLabel());
          dispatch(getCustomLabel(localEnterpriseId, 'enterpriseId'));
        }
        setCustomLabelValidation([]);
        setIsEditCustomLabelActive(false);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      dispatch(getBusinessCategory());
      dispatch(getBusinessFieldType());
      dispatch(getEnterpriseDetail());
    });
    return pageLoad;
  }, [navigation]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      dispatch(resetEnterpriseDetail());
      setBasicInformation(null);
      setPersonalization(null);
      setChangesLabelRow([]);
      setCustomLabel([]);
      dispatch(enterpriseManagementSetDetailParams(''));
      dispatch(resetCustomLabel());
      setIsLoading(false);
    });
    return pageBlur;
  }, [navigation]);
  useEffect(() => {
    if (enterprise_detail) {
      const {enterpriseId} = enterprise_detail;
      setLocalEnterpriseId(enterpriseId);
      fillValue('basicInformation', enterprise_detail);
      fillValue('personalization', enterprise_detail);
      dispatch(getCustomLabel(enterpriseId, 'enterpriseId'));
    }
  }, [enterprise_detail]);
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
        <ContentCard
          loadingContent={!basicInformation}
          cardTitleHeight={40}
          cardTitleComponent={
            <CardTitleComponent
              isLoading={isLoading}
              cardTitle="Basic Information"
              isEditActive={isEditBasicInformationActive}
              editText="Save"
              cancelAction={() => formCancelAction(0)}
              setIsEditActive={setIsEditBasicInformationActive}
              editAction={() =>
                onSubmit('Success, Basic Information has been updated ', 0)
              }
            />
          }
          cardContent={
            <CreateEnterpriseBasicInformation
              editable={isEditBasicInformationActive}
              formError={formValidation}
              setFormError={setValidationError}
              inputHandler={basicInformationInputHandler}
              value={basicInformation || {...basicInformationObj}}
              dropDownData={business_category}
              isCreate={false}
            />
          }
        />
        <ContentCard
          loadingContent={!personalization}
          cardTitleHeight={40}
          cardTitleComponent={
            <CardTitleComponent
              isLoading={isLoading}
              cardTitle="Enterprise Personalization"
              isEditActive={isEditPersonalizationActive}
              editText={'Save'}
              cancelAction={() => formCancelAction(1)}
              setIsEditActive={setIsEditPersonalizationActive}
              editAction={() =>
                onSubmit(
                  'Success, Enterprise Personalization has been updated ',
                  1,
                )
              }
            />
          }
          cardBody={
            <Text style={enterpriseStyle.textDescription}>
              Personalize the user interface using the company logo of the new
              onboarded enterprise and choose the top bar colour preference
            </Text>
          }
          cardContent={
            <CreateEnterprisePersonalization
              editable={true}
              formError={formValidation}
              inputHandler={enterprisePersonalizationInputHandler}
              value={personalization || {...personalizationObj}}
              isActive={isEditPersonalizationActive}
            />
          }
        />
        <ContentCard
          cardTitleHeight={40}
          cardTitleComponent={
            <CardTitleComponent
              isLoading={isLoading}
              cardTitle="Custom Label"
              isEditActive={isEditCustomLabelActive}
              editText={'Save'}
              cancelAction={() => formCancelAction(2)}
              setIsEditActive={setIsEditCustomLabelActive}
              showModal={showModal}
              onCloseModal={() => setShowModal(false)}
              onSubmit={() =>
                onSubmit('Success, Custom Label has been updated ', 2)
              }
              editAction={
                () => setShowModal(true)
                // onSubmit('Success, Custom Label has been updated ', 2)
              }
            />
          }
          cardBody={
            <Text style={enterpriseStyle.textDescription}>
              {`Add more information which more familiar with your business by enabling up to 10 labels, and select the field type (combo box or text). \n\nEnter a custom field label and any custom values if the field type is combo box.`}
            </Text>
          }
          cardContent={
            <CreateEnterpriseCustomLabel
              setCustomLabel={setCustomLabel}
              changesLabelRow={changesLabelRow}
              setChangesLabelRow={setChangesLabelRow}
              isCreate={false}
              isDisabled={!isEditCustomLabelActive}
              setFormValidation={setCustomLabelValidation}
            />
          }
        />
      </ScrollView>
    </View>
  );
};

const CardTitleComponent = (props) => {
  const {
    cardTitle,
    isEditActive,
    editText,
    cancelText,
    editAction,
    cancelAction,
    isLoading,
    setIsEditActive,
    showModal,
    onCloseModal,
    onSubmit = () => {},
  } = props;

  return (
    <View style={enterpriseStyle.toolBar}>
      <Text fontType="bold" style={{fontSize: 13, color: 'black'}}>
        {cardTitle}
      </Text>
      {isEditActive ? (
        <View style={{flexDirection: 'row'}}>
          <ButtonLabelComponent
            buttonText={cancelText || 'Cancel'}
            buttonColor="white"
            buttonStyle={{borderColor: colors.main_color, borderWidth: 2}}
            textColor={colors.main_color}
            buttonWidth={60}
            buttonAction={cancelAction}
          />
          <ButtonLabelComponent
            isLoading={isLoading}
            buttonText={isEditActive ? editText : 'Edit'}
            buttonWidth={60}
            buttonAction={editAction}
          />
        </View>
      ) : (
        <ButtonLabelComponent
          isLoading={isLoading}
          buttonText={isEditActive ? editText : 'Edit'}
          buttonWidth={60}
          buttonAction={() => setIsEditActive(true)}
        />
      )}

      <ModalConfirmation
        showModal={showModal}
        loading={isLoading}
        closeModal={onCloseModal}
        title={'Custom Label'}
        description={'Are you sure you want to customize these labels?'}
        subDescription={'Lorem ipsum dolor amet'}
        confirmText={'Submit'}
        confirmAction={() =>
          onSubmit('Success, Custom Label has been updated ', 2)
        }
        alignContent={'center'}
        iconClose
      />
    </View>
  );
};

export default EnterpriseManagementEditView;

import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {
  HeaderContainer,
  FormStepComponent,
  OverlayBackground,
} from '../../components';
import {enterpriseStyle} from '../../style';
import {useSelector} from 'react-redux';
import {
  CreateEnterpriseBasicInformation,
  CreateEnterpriseParentOrganization,
  CreateEnterprisePersonalization,
} from '../create';

const EnterpriseManagementOnBoardPage = ({route, navigation}) => {
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  // Form State
  const [formPosition, setFormPosition] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [scrollViewEnabled, setScrollViewEnabled] = useState(true);
  const [basicInformation, setBasicFormation] = useState({
    enterpriseName: '',
    customerNumber: '',
    bpHo: '',
    bpPayer: '',
    organizationalUnit: '',
    agreementNumber: '',
    businessCategory: '',
    bpVat: '',
    laNumber: '',
  });
  const [personalization, setPersonalization] = useState({
    companyLogo: null,
    topBarColour: '#FFFFFF',
  });
  // Validation State
  const [formValidation, setFormValidation] = useState({});
  //Form Function
  const onNextRules = () => {
    setFormPosition((prevState) => prevState + 1);
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
            <CreateEnterpriseParentOrganization formPosition={formPosition} />
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
          component: <CreateEnterpriseParentOrganization />,
        },
      ],
    },
  ];

  useEffect(() => {
    console.log(formValidation);
  }, [formValidation]);

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
        </View>
      </ScrollView>
    </View>
  );
};

export default EnterpriseManagementOnBoardPage;

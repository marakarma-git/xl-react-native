import React, {useEffect, useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {
  ContentCard,
  FormFactory,
  HeaderContainer,
  OverlayBackground,
  SimInformationComponent,
  Text,
  ViewInformationComponent,
} from '../../components';
import {useSelector, useDispatch} from 'react-redux';
import styles from '../../style/reatimeDiagnosticStyle';
import {
  getRealtimeDiagnosticSimData,
  realtimeDiagnosticResetSimData,
  realtimeDiagnosticResetSimStatus,
  realtimeDiagnosticSetError,
  realtimeDiagnosticSetSuccess,
} from '../../redux/action/realtime_diagnostic_action';
import {useToastHooks} from '../../customHooks/customHooks';
import {Bars} from 'react-native-loader';
import {colors} from '../../constant/color';

const RealtimeDiagnosticPage = ({navigation}) => {
  const dispatch = useDispatch();
  const showToast = useToastHooks();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {simData, loadSimData, simStatus, errorText, successText} = useSelector(
    (state) => state.realtime_diagnostic_reducer,
  );
  const [searchForm, setSearchForm] = useState({
    keyword: '',
  });
  const [searchCriteria, setSearchCriteria] = useState('');
  const searchHandler = (name, value) => {
    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };
  const searchSubmit = (value) => {
    if (value.length > 0) {
      dispatch(getRealtimeDiagnosticSimData(value));
    } else {
      showToast({
        title: 'Diagnostic Wizard',
        type: 'warning',
        message: 'Please input valid keyword',
        duration: 3000,
        showToast: true,
        position: 'top',
      });
    }
    setSearchCriteria(value);
  };
  useEffect(() => {
    if (errorText) {
      showToast({
        title: 'Error',
        type: 'error',
        message: errorText,
        duration: 3000,
        showToast: true,
        position: 'top',
      });
      dispatch(realtimeDiagnosticSetError(null));
    }
    if (successText) {
      showToast({
        title: 'Diagnostic Wizard',
        type: 'success',
        message: successText,
        duration: 3000,
        showToast: true,
        position: 'top',
      });
      dispatch(realtimeDiagnosticSetSuccess(null));
    }
  }, [errorText, successText]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      dispatch(realtimeDiagnosticResetSimData());
      dispatch(realtimeDiagnosticResetSimStatus());
      setSearchForm({
        keyword: '',
      });
      setSearchCriteria('');
      dispatch(realtimeDiagnosticSetError(null));
    });
    return pageBlur;
  }, [navigation]);
  const searchFormList = [
    {
      title: 'Search',
      name: 'keyword',
      validation: false,
      isRequired: false,
      type: 'search',
      editable: true,
      config: {
        placeholder: 'Search with IMSI, MSISDN, or ICCID',
        action: searchSubmit,
      },
    },
  ];
  return (
    <View style={styles.container}>
      <HeaderContainer
        navigation={navigation}
        headerTitle={'Diagnostic Wizard'}
        companyLogo={imageBase64}
      />
      {loadSimData && (
        <View style={styles.loadBackdrop}>
          <Bars size={24} color={colors.tab_edit} />
          <Text fontType="semi-bold" style={{color: 'white', fontSize: 16}}>
            Please Wait...
          </Text>
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <OverlayBackground />
        <ContentCard
          isOnlyContent={true}
          customStyle={{marginBottom: 5}}
          cardContent={
            <View style={{marginTop: 5}}>
              <FormFactory
                formList={searchFormList}
                editable={!loadSimData}
                inputHandler={searchHandler}
                value={searchForm}
              />
            </View>
          }
        />
        <ContentCard
          customStyle={{marginBottom: 5}}
          cardTitleStyle={styles.searchCriteriaContainer}
          cardTitleComponent={
            <View style={styles.searchCriteriaHeader}>
              <Text fontType="semi-bold" style={styles.searchCriteriaText}>
                Search Criteria : {!loadSimData && searchCriteria}
              </Text>
            </View>
          }
          cardContent={<SimInformationComponent value={simData || {}} />}
        />
        <ContentCard
          isOnlyContent={true}
          customStyle={{marginBottom: 0}}
          cardContent={<ViewInformationComponent listInformation={simStatus} />}
        />
      </ScrollView>
    </View>
  );
};

export default RealtimeDiagnosticPage;

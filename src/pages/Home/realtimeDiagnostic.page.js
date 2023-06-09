import React, {useEffect, useState, useMemo} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {
  ButtonCurveTypeComponent,
  ContentCard,
  FormFactory,
  HeaderContainer,
  OverlayBackground,
  SimInformationComponent,
  Text,
  ViewInformationComponent,
  SearchBarDiagnostic,
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
import RealtimeChartComponent from '../../components/chart/realtimeChart';

const RealtimeDiagnosticPage = ({route, navigation}) => {
  const dispatch = useDispatch();
  const showToast = useToastHooks();
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    simData,
    loadSimData,
    simStatus,
    errorText,
    successText,
    trafficUsage,
  } = useSelector((state) => state.realtime_diagnostic_reducer);
  const {filter: filerPermission, fixStatus: fixStatusPermission} = useSelector(
    (state) => state.user_menu_permission_reducer.menu.diagnosticWizard,
  );
  const [pageReady, setPageReady] = useState(false);
  const [searchForm, setSearchForm] = useState({
    keyword: '',
  });
  const [searchCriteria, setSearchCriteria] = useState('');
  const [curveType, setCurveType] = useState({
    value: 'day',
    label: 'Day Volumes',
  });
  const [showCurveType, setShowCurveType] = useState(false);
  const searchHandler = (name, value) => {
    setSearchForm({
      ...searchForm,
      [name]: value,
    });
  };
  const [curveTypeOptions, setCurveTypeOptions] = useState([
    {label: 'Day Volumes', value: 'day', isDisabled: false, isVisible: true},
    {
      label: 'Cumulative Month Values',
      value: 'cumulative',
      isDisabled: false,
      isVisible: true,
    },
    {label: 'Both', value: 'both', isDisabled: false, isVisible: true},
  ]);
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
  const isErrorAlert = useMemo(() => {
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
  }, [errorText]);
  const isLoadSimDataClose = useMemo(() => {
    if (successText) {
      showToast({
        title: 'Diagnostic Wizard',
        type: 'success',
        message: successText,
        duration: 5000,
        showToast: true,
        position: 'top',
      });
    }
    dispatch(realtimeDiagnosticSetSuccess(null));
  }, [successText]);
  useEffect(() => {
    const pageBlur = navigation.addListener('blur', () => {
      dispatch(realtimeDiagnosticResetSimData());
      dispatch(realtimeDiagnosticResetSimStatus());
      setSearchForm({
        keyword: '',
      });
      setSearchCriteria('');
      dispatch(realtimeDiagnosticSetError(null));
      dispatch(realtimeDiagnosticSetSuccess(null));
      setPageReady(false);
    });
    return pageBlur;
  }, [navigation]);
  useEffect(() => {
    const pageLoad = navigation.addListener('focus', () => {
      if (route?.params?.imsi) {
        const imsi = route.params.imsi;
        setSearchForm({
          keyword: imsi,
        });
        dispatch(getRealtimeDiagnosticSimData(imsi));
      }
      setTimeout(() => {
        setPageReady(true);
      }, 1500);
    });
    return pageLoad;
  }, [navigation]);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}>
        <OverlayBackground />
        <>
          {!pageReady ? (
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
            <>
              <ContentCard
                isOnlyContent={true}
                customStyle={{marginBottom: 5}}
                cardContent={
                  <SearchBarDiagnostic
                    onSubmit={searchSubmit}
                    editable={!loadSimData}
                    searchHandler={searchHandler}
                    value={searchForm}
                  />
                }
              />
              <ContentCard
                customStyle={{marginBottom: 5}}
                cardTitleStyle={styles.searchCriteriaContainer}
                cardTitleComponent={
                  <View style={styles.searchCriteriaHeader}>
                    <Text
                      fontType="semi-bold"
                      style={styles.searchCriteriaText}>
                      Search Criteria : {!loadSimData && searchCriteria}
                    </Text>
                  </View>
                }
                cardContent={<SimInformationComponent value={simData || {}} />}
              />
              <ContentCard
                isOnlyContent={true}
                customStyle={{marginBottom: 0}}
                cardContent={
                  <ViewInformationComponent
                    listInformation={simStatus}
                    isFixStatusDisabled={!fixStatusPermission}
                  />
                }
              />
              <ContentCard
                cardTitle="Last 30 Days Traffic Usage"
                cardToolbar={
                  <ButtonCurveTypeComponent
                    label={curveType?.label}
                    setShowModal={setShowCurveType}
                    showModal={showCurveType}
                    curveTypeOptions={curveTypeOptions}
                    curveType={curveType}
                    setCurveType={setCurveType}
                  />
                }
                cardContent={
                  <RealtimeChartComponent
                    dataSet1={trafficUsage?.monthUsage}
                    dataSet2={trafficUsage?.cumulativeUsage}
                    chartType={curveType.value}
                  />
                }
              />
            </>
          )}
        </>
      </ScrollView>
    </View>
  );
};

export default RealtimeDiagnosticPage;

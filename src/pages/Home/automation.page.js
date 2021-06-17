import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {HeaderContainer, OverlayBackground} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import getAutomation, {
  automationSetDataAutomationGenerated,
} from '../../redux/action/automation_get_automation_action';
import {subscriptionStyle} from '../../style';
import TableFooter from '../../components/subscription/tableFooter';
import Loading from '../../components/loading';
import Table from '../../components/table/Table';
import SearchHeader from '../../components/subscription/searchHeader';
import AppliedFilter from '../../components/subscription/appliedFilter';
import FilterActionLabel from '../../components/subscription/filterActionLabel';
import Helper from '../../helpers/helper';
import {
  automationDynamicReset,
  automationGenerateParams,
  automationUpdateBundleArray,
} from '../../redux/action/automation_array_header_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {base_url} from '../../constant/connection';

const AutomationPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataAutomationHeader,
    searchText,
    generatedParams,
    appliedFilterAutomation,
  } = useSelector((state) => state.automation_array_header_reducer);
  const {
    reload,
    loading,
    errorText,
    data_automation,
    data_automation_generated,
    automation_page,
    automation_total_page,
    automation_total_size,
    automation_elements_static,
    automation_elements_dynamic,
    automation_applied_header_sort,
    automation_applied_filter,
    automation_params_applied_activity_log,
  } = useSelector((state) => state.automation_get_automation_reducer);
  const {access_token} = useSelector((state) => state.auth_reducer.data) || {};
  const getDetailInfo = ({automationId, from}) => {
    setLoadingDetail(true);
    axios
      .get(
        `${base_url}/dcp/automation/getAutomationDetail?automationId=${automationId}`,
        {headers: {Authorization: `Bearer ${access_token}`}},
      )
      .then(({data}) => {
        const {result, statusCode} = data || {};
        if (statusCode === 0) {
          setLoadingDetail(false);
          navigation.navigate('AutomationCreDit', {
            from: from,
            result: result,
          });
        } else {
          setLoadingDetail(false);
          Alert.alert(
            'Failed to get info',
            `Reason: ${JSON.stringify(data, null, 2)}`,
          );
        }
      })
      .catch((error) => {
        setLoadingDetail(false);
        Alert.alert(
          'Failed to get info',
          `Reason: ${JSON.stringify(error, null, 2)}`,
        );
      });
  };
  useEffect(() => {
    if (!firstRender) {
      dispatch(
        getAutomation({
          page_params: 0,
        }),
      );
    } else {
      dispatch(getAutomation());
      setFirstRender(false);
    }
  }, [dispatch, searchText, generatedParams]);

  useEffect(() => {
    if (reload) {
      dispatch(
        getAutomation({
          page_params: 0,
        }),
      );
    }
  }, [dispatch, reload]);
  return (
    <HeaderContainer
      headerTitle={'Automation'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <Table
          isScrollView={true}
          onRight
          stickHeaderIndices={[1]}
          onPressCell={({item}) => {
            const {autoId} = item || {};
            getDetailInfo({
              automationId: autoId,
              from: 'Detail',
            });
          }}
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground />
                <SearchHeader
                  value={''}
                  swapWithButton
                  onPressButton={() =>
                    navigation.navigate('AutomationCreDit', {
                      refresh: true,
                      from: undefined,
                      result: undefined,
                    })
                  }
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'AutomationFilter'}
                  placeholder={'Nanti ini dihapus'}
                />
                <AppliedFilter
                  data={appliedFilterAutomation}
                  onDelete={(e) => {
                    const {formId} = e || {};
                    dispatch(automationDynamicReset({formId}));
                    dispatch(automationGenerateParams());
                  }}
                />
                <FilterActionLabel
                  total={Helper.numberWithDot(automation_elements_static)}
                  filtered={
                    automation_applied_filter &&
                    !loading &&
                    data_automation_generated.length > 0 &&
                    !errorText &&
                    Helper.numberWithDot(automation_elements_dynamic)
                  }
                />
              </>
            );
          }}
          onPressHeader={(e) => {
            const {dataSort, item} = e || {};
            const {sortBy, formId: currentFormId} = dataSort || {};
            const {formId, api_id} = item || {};
            const getOrder = () => {
              if (formId !== currentFormId) {
                return 'ASC';
              }
              if (formId === currentFormId) {
                if (sortBy === '' || sortBy === 'RESET') {
                  return 'ASC';
                }
                if (sortBy === 'ASC') {
                  return 'DESC';
                }
                if (sortBy === 'DESC') {
                  return 'RESET';
                }
              }
            };
            if (getOrder()) {
              dispatch(
                getAutomation({
                  page_params: 0,
                  header_sort_params: {
                    formId: formId,
                    orderBy: api_id,
                    sortBy: getOrder(),
                  },
                }),
              );
            } else {
              dispatch(
                getAutomation({
                  page_params: 0,
                }),
              );
            }
          }}
          selectedHeaderOrderSort={automation_applied_header_sort}
          dataHeader={dataAutomationHeader}
          dataTable={data_automation_generated}
          onPressEdit={({item}) => {
            const {autoId} = item || {};
            getDetailInfo({
              automationId: autoId,
              from: 'Edit',
            });
          }}
          onPressDelete={({item}) => {
            const {autoId} = item || {};
            setLoadingDetail(true);
            axios({
              method: 'post',
              url: `${base_url}/dcp/automation/deleteAutomation?automationId=${autoId}`,
              headers: {Authorization: `Bearer ${access_token}`},
            })
              .then(({data}) => {
                const {statusCode} = data;
                if (statusCode === 0) {
                  setLoadingDetail(false);
                  dispatch(
                    getAutomation({
                      page_params: 0,
                    }),
                  );
                  alert(`Success delete automation with id ${autoId}`);
                } else {
                  setLoadingDetail(false);
                  Alert.alert(
                    'Failed to delete automation',
                    `Automation Id: ${autoId}, Reason${JSON.stringify(
                      data,
                      null,
                      2,
                    )}`,
                  );
                }
              })
              .catch((error) => {
                setLoadingDetail(false);
                Alert.alert(
                  'Failed to delete automation',
                  `Automation Id: ${autoId}, Reason${JSON.stringify(
                    error,
                    null,
                    2,
                  )}`,
                );
              });
          }}
        />
        <TableFooter
          currentPage={automation_page}
          totalPage={automation_total_page}
          perPageValue={automation_total_size}
          onChangePerPage={(e) => {
            const {value} = e || {};
            dispatch(
              getAutomation({
                size_params: value,
              }),
            );
          }}
          onChangePaging={(e) => {
            dispatch(
              getAutomation({
                page_params: e,
              }),
            );
          }}
        />
        {(loading || loadingDetail) && <Loading />}
      </View>
      {showMenu && (
        <ModalMenuPicker
          title={'Column'}
          data={dataAutomationHeader}
          onApply={(e) => {
            const {result} = data_automation || {};
            const {content} = result || {};
            dispatch(automationUpdateBundleArray({data: e}));
            const reGenerated = dataMatcherArray2D(content, e);
            dispatch(
              automationSetDataAutomationGenerated({
                dataAutomationGenerated: reGenerated,
              }),
            );
            setShowMenu((state) => !state);
          }}
          onClose={() => setShowMenu((state) => !state)}
        />
      )}
    </HeaderContainer>
  );
};

export default AutomationPage;

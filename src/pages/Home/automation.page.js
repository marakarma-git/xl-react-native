import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {HeaderContainer, OverlayBackground, Text} from '../../components';
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
  automationSetSearchText,
  automationUpdateBundleArray,
} from '../../redux/action/automation_array_header_action';
import ModalMenuPicker from '../../components/modal/ModalMenuPicker';
import {dataMatcherArray2D} from '../../redux/action/get_sim_inventory_action';
import {useNavigation} from '@react-navigation/native';

const AutomationPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [firstRender, setFirstRender] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const {imageBase64} = useSelector((state) => state.enterprise_reducer);
  const {
    dataAutomationHeader,
    searchText,
    generatedParams,
    appliedFilter,
  } = useSelector((state) => state.automation_array_header_reducer);
  const {
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
  return (
    <HeaderContainer
      headerTitle={'Automation'}
      style={{flex: 1}}
      companyLogo={imageBase64}>
      <View style={subscriptionStyle.containerBackground}>
        <TouchableOpacity
          style={{
            paddingVertical: 12,
            backgroundColor: 'tomato',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('AutomationCreDit')}>
          <Text>Tekan Aku</Text>
        </TouchableOpacity>
        <Table
          isScrollView={true}
          onRight
          stickHeaderIndices={[1]}
          headerOtherLayout={() => {
            return (
              <>
                <OverlayBackground />
                <SearchHeader
                  value={''}
                  onSubmitEditing={(e) => {
                    dispatch(
                      automationSetSearchText({
                        searchText: e,
                      }),
                    );
                  }}
                  showMenu={showMenu}
                  onClickColumn={() => setShowMenu((state) => !state)}
                  navigateTo={'AutomationFilter'}
                  placeholder={'Nanti ini dihapus'}
                />
                <AppliedFilter
                  data={appliedFilter}
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
          onPressDelete={(e) => alert(JSON.stringify(e, null, 2))}
          onPressEdit={(e) => alert(JSON.stringify(e, null, 2))}
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
        {loading && <Loading />}
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
